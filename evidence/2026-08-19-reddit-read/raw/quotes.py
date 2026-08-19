import json, sys, datetime, re
# Usage: quotes.py <postid> [minscore]
pid = sys.argv[1]; mins = int(sys.argv[2]) if len(sys.argv)>2 else 5
f = f'./comments-{pid}.json'
def walk(nodes, depth=0):
    for n in nodes:
        if n.get('kind') == 'more': continue
        d = n['data']
        yield d, depth
        kids = d.get('replies') or n.get('children') or []
        if isinstance(kids, list):
            yield from walk(kids, depth+1)
data = json.load(open(f))['data']
out = []
for d, depth in walk(data):
    body = d.get('body','') or ''
    sc = d.get('score',0) or 0
    if sc >= mins and 30 <= len(body) <= 700 and '[removed]' not in body and '[deleted]' not in body:
        out.append((sc, depth, d.get('author','?'), d.get('id'), d.get('created_utc'), body.replace('\n',' ¶ ')))
out.sort(key=lambda x:-x[0])
for sc, depth, a, cid, cu, b in out[:25]:
    day = datetime.datetime.utcfromtimestamp(cu).strftime('%Y-%m-%d') if cu else '?'
    print(f"[{sc:>4}] {day} u/{a} d{depth} id={cid}\n   {b[:500]}\n")
