// GitHub fetcher with in-memory TTL cache.
// Surfaces public repos for the /projects page. The site never blocks on the
// network — if the API is unreachable we fall back to a stale cache or an
// empty list and the page still renders.

import { config } from '../config/index.js';

const cache = {
  repos: null,
  fetchedAt: 0,
  inflight: null,
};

const ttlMs = () => config.github.cacheTtlSeconds * 1000;

function isFresh() {
  return cache.repos && Date.now() - cache.fetchedAt < ttlMs();
}

function authHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    'User-Agent': 'bajjy.org-site/0.1',
  };
  if (config.github.token) {
    headers.Authorization = `Bearer ${config.github.token}`;
  }
  return headers;
}

async function fetchFromGitHub() {
  const url = `https://api.github.com/users/${encodeURIComponent(
    config.github.username
  )}/repos?per_page=100&sort=updated`;
  const res = await fetch(url, { headers: authHeaders() });
  if (!res.ok) {
    throw new Error(`GitHub responded ${res.status}: ${res.statusText}`);
  }
  const raw = await res.json();
  if (!Array.isArray(raw)) {
    throw new Error('GitHub returned a non-array payload');
  }
  return raw.map((r) => ({
    name: r.name,
    fullName: r.full_name,
    description: r.description || '',
    language: r.language || null,
    stars: r.stargazers_count || 0,
    forks: r.forks_count || 0,
    pushedAt: r.pushed_at,
    createdAt: r.created_at,
    topics: r.topics || [],
    htmlUrl: r.html_url,
    homepage: r.homepage || null,
    fork: !!r.fork,
    archived: !!r.archived,
    size: r.size || 0,
  }));
}

export async function getRepos({ force = false } = {}) {
  if (!force && isFresh()) {
    return { repos: cache.repos, stale: false };
  }
  if (cache.inflight) {
    return cache.inflight;
  }
  cache.inflight = (async () => {
    try {
      const repos = await fetchFromGitHub();
      cache.repos = repos;
      cache.fetchedAt = Date.now();
      return { repos, stale: false };
    } catch (err) {
      console.warn('[github] fetch failed:', err.message);
      // Fall back to whatever we last had — better stale than empty.
      return { repos: cache.repos || [], stale: true, error: err.message };
    } finally {
      cache.inflight = null;
    }
  })();
  return cache.inflight;
}

// Score-and-sort: live + non-fork repos with descriptions surface first.
export function rankRepos(repos) {
  return [...repos]
    .map((r) => ({
      ...r,
      _score:
        (r.archived ? -10 : 0) +
        (r.fork ? -3 : 0) +
        (r.description ? 4 : 0) +
        (r.topics.length ? 2 : 0) +
        r.stars * 5 +
        r.forks * 2 +
        // recency: newer pushes worth more, capped
        Math.min(
          5,
          Math.max(
            0,
            5 - (Date.now() - new Date(r.pushedAt).getTime()) / (180 * 24 * 3600 * 1000)
          )
        ),
    }))
    .sort((a, b) => b._score - a._score);
}

// derive a tag list (languages + topics) for filter chips
export function deriveTags(repos) {
  const counts = new Map();
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) || 0) + 1);
    for (const t of r.topics) counts.set(t, (counts.get(t) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}
