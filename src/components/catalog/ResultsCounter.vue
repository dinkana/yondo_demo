<template>
    <div class="flex items-center gap-8 font-body text-sm text-ink-2">
      <span>Найдено:</span>
      <span class="font-semibold text-ink nums">{{ displayCount }}</span>
      <span>{{ toursForm }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed, onUnmounted } from 'vue'
  import { pluralize } from '@/utils/pluralize'
  
  const props = defineProps<{ count: number }>()
  
  const displayCount = ref(props.count)
  let frame = 0
  
  watch(() => props.count, (newCount) => {
    cancelAnimationFrame(frame)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      displayCount.value = newCount
      return
    }
    const start = displayCount.value
    const diff = newCount - start
    const duration = 300
    const startTime = performance.now()
  
    function animate(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      displayCount.value = Math.round(start + diff * progress)
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }
  
    frame = requestAnimationFrame(animate)
  })
  onUnmounted(() => cancelAnimationFrame(frame))
  
  const toursForm = computed(() => pluralize(displayCount.value, ['тур', 'тура', 'туров']))
  </script>