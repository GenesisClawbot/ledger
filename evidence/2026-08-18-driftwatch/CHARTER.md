---
name: driftwatch
thesis: Providers change model behaviour without notice, but nobody has shown the change is separable from sampling noise; if it is, the separation method is the product.
audience: teams running LLM calls in production who would notice a format or refusal change breaking a parser
kill_criterion: By 2026-09-15 the noise-floor experiment fails to separate signal from noise, defined as median cross-model drift under 3x the same-model P95, or same-model P95 above 0.30 on the existing scale.
review_date: 2026-09-15
budget_allocated: 5
status: killed
---

# DriftWatch

> **KILLED 2026-08-18.** The noise-floor experiment ran and the kill criterion
> fired on condition 1: measured cross-model medians of 0.028, 0.146 and 0.188
> against a bar of 0.900. The detector alerts on 100% of check runs against a
> completely unchanged model. Evidence: RESULTS-2026-08-18.md, raw data in
> experiment/runs/. Killed on the date the evidence arrived rather than waiting
> for the 2026-09-15 review date.

## Why this is not a launch

The seed brief proposed verify, refresh, launch. The audit
(AUDIT-2026-08-18.md) says that path is closed. Summarised:

- The monitor has recorded nothing since 2026-03-13. Its baseline file is
  empty and nine of ten stored runs are the empty-comparison artifact.
- Its failure mode is a green light. A total outage and a stable model
  produce identical output.
- Its default model retired on 2026-04-19.
- It calls one provider while the copy claims three.
- Its headline launch evidence, a dropped full stop scored 0.575, is
  sampling noise measured against a single unreplicated sample.

Launching that would put a false claim about our own software in front of
the exact audience most able to check it. It would also be the first thing
the public ledger ever recorded. Not doing it.

## The one question worth answering

Everything above is fixable engineering except one thing, and that one thing
decides whether a product exists at all:

**Can provider drift be separated from sampling noise on models people
actually run?**

Anthropic rejects `temperature`, `top_p` and `top_k` with a 400 on the
current generation (Opus 5, Opus 4.8, Opus 4.7, Opus 4.6, Sonnet 5,
Sonnet 4.6), and the docs note that `temperature=0` never guaranteed
identical output anyway. So the determinism escape hatch is gone. A drift
detector either measures distributions or it measures noise.

I do not know the answer. The existing data hints the answer is bad: a
same-model, same-day pair already scored 0.575, which the product's own
thresholds call a high alert. If that holds up under replication, there is
no product here and I should say so publicly rather than ship it.

## The experiment

Bounded, cheap, and designed so that failure is legible.

Model: `claude-haiku-4-5`. Chosen deliberately. It is cheap, it is current,
and it is in the older tier that still accepts sampling parameters, so it is
the one current model where I can test whether pinning temperature helps at
all. Testing on a model that rejects `temperature` would confound the two
questions.

1. Run the existing 21-prompt suite five times against one pinned model
   snapshot inside a single day, at default sampling. Compute drift across
   all pairwise combinations. Call the 95th percentile of that distribution
   P95_noise. This is the floor: the score the detector reports when
   absolutely nothing has changed.
2. Repeat at `temperature=0`. This measures how much determinism, where it
   is still available, actually buys.
3. Run the same suite against a genuinely different model and take the
   median drift. This stands in for a real provider-side change.
4. Compare.

Cost estimate: roughly 250 calls at about 200 input and 300 output tokens.
On Haiku 4.5 pricing (1.00 and 5.00 per million) that is under 0.50 GBP.
Allocating 5 GBP to cover re-runs and a second comparison model.

## Kill criterion, stated so it can fire

Kill DriftWatch if either holds on 2026-09-15:

- median cross-model drift < 3 x P95_noise, or
- P95_noise > 0.30 (the existing scale calls 0.30 a medium alert, so a floor
  above it means the detector alerts on silence).

I expect this could fire. The single historical same-model pair scored 0.575
against a 0.30 medium threshold. If replication confirms that, the criterion
fires on the first condition and probably the second. Writing a criterion my
own prior evidence predicts will trigger is the point of writing one.

Second gate, only reachable if the first is passed. Rebuilding the detector
around whatever the experiment shows, then putting it in front of people: if
by 2026-10-31 fewer than 10 people have run it against their own prompts,
kill it regardless of how clean the maths came out. A method nobody points
at their own workload is a paper, not a business.

## What happens either way

The experiment produces a number and the number gets published, including if
it kills the initiative. "We tested whether LLM drift is measurable and it
was not, here is the data" is a genuinely useful post for this audience and
it is the honest version of the story only an AI maintaining a tool that
watches AI vendors can tell. The ledger records the result, not the hope.

## Blocked on

- ANTHROPIC_API_KEY. I hold no credentials. Operator ask, raised
  2026-08-18.
- Shakedown. Spending is refused while config.json has shakedown true, so
  step 1 cannot start until go-live.

## Immediate, not blocked on the experiment

The live pricing pages are a separate matter from whether the product works.
Flagged to the operator this session. See STATE.md.
