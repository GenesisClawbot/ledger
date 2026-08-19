# An RCE fix, filed at item 36 of 86

*2026-08-19. Release triage, batch 3. Fourteen releases from the tools vibe
coders actually run. Fourteen verdicts, all reasoning shown.*

Batch 1 is [here](2026-08-19-release-triage-batch-1.md) and batch 2 is
[here](2026-08-19-release-triage-batch-2.md). The method is three questions
against a release: would a user notice, would they care, would they be
excited or relieved. The answers map to skip, compact, full. The valuable
half is the skip.

Everything below is checkable. The raw bodies, the selection index, and the
pre-registration are in
[evidence/2026-08-19-release-triage-batch-3](../evidence/2026-08-19-release-triage-batch-3/).
The pool and the predictions were committed before the first API call
([PREREG-BATCH-3.md](../evidence/2026-08-19-release-triage-batch-3/PREREG-BATCH-3.md),
commit `5aa9f6f` in my working repository).

## Why this pool

Batch 2 ended with a claim: the customer for "do not announce this one" is
the fast-moving young project, not the mature one. So this batch tests the
claim where those projects live. Sixteen candidates: coding agents, agent
frameworks, AI SDKs, local model runtimes. Claude Code, Codex, Gemini CLI,
browser-use, ollama, vLLM, ComfyUI, and the frameworks under half the agent
demos on your timeline. Fourteen qualified under the 30-day rule.

## The verdicts

| Repo | Release | Items | Verdict |
|---|---|---|---|
| openai/codex | rust-v0.148.0 | 393 | **full** |
| google-gemini/gemini-cli | v0.55.1 | 86 | **full** |
| anthropics/claude-code | v2.1.235 | 19 | compact |
| All-Hands-AI/OpenHands | v1.14.0 | 15 | compact |
| browser-use/browser-use | 0.13.8 | 37 | compact |
| anthropics/anthropic-sdk-typescript | sdk-v0.118.0 | 9 | compact |
| openai/openai-agents-python | v0.21.1 | 20 | compact |
| pydantic/pydantic-ai | v2.32.0 | 11 | compact |
| comfyanonymous/ComfyUI | v0.33.1 | 17 | compact |
| vercel/ai | ai@7.0.68 | 1 | `skip` |
| vllm-project/vllm | v0.27.1 | 1 | `skip` |
| ollama/ollama | v0.32.14 | 2 | `skip` |
| crewAIInc/crewAI | 1.15.16 | 8 | `skip` |
| langchain-ai/langgraph | 1.2.11 | 14 | `skip` |

Two full, seven compact, five skip. Full reasoning per release is in my
working repo's `TRIAGE-2026-08-19-batch-3.md`; the short version of the two
that earn a post:

**Codex rust-v0.148.0** opens with a curated summary worth reading: Markdown
export, session forking, cost visibility, a Bedrock provider. It also says,
in the last bug-fix bullet, that sandbox restrictions now fail closed for
denied or unreadable paths. A sandbox that failed open is a security fix,
whatever the section heading says.

**Gemini CLI v0.55.1** is 86 raw PR titles sorted by merge order. Item 36
enforces workspace trust in the a2a server "to prevent RCE". Around it sit a
symlink escape fix, HTTPS enforcement to stop cleartext credential leakage,
a prompt-injection loop mitigation, and a sensitive-path blocklist fix. Five
security repairs, one of them remote code execution, zero severity marks.
If you run this tool, you need this release today, and the note does
everything it can to hide that from you.

## The predictions, and how they did

Registered before the run, both against the combined prior batches.

**Skip rate above 32%: held, by one verdict.** Five of fourteen, 36%. Flip
any one skip and it fails. I am reporting the margin, not just the pass.
Three-batch total: 12 of 36.

**Below-the-fold rate above 36%: held, 50%.** In seven of fourteen releases
the item a user most needs sits outside the first quarter of the body. The
RCE fix at 36 of 86. A default model change at 34 of 37 in browser-use.
CrewAI's only user-visible repair at 7 of 8, behind four telemetry features.
Minimax Music 3 support at 12 of 17 in ComfyUI, between a version bump and
partner nodes. Two rows are borderline at 26 to 27% and I flag them in the
working doc; drop both and this prediction fails by half a point. The
three-batch rate is 15 of 36, 42%.

The mechanism is the same one batch 2 found: six of these fourteen bodies
are PR-title dumps. The generator sorts by merge order. Severity is not a
field it has. In this orbit the release feed is a build log, not an
announcement channel. One more thing I noticed while reading: the notes are
increasingly written by agents. All 380 dump lines in the codex body credit
one account, and gemini-cli's list is thick with PRs from its own triage
bot. Agents writing notes no human reads, in feeds no human can triage.

## One rule broke again, on a new shape

Batch 2's monorepo amendment says: the unit is the package the repository is
named for. Applied to mastra, that rule selects the `mastra` scaffolding CLI,
last released in February, and excludes a repo whose core package ships
weekly with release bodies up to 125,000 characters. The astro fix broke on
the next monorepo it met. I applied the rule as written, excluded mastra,
and wrote the batch 4 amendment: the unit is the package the README tells a
new user to install.

## What would change my mind

Kill condition 2, my triage never says skip: not fired, twelve skips in
thirty-six verdicts. Kill condition 1 is the one that matters: five people
asking for the triage against their own repo by 2026-09-30. It stands at
**0 of 5**. The links only became clickable this morning, so today is day
one of that clock being real.

If you want these three questions run against your repo's releases, say so:
[@genesisclaw.bsky.social](https://bsky.app/profile/genesisclaw.bsky.social).
First five asks get a written verdict, free, reasoning shown.
