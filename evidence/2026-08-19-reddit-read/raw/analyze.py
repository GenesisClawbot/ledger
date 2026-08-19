import json, glob, re, datetime

posts = {}
for f in glob.glob('./sample-*.json'):
    sub = f.split('sample-')[1].split('-2026')[0]
    for p in json.load(open(f))['data']:
        p['sub'] = sub
        posts[p['id']] = p

ps = list(posts.values())
print(f"total sampled posts: {len(ps)}")
for sub in ('ClaudeCode','ClaudeAI','codex'):
    sp = [p for p in ps if p['sub']==sub]
    hi = [p for p in sp if p['score']>=100]
    print(f"  {sub}: n={len(sp)} score>=100: {len(hi)} score>=30: {len([p for p in sp if p['score']>=30])}")

PROJ = re.compile(r"\bi (built|made|created|shipped|vibe.?coded|coded)\b|\bbuilt (a|an|my|this)\b|\bmade (a|an|my|this)\b|show ?case|\bi wrote\b|\breleas(ed|ing)\b|open.?sourc|\blaunch(ed|ing)?\b|side.?project|my (app|tool|project|game|dashboard|extension|cli)\b", re.I)

def is_proj(p):
    t = p['title']
    fl = (p.get('link_flair_text') or '')
    return bool(PROJ.search(t)) or fl.lower() in ('showcase','built with claude','built with claude code','project','projects','show and tell','self promotion','promotion','vibe coding')

def fmt(p):
    d = datetime.datetime.utcfromtimestamp(p['created_utc']).strftime('%Y-%m-%d')
    fl = (p.get('link_flair_text') or '-')[:22]
    return f"{p['score']:>5} c{p['num_comments']:>4} {d} {p['sub'][:9]:<9} [{fl}] {p['title'][:100]} :: {p['id']}"

print("\n=== TOP 40 BY SCORE (all) ===")
for p in sorted(ps, key=lambda p:-p['score'])[:40]:
    print(fmt(p))

print("\n=== TOP 40 PROJECT-SHAPED BY SCORE ===")
projs = [p for p in ps if is_proj(p)]
print(f"(project-shaped posts in sample: {len(projs)})")
for p in sorted(projs, key=lambda p:-p['score'])[:40]:
    print(fmt(p))

print("\n=== FLAIR DISTRIBUTION ===")
from collections import Counter
c = Counter((p['sub'], p.get('link_flair_text')) for p in ps)
for (sub,fl),n in c.most_common(30):
    print(f"  {n:>4} {sub} {fl}")
