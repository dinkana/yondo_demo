<template>
  <figure class="rounded-image overflow-hidden bg-g-100">
    <img :src="REGION_MAPS[region]" :alt="alt || 'Схема района маршрута'"
      width="400" height="240" class="block w-full object-contain" :style="{ height: `${height ?? 240}px` }" />
    <figcaption class="px-16 py-12 bg-surface-soft text-sm text-ink-2">
      <p class="mb-8 text-xs">Схема района · без масштаба</p>
      <ol v-if="points.length" class="flex flex-wrap gap-x-16 gap-y-4">
        <li v-for="(point, index) in points" :key="index">{{ index + 1 }}. {{ point.name }}</li>
      </ol>
    </figcaption>
  </figure>
</template>
<script setup lang="ts">
import type { RegionId, Tour } from '@/schemas/tour'
import { REGION_MAPS } from '@/assets/maps'
defineProps<{ points: Tour['route']['points']; region: RegionId; height?: number; alt?: string }>()
</script>
