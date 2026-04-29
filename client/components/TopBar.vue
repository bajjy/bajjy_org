<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { RouterLink } from 'vue-router';

// Live UTC clock for the hacker-vibe data readout.
const clock = ref('00:00:00 UTC');
const sessionId = `88-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
let timer;
const tick = () => {
  const d = new Date();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  const ss = String(d.getUTCSeconds()).padStart(2, '0');
  clock.value = `${hh}:${mm}:${ss} UTC`;
};
onMounted(() => { tick(); timer = setInterval(tick, 1000); });
onUnmounted(() => clearInterval(timer));
</script>

<template>
  <header class="topbar">
    <div class="row gap-4">
      <RouterLink to="/" class="topbar__brand">
        BAJJY<span style="color:var(--rose-400)">.</span>ORG
      </RouterLink>
      <nav class="topbar__nav" aria-label="Primary">
        <RouterLink to="/">DOSSIER</RouterLink>
        <RouterLink to="/contact">CHANNEL</RouterLink>
      </nav>
    </div>

    <div class="topbar__right">
      <span class="t-code hide-sm">{{ clock }}</span>
      <span class="t-code hide-sm">SESSION_{{ sessionId }}</span>
      <button class="topbar__icon-btn hide-sm" aria-label="Terminal"><span class="mso">terminal</span></button>
      <button class="topbar__icon-btn hide-sm" aria-label="Security"><span class="mso">security</span></button>
    </div>
  </header>
</template>
