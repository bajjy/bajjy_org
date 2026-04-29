<script setup>
import { RouterLink, useRoute } from 'vue-router';
import PageHead from '../components/PageHead.vue';
import Terminal from '../components/Terminal.vue';

const route = useRoute();
</script>

<template>
  <PageHead title="SIGNAL_LOST" classification="NULL"
            :meta="[{ label: 'CODE', value: '404' }, { label: 'TARGET', value: 'UNKNOWN' }]" />

  <div class="center" style="padding:48px 0">
    <div class="glitch">404</div>
    <p class="t-header mt-4" style="font-size:18px">NO_TRANSMISSION_AT_THIS_PATH</p>
    <p class="t-data text-dim mt-2">{{ route.fullPath }}</p>

    <RouterLink to="/" class="btn mt-6 clip-corner-sm">
      <span class="mso mso--xs">arrow_back</span> RETURN_TO_BASE
    </RouterLink>
  </div>

  <Terminal title="ROUTING_DAEMON" class="mt-6" :lines="[
    'PATH_LOOKUP_FAILED',
    'CACHE_HIT: NONE',
    'FALLBACK: REDIRECT_HOME_RECOMMENDED',
  ]" />
</template>
