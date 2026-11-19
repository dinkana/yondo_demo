<template>
  <div class="min-h-screen bg-canvas pb-80 md:pb-16">
    <main id="main-content">
      <div v-if="!organizer" class="max-w-2xl mx-auto px-16 py-48 text-center">
        <p class="text-ink-2 mb-16">Организатор не найден</p>
        <router-link to="/" class="text-g-600 font-medium hover:underline">Вернуться в каталог</router-link>
      </div>
      <div v-else class="max-w-2xl mx-auto px-16 py-24 space-y-24">
        <div class="bg-surface rounded-card p-16 shadow-sm space-y-16">
          <div class="flex items-start gap-16">
            <div class="w-64 h-64 rounded-full bg-g-100 flex items-center justify-center shrink-0">
              <span class="font-heading text-2xl font-bold text-g-600">
                {{ organizer.name.charAt(0) }}
              </span>
            </div>
            <div class="flex-1">
              <h1 class="font-heading text-2xl font-bold text-ink mb-4">{{ organizer.name }}</h1>
              <p class="font-body text-sm text-ink-2 mb-8">{{ organizer.legal }} · {{ organizer.city }}</p>
              <div class="flex items-center gap-12">
                <div class="flex items-center gap-4">
                  <svg class="w-14 h-14 text-star" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span class="font-body text-sm font-medium text-ink nums">{{ organizer.rating.toFixed(1) }}</span>
                </div>
                <span class="text-line">·</span>
                <span class="font-body text-sm text-ink-2">{{ organizer.toursCount }} туров</span>
                <span class="text-line">·</span>
                <span class="font-body text-sm text-ink-2">с {{ organizer.since }}</span>
              </div>
            </div>
          </div>
          <p class="font-body text-sm text-ink">{{ organizer.about }}</p>
        </div>

        <div v-if="guides.length" class="space-y-12">
          <h2 class="font-heading text-lg font-semibold text-ink">Гиды</h2>
          <div class="space-y-8">
            <div
              v-for="guide in guides"
              :key="guide.id"
              class="bg-surface rounded-card p-16 shadow-sm"
            >
              <div class="flex items-start gap-12">
                <div class="w-48 h-48 rounded-full bg-g-100 flex items-center justify-center shrink-0">
                  <span class="font-heading text-lg font-bold text-g-600">
                    {{ guide.name.charAt(0) }}
                  </span>
                </div>
                <div class="flex-1">
                  <h3 class="font-heading text-base font-semibold text-ink mb-4">{{ guide.name }}</h3>
                  <p class="font-body text-sm text-ink-2 mb-8">{{ guide.bio }}</p>
                  <div class="flex items-center gap-12 text-xs text-ink-2">
                    <span>{{ guide.experienceYears }} лет опыта</span>
                    <span class="text-line">·</span>
                    <div class="flex items-center gap-4">
                      <svg class="w-12 h-12 text-star" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span class="nums">{{ guide.rating.toFixed(1) }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="tours.length" class="space-y-12">
          <h2 class="font-heading text-lg font-semibold text-ink">Туры</h2>
          <div class="space-y-8">
            <div
              v-for="tour in tours"
              :key="tour.id"
              class="bg-surface rounded-card p-16 shadow-sm"
            >
              <router-link :to="{ name: 'tour', params: { slug: tour.slug } }">
                <h3 class="font-heading text-base font-semibold text-ink mb-4">{{ tour.title }}</h3>
                <p class="font-body text-sm text-ink-2 clamp-2">{{ tour.subtitle }}</p>
                <div class="flex items-center justify-between mt-8">
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
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useToursStore } from '@/store/tours'

const route = useRoute()
const toursStore = useToursStore()

const organizer = computed(() => toursStore.getOrganizerById(route.params.id as string).value)

const guides = computed(() => {
  if (!organizer.value) return []
  return toursStore.guides.filter(g => g.organizerId === organizer.value!.id)
})

const tours = computed(() => {
  if (!organizer.value) return []
  return toursStore.tours.filter(t => t.organizerId === organizer.value!.id)
})
</script>