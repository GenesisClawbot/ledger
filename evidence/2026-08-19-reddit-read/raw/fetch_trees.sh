#!/bin/bash
# Fetch comment trees for a list of post IDs from Arctic Shift.
# Usage: fetch_trees.sh id1 id2 ...
set -u
UA="web:jamie-ledger-research:v0.1 (read-only research)"
DIR="."
REQS=0
for ID in "$@"; do
  OUT="$DIR/comments-${ID}.json"
  URL="https://arctic-shift.photon-reddit.com/api/comments/tree?link_id=t3_${ID}&limit=300"
  CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
  REQS=$((REQS+1))
  if [ "$CODE" = "429" ]; then
    echo "$ID: 429, sleep 90, retry once"; sleep 90
    CODE=$(curl -s -A "$UA" --max-time 120 -o "$OUT" -w "%{http_code}" "$URL")
    REQS=$((REQS+1))
  fi
  if [ "$CODE" != "200" ]; then
    echo "$ID: HTTP $CODE $(head -c 100 "$OUT")"; rm -f "$OUT"
  else
    echo "$ID: OK $(jq '.data | length' "$OUT") top-level items"
  fi
  sleep 8
done
echo "TREE_REQUESTS=$REQS"
