<template>
    <aside class="hidden md:block w-[clamp(202px,19vw,260px)] shrink-0">
      <div class="sticky top-16 bg-surface rounded-card p-16 border border-line space-y-24">
        <div class="flex items-center justify-between">
          <h2 class="font-heading text-lg font-semibold text-ink">Фильтры</h2>
          <button
            v-if="hasActiveFilters"
            class="text-sm text-g-600 font-medium hover:underline"
            @click="$emit('reset')"
          >
            Сбросить
          </button>
        </div>
  
        <div>
          <label class="block font-body text-sm font-medium text-ink mb-8">Длительность</label>
          <div class="flex flex-wrap gap-8">
            <BaseChip :active="filters.days === '1'" @click="setDays('1')">1 день</BaseChip>
            <BaseChip :active="filters.days === '2-3'" @click="setDays('2-3')">2-3 дня</BaseChip>
            <BaseChip :active="filters.days === '4-7'" @click="setDays('4-7')">4-7 дней</BaseChip>
          </div>
        </div>
  
        <div>
          <label class="block font-body text-sm font-medium text-ink mb-8">Максимальная цена</label>
          <input
            type="number"
            :value="filters.priceMax"
            @input="setPriceMax(($event.target as HTMLInputElement).value ? parseInt(($event.target as HTMLInputElement).value) : null)"
            aria-label="Максимальная цена" placeholder="До 15000 ₽"
            class="w-full bg-surface border border-line rounded-input px-12 py-12 font-body text-ink"
          />
        </div>
  
        <div>
          <label class="flex items-center gap-8 font-body text-sm font-medium text-ink">
            <input
              type="checkbox"
              :checked="filters.kids"
              @change="setKids(($event.target as HTMLInputElement).checked)"
              class="w-16 h-16 rounded"
            />
            С детьми
          </label>
          <input
            v-if="filters.kids"
            type="number"
            :value="filters.childAge"
            @input="setChildAge(($event.target as HTMLInputElement).value ? parseInt(($event.target as HTMLInputElement).value) : null)"
            aria-label="Возраст ребёнка" placeholder="Возраст ребёнка"
            class="w-full mt-8 bg-surface border border-line rounded-input px-12 py-12 font-body text-ink"
          />
        </div>
  
        <div>
          <label class="flex items-center gap-8 font-body text-sm font-medium text-ink">
            <input
              type="checkbox"
              :checked="filters.onlyAvailable"
              @change="setAvailable(($event.target as HTMLInputElement).checked)"
              class="w-16 h-16 rounded"
            />
            Только свободные даты
          </label>
        </div>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import BaseChip from '@/components/BaseChip.vue'
  import type { CatalogFilters } from '@/composables/useCatalogFilters'
  
  const props = defineProps<{ filters: CatalogFilters }>()
  const emit = defineEmits<{
    update: [filters: Partial<CatalogFilters>]
    reset: []
  }>()
  
  const hasActiveFilters = computed(() => {
    return props.filters.days || props.filters.priceMax || props.filters.kids || props.filters.onlyAvailable
  })
  
  function setDays(days: string | null) {
    emit('update', { days: props.filters.days === days ? null : days })
  }
  
  function setPriceMax(price: number | null) {
    emit('update', { priceMax: price })
  }
  
  function setKids(kids: boolean) {
    emit('update', { kids, childAge: kids ? props.filters.childAge : null })
  }
  
  function setChildAge(age: number | null) {
    emit('update', { childAge: age })
  }
  
  function setAvailable(available: boolean) {
    emit('update', { onlyAvailable: available })
  }
  </script>