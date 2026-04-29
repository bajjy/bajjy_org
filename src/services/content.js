// Markdown content loader. Posts live in /content/posts/*.md with YAML
// front-matter for metadata. Loaded once at startup, hot-reloadable in dev.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import frontMatter from 'front-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.resolve(__dirname, '..', '..', 'content');
const postsDir = path.join(contentDir, 'posts');

marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
});

function deriveSlug(file) {
  return file.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function deriveDate(file, fmDate) {
  if (fmDate) return new Date(fmDate);
  const m = file.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
  return new Date(0);
}

async function readMd(filePath, file) {
  const raw = await fs.readFile(filePath, 'utf8');
  const { attributes, body } = frontMatter(raw);
  const date = deriveDate(file, attributes.date);
  return {
    slug: attributes.slug || deriveSlug(file),
    title: attributes.title || deriveSlug(file).replace(/-/g, ' '),
    summary: attributes.summary || attributes.description || '',
    tags: attributes.tags || [],
    classification: attributes.classification || 'UNCLASSIFIED',
    coords: attributes.coords || null,
    date,
    dateIso: date.toISOString(),
    dateDisplay: date.toISOString().slice(0, 10),
    html: marked(body),
    raw: body,
  };
}

const cache = { posts: null, mtime: 0 };

async function loadAll() {
  let entries;
  try {
    entries = await fs.readdir(postsDir);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  const mdFiles = entries.filter((f) => f.endsWith('.md'));
  const items = await Promise.all(
    mdFiles.map(async (f) => readMd(path.join(postsDir, f), f))
  );
  items.sort((a, b) => b.date - a.date);
  return items;
}

export async function getPosts() {
  if (cache.posts) return cache.posts;
  cache.posts = await loadAll();
  return cache.posts;
}

export async function getPostBySlug(slug) {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// generic single-doc loader for /now, /uses, bio, production
export async function getDoc(name) {
  const filePath = path.join(contentDir, `${name}.md`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const { attributes, body } = frontMatter(raw);
    return {
      attributes,
      html: marked(body),
      raw: body,
    };
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

// Allow callers to bust the cache (useful in dev)
export function resetContentCache() {
  cache.posts = null;
}
