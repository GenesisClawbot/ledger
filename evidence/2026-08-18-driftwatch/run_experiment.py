#!/usr/bin/env python3
"""
DriftWatch noise-floor experiment: data collection.

Runs the inherited 21-prompt suite repeatedly against pinned models and stores
every raw response. Scoring happens separately in analyse.py so the maths can be
re-run without spending money again.

Design rule, inherited from the audit: errors are never swallowed. Finding 2 of
AUDIT-2026-08-18.md is that the product under test turns a total outage into a
green light by handling every failure with `continue`. This script records each
error explicitly and refuses to write an arm's data file if any call failed.

Usage: .venv/bin/python run_experiment.py [arm ...]
"""

import json
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import anthropic

HERE = Path(__file__).parent
RUNS = HERE / "runs"
RUNS.mkdir(exist_ok=True)

MAX_TOKENS = 512  # matches call_llm() in the product under test
CONCURRENCY = 6

# Arms. haiku-4-5 is the one current model that still accepts sampling
# parameters, so it is the only place the temperature question can be tested.
# sonnet-4-6 -> sonnet-5 is the realistic provider-swap proxy: adjacent
# generations of one family, which is what actually happens to a customer when
# a vendor moves them on. haiku vs sonnet-5 is the generous proxy.
ARMS = {
    "haiku-default":  {"model": "claude-haiku-4-5",  "temperature": None, "reps": 5},
    "haiku-temp0":    {"model": "claude-haiku-4-5",  "temperature": 0.0,  "reps": 5},
    "sonnet46":       {"model": "claude-sonnet-4-6", "temperature": None, "reps": 3},
    "sonnet5":        {"model": "claude-sonnet-5",   "temperature": None, "reps": 3},
}


def load_key() -> str:
    """Read the key from .env directly. It is deliberately never exported into
    the shell environment: an exported ANTHROPIC_API_KEY would silently rebill
    claude sessions from this capped experiment key."""
    env = Path.home() / "jamie" / ".env"
    for line in env.read_text().splitlines():
        if line.startswith("ANTHROPIC_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("ANTHROPIC_API_KEY not found in ~/jamie/.env")


client = anthropic.Anthropic(api_key=load_key())
prompts = json.loads((HERE / "prompts.json").read_text())


def call(model, temperature, prompt_text):
    kwargs = {
        "model": model,
        "max_tokens": MAX_TOKENS,
        "messages": [{"role": "user", "content": prompt_text}],
    }
    if temperature is not None:
        kwargs["temperature"] = temperature
    start = time.time()
    try:
        msg = client.messages.create(**kwargs)
    except Exception as e:  # recorded, never silently dropped
        return {"error": f"{type(e).__name__}: {e}", "response": None}
    # Current models return thinking blocks before the text block, so
    # content[0] is not necessarily the answer. The product's call_llm() does
    # `msg.content[0].text` and raises AttributeError on those models.
    text = next((b.text for b in msg.content if getattr(b, "type", None) == "text"), "")
    return {
        "error": None,
        "response": text,
        "latency_ms": round((time.time() - start) * 1000),
        "input_tokens": msg.usage.input_tokens,
        "output_tokens": msg.usage.output_tokens,
        "resolved_model": msg.model,
        "stop_reason": msg.stop_reason,
    }


def run_arm(name):
    cfg = ARMS[name]
    jobs = [(rep, p) for rep in range(cfg["reps"]) for p in prompts]
    print(f"[{name}] {cfg['model']} temp={cfg['temperature']} "
          f"{cfg['reps']} reps x {len(prompts)} prompts = {len(jobs)} calls")

    def one(job):
        rep, p = job
        out = call(cfg["model"], cfg["temperature"], p["prompt"])
        out.update({"rep": rep, "prompt_id": p["id"]})
        return out

    with ThreadPoolExecutor(max_workers=CONCURRENCY) as pool:
        samples = list(pool.map(one, jobs))

    errors = [s for s in samples if s["error"]]
    if errors:
        print(f"[{name}] ABORT: {len(errors)}/{len(samples)} calls failed")
        for e in errors[:5]:
            print("   ", e["prompt_id"], e["error"])
        (RUNS / f"{name}.FAILED.json").write_text(json.dumps(samples, indent=1))
        return None

    payload = {"arm": name, **cfg, "max_tokens": MAX_TOKENS, "samples": samples}
    (RUNS / f"{name}.json").write_text(json.dumps(payload, indent=1))
    tin = sum(s["input_tokens"] for s in samples)
    tout = sum(s["output_tokens"] for s in samples)
    resolved = sorted({s["resolved_model"] for s in samples})
    print(f"[{name}] ok. {len(samples)} calls, {tin} in / {tout} out tokens, "
          f"resolved={resolved}")
    return payload


if __name__ == "__main__":
    wanted = sys.argv[1:] or list(ARMS)
    failed = [a for a in wanted if run_arm(a) is None]
    if failed:
        raise SystemExit(f"arms failed: {failed}")
    print("all arms complete")
