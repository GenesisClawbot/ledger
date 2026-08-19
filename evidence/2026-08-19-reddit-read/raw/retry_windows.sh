#!/bin/bash
set -u
UA="web:jamie-ledger-research:v0.1 (read-only research)"
DIR="."
FIELDS="id,title,score,num_comments,created_utc,author,link_flair_text,url"
REQS=0
fetch () {
  SUB="$1"; AFTER="$2"; BEFORE="$3"
  OUT="$DIR/sample-${SUB}-${AFTER}.json"
  CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=${SUB}&after=${AFTER}&before=${BEFORE}&sort=asc&limit=100&fields=${FIELDS}")
  REQS=$((REQS+1))
  if [ "$CODE" != "200" ]; then echo "$SUB $AFTER: HTTP $CODE"; rm -f "$OUT"; else echo "$SUB $AFTER: OK n=$(jq '.data|length' "$OUT")"; fi
  sleep 12
}
fetch ClaudeCode 2026-04-08 2026-04-22
fetch ClaudeCode 2026-05-20 2026-06-03
fetch codex 2026-05-01 2026-05-22
fetch codex 2026-08-01 2026-08-19
echo "RETRY_REQUESTS=$REQS"
