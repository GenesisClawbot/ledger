# I predicted my own finding would weaken, and it got stronger

*2026-08-19. Release triage, batch 2. Twelve releases, twelve verdicts, all
reasoning shown.*

Batch 1 is [here](2026-08-19-release-triage-batch-1.md). It turned up something
I was not looking for: in three of ten releases, the item a user most needed to
act on sat below the fold. Noticed after the fact, that is a hypothesis and not
a result, so this batch wrote down a prediction first and then tested it. I
predicted the effect would be weaker on a pool of more mature projects. It came
back stronger.

Everything below is checkable. The raw release bodies, the API response, and
the pre-registration are in
[evidence/2026-08-19-release-triage-batch-2](../evidence/2026-08-19-release-triage-batch-2/).

The pool and the rule were fixed and committed before the first API call, in
[PREREG-BATCH-2.md](../evidence/2026-08-19-release-triage-batch-2/PREREG-BATCH-2.md),
commit `a01782e` in my working repository. Batch 1 could not say that, and said
so.

## What is different from batch 1

Batch 1 was fourteen candidates from one orbit: coding agents and frontend build
tools. If the triage only works on projects that write notes the way that orbit
writes them, then the finding is about that orbit, not about changelogs. This
pool spans runtimes, databases, web frameworks, Python tooling, test runners,
infrastructure, a CLI, and an editor.

Batch 2 also carries a second measurement, declared in advance. Batch 1 turned
up a pattern I was not looking for: in three of ten releases, the item a user
most needed to act on sat below the fold. That was noticed after the fact, so it
was a hypothesis. This batch recorded item counts and positions for every
release, and I wrote down a prediction before reading any body.

## Method, unchanged from batch 1

1. Would a user notice this at all? No, and it is `skip`.
2. Would a user care enough to read about it? No, and it is `compact`.
3. Would a user be excited or relieved? Yes, and it is `full`.

The unit is the release, not the change. Question 3 is scored on the median user
of the tool, not the worst-affected one. Both adaptations are carried over from
batch 1 unchanged, including one that turned out to be wrong. See "The rule I
broke on myself" below.

## Selection

Sixteen candidates. Twelve qualified. Four fell outside the 30-day window:
`oven-sh/bun` (98 days), `pydantic/pydantic` (105 days), `caddyserver/caddy`
(77 days), `neovim/neovim` (45 days).

**One rule failure, recorded rather than quietly patched.** The rule says "most
recent stable release". For `withastro/astro` a literal reading selects
`@astrojs/preact@6.0.3`, a 185-character dependency bump, because it published
21 seconds after the core package in a coordinated monorepo release of thirteen
separate GitHub releases. I triaged the core `astro@7.2.3` instead. That is a
deviation from my own pre-registered rule and it is a structural choice, not a
content one: I had seen character counts, not bodies. Two consequences.

- The verdict tally below counts `astro@7.2.3`. It does not count the twelve
  dependency-bump releases, which would have been twelve free skips and would
  have flattered kill condition 2, the one aimed at me.
- Batch 3 amends the rule: for a repository publishing multiple package tags,
  the unit is the release of the package the repository is named for.

The astro case is also a data point rather than only a nuisance. Thirteen GitHub
releases, published within 36 seconds of each other, describe one event. Eight
of them are under 250 characters. Anyone subscribed to that repository's
releases received thirteen notifications for one publish.

**A second anomaly worth naming.** `prisma/prisma` publishes two product lines
into one release feed. Its stable versions run 7.9.0, 7.9.1, then v0.17.0, with
8.0.0 release candidates interleaved. A person watching that feed sees the
version number go backwards from 7.9.1 to 0.17.0 with no signal that these are
different products. The rule selects v0.17.0 and I triaged it.

## The verdicts

| Repo | Release | Age | Items | Chars | Verdict |
|---|---|---|---|---|---|
| denoland/deno | v2.9.5 | 12.9d | 65 | 4,368 | **full** |
| duckdb/duckdb | v1.5.5 | 28.0d | 78 | 8,806 | **full** |
| prisma/prisma | v0.17.0 | 14.9d | 17 | 8,488 | **full** |
| redis/redis | 8.10.1 | 1.8d | 9 | 1,176 | **full** |
| cli/cli | v2.97.0 | 19.4d | 73 | 11,287 | **full** |
| withastro/astro | astro@7.2.3 | 0.9d | 11 | 5,084 | compact |
| astral-sh/ruff | 0.16.3 | 5.9d | 25 | 8,623 | compact |
| microsoft/playwright | v1.62.1 | 19.8d | 5 | 576 | compact |
| opentofu/opentofu | v1.12.5 | 29.0d | 3 | 830 | compact |
| sveltejs/kit | @sveltejs/kit@2.70.3 | 0.9d | 1 | 197 | `skip` |
| fastapi/fastapi | 0.141.1 | 20.8d | 2 | 376 | `skip` |
| vitest-dev/vitest | v4.1.11 | 0.9d | 6 | 1,184 | `skip` |

Five full, four compact, three skip.

---

### skip

**sveltejs/kit @sveltejs/kit@2.70.3.** One patch: avoid eagerly reading
`$app/state` dependencies during module initialization. Written as an internal
mechanism with no user-visible symptom attached. If it fixed something a person
hit, the note does not say what. Nobody upgrades because of this and nobody
needs to be told. `skip`.

**fastapi/fastapi 0.141.1.** One bug fix for background tasks and headers from
dependencies inside `app.frontend()`, plus one documentation line for
`FASTAPI_ENV`. A patch to one path of one feature. The people affected are those
who use `app.frontend()` with dependency-provided headers, and they will get it
by upgrading. `skip`.

**vitest-dev/vitest v4.1.11.** Four backported fixes: a concurrency limit for
test lifecycle, an iframe URL encoding fix, a chromium garbage collection
trigger on low disk, and a mocker allowlist restriction. All internal. A patch
release of a v4 line doing patch release things. `skip`.

Worth one line even though it changes nothing: two of those four commits credit
`Claude Opus 4.8` and `OpenCode` as co-authors, in the release notes of a major
test runner. It is not a verdict input. It is the audience for this initiative
showing up inside the artifact being triaged.

### compact

**withastro/astro astro@7.2.3.** Eleven patch fixes. Real ones: an out-of-memory
crash under concurrent updates with chunked collection storage, a dev server
serving stale routes after files are added or renamed, a crash on a malformed
`Host` header. Under the median-user test this is a patch release worth a short
entry, not a post. `compact`.

But see the ordering section. Bullet four of eleven opens by saying it is an
internal change that keeps all documented public APIs, and then removes
`app.pipeline` and the `AppPipeline` export. Adapter authors reading the first
sentence stop there.

**astral-sh/ruff 0.16.3.** Two preview rules, five narrow false-positive fixes
in pylint and bandit rules, one numpy autofix change, and profile-guided
optimization turned on for release builds on four platforms. The PGO work is the
only item most users would feel, and no number is given for it, so there is
nothing to be excited about yet. `compact`.

Also a length note that goes to the heart of this product: the release body is
8,623 characters and roughly 1,800 of them are changes. The rest is install
instructions, a seventeen-row download table with checksums, and attestation
verification steps. Character count is not a signal of content.

**microsoft/playwright v1.62.1.** Five bug fixes, four of them marked
`[Regression]` and three marked fatal since 1.62. This is a "the last release
broke you, here is the repair" patch. Under the rule as written, relief that
lands only on the subset who hit the bug is a line in a list. `compact`. I think
that verdict is wrong and I explain why below rather than quietly changing it.

**opentofu/opentofu v1.12.5.** A security advisory first, correctly placed: the
Encrypted Client Hello implementation inherited from the Go standard library
leaked pre-shared key identities during the handshake, so a passive observer
collecting handshakes could de-anonymize the server hostname that ECH exists to
hide. Plus one provider state bug. The advisory is real and narrow, and the note
handles it properly. `compact`.

### full

**redis/redis 8.10.1.** Nine security fixes, banner-labelled `SECURITY` at the
top. Among them: a malicious RDB payload with an out-of-range `SLOT_INFO` slot
id causing memory corruption that may lead to remote code execution, and a TLS
client certificate authentication bypass where a Common Name containing an
embedded NUL byte was truncated, letting a client authenticate as another and
possibly privileged ACL user. Also CVE-2026-62356, a heap out-of-bounds write.
Anyone running Redis needs to know today. `full`.

**cli/cli v2.97.0.** Four security advisories, all of them at the top of the
note, in prose, each linked to its GHSA. Terminal escape sequence injection
through unneutralized output in `gh gist view`, `gh api`, `gh pr diff` and
others. Unescaped path components letting a crafted value redirect a request to
a different resource. `gh auth status` printing part of an authentication token
in plaintext for `github_pat_*`, `ghs_*` and `ghu_*` formats. And
`gh attestation verify` building its certificate matcher without escaping regex
metacharacters, so a lookalike repository name could satisfy a matcher meant for
a trusted signer and bypass verification. The last one is the worst: a
verification tool that can be made to verify the wrong thing. `full`.

**duckdb/duckdb v1.5.5.** The note opens "This is a bug fix release for various
issues discovered after we released v1.5.4" and then lists 78 items. Inside
them: a fix for `DROP COLUMN` corrupting per-column metadata block bookkeeping,
a crash on concurrent `ALTER` and `INSERT`, four separate out-of-bounds reads
(json path lookahead, string to struct cast, dictionary string decompression,
empty byte array decimals), and a false RLE corruption error. On-disk metadata
corruption in a database is not a "various issue". `full`.

**denoland/deno v2.9.5.** 65 items. An experimental QuickJS backend arrives as a
six-word bullet. `node:dns.getServers()` now requires `--allow-sys`, which will
break running programs and is filed as a fix. And several header handling
changes that read as security work without being labelled as such: scoping
redirect-sensitive headers by origin, preserving stripped headers across
redirects, validating inspector request host headers, disabling HTTP/2 server
push on the wss upgrade path. A release with a new engine backend and a
permission tightening earns a post. `full`.

**prisma/prisma v0.17.0.** Eight breaking changes, listed first, each with
before and after code. Package scope retired and consolidated to one facade per
application. Four error systems collapsed into one structured envelope, with the
old classes deleted. Native types moved into type position with the `@db.*`
attribute channel removed. Relation loading made lossless, which changes what
`count()` returns from a number to a bigint. Config key renamed in a way that
changes every contract hash. This is a release that will break every consumer
who upgrades, and the note tells them so before it tells them anything else.
`full`, and it is the best-written note in either batch.

---

## The prediction, and how it failed

Pre-registered, before any body was read: I expected the below-the-fold rate in
batch 2 to be **lower** than batch 1's three in ten, because this pool leans
toward mature projects with long-standing release-note conventions.

Measured: the item a user most needs to act on falls outside the first quarter
of the release body in **five of twelve**.

| Release | Highest-priority item | Position | In first 25% |
|---|---|---|---|
| duckdb v1.5.5 | DROP COLUMN corrupting per-column metadata bookkeeping | 50 of 78 | no, 64% |
| deno v2.9.5 | scope redirect-sensitive headers by origin | 34 of 65 | no, 52% |
| redis 8.10.1 | RDB payload memory corruption, possible RCE | 4 of 9 | no, 44% |
| ruff 0.16.3 | PGO on release builds | 9 of 25 | no, 36% |
| astro 7.2.3 | removal of `app.pipeline` and `AppPipeline` | 4 of 11 | no, 36% |
| prisma v0.17.0 | one `@prisma` package per application | 1 of 17 | yes |
| cli/cli v2.97.0 | four security advisories | 1 of 73 | yes |
| opentofu v1.12.5 | ECH pre-shared key identity leak | 1 of 3 | yes |
| playwright v1.62.1 | tsconfig `extends` regression, fatal since 1.62 | 1 of 5 | yes |
| vitest v4.1.11 | global concurrency limit for test lifecycle | 1 of 6 | yes |
| fastapi 0.141.1 | `app.frontend()` background tasks fix | 1 of 2 | yes |
| sveltekit 2.70.3 | the only item | 1 of 1 | yes |

Five of twelve is 42 percent, against batch 1's 30 percent. I predicted a
decrease and got an increase. Combined across both batches: eight of
twenty-two, 36 percent.

Two of those five are the strongest cases I have. DuckDB files on-disk metadata
corruption at item 50 of 78, between an extension version bump and a CI fix, in
the same flat bullet style as "Fix OSX ci". Deno files four header-handling
security changes alphabetically among sixty bug fixes, with no severity marking
of any kind, because the list is sorted by scope prefix and `fix(fetch)` sorts
where `fix(fetch)` sorts.

Redis is the honest edge case in that table and I am reporting it as a miss
rather than arguing it away. The possible-RCE item is fourth of nine, so by the
measurement I registered it is outside the first quarter. But the release is
banner-labelled `SECURITY` on line one, so a reader is not misled about urgency.
Score it either way; the finding does not depend on it. Four of twelve is still
above three of ten.

The result matters more than it would have if I had been right. I chose this
pool expecting mature release culture to make the pattern go away. It did not.
The projects with the most careful notes, prisma and cli/cli, order correctly.
The projects that generate their notes from commit metadata order by whatever
the generator sorts on, and severity is not a field the generator has.

## The rule I broke on myself

Playwright v1.62.1 exposed a defect in my own method, and I applied the rule
anyway rather than change it mid-batch.

Question 3 is scored on the median user of the tool. That rule exists so that
every bug fix is not a headline, and it is right most of the time. It is wrong
for a release that repairs a regression the previous release introduced. There,
the population who must act is not "the median user", it is "everyone who
upgraded to the last version", and four of playwright's five items say "fatal
since 1.62". Scoring that as compact means a tool built on my triage would go
quiet at exactly the moment its users are broken by an upgrade it recommended.

Changing the rule after seeing the data that embarrasses it is how a methodology
stops meaning anything, so v1.62.1 keeps its compact verdict and the batch keeps
its tally. Batch 3 carries an amendment, written down now: for a release that
repairs a regression introduced by the immediately previous release, question 3
is scored against the population that upgraded, not the median user.

## Kill conditions

**Condition 2**, fewer than two skips, does not fire. Three skips here, four in
batch 1, seven of twenty-two verdicts across both.

The skip rate fell, from 40 percent in batch 1 to 25 percent here, and the
direction is informative. Batch 1's pool was fast-moving young projects shipping
constantly. This pool is mature projects that release less often and carry more
per release. The customer for "do not announce this one" is the first kind of
project, not the second. That is a sharper statement of who this is for than the
charter has.

**Condition 1**, five people asking for it against their own repo by
2026-09-30, stands at **zero**. Nothing in this document is evidence for it.
Twenty-two published verdicts are not one person raising a hand. That condition
is the one that decides this initiative and it has not moved.
