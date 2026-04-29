// bajjy.org backend — thin Express API + static dist server.
//
// Dev:  Vite runs the SPA on :5173 and proxies /api + /health here on :3000.
// Prod: `vite build` outputs ./dist; this server serves dist + the API on
//       a single port. SPA fallback sends unknown paths to dist/index.html.

import express from 'express';
import compression from 'compression';
import morgan from 'morgan';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config } from './config/index.js';
import { registerApi } from './routes/api.js';
import { health } from './routes/health.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');

const app = express();
app.disable('x-powered-by');

app.use(compression());
app.use(morgan(config.env === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '64kb' }));

// ---- API
app.get('/health', health);
registerApi(app);

// ---- production: serve built SPA + fallback
if (config.env === 'production') {
  app.use(
    express.static(distDir, {
      etag: true,
      lastModified: true,
      maxAge: '7d',
    })
  );
  // SPA fallback (skip /api/* and /health)
  app.get(/^\/(?!api\/|health$).*/, (_req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// ---- error handlers
app.use((req, res, next) => {
  if (req.path.startsWith('/api/') || req.path === '/health') {
    return res.status(404).json({ error: 'not_found', path: req.path });
  }
  next();
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  console.error('[error]', err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ error: 'internal_error', message: err.message });
  }
  res.status(500).send('Internal Server Error');
});

app.listen(config.port, '0.0.0.0', () => {
  console.log(`bajjy.org listening on :${config.port} [${config.env}]`);
});
