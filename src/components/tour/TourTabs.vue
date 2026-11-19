<template>
    <div>
      <div class="flex border-b border-line mb-16">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'flex-1 px-16 py-12 font-body text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-g-600 border-b-2 border-g-600'
              : 'text-ink-2 hover:text-ink'
          ]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>
      <div>
        <div v-if="activeTab === 'about'" class="space-y-16">
          <div>
            <h4 class="font-heading text-base font-semibold text-ink mb-8">Включено</h4>
            <ul class="space-y-4">
              <li v-for="item in tour.included" :key="item" class="flex gap-8 font-body text-sm text-ink">
                <span class="text-g-600">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-heading text-base font-semibold text-ink mb-8">Не включено</h4>
            <ul class="space-y-4">
              <li v-for="item in tour.excluded" :key="item" class="flex gap-8 font-body text-sm text-ink">
                <span class="text-danger">✕</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="font-heading text-base font-semibold text-ink mb-8">Что взять</h4>
            <ul class="space-y-4">
              <li v-for="item in tour.gearBase" :key="item" class="flex gap-8 font-body text-sm text-ink">
                <span class="text-ink-3">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="activeTab === 'route'" class="space-y-16">
          <div class="bg-surface-soft rounded-card p-16">
            <div class="flex items-center justify-between mb-12">
              <span class="font-body text-sm text-ink-2">Из города</span>
              <span class="font-body text-sm font-medium text-ink">{{ tour.route.fromCity }}</span>
            </div>
            <div class="flex items-center justify-between mb-12">
              <span class="font-body text-sm text-ink-2">Расстояние</span>
              <span class="font-body text-sm font-medium text-ink nums">{{ tour.route.distanceKm }} км</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="font-body text-sm text-ink-2">Набор высоты</span>
              <span class="font-body text-sm font-medium text-ink nums">+{{ tour.route.ascentM }} м</span>
            </div>
          </div>
          <RouteMap
            :points="tour.route.points"
            :region="tour.region"
            :height="300"
            :alt="`Маршрут ${tour.title}`"
          />
        </div>
        <div v-if="activeTab === 'reviews'" class="space-y-16">
          <div v-if="!reviews.length" class="text-center py-32">
            <p class="text-ink-2">Отзывов пока нет</p>
          </div>
          <div v-else class="space-y-16">
            <div v-for="review in reviews" :key="review.id" class="bg-surface rounded-card p-16 shadow-sm">
              <div class="flex items-start justify-between mb-8">
                <div>
                  <div class="font-body text-sm font-medium text-ink">{{ review.author }}</div>
                  <div class="font-body text-xs text-ink-2 mt-4">{{ review.offsetAgoDays }} дн. назад</div>
                </div>
                <div class="flex items-center gap-2">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    :class="['w-12 h-12', i <= review.rating ? 'text-star' : 'text-line']"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <p class="font-body text-sm text-ink">{{ review.text }}</p>
              <div v-if="review.photos.length" class="flex gap-8 mt-12">
                <img
                  v-for="photo in review.photos"
                  :key="photo"
                  :src="photo"
                  alt="Фото из отзыва"
                  width="60"
                  height="60"
                  class="w-60 h-60 rounded-image object-cover"
                  loading="lazy"
                />
              </div>
              <div v-if="review.organizerReply" class="mt-12 p-12 bg-g-50 rounded-card">
                <div class="font-body text-xs font-medium text-g-700 mb-4">Ответ организатора</div>
                <p class="font-body text-sm text-ink">{{ review.organizerReply }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { Tour } from '@/schemas/tour'
  import type { Review } from '@/schemas/organizer'
  import RouteMap from '@/components/RouteMap.vue'
  
  const props = defineProps<{
    tour: Tour
    reviews: Review[]
  }>()
  
  const tabs = [
    { id: 'about', label: 'О туре' },
    { id: 'route', label: 'Маршрут' },
    { id: 'reviews', label: `Отзывы ${props.reviews.length}` }
  ]
  
  const activeTab = ref('about')
  </script>