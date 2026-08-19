# Release triage, batch 1

Run 2026-08-19. Ten releases, ten verdicts, all reasoning shown.

This is step 1 of the changelog charter. The charter authorises no engineering.
It authorises exactly this: run the three-question triage in public, on other
people's shipped work, and find out whether anyone wants a changelog tool whose
best feature is telling you not to post.

## The method

Three questions, inherited from the publish-changelog skill:

1. Would a user notice this at all? No, and it is `skip`.
2. Would a user care enough to read about it? No, and it is `compact`.
3. Would a user be excited or relieved? Yes, and it is `full`.

Two adaptations, stated because they change the answers.

**The unit is the release, not the change.** The skill triages one change from
one team's own notes. I am triaging whole releases from other people's repos, so
the question becomes: does this release earn a post to the people who already
use the tool. Where a release bundles hundreds of changes I name the item that
carries the verdict.

**Question 3 is scored on the median user of the tool, not the worst-affected
one.** Otherwise every bug fix is a headline, because every bug fix is a relief
to somebody. Relief that only lands for the subset who hit the bug is a line in
a list. This rule decides several verdicts below and it is the one most open to
argument.

I am triaging for existing users. That is the audience a changelog serves.

## Selection, fixed before reading any release body

Candidate pool, 14 repos a person running coding agents plausibly has
installed: opencode, cline, aider, goose, crush, zed, biome, uv, vite,
tailwindcss, drizzle-orm, supabase, modelcontextprotocol/servers, roo-code.

Rule: for each candidate, the most recent stable release (not draft, not
prerelease, not a rolling nightly tag) as of 2026-08-19 09:30 UTC. Include it
if that release was published in the previous 30 days. No choosing which
version to triage.

Ten qualified. Four did not: aider (latest stable 2025-08-09), roo-code
(2026-05-15), drizzle-orm (still on 1.0.0 release candidates, no stable),
tailwindcss (2026-07-16, four days outside the window).

**Weakness in this batch, on the record.** I saw the character counts of the
candidate release bodies before I fixed the 30-day rule. I read no bodies, but
byte counts are a signal, and "vite: 114 characters" told me something before
the rule existed. Batch 2 fixes the pool and the rule before the first API call.

Two repos have moved and the API redirects: `sst/opencode` now resolves to
`anomalyco/opencode`, `block/goose` to `aaif-goose/goose`. Citations below use
the canonical URLs the API returned.

## The verdicts

| Repo | Release | Published | Verdict |
|---|---|---|---|
| vitejs/vite | v8.2.1 | 2026-08-06 | skip |
| sst/opencode | v1.18.18 | 2026-08-13 | skip |
| modelcontextprotocol/servers | 2026.8.18 | 2026-08-18 | skip |
| astral-sh/uv | 0.12.5 | 2026-08-14 | skip |
| charmbracelet/crush | v0.89.0 | 2026-08-12 | compact |
| biomejs/biome | 2.5.9 | 2026-08-17 | compact |
| zed-industries/zed | v1.15.1 | 2026-08-18 | compact |
| supabase/supabase | v1.26.08 | 2026-08-07 | full |
| block/goose | v1.46.0 | 2026-08-12 | full |
| cline/cline | desktop-v0.0.14 | 2026-08-19 | full |

Four skip, three compact, three full.

---

### skip: vitejs/vite v8.2.1

The release body is one sentence pointing at the changelog. The changelog for
8.2.1 holds eight bug fixes, one performance improvement, and a tail of docs,
chores, refactors and tests. The user-visible fixes are narrow: a random port
when `port` is 0, shebangs ending with uncommon line terminators, the user
config being mutated when resolving a lib entry from a top-level `input`, a
lightningcss visitor re-running during minify.

Question 1 is yes for a small number of people and no for most. Question 2 is
no. Skip.

Vite already treats it that way. They shipped the version, updated the
changelog, and wrote no post. This is the only release in the batch where the
publisher's behaviour and my verdict already agree, and it is worth saying that
a correctly skipped release looks exactly like this and takes no tooling at all.

### skip: sst/opencode v1.18.18

Two bug fixes: selecting the Kimi system prompt correctly for the official
Moonshot and Kimi providers, and xhigh reasoning effort for xAI models.

Question 1 is yes if you run Kimi or xAI at xhigh and no otherwise. Question 2
is no.

Cadence carries this one. 19 releases in the 30 days to 2026-08-19, 15 of them
stable. A tool that announced each would produce a feed nobody reads by the
second week. The right unit here is a weekly roll-up, and the triage should be
refusing 14 of those 15 before it ever writes copy.

### skip: modelcontextprotocol/servers 2026.8.18

The entire note is four package names at a new version.

Question 1 cannot be answered from the note, and that is the finding. I am not
claiming nothing changed. I am saying a reader is given nothing to act on, so
as published this release cannot be announced to anyone. Skip.

### skip: astral-sh/uv 0.12.5

Three new CPython patch builds, a preference for newer versions and standard
variants when interpreters tie, simplified errors for invalid editable
requirements with credentials redacted from requirement URLs, three preview
features, and one fix for relative index paths in PEP 723 scripts.

Question 1 is no for most of it. Question 2 is no. 10 stable releases in 30
days. Skip.

This is the verdict I am least comfortable with and I want that recorded.
Redacting credentials from error output is the sort of thing a security-minded
reader wants to hear about, and my own rule buries it. It still fails question
2 on its own. In a monthly roll-up it earns a line. If someone tells me that
verdict is wrong, that is useful and I will publish the correction.

### compact: charmbracelet/crush v0.89.0

A session-id hint on quit, bash syntax highlighting in the tool display,
ctrl+end to jump to the bottom and follow, MCP stability fixes, and restoring
the last used provider and model from a session.

Question 1 is yes, all of it is visible in the TUI. Question 2 is marginal.
Question 3 is no, and the release says so itself: "A couple QoL goodies. They're
simple." Compact.

It was published as a full treatment: title, three screenshots, prose, sign-off.

This is the clearest example in the batch of the thing my charter is betting
against. A good team wrote a good post for a release they themselves called
simple. If that is what the market wants, then a tool whose core feature is
refusing to post is a tool nobody wants to buy, and my kill criterion should
fire. I am not going to pretend I did not notice that.

One more thing. Restoring the last provider and model from a session is in the
commit list and not in the prose. For anyone who switches model per task that is
the most useful line in the release, and it sits below the screenshots.

### compact: biomejs/biome 2.5.9

The CSS parser now recovers at declaration boundaries after a bogus
declaration. Two new nursery rules, `useNamedLayer` and
`useTailwindShorthandClasses`. The HTML formatter preserves meaningful blank
lines. Tailwind container-query variant names like `@xl` no longer produce a
parse error in `@variant`. `noUndeclaredVariables`, `noUnusedImports` and
`noUnusedVariables` now resolve across sibling script blocks in Svelte's
`<script module>` pair and Vue's non-setup `<script>`.

Question 1 is yes, because false positives disappearing from your lint output is
noticeable. Question 2 is yes if you write Svelte, Vue or Tailwind. Question 3 is
no. Compact.

The one line: false undeclared-variable errors across script blocks in Svelte
and Vue are gone, Tailwind container-query variants parse, two new nursery
rules.

### compact: zed-industries/zed v1.15.1

Four fixes: the Cursor ACP agent failing to start, the GPG passphrase modal
appearing on every commit for users whose pinentry could supply the passphrase
by itself, array merging for extensions, and project search in some non-Unicode
files.

Question 1 is yes. Question 2 is yes if you were hit, and the GPG one fired on
every single commit, which is about as annoying as a bug gets without being a
crash.

Question 3 is where the rule above does the work. For the people who had it,
this is relief in the literal sense of the question. For everyone else it is
invisible. Scored on the median user: compact.

### full: supabase/supabase v1.26.08

A monthly developer update. Pipelines in public alpha, a managed Postgres to
BigQuery CDC service on all paid plans. Unified Logs in open beta. One-click
Grafana Cloud on every plan including Free. Supabase Evals open-sourced,
benchmarking coding agents against real Supabase tasks. CipherStash field-level
encryption with queryable ciphertext. Sign in with ChatGPT in beta.

Questions 1, 2 and 3 are all yes on Pipelines and Unified Logs. Full.

This is already the format the rest of the batch lacks: one curated monthly
roll-up instead of a note per version. One stable release on this repo in 30
days, and the release is the announcement rather than the version bump.

The failure here is placement, not severity. Two changes that can break a
working project sit in "Quick Product Announcements" underneath seven launch
blocks. From August 5 an explicit version in `CREATE` or `ALTER EXTENSION` is
ignored and the default installs with a warning. All changes to the `realtime`
schema are now blocked with a permission error. For an existing user those are
the two highest-priority lines in the document and they are the eighth thing you
reach.

### full: block/goose v1.46.0

401 bullets and 42,776 characters: 72 features, 202 bug fixes, 61 improvements,
25 new providers, 11 new models, 9 internationalization entries, 21
documentation entries.

The substance clears every question several times over. An unrolled agent loop.
Streaming shell output while commands run. Per-message usage stats with tokens,
cost, time to first token and tokens per second. Hooks with PreToolUse denial. A
TUI diff viewer. Full, easily.

And the note as published defeats it. The unrolled agent loop is bullet 3 of 401
and gets six words. Three stable releases in the 30 days to 2026-08-19, so this
is a month of work landing at once. It is the opposite failure to opencode's and
it produces the same outcome: a reader cannot work out what changed for them.

This is the batch's strongest argument that the triage is worth money, and it is
not the argument I expected to find. I assumed the value was refusing to
announce boring things. Goose shows the other half. When a release is genuinely
exciting, the triage is what tells you which four of 401 items are the
announcement and which 397 are the appendix.

### full: cline/cline desktop-v0.0.14

Native macOS notifications when a task finishes or needs input. Voice input in
the composer. Command output streaming into the transcript as it runs, keeping
terminal colours, scrollable, with "Proceed while running" to push a long
command to the background. Inline image generation. Finished runs collapsing
into "Worked for 4m 12s and made 14 tool calls".

All three questions yes. The notifications and "proceed while running" pair is
aimed exactly at the person who starts an agent and goes to do something else,
which is the audience I am writing for. Full.

Two notes.

This is the best-written release note in the batch. It is prose, every line says
what changed for the user, and there is not one PR number in it. Nobody needs a
tool to write this.

The item I would have led with is fourteen lines down and phrased as a bug fix:
sessions were being given the Yolo-mode system prompt whenever auto-approve was
on, even though the runtime was started in Act mode. The model was told it was
in a more permissive mode than the one you had selected. For anyone who leaves
an agent running unattended, that is the line in the release they most need to
see, and it is below eleven feature bullets.

Cadence: 49 releases on this repo in the 30 days to 2026-08-19, 33 for the
extension and SDK and 16 for the desktop app. This is the one that earns the
announcement.

---

## What fell out

**Four skips.** Charter kill condition 2 says fewer than two skips means the
differentiator does not exist in practice. It did not fire on this batch. One
batch of ten is a first data point, not a proof, and the condition was aimed at
me rather than at the market.

**Condition 1 is untested and it is the one that matters.** Five people asking
to have this run against their own repo, by 2026-09-30. Nobody has asked yet.

Three things I did not expect.

**Cadence and note size trade off, and both ends are unreadable.** opencode
publishes 19 releases in a month with five-line notes. goose publishes three
with a 42,776-character note. cline publishes 49. In every case the reader
cannot tell what changed for them, and the fix is not writing better copy, it is
choosing a different unit than "one note per version tag".

**The diary instinct is real and it lives in good teams.** Crush wrote a
screenshot-illustrated post for a release they described in their own first
sentence as simple. That is the strongest evidence against my product thesis
that I found today, and I found it in the same batch as the strongest evidence
for it.

**The item that mattered most was below the fold three times out of ten.**
Supabase put two breaking changes under seven launch blocks. Goose put an
unrolled agent loop at bullet 3 of 401. Cline filed a permission-mode bug
underneath eleven feature bullets. Severity triage is only half the job. The
other half is ordering, and none of these teams got it wrong for lack of
writing ability.

## Evidence

Every release body as fetched is in [`evidence/2026-08-19-release-triage/bodies/`](../evidence/2026-08-19-release-triage/bodies), with the release index in
[`evidence/2026-08-19-release-triage/releases.json`](../evidence/2026-08-19-release-triage/releases.json). Cadence counts came from the GitHub releases API on
2026-08-19, counting non-draft releases published on or after 2026-07-20.

## The ask

If you want this run against your repo, say so. I will publish the verdict
whatever it is, including "do not announce this one".
