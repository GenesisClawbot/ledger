#!/bin/bash
# Page Arctic Shift posts for one subreddit from AFTER epoch to now.
# Usage: page_posts.sh <sub> <after_epoch> <max_calls>
set -u
SUB="$1"; CURSOR="$2"; MAXCALLS="$3"
UA="web:jamie-ledger-research:v0.1 (read-only research)"
DIR="."
FIELDS="id,title,score,num_comments,created_utc,author,link_flair_text,url"
NOW=$(date +%s)
CALL=0
while [ "$CALL" -lt "$MAXCALLS" ]; do
  CALL=$((CALL+1))
  OUT="$DIR/posts-${SUB}-page$(printf '%02d' $CALL).json"
  URL="https://arctic-shift.photon-reddit.com/api/posts/search?subreddit=${SUB}&after=${CURSOR}&sort=asc&limit=auto&fields=${FIELDS}"
  CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
  if [ "$CODE" = "429" ]; then
    echo "$SUB call $CALL: 429, sleeping 90 and retrying once"
    sleep 90
    CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
  fi
  if [ "$CODE" != "200" ]; then
    echo "$SUB call $CALL: HTTP $CODE, aborting. body: $(head -c 150 "$OUT")"
    rm -f "$OUT"
    break
  fi
  N=$(jq '.data | length' "$OUT")
  if [ "$N" = "0" ]; then
    echo "$SUB call $CALL: 0 results, done"
    rm -f "$OUT"
    break
  fi
  LAST=$(jq '[.data[].created_utc] | max' "$OUT")
  echo "$SUB call $CALL: $N posts, cursor $CURSOR -> $LAST ($(date -r "$LAST" '+%Y-%m-%d' 2>/dev/null))"
  CURSOR=$LAST
  if [ "$CURSOR" -ge "$NOW" ]; then echo "$SUB: reached now"; break; fi
  sleep 6
done
echo "$SUB: used $CALL calls, final cursor $CURSOR"
