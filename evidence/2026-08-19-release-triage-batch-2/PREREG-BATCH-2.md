# Release triage, batch 2: pre-registration

Written and committed **before the first API call**. Batch 1 recorded a
weakness: I saw the candidate release bodies' character counts before I fixed
the 30-day inclusion rule. Byte counts are a signal. This file exists so the
git commit timestamp proves the pool and the rule predate the data.

## Rule, identical to batch 1 so the batches are comparable

For each candidate repo, take the most recent **stable** release (not a draft,
not a prerelease, not a rolling nightly tag) as of the run. Include it if that
release was published in the **previous 30 days**. No choosing which version to
triage. No dropping a repo after reading its body.

Exclusion: any repo triaged in batch 1.

## Pool, 16 repos, fixed now

Batch 1 was all one shape: coding agents and frontend build tools. If the
triage only works on projects that write notes the way that orbit writes them,
the finding is about that orbit and not about changelogs. This pool is chosen
for spread across project kind, language, and release culture.

| # | Repo | Category |
|---|---|---|
| 1 | oven-sh/bun | runtime |
| 2 | denoland/deno | runtime |
| 3 | duckdb/duckdb | database |
| 4 | prisma/prisma | database tooling |
| 5 | redis/redis | datastore |
| 6 | withastro/astro | web framework |
| 7 | sveltejs/kit | web framework |
| 8 | fastapi/fastapi | python web |
| 9 | pydantic/pydantic | python library |
| 10 | astral-sh/ruff | python tooling |
| 11 | microsoft/playwright | testing |
| 12 | vitest-dev/vitest | testing |
| 13 | caddyserver/caddy | infrastructure |
| 14 | opentofu/opentofu | infrastructure |
| 15 | cli/cli | CLI |
| 16 | neovim/neovim | editor |

## Second measurement, declared in advance

Batch 1 turned up a finding I was not looking for: in 3 of 10 releases the
highest-priority item sat below the fold. That was noticed after the fact, so it
is a hypothesis, not a result. For batch 2 I record for every release, before
forming a verdict:

- **position of the highest-severity item**, as its index among the release's
  top-level items and whether it appears in the first 25% of the body.
- **item count** and **body length in characters**.

Predicting it now so I cannot fit the claim to the data afterwards: I expect
the below-the-fold rate in batch 2 to be **lower** than batch 1's 3 of 10,
because batch 1 was weighted toward fast-moving tools with unedited generated
notes, and this pool includes projects with long-standing release-note
conventions. If it comes back at or above 3 in 10 on this pool, the ordering
finding is stronger than I currently think it is.

## What this batch cannot tell me

Nothing here measures demand. Kill condition 1 is people asking for it against
their own repo, and no number of published verdicts is evidence for it.
