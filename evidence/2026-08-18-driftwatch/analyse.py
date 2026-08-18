#!/usr/bin/env python3
"""
DriftWatch noise-floor experiment: analysis.

Imports the product's own validate() and compute_drift_score() rather than
reimplementing them, so the numbers describe the actual detector under test.

Pairs are ORDERED (i as baseline, j as check) because the product picks one
sample as the baseline arbitrarily, and the score is not symmetric: length_drift
divides by the baseline length, and a regression is defined as passing in the
baseline and failing in the check.

Usage: .venv/bin/python analyse.py
"""

import json
import sys
from itertools import permutations, product
from pathlib import Path

sys.path.insert(0, str(Path.home() / "Genesis" / "llm-drift" / "core"))
from drift_detector import validate, compute_drift_score  # noqa: E402

HERE = Path(__file__).parent
RUNS = HERE / "runs"
PROMPTS = {p["id"]: p for p in json.loads((HERE / "prompts.json").read_text())}


def load(arm):
    d = json.loads((RUNS / f"{arm}.json").read_text())
    by_prompt = {}
    for s in d["samples"]:
        by_prompt.setdefault(s["prompt_id"], {})[s["rep"]] = s["response"]
    return d, by_prompt


def pct(values, p):
    """Nearest-rank percentile. No numpy dependency, explicit about ties."""
    if not values:
        return None
    s = sorted(values)
    k = max(1, int(round(p / 100 * len(s))))
    return s[min(k, len(s)) - 1]


def score(pid, base_resp, check_resp):
    vals = PROMPTS[pid]["validators"]
    return compute_drift_score(base_resp, check_resp,
                               validate(base_resp, vals), validate(check_resp, vals))


def same_model(by_prompt):
    """All ordered within-arm pairs: the detector's reading when nothing changed."""
    out = []
    for pid, reps in by_prompt.items():
        for i, j in permutations(sorted(reps), 2):
            s = score(pid, reps[i], reps[j])
            out.append({"prompt_id": pid, "pair": f"{i}->{j}", **s})
    return out


def cross_model(base_by_prompt, check_by_prompt):
    """All ordered cross-arm pairs: the detector's reading when the model changed."""
    out = []
    for pid in base_by_prompt:
        for i, j in product(sorted(base_by_prompt[pid]), sorted(check_by_prompt[pid])):
            s = score(pid, base_by_prompt[pid][i], check_by_prompt[pid][j])
            out.append({"prompt_id": pid, "pair": f"{i}=>{j}", **s})
    return out


def summarise(label, rows):
    d = [r["overall_drift"] for r in rows]
    levels = {}
    for r in rows:
        levels[r["alert_level"]] = levels.get(r["alert_level"], 0) + 1
    alerting = sum(v for k, v in levels.items() if k != "none")
    return {
        "label": label,
        "n_pairs": len(rows),
        "median": round(pct(d, 50), 3),
        "p95": round(pct(d, 95), 3),
        "max": round(max(d), 3),
        "mean": round(sum(d) / len(d), 3),
        "exact_match_rate": round(sum(1 for r in rows if r["exact_match"]) / len(rows), 3),
        "alert_levels": levels,
        "alert_rate": round(alerting / len(rows), 3),
        "critical_rate": round(levels.get("critical", 0) / len(rows), 3),
    }


def worst_prompts(rows, n=5):
    per = {}
    for r in rows:
        per.setdefault(r["prompt_id"], []).append(r["overall_drift"])
    ranked = sorted(((pid, round(sum(v) / len(v), 3), round(max(v), 3))
                     for pid, v in per.items()), key=lambda x: -x[1])
    return [{"prompt_id": p, "mean_drift": m, "max_drift": mx} for p, m, mx in ranked[:n]]


if __name__ == "__main__":
    arms = {}
    for arm in ["haiku-default", "haiku-temp0", "sonnet46", "sonnet5"]:
        if (RUNS / f"{arm}.json").exists():
            arms[arm] = load(arm)

    report = {"arms": {}, "same_model": {}, "cross_model": {}, "worst_prompts": {}}
    for arm, (meta, bp) in arms.items():
        report["arms"][arm] = {
            "model": meta["model"], "temperature": meta["temperature"],
            "reps": meta["reps"], "calls": len(meta["samples"]),
            "input_tokens": sum(s["input_tokens"] for s in meta["samples"]),
            "output_tokens": sum(s["output_tokens"] for s in meta["samples"]),
        }
        rows = same_model(bp)
        report["same_model"][arm] = summarise(arm, rows)
        report["worst_prompts"][arm] = worst_prompts(rows)

    # The realistic provider swap (adjacent generations, same family) and the
    # generous one (different tier and family).
    for base, check, label in [("sonnet46", "sonnet5", "sonnet-4-6 -> sonnet-5"),
                               ("haiku-default", "sonnet5", "haiku-4-5 -> sonnet-5"),
                               ("haiku-default", "sonnet46", "haiku-4-5 -> sonnet-4-6")]:
        if base in arms and check in arms:
            rows = cross_model(arms[base][1], arms[check][1])
            report["cross_model"][label] = summarise(label, rows)

    # Kill criterion, evaluated literally as the charter states it.
    noise = report["same_model"].get("haiku-default")
    verdict = {}
    if noise:
        p95 = noise["p95"]
        verdict["p95_noise"] = p95
        verdict["condition_2_p95_above_0.30"] = p95 > 0.30
        for label, cm in report["cross_model"].items():
            verdict[f"condition_1 [{label}] median<3x_p95"] = {
                "median_cross": cm["median"], "3x_p95_noise": round(3 * p95, 3),
                "fires": cm["median"] < 3 * p95,
            }
        fires = verdict["condition_2_p95_above_0.30"] or any(
            v["fires"] for k, v in verdict.items() if k.startswith("condition_1"))
        verdict["kill_criterion_fires"] = fires
    report["verdict"] = verdict

    (HERE / "RESULTS.json").write_text(json.dumps(report, indent=1))
    print(json.dumps(report, indent=1))


def run_level(by_prompt_base, by_prompt_check, same_arm):
    """The product alerts at RUN level: one check run = all 21 prompts vs baseline.
    This is what a customer actually sees in the dashboard."""
    base_reps = sorted(next(iter(by_prompt_base.values())))
    check_reps = sorted(next(iter(by_prompt_check.values())))
    runs = []
    for i in base_reps:
        for j in check_reps:
            if same_arm and i == j:
                continue
            alerts = crits = 0
            for pid in by_prompt_base:
                s = score(pid, by_prompt_base[pid][i], by_prompt_check[pid][j])
                if s["alert_level"] != "none":
                    alerts += 1
                if s["alert_level"] == "critical":
                    crits += 1
            runs.append({"alerts": alerts, "criticals": crits})
    n = len(runs)
    return {
        "n_runs": n,
        "mean_alerting_prompts_per_run": round(sum(r["alerts"] for r in runs) / n, 2),
        "runs_with_any_alert": round(sum(1 for r in runs if r["alerts"]) / n, 3),
        "runs_with_any_critical": round(sum(1 for r in runs if r["criticals"]) / n, 3),
    }
