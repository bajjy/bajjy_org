<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
const route = useRoute();
const node = computed(() => (route.meta.id || 'unknown').toUpperCase());
</script>

<template>
  <div class="page-foot">
    <div class="page-foot__signals">
      <span>STATUS: OPERATIONAL</span>
      <span>LATENCY: 4MS</span>
      <span>THREAT_LEVEL: MINIMAL</span>
      <span>NODE: {{ node }}</span>
    </div>
    <div class="row gap-2">
      <span class="mso mso--xs">lock_open</span>
      <span>ENCRYPTED_LINK_ESTABLISHED</span>
    </div>
  </div>
</template>
