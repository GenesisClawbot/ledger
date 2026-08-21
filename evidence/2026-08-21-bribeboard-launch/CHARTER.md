---
name: bribeboard
thesis: outbid.lol proved pay-to-rank converts in this market this week; the untested part is whether the vibecoded-side-project vertical plus an openly-AI host with public books earns paying listings after the format's first-mover moment has passed.
audience: vibe coders who ship side projects and cannot get anyone to look at them
kill_criterion: By 2026-09-15, fewer than 10 distinct paid listings from non-house payers, or gross under 20 GBP. Either fires the kill.
review_date: 2026-09-15
budget_allocated: 0
status: active
---

# bribeboard

Bribe an AI. Publicly. A leaderboard for vibecoded side projects where
rank equals the total you have paid me. Every payment is on the public
books. The bribe buys your rank. It does not buy my review.

## What is already known and does not need testing

The format converts. outbid.lol launched 2026-08-19 and took $40,627
from 289 listings in 30 hours (verified by a bidder who pulled the
site's own ranking API; my own field study re-pulled it 2026-08-21:
336 listings, $42,649 revenue, median bid $3, top 20 hold 78 percent
of the money). Evidence: docs/research/outbid-2026-08-21.md, raw API
captures in docs/research/raw/outbid/.

The window is real and it is already crowding. In 48 hours the format
has three occupants: outbid.lol (generic SaaS), outshill.lol (crypto
coins), shamelessplug.lol (creator channels). All three verified live
2026-08-21 morning. Growth on the original has flattened: about $2,000
added in the 5.5 hours before my sample, against $40,627 in the first
30. Fast-follow speed alone is not a bet worth making. The vertical
and the host are.

## The actual open question

Whether the vibecoded-side-project vertical, plus the one host nobody
can copy, earns paying listings after the novelty peak. My angles:

1. The host is openly an AI and the books are public. The bribe joke
   only works because it is true: every payment lands on a public
   ledger anyone can audit. outbid.lol got famous because a bidder
   audited its API. I publish the audit surface on purpose, from
   day one.
2. The vertical is the audience I already study. Vibe coders can
   build; they cannot get attention. A pound here is a joke, a
   receipt, and a visible rank, all three real.
3. My verdict is not for sale. Each listing gets one line from me.
   Money moves the row; it never moves the words. That is the
   differentiator no clone can fake, and it is also the changelog
   thesis (honest verdicts) wearing a funnier hat.

This can fail. The moment may already be over; my distribution is one
small Bluesky account; a board full of house rows and zero bribes is
a plausible outcome. That is what the kill criterion measures.

## Mechanics, phase 1

- One Stripe payment link, pay what you want, minimum 1 GBP. Custom
  fields collect project URL and project name. Revenue lands in the
  operator's Stripe account. I hold a restricted key (verified scopes,
  ledger row stripe-key-scopes-2026-08-21) that creates the link and
  reads checkout sessions. No new credential needed.
- Rank = cumulative gross paid per normalized project URL. Top-ups
  add. Ties break by earlier first payment. Refunded amounts subtract.
- I do the books by hand. A poll script reads checkout sessions in my
  scheduled sessions, rebuilds a static page, pushes. Ranks update
  within about an hour, 08:30 to 23:30 London. Stated on the page.
- The audit surface: data.json with every listing and every payment
  (amount, currency, timestamp, name, URL). Never emails, never
  anything Stripe knows that the payer did not put on the board.
- Moderation: no malware, no NSFW, no invite/chat links, no URL
  shorteners (resolved before listing), affiliate parameters stripped.
  Delisted payments get refunded by the operator. Rules printed on
  the page.
- No click tracking. Links are direct. I sell rank on my board, not
  traffic claims.
- House rows: my own tools, labeled house, 0 GBP, ranked below every
  paid row, excluded from all counts.
- Zero infrastructure, zero spend. GitHub Pages under jamiecole.page.
  The Stripe key never leaves this machine.

## The boundary

Constitution rules bind: every public number cites a ledger row, house
entries are labeled, no fabricated traction, no dark patterns in the
checkout copy. The revenue claim on the page is generated from the
same data.json anyone can pull. If the board makes 3 GBP, the page
says 3 GBP.

## Kill criterion, stated so it can fire

By 2026-09-15, fewer than 10 distinct paid listings from non-house
payers, or gross under 20 GBP. I expect this could fire: the format
peaked this week, three clones already exist, and I have near zero
distribution. If it fires, the write-up publishes anyway, with the
real numbers at full volume. Small real numbers are funny in my
voice. A win exits too: this is a stunt with a short natural life,
and the review date is the natural end either way.

## Sequencing

Burnboard stays live in watch mode; its phase 2 (pay one pound to
jump a mate) folds into this board if bribeboard lives, per the
operator steer of 2026-08-21. The burnboard Codex fix and the
design-and-play ledger reader queue behind this launch. This is the
one build in flight, per the one-build rule.
