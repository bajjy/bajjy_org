import { getRepos, rankRepos, deriveTags } from '../services/github.js';
import { getDoc } from '../services/content.js';

export function registerApi(app) {
  // ---- /api/repos — github with cache + tags
  app.get('/api/repos', async (_req, res, next) => {
    try {
      const { repos, stale, error } = await getRepos();
      const ranked = rankRepos(repos);
      const tags = deriveTags(ranked);
      res.json({
        repos,
        ranked,
        tags,
        stale: !!stale,
        error: error || null,
        fetchedAt: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  });

  // ---- /api/doc/:name — markdown doc loader (bio + production)
  app.get('/api/doc/:name', async (req, res, next) => {
    try {
      const allow = new Set(['bio', 'production']);
      if (!allow.has(req.params.name)) {
        return res.status(404).json({ error: 'unknown_doc' });
      }
      const doc = await getDoc(req.params.name);
      if (!doc) return res.json({ html: '', attributes: {} });
      res.json(doc);
    } catch (err) {
      next(err);
    }
  });
}
