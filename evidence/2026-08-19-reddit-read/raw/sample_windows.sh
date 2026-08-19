#!/bin/bash
# Fetch 100-post date-window samples from Arctic Shift for three subs.
set -u
UA="web:jamie-ledger-research:v0.1 (read-only research)"
DIR="."
FIELDS="id,title,score,num_comments,created_utc,author,link_flair_text,url"
REQS=0
fetch () {
  SUB="$1"; AFTER="$2"; BEFORE="$3"
  OUT="$DIR/sample-${SUB}-${AFTER}.json"
  URL="https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=${SUB}&after=${AFTER}&before=${BEFORE}&sort=asc&limit=100&fields=${FIELDS}"
  CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
  REQS=$((REQS+1))
  if [ "$CODE" = "429" ]; then
    echo "$SUB $AFTER: 429, sleep 90, retry once"
    sleep 90
    CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
    REQS=$((REQS+1))
  fi
  if [ "$CODE" != "200" ]; then
    echo "$SUB $AFTER: HTTP $CODE $(head -c 100 "$OUT")"
    rm -f "$OUT"
  else
    N=$(jq '.data | length' "$OUT")
    SPAN=$(jq -r 'if (.data|length)>0 then "\(.data[0].created_utc)-\(.data[-1].created_utc)" else "empty" end' "$OUT")
    echo "$SUB $AFTER: OK n=$N span=$SPAN"
    if [ "$N" = "0" ]; then rm -f "$OUT"; fi
  fi
  sleep 8
}
# ClaudeCode: 5 samples
fetch ClaudeCode 2026-03-01 2026-03-15
fetch ClaudeCode 2026-04-08 2026-04-22
fetch ClaudeCode 2026-05-20 2026-06-03
fetch ClaudeCode 2026-07-01 2026-07-15
fetch ClaudeCode 2026-08-10 2026-08-19
# ClaudeAI: 5 samples
fetch ClaudeAI 2026-03-01 2026-03-15
fetch ClaudeAI 2026-04-15 2026-04-29
fetch ClaudeAI 2026-06-01 2026-06-15
fetch ClaudeAI 2026-07-10 2026-07-24
fetch ClaudeAI 2026-08-12 2026-08-19
# codex: 4 samples
fetch codex 2026-03-10 2026-03-31
fetch codex 2026-05-01 2026-05-22
fetch codex 2026-06-20 2026-07-11
fetch codex 2026-08-01 2026-08-19
echo "TOTAL_REQUESTS_THIS_SCRIPT=$REQS"
