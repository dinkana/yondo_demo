<template>
    <div class="space-y-16">
      <div class="flex items-center justify-between">
        <h3 class="font-heading text-base font-semibold text-ink">Что взять</h3>
        <span class="font-body text-sm text-ink-2 nums">{{ checkedCount }} / {{ items.length }}</span>
      </div>
      <div class="h-6 bg-line rounded-full overflow-hidden">
        <div
          class="h-full bg-g-500 transition-all duration-250"
          :style="{ width: `${progressPercent}%` }"
        />
      </div>
      <div v-for="group in grouped" :key="group.category" class="space-y-8">
        <h4 class="font-body text-xs font-medium text-ink-3 uppercase tracking-wide">
          {{ group.label }}
        </h4>
        <div class="space-y-4">
          <label
            v-for="item in group.items"
            :key="item.id"
            class="flex items-start gap-12 p-12 bg-surface rounded-card cursor-pointer hover:bg-surface-soft transition-colors"
          >
            <input
              type="checkbox"
              :checked="checked[item.id]"
              @change="toggle(item.id)"
              class="mt-2 w-16 h-16 rounded shrink-0"
            />
            <div class="flex-1">
              <div
                :class="[
                  'font-body text-sm font-medium transition-colors',
                  checked[item.id] ? 'text-ink-3 line-through' : 'text-ink'
                ]"
              >
                {{ item.title }}
              </div>
              <div class="font-body text-xs text-ink-2 mt-2">{{ item.reason }}</div>
            </div>
          </label>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { MemoItem } from '@/composables/useMemoEngine'
  
  const props = defineProps<{
    items: MemoItem[]
    checked: Record<string, boolean>
  }>()
  
  const emit = defineEmits<{
    toggle: [id: string]
  }>()
  
  const categoryLabels: Record<string, string> = {
    base: 'Обязательно',
    clothes: 'Одежда',
    gear: 'Снаряжение',
    kids: 'Для ребёнка',
    weather: 'Погода'
  }
  
  const grouped = computed(() => {
    const categories = ['base', 'clothes', 'gear', 'kids', 'weather'] as const
    return categories
      .map(cat => ({
        category: cat,
        label: categoryLabels[cat],
        items: props.items.filter(i => i.category === cat)
      }))
      .filter(g => g.items.length > 0)
  })
  
  const checkedCount = computed(() => props.items.filter(i => props.checked[i.id]).length)
  const progressPercent = computed(() =>
    props.items.length ? (checkedCount.value / props.items.length) * 100 : 0
  )
  
  function toggle(id: string) {
    emit('toggle', id)
  }
  </script>