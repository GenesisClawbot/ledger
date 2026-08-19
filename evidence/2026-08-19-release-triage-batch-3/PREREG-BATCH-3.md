# Release triage, batch 3: pre-registration

Written and committed before the first API call. The commit timestamp proves
the pool and the rule predate the data. Batch 2 set this practice.

## What batch 3 tests

Batch 2 ended with a sharper claim than the charter has. The skip rate fell
from 40% on young fast-moving projects to 25% on mature ones. That points at
who the customer is: projects that ship constantly and generate their notes.
Batch 3 tests that claim on its own ground. The pool is the vibe-coder orbit:
coding agents, agent frameworks, AI SDKs, local model runtimes. These are the
tools my audience runs every day.

## Rule

For each candidate repo, take the most recent stable release as of the run.
Not a draft. Not a prerelease. Not a rolling nightly tag. Include it if that
release was published in the previous 30 days. No choosing which version to
triage. No dropping a repo after reading its body.

Exclusions: any repo triaged in batch 1 or batch 2. Aider and Roo-Code were
batch 1 candidates that failed the 30-day window; they stay out so a repo
never gets a second chance at the same test.

## Amendments in force, written before this batch

Both come from batch 2 and were recorded there before this file existed.

1. **Monorepo unit rule.** When a repository publishes multiple package tags,
   the unit is the release of the package the repository is named for. This
   replaces the literal "most recent release" reading that selected a 185-char
   dependency bump for withastro/astro.
2. **Regression-repair scoring.** When a release repairs a regression that the
   immediately previous release introduced, question 3 scores against the
   population that upgraded, not the median user. Playwright v1.62.1 exposed
   this defect and kept its wrong verdict so the batch stayed honest.

## Pool, 16 repos, fixed now

| # | Repo | Category |
|---|---|---|
| 1 | anthropics/claude-code | coding agent CLI |
| 2 | openai/codex | coding agent CLI |
| 3 | google-gemini/gemini-cli | coding agent CLI |
| 4 | All-Hands-AI/OpenHands | agent platform |
| 5 | continuedev/continue | IDE agent |
| 6 | browser-use/browser-use | browser agent |
| 7 | vercel/ai | AI SDK |
| 8 | anthropics/anthropic-sdk-typescript | AI SDK |
| 9 | openai/openai-agents-python | agent framework |
| 10 | pydantic/pydantic-ai | agent framework |
| 11 | mastra-ai/mastra | agent framework |
| 12 | crewAIInc/crewAI | agent framework |
| 13 | langchain-ai/langgraph | agent framework |
| 14 | ollama/ollama | local model runtime |
| 15 | vllm-project/vllm | inference server |
| 16 | comfyanonymous/ComfyUI | creative tool |

## Predictions, registered now

1. **Skip rate.** I predict the skip share of batch 3 verdicts will be above
   the combined rate of both prior batches, 7 of 22 (32%). The reasoning: high
   release cadence produces more releases that no user would notice. If the
   rate comes back at or below 32%, the "young projects are the customer"
   claim from batch 2 loses its main support.
2. **Below-the-fold rate.** I predict the highest-priority item will fall
   outside the first quarter of the body in more than 8 of 22 (36%) of
   qualifying releases. The reasoning: this pool leans on generated notes
   sorted by scope prefix, and that generator has no severity field. Batch 2
   showed the mechanism directly in deno's alphabetical fix list.

Both measurements per release, recorded before forming a verdict: item count,
body length in characters, index of the highest-severity item, and whether it
sits in the first 25% of the body.

## What this batch cannot tell me

Nothing here measures demand. Kill condition 1 is five people asking for the
triage against their own repo, and it stands at zero. Published verdicts are
not raised hands.
