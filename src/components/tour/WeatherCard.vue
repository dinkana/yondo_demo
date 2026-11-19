<template>
    <div class="bg-surface rounded-card p-16 shadow-sm">
      <div class="flex items-center justify-between mb-12">
        <h3 class="font-heading text-lg font-semibold text-ink">Погода</h3>
        <span v-if="data?.source === 'climate'" class="font-body text-xs text-ink-3">Климатическая норма</span>
      </div>
      <div v-if="loading" class="text-center py-16">
        <div class="text-ink-3 text-sm">Загрузка...</div>
      </div>
      <div v-else-if="error" class="text-center py-16">
        <div class="text-ink-3 text-sm">{{ error }}</div>
      </div>
      <div v-else-if="data" class="space-y-12">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-body text-sm text-ink-2">Минимальная</div>
            <div class="font-body text-2xl font-semibold text-ink nums">{{ data.tMin }}°C</div>
          </div>
          <div>
            <div class="font-body text-sm text-ink-2">Максимальная</div>
            <div class="font-body text-2xl font-semibold text-ink nums">{{ data.tMax }}°C</div>
          </div>
          <div>
            <div class="font-body text-sm text-ink-2">Осадки</div>
            <div class="font-body text-2xl font-semibold text-ink nums">{{ data.precip }}%</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    loading: boolean
    error: string | null
    data: { tMin: number; tMax: number; precip: number; source: 'climate' | 'forecast' } | null
  }>()
  </script>