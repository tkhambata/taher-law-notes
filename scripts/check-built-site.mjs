import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, join, sep } from 'node:path';

const root = resolve('dist');
assert.ok(existsSync(root), 'Run npm run build before checking the site.');
const { subjects } = JSON.parse(readFileSync('src/data/subjects.json', 'utf8'));
function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}
function targetFor(pathname) {
  const decoded = decodeURIComponent(pathname);
  const candidate = resolve(root, `.${decoded}`);
  if (candidate !== root && !candidate.startsWith(root + sep)) return undefined;
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, 'index.html');
  return existsSync(index) ? index : undefined;
}
const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const failures = new Set();
const origin = 'https://site-check.invalid';
for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const route = '/' + relative(root, file).split(sep).join('/').replace(/index\.html$/, '');
  for (const match of source.matchAll(/\bhref=["']([^"']+)["']/gi)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(?:mailto:|tel:|data:|javascript:)/i.test(href)) continue;
    let url;
    try { url = new URL(href, origin + route); }
    catch { failures.add(`${route}: invalid URL ${href}`); continue; }
    if (url.origin !== origin) continue;
    const target = targetFor(url.pathname);
    if (!target) { failures.add(`${route}: missing destination ${href}`); continue; }
    if (url.hash && target.endsWith('.html') && !url.hash.startsWith('#:~:text=')) {
      const id = decodeURIComponent(url.hash.slice(1));
      if (/^diagram-\d+$/.test(id)) continue;
      const targetHtml = readFileSync(target, 'utf8');
      const ids = [...targetHtml.matchAll(/\bid=["']([^"']+)["']/g)].map((item) => item[1]);
      if (!ids.includes(id)) failures.add(`${route}: missing anchor ${href}`);
    }
  }
}
const home = readFileSync(join(root, 'index.html'), 'utf8');
assert.equal((home.match(/\bdata-subject-card(?:[\s=>])/g) || []).length, subjects.length,
  'The homepage must render one card per registered subject.');
for (const subject of subjects) {
  assert.ok(targetFor(subject.href), `Missing subject overview: ${subject.href}`);
  assert.ok(home.includes(`href="${subject.href}"`), `Missing subject card: ${subject.title}`);
  const subjectPage = readFileSync(targetFor(subject.href), 'utf8');
  assert.ok(subjectPage.includes(`href="${subject.href}"`), `Missing subject sidebar link: ${subject.title}`);
}
for (const old of ['diagram-test', 'media-connection-test', 'video-test', 'viewer-demo']) {
  assert.ok(!existsSync(join(root, 'contract', old, 'index.html')), `Demo route still exists: ${old}`);
  for (const file of htmlFiles) {
    assert.ok(!readFileSync(file, 'utf8').includes(`/contract/${old}/`), `Link to removed demo in ${file}`);
  }
}
assert.equal(failures.size, 0, [...failures].join('\n'));
console.log(`Checked ${htmlFiles.length} HTML pages and ${subjects.length} subject destinations; local hrefs and HTML anchors passed.`);
