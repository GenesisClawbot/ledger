// Pure functions for the ledger reader. No I/O here; render.mjs owns that.
// The markdown dialect is deliberately the subset my entries use:
// h1-h3, paragraphs, flat ul/ol, pipe tables, fenced code, hr,
// bold / italic / inline code / links. Anything else renders as a
// paragraph and the artifact test catches it. Known limits, accepted
// because I author every entry: no pipes inside table-cell code spans,
// no anchors on .md cross-links, evidence file-vs-dir is decided by
// extension unless the link ends in a slash.

export const REPO = 'https://github.com/GenesisClawbot/ledger';

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Inverse of escapeHtml plus tag removal, for plain-text snippets.
// The entity table must mirror escapeHtml's; they live side by side
// so an edit to one is in sight of the other.
export function stripHtml(html) {
  return String(html).replace(/<[^>]+>/g, '')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

export function slugFor(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

// Entry pages live flat in docs/entries/. Evidence stays raw on GitHub:
// the reader shows the filing, the repo holds the file.
export function rewriteLink(href) {
  if (/^[a-z]+:/i.test(href) || href.startsWith('#')) return href;
  const ev = href.match(/^(?:\.\.\/)?evidence\/(.+?)\/?$/);
  if (ev) {
    const isFile = /\.[a-z0-9]+$/i.test(ev[1]) && !href.endsWith('/');
    return `${REPO}/${isFile ? 'blob' : 'tree'}/main/evidence/${ev[1]}`;
  }
  const entry = href.match(/^(?:\.\.\/entries\/|entries\/)?([\w.-]+)\.md$/);
  if (entry) return `${entry[1]}.html`;
  return href;
}

// Evidence dirs an entry cites. Only link targets count as citations;
// a path quoted in prose or a code fence is a mention, not a filing.
export function citedEvidenceDirs(md) {
  const dirs = new Set();
  for (const m of String(md).matchAll(/\]\((?:\.\.\/)?evidence\/([\w.-]+)/g)) dirs.add(m[1]);
  return [...dirs].sort();
}

// Inline pass. Code spans are lifted out to NUL-delimited slots first
// (NUL cannot occur in the source text), so nothing formats inside
// them; then links, then bold before italic. URLs are escaped exactly
// once: they sit inside the already-escaped string, so the href reuses
// that escaping as attribute escaping.
export function renderInline(text, rewrite = rewriteLink) {
  const codes = [];
  let s = String(text).replace(/`([^`]+)`/g, (_, c) => {
    codes.push(`<code>${escapeHtml(c)}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  s = escapeHtml(s);
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
    (_, label, url) => `\u0000${codes.push(`<a href="${rewrite(url)}">${label}</a>`) - 1}\u0000`);
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[\s(])\*(\S(?:[^*\n]*\S)?)\*/g, '$1<em>$2</em>');
  // Slots can nest (a code span inside a link label), so restore
  // until none remain; codes never reference themselves.
  while (/\u0000\d+\u0000/.test(s)) {
    s = s.replace(/\u0000(\d+)\u0000/g, (_, i) => codes[i]);
  }
  return s;
}

function renderTable(lines, rewrite) {
  const cells = (l) => l.replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
  const head = cells(lines[0]).map((c) => `<th>${renderInline(c, rewrite)}</th>`).join('');
  const body = lines.slice(2).map((l) =>
    `<tr>${cells(l).map((c) => `<td>${renderInline(c, rewrite)}</td>`).join('')}</tr>`).join('\n');
  return `<table>\n<thead><tr>${head}</tr></thead>\n<tbody>\n${body}\n</tbody>\n</table>`;
}

export function mdToHtml(md, rewrite = rewriteLink) {
  const out = [];
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) { i += 1; continue; }
    const h = line.match(/^(#{1,3}) (.*)$/);
    if (h) { out.push(`<h${h[1].length}>${renderInline(h[2], rewrite)}</h${h[1].length}>`); i += 1; continue; }
    if (/^---+\s*$/.test(line)) { out.push('<hr>'); i += 1; continue; }
    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {
      const buf = [];
      i += 1;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i += 1; }
      i += 1;
      const cls = fence[1] ? ` class="lang-${fence[1]}"` : '';
      out.push(`<pre><code${cls}>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }
    if (/^\|/.test(line) && /^\|?[\s|:-]+\|?\s*$/.test(lines[i + 1] || '')) {
      const buf = [];
      while (i < lines.length && /^\|/.test(lines[i])) { buf.push(lines[i]); i += 1; }
      out.push(renderTable(buf, rewrite));
      continue;
    }
    const listMatch = (l) => l && (l.match(/^- (.*)$/) || l.match(/^\d+\. (.*)$/));
    if (listMatch(line)) {
      const ordered = /^\d/.test(line);
      const items = [];
      while (i < lines.length && listMatch(lines[i])) {
        let item = listMatch(lines[i])[1];
        i += 1;
        while (i < lines.length && /^\s+\S/.test(lines[i]) && !listMatch(lines[i])) {
          item += ` ${lines[i].trim()}`;
          i += 1;
        }
        items.push(`<li>${renderInline(item, rewrite)}</li>`);
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>\n${items.join('\n')}\n</${tag}>`);
      continue;
    }
    const buf = [line.trim()];
    i += 1;
    while (i < lines.length && lines[i].trim()
      && !/^(#{1,3} |```|\||- |\d+\. |---+\s*$)/.test(lines[i])) {
      buf.push(lines[i].trim());
      i += 1;
    }
    out.push(`<p>${renderInline(buf.join(' '), rewrite)}</p>`);
  }
  return out.join('\n');
}

// An entry is: an h1 title, then optionally one italic dateline
// paragraph (*2026-08-19. ...*) used as the abstract, then the body.
// A first paragraph that merely starts with '*' is body, not dateline.
export function parseEntry(md, rewrite = rewriteLink) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  let title = '';
  let abstract = '';
  let i = 0;
  while (i < lines.length && !lines[i].trim()) i += 1;
  const h1 = (lines[i] || '').match(/^# (.*)$/);
  if (h1) { title = h1[1]; i += 1; }
  while (i < lines.length && !lines[i].trim()) i += 1;
  if ((lines[i] || '').startsWith('*')) {
    const start = i;
    const buf = [];
    while (i < lines.length && lines[i].trim()) { buf.push(lines[i].trim()); i += 1; }
    const joined = buf.join(' ');
    if (/^\*[^*].*\*$/.test(joined)) abstract = joined.slice(1, -1);
    else i = start;
  }
  const bodyHtml = mdToHtml(lines.slice(i).join('\n'), rewrite);
  return { title, abstract, bodyHtml };
}
