<script setup>
import { computed, ref } from 'vue';
import PageHead from '../components/PageHead.vue';
import Panel from '../components/Panel.vue';
import { useFetch } from '../composables/useApi.js';

const { data: bio }        = useFetch('/api/doc/bio');
const { data: production } = useFetch('/api/doc/production');
const { data: reposData, error: reposError } = useFetch('/api/repos');

// Hard-coded so they always render even with no backend.
const banners = [
  {
    kind: 'banner',
    name: 'bitmidpoint',
    title: 'BITMIDPOINT',
    description:
      'Live crypto data platform. Per-exchange price spread surfaces arbitrage opportunities aggregators hide.',
    href: 'https://bitmidpoint.com/',
    tags: ['crypto', 'platform', 'live'],
    pushedAt: '2026-04-29T00:00:00Z',
    size: 'xl',
  },
  {
    kind: 'banner',
    name: 'folio.bitmidpoint',
    title: 'CRYFOLIO',
    description:
      'PWA portfolio tracker. Offline-first sync, transactions, web-worker price calc.',
    href: 'https://folio.bitmidpoint.com/',
    tags: ['pwa', 'portfolio'],
    pushedAt: '2026-04-15T00:00:00Z',
    size: 'lg',
  },
  {
    kind: 'banner',
    name: 'duolex',
    title: 'DUOLEX.IO',
    description: 'In-flight commercial product. Coming online.',
    href: 'https://duolex.io/',
    tags: ['saas'],
    pushedAt: '2026-03-20T00:00:00Z',
    size: 'lg',
  },
  {
    kind: 'banner',
    name: 'tarox',
    title: 'TAROX.IO',
    description: 'In-flight commercial product. Coming online.',
    href: 'https://tarox.io/',
    tags: ['saas'],
    pushedAt: '2026-02-10T00:00:00Z',
    size: 'lg',
  },
];

const filter = ref('');

const repoItems = computed(() => {
  const list = reposData.value?.ranked || reposData.value?.repos || [];
  return list
    .filter((r) => r && r.name && r.name !== 'bajjy_org' && !(r.fork && !r.description))
    .map((r) => ({
      kind: 'repo',
      name: r.name,
      title: (r.name || '').toUpperCase().replace(/[-_.]/g, '_'),
      description: r.description || '',
      href: r.htmlUrl || `https://github.com/bajjy/${r.name}`,
      language: r.language,
      tags: r.topics || [],
      stars: r.stars || 0,
      forks: r.forks || 0,
      pushedAt: r.pushedAt,
      archived: !!r.archived,
      fork: !!r.fork,
    }));
});

const allItems = computed(() =>
  [...banners, ...repoItems.value].sort(
    (a, b) => new Date(b.pushedAt) - new Date(a.pushedAt)
  )
);

const tags = computed(() => reposData.value?.tags || []);

const filtered = computed(() => {
  if (!filter.value) return allItems.value;
  const f = filter.value;
  return allItems.value.filter((i) => i.language === f || (i.tags || []).includes(f));
});

const feed = computed(() => {
  let nonBannerSeen = 0;
  return filtered.value.map((it) => {
    let size = 'sm';
    if (it.kind === 'banner') size = it.size || 'lg';
    else { nonBannerSeen += 1; if (nonBannerSeen === 1) size = 'lg'; }
    return { ...it, size };
  });
});

const fmt = (iso) => (iso ? iso.slice(0, 10) : '—');

const socials = [
  { icon: 'code',         label: 'GITHUB',    handle: '@bajjy',      href: 'https://github.com/bajjy' },
  { icon: 'work',         label: 'LINKEDIN',  handle: 'in/bajjy',    href: 'https://www.linkedin.com/in/bajjy/' },
  { icon: 'photo_camera', label: 'INSTAGRAM', handle: '@bajjy.xilo', href: 'https://www.instagram.com/bajjy.xilo/' },
  { icon: 'forum',        label: 'THREADS',   handle: '@bajjy.xilo', href: 'https://www.threads.com/@bajjy.xilo' },
];

const services = [
  { title: 'WEB_PLATFORMS',           body: 'Greenfield product builds, full-stack. Node, Vue, vanilla. Performance-first.' },
  { title: 'GAME_TECH',               body: 'Browser-native game engines, board-game digitisation, real-time multiplayer.' },
  { title: 'AUTOMATION_R&D',          body: 'Tiny systems that do one thing well — file processors, ops glue, scrapers.' },
  { title: 'EXPERIMENTAL_INTERFACES', body: 'HUDs, dashboards, dossiers — interfaces that look like instruments.' },
];
</script>

<template>
  <PageHead :meta="[
    { label: 'CHANNEL', value: 'OPEN' },
    { label: 'STATUS',  value: 'ACTIVE' },
  ]" />

  <Panel variant="low" :clip="true" coord="COORD_88.01.22.99">
    <div class="prose" v-if="bio?.html" v-html="bio.html"></div>
    <p v-else class="t-data text-mid">Operator profile loading…<span class="terminal__cursor"></span></p>

    <div class="divider"></div>
    <div class="t-micro mb-2">OPEN_CHANNELS</div>
    <div class="social-grid">
      <a v-for="s in socials" :key="s.label" :href="s.href" target="_blank" rel="noopener" class="social-link clip-corner-sm">
        <span class="mso mso--sm">{{ s.icon }}</span>
        <span>
          <span class="label">{{ s.label }}</span>
          <span>{{ s.handle }}</span>
        </span>
      </a>
    </div>
  </Panel>

  <div class="section-head">
    <h2>PRODUCTION_DECK</h2>
    <span class="hint">// WHAT_THE_STUDIO_BUILDS</span>
  </div>

  <Panel variant="mid">
    <div class="prose" v-if="production?.html" v-html="production.html"></div>
    <p v-else class="t-data text-mid">Loading studio brief…</p>
  </Panel>

  <div class="services mt-4">
    <div v-for="s in services" :key="s.title" class="service">
      <h3>{{ s.title }}</h3>
      <p>{{ s.body }}</p>
    </div>
  </div>

  <div class="section-head mt-6">
    <h2>EXPERIMENT_MATRIX</h2>
    <span class="hint">// SORTED_BY_LAST_UPDATE — {{ filtered.length }} NODES</span>
  </div>

  <p v-if="reposError" class="t-data t-rose mb-3">
    [WARN] github fetch failed ({{ reposError }}) — showing curated nodes only.
  </p>

  <div class="filter-bar">
    <button :class="{ active: !filter }" @click="filter = ''">
      ALL <span class="count">{{ allItems.length }}</span>
    </button>
    <button v-for="t in tags.slice(0, 12)" :key="t.tag"
            :class="{ active: filter === t.tag }"
            @click="filter = filter === t.tag ? '' : t.tag">
      {{ t.tag.toUpperCase() }} <span class="count">{{ t.count }}</span>
    </button>
  </div>

  <div class="matrix">
    <a v-for="it in feed" :key="it.kind + ':' + it.name"
       :href="it.href" target="_blank" rel="noopener"
       :class="['repo', it.kind === 'banner' ? 'repo--banner' : '', it.size === 'xl' ? 'repo--xl' : '', it.size === 'lg' ? 'repo--lg' : '']">
      <span v-if="it.archived" class="repo__archive">ARCHIVED</span>
      <span v-if="it.kind === 'banner'" class="repo__pin">LIVE_NODE</span>

      <div class="repo__head">
        <h3 class="repo__title">{{ it.title }}</h3>
        <span class="repo__lang" v-if="it.language">{{ it.language }}</span>
      </div>

      <p class="repo__desc">{{ it.description || 'No transmission log attached.' }}</p>

      <div v-if="it.tags && it.tags.length" class="repo__tags">
        <span v-for="t in it.tags.slice(0, 4)" :key="t" class="chip">{{ t }}</span>
      </div>

      <div v-if="it.kind === 'banner'" class="visit-cta">
        VISIT_SITE <span class="mso mso--xs">arrow_outward</span>
      </div>

      <div class="repo__meta">
        <div class="row" v-if="it.kind === 'repo'">
          <span class="repo__star"><span class="mso mso--xs">star</span> {{ it.stars }}</span>
          <span class="repo__star"><span class="mso mso--xs">call_split</span> {{ it.forks }}</span>
        </div>
        <div class="row" v-else>
          <span class="t-rose-bright"><span class="mso mso--xs">link</span> EXTERNAL</span>
        </div>
        <span>UPD: {{ fmt(it.pushedAt) }}</span>
      </div>
    </a>
  </div>
</template>
