import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  { path: '/',           name: 'home',    component: () => import('./views/Home.vue'),
    meta: { id: 'home', title: 'OPERATOR_DOSSIER', classification: 'OPEN_BROADCAST' } },

  { path: '/contact',    name: 'contact', component: () => import('./views/Contact.vue'),
    meta: { id: 'contact', title: 'OPEN_CHANNEL', classification: 'DIRECT_LINE' } },

  // Old paths — fold to /. Keep redirects so any external links still land
  // somewhere useful.
  { path: '/projects',   redirect: '/' },
  { path: '/production', redirect: '/' },
  { path: '/logs',       redirect: '/' },
  { path: '/logs/:slug', redirect: '/' },
  { path: '/now',        redirect: '/' },
  { path: '/uses',       redirect: '/' },

  { path: '/:catchAll(.*)', name: '404',  component: () => import('./views/NotFound.vue'),
    meta: { id: 'error', title: 'SIGNAL_LOST', classification: 'NULL' } },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0 }; },
});

router.afterEach((to) => {
  const t = to.meta?.title || 'BAJJY';
  document.title = `${t} // BAJJY.ORG`;
  if (to.meta?.id) document.body.className = `p-${to.meta.id}`;
});
