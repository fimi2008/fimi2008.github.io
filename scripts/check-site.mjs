import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const paths = [
  '/', '/archives/', '/archives/2020/', '/archives/2020/11/', '/notes/',
  '/ai/', '/ai/skills/', '/ai/weekly/', '/training/',
  '/2020/11/09/hello-world/', '/2020/11/12/Idea-实战汇总/',
];
function outputPath(urlPath) {
  const path = decodeURIComponent(urlPath);
  return join('dist', path, path.endsWith('/') ? 'index.html' : '');
}

for (const path of [...paths, '/rss.xml', '/sitemap-index.xml']) {
  assert(existsSync(outputPath(path)), `Missing output: ${path}`);
}

const ids = (html) => [...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
for (const file of readdirSync('src/content/entries').filter((name) => name.startsWith('2020-'))) {
  const entry = readFileSync(join('src/content/entries', file), 'utf8');
  const path = JSON.parse(entry.match(/^path: (.+)$/m)[1]);
  const anchors = JSON.parse(entry.match(/^legacyAnchors: (.+)$/m)[1]);
  const html = readFileSync(outputPath(path), 'utf8');
  for (const anchor of anchors) assert(ids(html).includes(anchor), `Missing old link: ${path}#${anchor}`);
  assert(!html.includes('/Users/lionxxw/'), `Leaked legacy local path: ${path}`);
}

for (const file of readdirSync('dist', { recursive: true }).filter((name) => name.endsWith('.html'))) {
  const html = readFileSync(join('dist', file), 'utf8');
  const pageIds = ids(html);
  assert.equal(new Set(pageIds).size, pageIds.length, `Duplicate IDs in ${file}`);
  for (const [, link] of html.matchAll(/\shref="((?:\/(?!\/)|#)[^"]*)"/g)) {
    if (link.startsWith('#')) {
      assert(pageIds.includes(decodeURIComponent(link.slice(1))), `Broken anchor ${link} in ${file}`);
    } else {
      const url = new URL(link, 'https://fimi2008.github.io');
      assert(existsSync(outputPath(url.pathname)), `Broken link ${link} in ${file}`);
    }
  }
}
console.log('Verified site pages, legacy URLs and anchors, internal links, RSS and sitemap.');
