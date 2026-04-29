bajjy.org — Agent Context File
Last updated: 2026-04-29
Read automatically at session start. Keep updated after significant implementation sessions.


PURPOSE

Personal site + production dossier for bajjy. Hacker-vibe blog and showcase, built
on the PROTOCOL_88_EVO design system. Lives at bajjy.org. Deploys to Coolify on
the VPS at http://178.104.235.77:8000/.


HOW TO RUN

From project root:
  npm install              # one-time
  npm run dev              # vite (5173) + express (3000) concurrently
  npm run build            # vite build -> dist/
  npm start                # node src/app.js (serves dist + api on :3000)

Docker:
  docker build -t bajjy-org .
  docker run --rm -p 3000:3000 bajjy-org

Compose:
  docker compose up -d --build

Frontend dev URL:    http://localhost:5173
Backend dev URL:     http://localhost:3000
Production URL:      a single port, default 3000, serves dist/ + /api + /health


TECH STACK

Frontend:   Vite 6 + Vue 3.5 (Composition API, <script setup>)
Routing:    vue-router 4 (history mode, lazy routes)
Styling:    Pure CSS — protocol88.css (tokens + shell) + components.css (per-page)
Fonts:      Space Grotesk + JetBrains Mono + Fira Code (Google Fonts CDN)
Icons:      Material Symbols Outlined (CDN)

Backend:    Express 4 on Node 20 (ESM)
Templating: None — backend is API-only, frontend is Vue SPA
Markdown:   marked + front-matter
GitHub:     Native fetch with in-memory TTL cache

State:      Vue refs + provide/inject. NO Pinia, NO Vuex. NO localStorage.
Build:      Vite outputs to ./dist; Express serves ./dist + SPA fallback in prod.


ROUTES

Frontend (vue-router) — only two real pages now:
  /             home          OPERATOR_DOSSIER — bio + production deck +
                              experiment matrix in one scroll.
  /contact      contact       Open channels (email + socials)
  /:catchAll    NotFound      404

Old paths fold into / via redirects:
  /projects, /production, /logs, /logs/:slug, /now, /uses  -> /

Backend (Express):
  GET  /health                JSON liveness probe
  GET  /api/repos             { repos, ranked, tags, stale, error, fetchedAt }
  GET  /api/doc/:name         bio | production
                              => { html, attributes, raw }


CONTENT MODEL

Two long-form markdown files in /content:

  content/bio.md             Operator bio (rendered in home top panel)
  content/production.md      Studio brief (rendered in production deck)


DESIGN SYSTEM (PROTOCOL_88_EVO)

Aesthetic:    Cyber-Technical Brutalism + Tactical Minimalism
Palette:      Desaturated slate base (#141313 surface, #1e293b containers),
              raspberry-red accent (#e11d48 / #f43f5e for hover)
Typography:   Space Grotesk (headers), JetBrains Mono (data), Fira Code (terminals)
Shapes:       NO border-radius. Use clip-path for chamfered/notched corners.
              .clip-corner = 8px chamfer top-right + bottom-left.
              .clip-corner-sm = 4px equivalent. .notched = octagon.
Texture:      .scanlines + .grid-bg + .noise as fixed full-screen overlays.
Components:   .panel + variants, .terminal, .kpi, .chip, .btn, .float-chip.
Decoration:   Every panel gets a .panel-coord micro-metadata string in the corner.

Inspiration is sourced from /protocol88_theme/* — 16 reference variants (operator
dossier, encrypted matrix, tactical stream, core interface, plus tablet/mobile
sub-variants). Each page picks its main component from a different variant.


PROJECT FILE MAP

bajjy_org/
  index.html                  Vite entry
  vite.config.js              build + dev proxy (5173 -> 3000 for /api, /health)
  package.json                single root package.json (frontend + backend)
  Dockerfile                  multi-stage (build deps -> prod deps + dist)
  docker-compose.yml          local + Coolify-friendly compose
  .env.example                env reference

  public/
    favicon.svg               served at /favicon.svg

  client/                     Vue 3 source
    main.js                   bootstraps app + router, imports CSS
    App.vue                   shell — TopBar, SideBar, RouterView, FloatChips
    router.js                 vue-router routes + meta + title sync
    composables/
      useApi.js               tiny fetch wrapper (returns reactive refs)
    components/
      AmbientLayers.vue       grid-bg + noise + scanlines
      TopBar.vue              brand + nav + clock + mobile drawer toggle
      FootSignals.vue         page-foot status row
      FloatChips.vue          bottom-right SIGNAL_LIVE chips
      PageHead.vue            standard page header (class + title + meta blocks)
      Panel.vue               container with title + hint + coord + slot
      Terminal.vue            slate-950 terminal block with prompt lines
      KpiCard.vue             digital readout + bar
    views/
      Home.vue                Merged DOSSIER: bio + socials + production deck
                              + experiment matrix (banners + repos by date).
                              No sidebar. No photo. No ID badge.
      Contact.vue             Channels
      NotFound.vue            404 with glitch text
    assets/css/
      protocol88.css          tokens + shell + components
      components.css          per-page styles (.p-home, .p-projects, ...)

  src/                        Express backend
    app.js                    entry — middleware, api, dist serve, SPA fallback
    config/index.js           parses env into config object
    services/
      github.js               getRepos / rankRepos / deriveTags  (TTL cache)
      content.js              getPosts / getPostBySlug / getDoc
    routes/
      api.js                  /api/* endpoints
      health.js               /health

  content/                    markdown — see CONTENT MODEL above
  protocol88_theme/           reference theme variants (NOT built into app)


ENVIRONMENT VARIABLES

NODE_ENV                  development | production
PORT                      Express bind port (default 3000)
GITHUB_USERNAME           default 'bajjy'
GITHUB_TOKEN              optional — raises GitHub API rate limit (60 -> 5000/h)
GITHUB_CACHE_TTL_SECONDS  default 900 (15 minutes)
SITE_ORIGIN               canonical origin used for og + canonical meta


DESIGN DECISIONS (do not reverse without good reason)

1. Vite + Vue 3 over EJS / SSR — easier infra, easier components, hot reload,
   single bundle. Decided after a brief detour through EJS.

2. Composition API + <script setup>, NO Pinia — component-local refs cover
   everything; cross-component state is small enough.

3. Single root package.json — backend and frontend share node_modules. Simpler
   for Docker (one npm ci, then prune for runtime).

4. Express does double duty in prod — serves dist/ statically AND exposes /api.
   One process, one container, one port. Coolify-friendly.

5. Markdown is the source of truth for prose — bio, production, now, uses, and
   every post. Edit a .md, redeploy. No CMS.

6. GitHub fetched server-side with TTL cache — frontends don't hit github.com
   directly (avoids client-side rate limits and CORS surprises). 15-min cache
   keeps load light, falls back to stale data if GitHub fails.

7. Pure CSS, no Tailwind — the design system is small and bespoke; CSS custom
   properties + a token sheet beats fighting a utility framework.

8. NO border-radius anywhere — Protocol 88 visual law. clip-path everywhere.

9. Lazy-loaded routes — keeps initial bundle tiny.

10. Every panel gets a .panel-coord string — the micro-metadata is part of the
    aesthetic, not decoration to be optional.

11. Single Home page over multi-page split — Pivot 2026-04-29: merged dossier,
    experiments, and production into one scroll. Reasoning: the site is small
    and a recruiter or client should see bio + what we do + what we shipped
    without clicking around. The other indie-web pages (logs, now, uses,
    contact) stay separate because they're conceptually distinct.

12. No sidebar — Pivot 2026-04-29: the SideBar.vue plus topbar was overkill for
    a personal site with five sections. Top bar only; mobile gets a slide-down
    drawer.

13. Banner cards in the experiment matrix — Some shipped products live on their
    own domains (bitmidpoint.com, folio.bitmidpoint.com, duolex.io, tarox.io)
    and aren't on GitHub. Hard-coded as banners in client/views/Home.vue with
    a `pushedAt` date so they slot into the unified feed by recency. Banners
    have a rose gradient fill and a LIVE_NODE pin to differentiate from repos.

14. Variable card sizes — `repo--lg` (span 2 cols) for featured banners and
    the most recent repo, `repo--xl` (span 2 cols x 2 rows) for the flagship
    banner. `grid-auto-flow: dense` packs gaps automatically.

15. Only two real routes — Pivot 2026-04-29: dropped /logs, /now, /uses to
    keep the site small. The Home page is the dossier; /contact is the only
    other real page. Old paths are kept as redirects so any existing links
    don't 404.

16. Watch for NUL truncation on Write — the Cowork file sync occasionally
    pads files with trailing NUL bytes when a Write replaces a longer file
    with a shorter one (or, in one case, truncated content mid-string).
    If a Vue SFC ever shows up with no closing </template>, rewrite it. The
    sandbox-side strip-NULs script is in our session history if needed.


KNOWN TODOS / NEXT UP

LATER (post-launch):
- Real OG image + social card generator
- RSS feed for /logs
- Post search (in-memory fuzzy across titles + tags)
- Site analytics (privacy-friendly — Plausible or Umami)
- Replace placeholder bio.md / production.md / now.md / uses.md with real text
- Add a /talks or /press section if/when needed
- Optional: feed pinned repos via GraphQL instead of REST
- Optional: dark/light toggle (the design only supports dark right now)
