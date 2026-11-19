<template>
    <div class="quick-bar"><div class="quick-inner">
      <BaseChip
        v-for="type in quickFilters"
        :key="type.value"
        :active="isActive(type.value)"
        @click="toggleFilter(type.value)"
      >
        {{ type.label }}
      </BaseChip>
      <button
        class="all-filters"
        @click="$emit('openSheet')"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 7h8m5 0h5M3 17h3m5 0h10"/><circle cx="13" cy="7" r="2.5"/><circle cx="8.5" cy="17" r="2.5"/></svg>Все фильтры
      </button>
    </div></div>
  </template>
  
  <script setup lang="ts">
  import BaseChip from '@/components/BaseChip.vue'
  import type { CatalogFilters } from '@/composables/useCatalogFilters'
  
  const props = defineProps<{ filters: CatalogFilters }>()
  const emit = defineEmits<{
    update: [filters: Partial<CatalogFilters>]
    openSheet: []
  }>()
  
  const quickFilters = [
    { value: 'горы', label: 'Горы' },
    { value: 'пещеры', label: 'Пещеры' },
    { value: 'сплав', label: 'Сплавы' },
    { value: 'озёра', label: 'Озёра' },
    { value: 'kids', label: 'С детьми' }
  ]
  
  function isActive(value: string): boolean {
    if (value === 'kids') return props.filters.kids
    return props.filters.types.includes(value as any)
  }
  
  function toggleFilter(value: string) {
    if (value === 'kids') {
      emit('update', { kids: !props.filters.kids })
    } else {
      const types = props.filters.types.includes(value as any)
        ? props.filters.types.filter(t => t !== value)
        : [...props.filters.types, value as any]
      emit('update', { types })
    }
  }
  </script>
<style scoped>
.quick-bar{background:#fbfaf5;border-bottom:1px solid var(--line)}.quick-inner{max-width:80rem;margin:auto;padding:10px 16px;display:flex;gap:7px;align-items:center;flex-wrap:wrap}.all-filters{display:flex;gap:7px;align-items:center;justify-content:center;margin-left:auto;color:#294d36;font-size:14px;font-weight:600;min-height:40px;padding:0 10px;border-radius:10px}.all-filters:hover{background:#e8eee3}.quick-inner :deep(button[aria-pressed]){min-height:40px;white-space:nowrap}.quick-inner :deep(button[aria-pressed=true]){box-shadow:inset 0 0 0 1px #2f533c}
@media(max-width:640px){.quick-inner{gap:5px;padding:8px 12px}.quick-inner :deep(button[aria-pressed]){padding:6px 10px;font-size:13px}.all-filters{font-size:13px;margin-left:0;padding:0 6px}}
</style>