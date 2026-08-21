# Field study: outbid.lol

Sampled 2026-08-21 between 08:21:02Z and 08:25:00Z (UTC). All raw captures
in `raw/outbid/` beside this file (copied unedited from the private repo's
`docs/research/raw/outbid/` at publish time). Every number below cites the raw file it
came from. Site is Next.js (Turbopack) on Vercel; payments via Polar, not
Stripe (see Q3).

Raw files referenced:

- `raw/outbid/index.html`, `index.headers.txt`, `index.visible-text.txt`
- `raw/outbid/rules.html`, `rules.visible-text.txt`
- `raw/outbid/about.html`, `about.visible-text.txt`
- `raw/outbid/api-ranking-page1.json` … `api-ranking-page7.json`
- `raw/outbid/api-revenue.json`, `api-visitors.json`
- `raw/outbid/api-endpoints-js-excerpt.txt`, `raw/outbid/js/` (13 chunks)
- `raw/outbid/styles.css`
- `raw/outbid/probe-api-*.json` (404 probes of guessed endpoints)

## 1. The page

Source: `index.html`, `index.visible-text.txt`.

- Meta description and hero: "No ads, no API keys, no revenue sharing.
  Just outbid your competition to get to the top. Will you take #1 when
  this site goes viral?"
- The rule, stated on page: "Your amount decides the rank. Paying less
  than the #1 price still puts you on the board at whatever place that
  bid can take."
- Header counters at fetch time: "1,990 online · 1,062,420 visitors since
  launch · see stats→". The stats link goes to a public Vemetric dashboard
  (`app.vemetric.com/public/outbid.lol?t=24hrs`); a banner links a public
  datafa.st share ("Had to switch my analytics provider 🥴").
- Bid form above the fold: "Claim #1 for [− $10001 +] Outbid", plus
  "Already on the list? Enter the same URL or @handle and up your bid to
  get back to the top." A "Refresh" button reloads the board.
- Listing row renders: rank (#1…), favicon/initial, domain or handle,
  one-line description, age ("10 hours ago"), click count ("8591 clicks"),
  bid amount ("$10,000"), and a per-row CTA "claim this rank for $10,001"
  (current bid + $1).
- Pagination: 50 rows per page, "1 - 50 of 336", pages 1..7.
- Footer: "This simple side project made $0 since its launch 35 hours
  ago" — the $0 is a client-side count-up hydrated from `/api/revenue`
  (see Q2); plus "Built by @jonathan_wilke · Brought to you by
  supastarter.dev · Rules · Live stats".
- Nav: Leaderboard / About / Rules.

## 2. The public API

Guessed endpoints all 404 (`probe-api-*.json`). Real endpoints found in
the JS chunks (`api-endpoints-js-excerpt.txt`, full chunks in `js/`):

- `GET /api/ranking?page=N` — the public ranking API (fetched with
  `cache: no-store`). Pages 1-7 saved as `api-ranking-page{1..7}.json`.
- `GET /api/revenue` — `{"revenueCents":4264900}` (`api-revenue.json`).
  Client hook is named `usePolarProductRevenue`, polled every 15 s.
- `GET /api/visitors` — `{"liveVisitorCount":2007,"visitorsLast12Hours":
  35004,"visitorsSinceLaunch":1062466}` (`api-visitors.json`).
- `POST /api/clicks` body `{rankingEntryId}` — click counter (Q5).
- `POST /api/checkout` body `{identityType, sourceUrl, amountCents,
  takeover}` — returns `{url}` (Q3). Not called; prohibition on payment
  flows.

Numbers at sampling time, computed from the 7 saved ranking pages:

- Listing count: 336 (API `totalCount` field; 336 entries fetched).
- Top bid: $10,000.00 (trycomp.ai). Lowest listed: $1.00 (below the
  current $2 minimum, so presumably an early bid).
- Median bid: $3.00. 200 of 336 listings are ≤ $5. p90 = $300.
- Sum of listed bids: $42,645.00. `/api/revenue` reports $42,649.00; the
  $4 gap is unexplained (possibly a removed listing or rounding of a
  top-up; not discoverable).
- Top-20 bids hold 78.2% of the listed total (brief said 80% at the
  30-hour mark; consistent).
- Board-wide clicks: 49,174 (sum of `clickCount`).
- Earliest `createdAt`: 2026-08-19T20:54:30Z; latest:
  2026-08-21T08:16:21Z. So ~35.5 hours of data at sampling.

Shape of one listing object, exact field names (from
`api-ranking-page1.json`):

```json
{
  "id": "99683111-5574-41f2-895b-91eb5d471f65",
  "identityType": "website",
  "identityKey": "website:trycomp.ai",
  "sourceUrl": "https://trycomp.ai/",
  "displayName": "Comp AI: AI Compliance Software",
  "imageUrl": null,
  "description": "Automate SOC 2, ISO 27001, ...",
  "amountCents": 1000000,
  "polarOrderId": "f23a7a23-f192-4068-80b4-8ff444b0789e",
  "polarCheckoutId": "e607a901-df01-4d0b-9ec4-0f109cde2006",
  "takeoverStartedAt": "2026-08-20T21:23:49.429Z",
  "createdAt": "2026-08-20T21:23:49.464Z",
  "clickCount": 8606
}
```

`identityType` takes two values in the data: `website` and `x` (X
handles; those carry a pbs.twimg.com avatar in `imageUrl`; 33 of 336
entries have an `imageUrl`). The API also returns top-level
`pageNumber`, `totalCount`, `takeoverStartedAt`, `error`. Note the API
exposes each listing's Polar order and checkout IDs publicly.

## 3. Checkout mechanics (without paying)

Source: JS excerpts in `api-endpoints-js-excerpt.txt`; constants from
`js/` chunks. I did not start a checkout.

- The on-page form collects exactly two things: an identity ("Paste an
  @handle or a product URL") and a whole-dollar amount. No name, logo,
  email, or description field — display name, favicon/avatar, and
  description are evidently derived server-side from the URL or X
  profile.
- Payment provider is Polar (polar.sh), not Stripe. Zero Stripe strings
  in any chunk; the revenue hook is `usePolarProductRevenue`; listings
  carry `polarOrderId`/`polarCheckoutId`. Flow: `POST /api/checkout` →
  `{url}` → redirect to hosted Polar checkout. (Polar is a merchant of
  record; whatever it collects at payment, e.g. email, is not
  discoverable without paying.)
- Pricing is pay-what-you-want above a floor, client-side constants:
  `MINIMUM_BID_CENTS = 200` ($2), `BID_INCREMENT_CENTS = 100` (whole
  dollars only; error copy: "Bids must be whole dollars.").
- Top-up: yes. Re-enter the same URL/@handle; new total must be at least
  $1 above the current top bid and "you only pay the difference"
  (rules page). Client computes `minimumRaiseToTopCents = max(top+100,
  ...)`.
- A "Leaderboard takeover" feature exists in the code: "Own the first
  page for 3 hours" at `takeoverAmountCents = 2x top bid`
  (`TAKEOVER_MULTIPLIER = 2`, `TAKEOVER_DURATION_HOURS = 3`), but it is
  switched off in the current bundle (`TAKEOVER_ENABLED = false`,
  `TAKEOVER_BANNER_ENABLED = false`). One listing (trycomp.ai, the
  $10,000 #1) has `takeoverStartedAt: 2026-08-20T21:23:49Z`, i.e. the
  feature ran at least once before being disabled.

## 4. Outranked listings and the stated rules

Source: `rules.visible-text.txt` (page `/rules`). Outranked listings
stay on the board at whatever rank their money buys; no decay or expiry
is stated anywhere. Rules page, verbatim (headings kept, list flattened):

> Outbid is a public leaderboard. There are no ads, no API keys, and no
> revenue share. You pay to stand above everyone else. Rank is the bid —
> nothing else.
>
> **How ranking works.** Bids are whole US dollars, $2 minimum, $1 at a
> time. Paying less than #1 still puts you on the board at whatever rank
> that bid can take. Equal bids stay in the order they were placed — the
> older bid keeps the higher rank. Enter the same website or @handle
> again to raise that listing back to #1. The new bid must be at least
> $1 above the current top bid; you only pay the difference. Someone
> else cannot take your rank by paying that difference. App Store, Play
> Store, GitHub, and similar platform links are keyed by their path, so
> different apps don't share a bid. Tracking query strings are ignored.
>
> **What you can list.** A product website, or an X @handle. Chat and
> invite links are not allowed — Telegram, WhatsApp, Discord, Messenger,
> Signal, and similar. The board is for products and profiles, not group
> chats. Links to sexual content are not allowed. If it is porn, NSFW,
> or an adult platform, it does not belong on the board. Query
> parameters are stripped from listing links. Affiliate, referral, and
> tracking URLs will not work. Link shorteners are not allowed. If you
> submit one, it is replaced by the URL it redirects to.
>
> **After you pay.** Your listing is public. Clicks go to the URL or
> profile you submitted, without query parameters. A completed payment
> is what claims the rank.

The /about page (`about.visible-text.txt`) adds: launched "August 19th,
2026, at 11:08 PM"; "$10,000 highest bid (so far) · trycomp.ai";
"Enough traffic to break the analytics provider"; "Someone offered
$100k to buy it. At least 10 copycats emerged in the first day."

## 5. Clicks

- Yes, per-listing click counts are shown on every row and returned as
  `clickCount` in the ranking API. Board-wide sum at sampling: 49,174
  (`api-ranking-page*.json`).
- No tracking redirect. Outbound hrefs are direct to the target with
  `?utm_source=outbid` appended, e.g.
  `https://trycomp.ai/?utm_source=outbid`, marked
  `rel="sponsored noopener noreferrer"` (`index.html`). This
  contradicts the rules page's "without query parameters" claim — the
  target URL's own tracking params are stripped, but outbid adds its own
  utm_source.
- Counting is a JS click handler: `POST /api/clicks` with
  `{rankingEntryId}` and `keepalive: true`, response `{clickCount}`
  (`api-endpoints-js-excerpt.txt`). So counts are client-fired and
  ad-blockable; the link itself works without it.
- The site sets a 1-year `outbid-visitor-id` HttpOnly cookie
  (`index.headers.txt`), presumably for visitor/click dedupe.

## 6. Design register (facts from `styles.css`, `index.html`)

- Single-column centered layout: header nav, hero + inline bid form,
  then the list; rows are flex rows, not a table. Pagination footer.
- Fonts: DM Sans (site-wide, `--font-sans`) and Geist Mono (numbers/
  amounts), self-hosted woff2 preloads.
- Warm near-monochrome palette with one accent: light bg `#fffdfa`,
  text `#282624`, muted `#67625d`; dark theme bg `#1a1512`, text
  `#f7f5f1`. Single primary/accent color `#e57255` (coral/orange).
  Both light and dark themes defined.
- Border radius `--radius: 0.875rem`; Tailwind v4 utility classes
  throughout.
- Animation is minimal: only Tailwind's stock `ping`, `pulse`, `spin`
  keyframes in the CSS (live-dot ping, spinners); the spectacle is the
  live counters — "online" count, visitors, and the footer revenue
  count-up polling `/api/revenue` every 15 s. `prefers-reduced-motion`
  is honored.
- Mobile: breakpoints at 40rem and 48rem (Tailwind sm/md); rows tighten
  padding (`py-3` → `md:py-5`), same single column at all widths.
- Stack: Next.js (Turbopack build) on Vercel, cookieless datafa.st
  analytics script plus Vemetric; OG/twitter cards with a generated
  1200x630 image.

## Deltas vs the operator brief (docs/briefs/outbid-mechanic.md)

- Brief said "Stripe checkout"; it is Polar. Functionally similar
  (hosted checkout, merchant of record) but the integration surface for
  any clone differs.
- Brief's 30-hour numbers ($40,627 / 289 listings / median $4) vs my
  35.5-hour sample ($42,649 / 336 listings / median $3): growth has
  slowed hard — roughly $2,022 gross in the ~5.5 hours between the two
  samples, against ~$1,354/hour over the first 30. Median fell because
  the long tail of $2-3 bids keeps growing while big bids stopped.
- Not in the brief: the takeover mechanic (2x top bid rents page one for
  3 hours), currently disabled after at least one $10,000 use; equal
  bids resolve by age; difference-only top-ups; anti-gaming rules
  (shortener resolution, query stripping, path-keyed platform links);
  the public API leaks Polar order IDs.
