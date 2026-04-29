# bajjy.org

Personal site + production dossier for **bajjy** — built on the
**PROTOCOL_88_EVO** design system. Hacker-vibe blog and showcase.

```
Stack:    Vite + Vue 3 (composition API, vanilla, no Pinia)
Backend:  Express on Node 20 (thin API + static dist)
Content:  Markdown files in /content (posts + bio + production + now + uses)
Data:     GitHub repos pulled live with TTL cache
Deploy:   Single Docker image -> Coolify on the VPS
```

## Routes

| Path | What it shows |
| --- | --- |
| `/`           | Operator dossier — bio, social links, latest signals |
| `/projects`   | Encrypted matrix of public GitHub repos, filterable |
| `/production` | Studio brief — services, methodology, capability bars |
| `/logs`       | Tactical stream of long-form posts (markdown) |
| `/logs/:slug` | Single post — dossier-style article + meta rail |
| `/now`        | What I'm focused on right now (indie-web `/now`) |
| `/uses`       | Hardware + software loadout (`uses.tech` style) |
| `/contact`    | Open channels — email + socials |
| `/health`     | JSON health probe (Coolify hits this) |

## Local dev

```sh
# install once
npm install

# run frontend (Vite, :5173) and backend (Express, :3000) together
npm run dev

# open http://localhost:5173
# Vite proxies /api and /health to :3000 so everything just works
```

## Production

```sh
npm run build       # vite -> dist/
npm start           # node serves dist + API on $PORT (default 3000)
```

Or with Docker:

```sh
docker build -t bajjy-org .
docker run --rm -p 3000:3000 \
  -e GITHUB_USERNAME=bajjy \
  -e GITHUB_TOKEN=ghp_xxx \
  bajjy-org
# http://localhost:3000
```

Or with compose:

```sh
cp .env.example .env
# edit .env if you want to inject GITHUB_TOKEN
docker compose up -d --build
```

## Coolify deployment

The VPS at `http://178.104.235.77:8000/` already runs Coolify. Steps:

1. **In Coolify**, create a new **Application** -> **Public repository** and
   point it at `https://github.com/bajjy/bajjy_org` (or push this folder there).
2. **Build pack**: pick **Dockerfile**. No additional config needed.
3. **Environment variables**:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `GITHUB_USERNAME=bajjy`
   - `GITHUB_TOKEN=` *(optional — raises GitHub API rate limit)*
   - `GITHUB_CACHE_TTL_SECONDS=900`
   - `SITE_ORIGIN=https://bajjy.org`
4. **Port**: `3000`. **Health check path**: `/health`.
5. **Domains**: attach `bajjy.org` (or pick any subdomain Coolify offers).
6. **Deploy**. Subsequent pushes to the wired branch redeploy automatically.

The Dockerfile is multi-stage (build with devDependencies, run with prod-only
node_modules + dist + server). The runtime image is small enough for a tiny
Coolify app slot.

## Adding content

- **Posts** — drop a markdown file in `content/posts/` named
  `YYYY-MM-DD-slug.md`. Front-matter:
  ```yaml
  ---
  title: ...
  date: 2026-04-29
  classification: BROADCAST_OPEN
  summary: One-line summary.
  tags: [tag1, tag2]
  coords: 50.4501N / 30.5234E
  ---
  ```
- **Bio / production / now / uses** — edit `content/bio.md`,
  `content/production.md`, `content/now.md`, `content/uses.md`.
  Markdown renders directly in the matching page.

## Project layout

```
bajjy_org/
  index.html              Vite entry
  vite.config.js
  package.json            single root package.json
  Dockerfile              multi-stage build for Coolify
  docker-compose.yml
  .env.example

  public/                 Vite public dir (favicon etc.)
  client/                 Vue 3 source
    main.js
    App.vue
    router.js
    composables/
    components/           shared components (TopBar, SideBar, Panel, Terminal, ...)
    views/                one .vue per route
    assets/css/           protocol88.css + components.css

  src/                    Express backend
    app.js                entry point
    config/index.js
    services/
      github.js           cached repo fetcher
      content.js          markdown loader
    routes/
      api.js              /api/* endpoints
      health.js           /health

  content/                markdown content
    bio.md
    production.md
    now.md
    uses.md
    posts/*.md

  protocol88_theme/       reference theme variants (not built into app)
```

## Design system

The site is a distillation of the 16 PROTOCOL_88_EVO theme variants in
`/protocol88_theme/`. Each page lifts its main component from a different
variant while sharing one shell, palette, and typography stack:

- **DOSSIER** (home) borrows from `operator_dossier_v2`
- **EXPERIMENTS** (projects) reuses the matrix grid from `encrypted_matrix_v2`
- **PRODUCTION** uses dashboard panels from `core_interface_v2`
- **LOGS** is the tactical stream feed from `tactical_stream_v2`
- **LOG_DETAIL** picks up the dossier-style article rail from `tablet_dossier`

Mobile collapse and the side-drawer are lifted from the `_m` mobile variants.

## License

MIT.
