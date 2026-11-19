<template>
    <div>
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <BaseSkeleton v-for="i in 6" :key="i" className="h-[320px] rounded-card" />
      </div>
      <div v-else-if="error" class="text-center py-48">
        <p class="text-ink-2 mb-16">Не удалось загрузить каталог</p>
        <BaseButton variant="secondary" @click="$emit('retry')">Попробовать снова</BaseButton>
      </div>
      <div v-else-if="!tours.length" class="text-center py-48">
        <p class="font-heading text-xl text-ink mb-8">Ничего не найдено</p>
        <p class="text-ink-2 mb-16">Попробуйте изменить фильтры</p>
        <BaseButton variant="secondary" @click="$emit('reset')">Сбросить фильтры</BaseButton>
      </div>
      <TransitionGroup v-else tag="div" name="match" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        <TourCard v-for="tour in tours" :key="tour.id" :tour="tour" />
      </TransitionGroup>
    </div>
  </template>
  
  <script setup lang="ts">
  import type { Tour } from '@/schemas/tour'
  import TourCard from './TourCard.vue'
  import BaseSkeleton from '@/components/BaseSkeleton.vue'
  import BaseButton from '@/components/BaseButton.vue'
  
  defineProps<{
    tours: Tour[]
    loading: boolean
    error: boolean
  }>()
  
  defineEmits<{
    retry: []
    reset: []
  }>()
  </script>
<style scoped>
@media(prefers-reduced-motion:no-preference){.match-enter-active{transition:opacity 180ms ease-out,translate 180ms var(--ease)}.match-enter-from{opacity:.6;translate:0 4px}.match-move{transition:transform 200ms var(--ease)}}.match-leave-active{display:none}
</style>