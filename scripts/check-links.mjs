// Broken-link checker. Runs automatically after `npm run build` (see "postbuild" in package.json).
// Scans every built page for internal links, images, stylesheets and scripts, and fails the build
// if any of them point to a page, section (#anchor) or file that doesn't exist.
// Placeholder links (href="#") are reported as warnings only.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ROOT = join(process.cwd(), 'dist', 'client');
if (!existsSync(ROOT)) {
  console.error('check-links: dist/client not found. Run `npm run build` first.');
  process.exit(1);
}

const htmlFiles = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full);
    else if (name.endsWith('.html')) htmlFiles.push(full);
  }
};
walk(ROOT);

// URL path of each built page, e.g. dist/client/about/index.html -> /about/
const urlOf = (file) => {
  const rel = relative(ROOT, file).split(sep).join('/');
  return '/' + rel.replace(/(^|\/)index\.html$/, '$1');
};
const pages = new Map(htmlFiles.map((f) => [urlOf(f), readFileSync(f, 'utf8')]));
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const ids = new Map([...pages].map(([url, html]) => [url, idsOf(html)]));

// Resolve a path to a built page or file.
const resolveTarget = (path) => {
  if (pages.has(path)) return { page: path };
  if (pages.has(path + '/')) return { page: path + '/' };
  const file = join(ROOT, decodeURIComponent(path));
  if (existsSync(file) && statSync(file).isFile()) return { file: true };
  return null;
};

const errors = [];
const warnings = [];
for (const [pageUrl, html] of pages) {
  const refs = [...html.matchAll(/\s(href|src)="([^"]*)"/g)].map((m) => m[2]);
  for (const ref of new Set(refs)) {
    if (ref === '#') { warnings.push(`${pageUrl}: placeholder link href="#"`); continue; }
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(ref)) continue; // external or special
    if (ref.startsWith('/api/')) continue; // server endpoints, not files
    if (ref.startsWith('/_astro/') || ref.startsWith('/@')) { // build assets
      if (ref.startsWith('/_astro/') && !resolveTarget(ref.split('?')[0])) errors.push(`${pageUrl}: missing build asset ${ref}`);
      continue;
    }
    const [pathAndQuery, hash] = ref.split('#');
    const path = pathAndQuery.split('?')[0] || pageUrl; // "#section" means this page
    const target = resolveTarget(path.startsWith('/') ? path : new URL(path, 'http://x' + pageUrl).pathname);
    if (!target) { errors.push(`${pageUrl}: broken link -> ${ref}`); continue; }
    if (hash && target.page && !ids.get(target.page).has(hash)) errors.push(`${pageUrl}: missing section #${hash} on ${target.page} (link: ${ref})`);
  }
}

const unique = (list) => [...new Set(list)];
for (const w of unique(warnings)) console.warn('  warning  ' + w);
if (errors.length) {
  console.error(`\ncheck-links: ${unique(errors).length} broken link(s) found:`);
  for (const e of unique(errors)) console.error('  ✗ ' + e);
  process.exit(1);
}
console.log(`check-links: ✓ ${pages.size} pages checked, no broken internal links.`);
