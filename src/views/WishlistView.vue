<template>
  <div class="min-h-screen bg-canvas">
    <main id="main-content">
      <div class="max-w-2xl mx-auto px-16 py-24 space-y-24">
        <div>
          <h1 class="font-heading text-2xl font-bold text-ink mb-8">Желаемое</h1>
          <p class="font-body text-sm text-ink-2">Туры, которые вам понравились</p>
        </div>

        <div v-if="!wishlistTours.length" class="text-center py-48">
          <p class="text-ink-2 mb-16">Нет желаемых туров</p>
          <router-link to="/" class="text-g-600 font-medium hover:underline">Выбрать тур</router-link>
        </div>

        <div v-else class="space-y-12">
          <div
            v-for="tour in wishlistTours"
            :key="tour.id"
            class="bg-surface rounded-card p-16 shadow-sm"
          >
            <router-link :to="{ name: 'tour', params: { slug: tour.slug } }">
              <div class="flex gap-16">
                <div class="w-80 h-80 rounded-image overflow-hidden bg-g-100 shrink-0">
                  <img
                    :src="tour.photos[0]?.src"
                    :alt="tour.photos[0]?.alt"
                    :width="80"
                    :height="80"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div class="flex-1 space-y-8">
                  <h3 class="font-heading text-base font-semibold text-ink">{{ tour.title }}</h3>
                  <p class="font-body text-sm text-ink-2 clamp-2">{{ tour.subtitle }}</p>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-4">
                      <svg class="w-14 h-14 text-star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span class="font-body text-sm font-medium text-ink nums">{{ tour.rating.toFixed(1) }}</span>
                    </div>
                    <div class="font-body text-lg font-semibold text-ink nums">
                      от {{ tour.basePriceK.toLocaleString('ru-RU') }} ₽
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
            <button
              class="mt-12 w-full bg-surface-soft border border-line rounded-button-secondary px-12 py-8 font-body text-sm font-medium text-ink"
              @click="wishlistStore.toggle(tour.id)"
            >
              Убрать из желаемого
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useToursStore } from '@/store/tours'
import { useWishlistStore } from '@/store/wishlist'

const toursStore = useToursStore()
const wishlistStore = useWishlistStore()

const wishlistTours = computed(() => {
  return toursStore.tours.filter(t => wishlistStore.has(t.id))
})
</script>