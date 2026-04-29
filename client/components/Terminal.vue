<script setup>
defineProps({
  title: { type: String, default: 'SYSTEM_DIAGNOSTICS' },
  lines: { type: Array, default: () => [] },
  cursor: { type: Boolean, default: true },
});
</script>

<template>
  <div class="terminal clip-corner-sm">
    <div class="terminal__head">
      <span class="terminal__dot"></span>
      <span class="terminal__title">{{ title }}</span>
    </div>
    <div class="terminal__body">
      <div v-for="(line, i) in lines" :key="i" class="prompt">{{ line }}</div>
      <slot />
      <span v-if="cursor" class="terminal__cursor"></span>
    </div>
  </div>
</template>
