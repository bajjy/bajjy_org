<script setup>
import AmbientLayers from './components/AmbientLayers.vue';
import TopBar from './components/TopBar.vue';
import FloatChips from './components/FloatChips.vue';
import FootSignals from './components/FootSignals.vue';
import { ref } from 'vue';

// Konami easter egg.
const seq = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
let pos = 0;
const breach = ref(false);
window.addEventListener('keydown', (e) => {
  pos = e.key === seq[pos] ? pos + 1 : 0;
  if (pos === seq.length) { pos = 0; breach.value = true; setTimeout(() => (breach.value = false), 2400); }
});
</script>

<template>
  <AmbientLayers />
  <TopBar />

  <main class="shell" id="main">
    <div class="container">
      <RouterView v-slot="{ Component, route }">
        <component :is="Component" :key="route.fullPath" />
      </RouterView>
      <FootSignals />
    </div>
  </main>

  <FloatChips />

  <Transition name="breach-fade">
    <div v-if="breach" class="float-chip glow-rose"
         style="position:fixed;top:60px;left:50%;transform:translateX(-50%);z-index:999">
      <span class="dot"></span>
      <span>BREACH_INITIATED</span>
    </div>
  </Transition>
</template>

<style>
.breach-fade-enter-active, .breach-fade-leave-active { transition: opacity .2s; }
.breach-fade-enter-from,    .breach-fade-leave-to    { opacity: 0; }
</style>
