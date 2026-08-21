// Tests for the reader library. Run: node --test reader/test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  escapeHtml, renderInline, mdToHtml, rewriteLink, parseEntry, slugFor,
  stripHtml, citedEvidenceDirs,
} from './lib.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..');

// --- escaping ---

test('escapeHtml escapes the five characters', () => {
  assert.equal(escapeHtml(`<a href="x" & 'y'>`), '&lt;a href=&quot;x&quot; &amp; &#39;y&#39;&gt;');
});

// --- inline formatting ---

test('bold, italic, inline code', () => {
  assert.equal(renderInline('a **bold** word'), 'a <strong>bold</strong> word');
  assert.equal(renderInline('a *quiet* word'), 'a <em>quiet</em> word');
  assert.equal(renderInline('run `node x.mjs` now'), 'run <code>node x.mjs</code> now');
});

test('code spans are not formatted or double-escaped', () => {
  assert.equal(renderInline('`a ** b`'), '<code>a ** b</code>');
  assert.equal(renderInline('`<b> & *x*`'), '<code>&lt;b&gt; &amp; *x*</code>');
});

test('links render with rewriting applied', () => {
  const out = renderInline('see [the audit](../evidence/2026-08-18-driftwatch/AUDIT-2026-08-18.md).');
  assert.equal(out, 'see <a href="https://github.com/GenesisClawbot/ledger/blob/main/evidence/2026-08-18-driftwatch/AUDIT-2026-08-18.md">the audit</a>.');
});

test('raw html in source text is escaped', () => {
  assert.equal(renderInline('a <script> tag'), 'a &lt;script&gt; tag');
});

// --- link rewriting ---

test('rewriteLink: evidence file goes to blob, directory to tree', () => {
  assert.equal(rewriteLink('../evidence/2026-08-19-reddit-read/reddit-read-full.md'),
    'https://github.com/GenesisClawbot/ledger/blob/main/evidence/2026-08-19-reddit-read/reddit-read-full.md');
  assert.equal(rewriteLink('../evidence/2026-08-19-reddit-read/raw/'),
    'https://github.com/GenesisClawbot/ledger/tree/main/evidence/2026-08-19-reddit-read/raw');
  assert.equal(rewriteLink('../evidence/2026-08-19-burnboard-launch'),
    'https://github.com/GenesisClawbot/ledger/tree/main/evidence/2026-08-19-burnboard-launch');
});

test('rewriteLink: sibling entry goes to its rendered page', () => {
  assert.equal(rewriteLink('2026-08-18-driftwatch-killed.md'), '2026-08-18-driftwatch-killed.html');
  assert.equal(rewriteLink('../entries/2026-08-19-reddit-read.md'), '2026-08-19-reddit-read.html');
});

test('rewriteLink: absolute urls pass through', () => {
  assert.equal(rewriteLink('https://jamiecole.page/burnboard/'), 'https://jamiecole.page/burnboard/');
});

// --- blocks ---

test('headings h1 to h3', () => {
  assert.equal(mdToHtml('# One'), '<h1>One</h1>');
  assert.equal(mdToHtml('## Two'), '<h2>Two</h2>');
  assert.equal(mdToHtml('### Three'), '<h3>Three</h3>');
});

test('soft-wrapped lines join into one paragraph', () => {
  assert.equal(mdToHtml('line one\nline two\n\nnext'), '<p>line one line two</p>\n<p>next</p>');
});

test('unordered and ordered lists', () => {
  assert.equal(mdToHtml('- a\n- b'), '<ul>\n<li>a</li>\n<li>b</li>\n</ul>');
  assert.equal(mdToHtml('1. a\n2. b'), '<ol>\n<li>a</li>\n<li>b</li>\n</ol>');
});

test('list items join their wrapped continuation lines', () => {
  assert.equal(mdToHtml('- first item\n  wraps here\n- second'),
    '<ul>\n<li>first item wraps here</li>\n<li>second</li>\n</ul>');
});

test('pipe table renders thead and tbody', () => {
  const md = '| A | B |\n|---|---|\n| 1 | 2 |';
  assert.equal(mdToHtml(md),
    '<table>\n<thead><tr><th>A</th><th>B</th></tr></thead>\n<tbody>\n<tr><td>1</td><td>2</td></tr>\n</tbody>\n</table>');
});

test('fenced code keeps blank lines, escapes, never formats', () => {
  const md = '```json\n{\n  "a": "<b> & *x*"\n\n}\n```';
  assert.equal(mdToHtml(md),
    '<pre><code class="lang-json">{\n  &quot;a&quot;: &quot;&lt;b&gt; &amp; *x*&quot;\n\n}</code></pre>');
});

test('horizontal rule', () => {
  assert.equal(mdToHtml('a\n\n---\n\nb'), '<p>a</p>\n<hr>\n<p>b</p>');
});

// --- entry parsing ---

test('parseEntry lifts title and the italic dateline as abstract', () => {
  const md = '# The title\n\n*2026-08-19. The abstract\nwraps over lines.*\n\nBody starts.\n\n## Section';
  const e = parseEntry(md);
  assert.equal(e.title, 'The title');
  assert.equal(e.abstract, '2026-08-19. The abstract wraps over lines.');
  assert.ok(e.bodyHtml.startsWith('<p>Body starts.</p>'));
  assert.ok(!e.bodyHtml.includes('<h1>'));
});

test('slugFor strips extension only', () => {
  assert.equal(slugFor('entries/2026-08-18-driftwatch-killed.md'), '2026-08-18-driftwatch-killed');
});

test('a bold-opening first paragraph is not a dateline and the title is not re-parsed', () => {
  const e = parseEntry('# The title\n\n**Bold start** of the first paragraph.\n\nMore body.');
  assert.equal(e.title, 'The title');
  assert.equal(e.abstract, '');
  assert.ok(!e.bodyHtml.includes('<h1>'), 'h1 leaked into body');
  assert.ok(e.bodyHtml.startsWith('<p><strong>Bold start</strong>'));
});

test('ampersands in link urls escape exactly once', () => {
  const out = renderInline('[x](https://example.com/?a=1&b=2)');
  assert.equal(out, '<a href="https://example.com/?a=1&amp;b=2">x</a>');
});

test('table cells honor the rewrite function passed in', () => {
  const custom = (h) => `X/${h}`;
  const out = mdToHtml('| A |\n|---|\n| [x](doc.md) |', custom);
  assert.ok(out.includes('href="X/doc.md"'), out);
});

test('space-flanked asterisks are not emphasis', () => {
  assert.equal(renderInline('3 * 4 * 5'), '3 * 4 * 5');
});

test('a code span inside a link label survives both lifts', () => {
  const out = renderInline('see [`data.json`](../evidence/x/data.json) here');
  assert.equal(out, 'see <a href="https://github.com/GenesisClawbot/ledger/blob/main/evidence/x/data.json"><code>data.json</code></a> here');
});

test('stripHtml inverts escapeHtml and drops tags', () => {
  assert.equal(stripHtml('<p>a <strong>b</strong> &amp; &#39;c&#39;</p>'), "a b & 'c'");
});

test('citedEvidenceDirs counts link targets only, not prose or code fences', () => {
  const md = 'see [the audit](../evidence/2026-08-18-driftwatch/A.md).\n\n'
    + 'unlike evidence/other-dir, and\n\n```\nls evidence/fenced-dir\n```';
  assert.deepEqual(citedEvidenceDirs(md), ['2026-08-18-driftwatch']);
});

// --- integration against the real book ---

test('folios.json covers every entry file exactly once', () => {
  const folios = JSON.parse(readFileSync(join(here, 'folios.json'), 'utf8'));
  const files = readdirSync(join(repo, 'entries')).filter((f) => f.endsWith('.md')).sort();
  const listed = folios.map((f) => f.file).sort();
  assert.deepEqual(listed, files);
  const ids = folios.map((f) => f.folio);
  assert.equal(new Set(ids).size, ids.length);
});

test('every real entry renders without markdown artifacts', () => {
  const files = readdirSync(join(repo, 'entries')).filter((f) => f.endsWith('.md'));
  for (const f of files) {
    const e = parseEntry(readFileSync(join(repo, 'entries', f), 'utf8'));
    assert.ok(e.title.length > 0, `${f}: title`);
    const scan = e.bodyHtml
      .replace(/<pre><code[^>]*>[\s\S]*?<\/code><\/pre>/g, '')
      .replace(/<code>[\s\S]*?<\/code>/g, '');
    assert.ok(!scan.includes(']('), `${f}: unrendered link`);
    assert.ok(!scan.includes('**'), `${f}: unrendered bold`);
    assert.ok(!/^#{1,6} /m.test(scan), `${f}: unrendered heading`);
    assert.ok(!/<p>#/.test(scan), `${f}: heading outside the dialect`);
    assert.ok(!/<p>&gt;/.test(scan), `${f}: blockquote outside the dialect`);
    assert.ok(!scan.includes('!<a'), `${f}: image outside the dialect`);
    assert.ok(!/^\| /m.test(scan), `${f}: unrendered table`);
    assert.ok(!e.bodyHtml.includes('\u0000'), `${f}: placeholder leaked`);
    assert.ok(!e.bodyHtml.includes('undefined<'), `${f}: lost code span`);
  }
});
