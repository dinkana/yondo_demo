<template>
  <div class="booking-action" aria-label="Бронирование тура" role="group">
    <div class="price" aria-live="polite" aria-atomic="true">
      <span class="block text-xs text-ink-2">За взрослого</span>
      <strong class="font-heading nums text-xl text-ink whitespace-nowrap">{{ price.toLocaleString('ru-RU') }} ₽</strong>
    </div>
    <button type="button" :disabled="!departureId" class="reserve" @click="$emit('book')">
      Забронировать <span aria-hidden="true">→</span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ price: number; departureId: string | null }>()
defineEmits<{ book: [] }>()
</script>

<style scoped>
.booking-action { position: fixed; z-index: 40; inset: auto 0 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px 16px; padding: 12px max(16px, env(safe-area-inset-right)) calc(12px + env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left)); background: var(--surface-soft); border-top: 1px solid var(--line-strong); box-shadow: 0 -5px 20px #172a210c; }
.reserve { flex: 1 1 auto; min-height: 48px; padding: 10px 18px; border-radius: 999px; background: var(--g-800); color: #fff; font-weight: 600; }
.reserve span { margin-inline-start: 5px; }
.reserve:not(:disabled):hover { background: var(--g-700); }
.reserve:disabled { background: var(--line); color: var(--ink-2); cursor: not-allowed; }
@media (min-width: 768px) { .booking-action { position: static; padding: 16px 0 0; margin-top: 16px; box-shadow: none; background: transparent; } }
@media (prefers-reduced-motion: no-preference) { .reserve { transition: background-color 140ms, transform 140ms; } .reserve:active:not(:disabled) { transform: translateY(1px); } }
</style>