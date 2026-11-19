<template>
  <BaseSheet :open="open" title="Фильтры" @close="$emit('close')">
    <div class="space-y-24">
      <div>
        <label class="block font-body text-sm font-medium text-ink mb-8">Длительность</label>
        <div class="flex gap-8">
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

      <div class="flex gap-8 pt-16 border-t border-line">
        <button
          class="flex-1 bg-surface border border-line rounded-button-secondary px-16 py-12 font-body text-sm font-medium text-ink"
          @click="$emit('reset')"
        >
          Сбросить
        </button>
        <button
          class="flex-1 bg-action-ink text-white rounded-button-primary px-16 py-12 font-body text-sm font-medium"
          @click="$emit('close')"
        >
          Применить
        </button>
      </div>
    </div>
  </BaseSheet>
</template>

<script setup lang="ts">
import BaseSheet from '@/components/BaseSheet.vue'
import BaseChip from '@/components/BaseChip.vue'
import type { CatalogFilters } from '@/composables/useCatalogFilters'

const props = defineProps<{ open: boolean; filters: CatalogFilters }>()
const emit = defineEmits<{
  close: []
  reset: []
  update: [filters: Partial<CatalogFilters>]
}>()

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