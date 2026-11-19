<template>
  <fieldset class="min-w-0">
    <legend class="font-heading text-lg font-semibold text-ink mb-12">Выберите дату</legend>
    <div class="grid gap-8">
      <label v-for="dep in departures" :key="dep.id" class="departure" :class="{ selected: selectedId === dep.id, full: seatsLeft(dep) <= 0 }">
        <input type="radio" :name="group" :value="dep.id" :checked="selectedId === dep.id" :disabled="seatsLeft(dep) <= 0" @change="$emit('select', dep.id)" />
        <span class="min-w-0">
          <span class="block font-semibold text-ink">{{ dateLabel(dep) }}</span>
          <span class="block text-sm text-ink-2">{{ seatsLeft(dep) > 0 ? `${seatsLeft(dep)} ${pluralize(seatsLeft(dep), ['место', 'места', 'мест'])}` : 'Мест нет' }}</span>
        </span>
        <span class="text-right"><strong class="block nums whitespace-nowrap">{{ dep.priceK.toLocaleString('ru-RU') }} ₽</strong><span class="block text-xs text-ink-2">за взрослого</span></span>
      </label>
      <p v-if="!departures.length" class="text-sm text-ink-2">Дат для бронирования пока нет.</p>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
import { useId } from 'vue'
import type { Departure } from '@/schemas/tour'
import { pluralize } from '@/utils/pluralize'

defineProps<{ departures: Departure[]; selectedId: string | null }>()
defineEmits<{ select: [id: string] }>()
const group = useId()
const seatsLeft = (dep: Departure) => dep.seatsTotal - dep.seatsTaken
function dateLabel(dep: Departure) {
  const day = new Date()
  day.setDate(day.getDate() + dep.offsetDays)
  return day.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric', month: 'long' })
}
</script>

<style scoped>
.departure { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 12px; padding: 14px 12px; border: 1px solid var(--line-strong); border-radius: 12px; background: var(--surface); cursor: pointer; }
.departure input { width: 18px; height: 18px; accent-color: var(--g-700); }
.departure:not(.full):hover { border-color: var(--g-600); }
.departure.selected { background: var(--g-50); border-color: var(--g-700); box-shadow: inset 3px 0 var(--g-700); }
.departure:has(input:focus-visible) { outline: 2px solid var(--g-700); outline-offset: 3px; }
.departure.full { background: var(--surface-soft); color: var(--ink-2); cursor: not-allowed; }
@media (prefers-reduced-motion: no-preference) { .departure { transition: background-color 150ms, border-color 150ms; } }
</style>