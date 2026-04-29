<script setup>
defineProps({
  title:    { type: String, default: '' },
  hint:     { type: String, default: '' },   // top-right small label
  coord:    { type: String, default: '' },   // micro-metadata corner string
  variant:  { type: String, default: 'mid' }, // 'low' | 'mid' | 'high'
  clip:     { type: Boolean, default: false },
});
</script>

<template>
  <div :class="['panel', `panel--${variant}`, clip ? 'clip-corner' : '']">
    <span v-if="coord" class="panel-coord">{{ coord }}</span>
    <div v-if="title || hint" class="spread mb-3">
      <h3 class="t-micro t-rose">{{ title }}</h3>
      <span v-if="hint" class="t-micro">{{ hint }}</span>
    </div>
    <slot />
  </div>
</template>
