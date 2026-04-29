<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();

const props = defineProps({
  title:          { type: String, default: '' },
  classification: { type: String, default: '' },
  meta:           { type: Array,  default: () => [] },
});

const title = computed(() => props.title || route.meta.title || '');
const classification = computed(() => props.classification || route.meta.classification || 'OPEN');

// Default meta blocks shown on the right.
const metaBlocks = computed(() => {
  if (props.meta && props.meta.length) return props.meta;
  return [
    { label: 'CLEARANCE', value: 'PUBLIC_R/W' },
    { label: 'SECTOR',    value: (route.meta.id || 'X').toUpperCase() },
  ];
});
</script>

<template>
  <div class="page-head">
    <div>
      <span class="page-head__class">PERSONNEL_FILE // {{ classification }}</span>
      <h1 class="page-head__title">{{ title }}</h1>
    </div>
    <div class="page-head__meta">
      <template v-for="(m, i) in metaBlocks" :key="m.label">
        <div v-if="i > 0" class="page-head__divider"></div>
        <div class="page-head__meta-block">
          <div class="label">{{ m.label }}</div>
          <div class="value">{{ m.value }}</div>
        </div>
      </template>
    </div>
  </div>
</template>
