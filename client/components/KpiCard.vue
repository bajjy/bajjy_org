<script setup>
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  unit:  { type: String, default: '' },
  pct:   { type: Number, default: 0 },  // 0..100 — fills the bottom bar
});
</script>

<template>
  <div class="kpi clip-corner-sm">
    <div class="kpi__label">{{ label }}</div>
    <div class="kpi__value">{{ value }}<span v-if="unit" class="kpi__unit">{{ unit }}</span></div>
    <div class="kpi__bar">
      <div class="kpi__bar-fill" :style="{ width: `${Math.max(0, Math.min(100, pct))}%` }"></div>
    </div>
  </div>
</template>
