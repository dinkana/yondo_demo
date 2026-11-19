<template>
  <div class="tour-page min-h-screen bg-canvas">
    <main id="main-content">
      <div v-if="loading" class="max-w-4xl mx-auto px-16 py-24 space-y-16">
        <BaseSkeleton className="h-400 rounded-card" />
        <BaseSkeleton className="h-40 rounded-card" />
        <BaseSkeleton className="h-200 rounded-card" />
      </div>
      <div v-else-if="error" class="max-w-4xl mx-auto px-16 py-48 text-center">
        <p class="text-ink-2 mb-16">Не удалось загрузить тур</p>
        <BaseButton variant="secondary" @click="retry">Попробовать снова</BaseButton>
      </div>
      <div v-else-if="!tour" class="max-w-4xl mx-auto px-16 py-48 text-center">
        <p class="text-ink-2 mb-16">Тур не найден</p>
        <router-link to="/" class="text-g-600 font-medium hover:underline">Вернуться в каталог</router-link>
      </div>
      <FadeIn v-else>
        <div class="max-w-6xl mx-auto px-16 py-16 md:py-24">
          <TourGallery :key="tour.id" :photos="tour.photos" />
          <div class="py-24 space-y-24 md:py-32">
            <div>
              <div class="flex flex-wrap items-center gap-8 mb-8">
                <span class="text-xs uppercase tracking-widest font-semibold text-g-700">Старт: {{ tour.route.fromCity }}</span>
                <BaseBadge v-if="tour.difficulty >= 4" variant="amber">Сложный</BaseBadge>
                <BaseBadge v-if="tour.childFriendly" variant="success">С детьми</BaseBadge>
              </div>
              <h1 class="font-heading text-3xl md:text-4xl font-bold text-ink mb-8">{{ tour.title }}</h1>
              <p class="font-body text-lg text-ink-2">{{ tour.subtitle }}</p>
              <div class="flex items-center gap-12 mt-12">
                <div class="flex items-center gap-4">
                  <svg class="w-16 h-16 text-star" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span class="font-body text-sm font-medium text-ink nums">{{ tour.rating.toFixed(1) }}</span>
                  <span class="font-body text-xs text-ink-3">{{ tour.reviewsCount }} отзывов</span>
                </div>
                <span class="text-line">·</span>
                <span class="font-body text-sm text-ink-2">{{ tour.days }} {{ daysForm }}</span>
              </div>
            </div>
            <div class="tour-grid">
              <aside class="date-panel">
                <DeparturePicker :departures="tour.departures" :selectedId="selectedDepartureId" @select="selectedDepartureId = $event" />
                <StickyCTA v-if="selectedDeparture && canBook" :price="selectedDeparture.priceK" :departureId="selectedDepartureId" @book="book" />
              </aside>
              <div class="details min-w-0 space-y-24">
                <WeatherCard v-if="selectedDeparture" :loading="weatherLoading" :error="weatherError" :data="weatherData" />
                <TourTabs :tour="tour" :reviews="reviews" />
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToursStore } from '@/store/tours'
import { useWeather } from '@/composables/useWeather'
import { pluralize } from '@/utils/pluralize'
import TourGallery from '@/components/tour/TourGallery.vue'
import DeparturePicker from '@/components/tour/DeparturePicker.vue'
import WeatherCard from '@/components/tour/WeatherCard.vue'
import TourTabs from '@/components/tour/TourTabs.vue'
import StickyCTA from '@/components/tour/StickyCTA.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseBadge from '@/components/BaseBadge.vue'
import BaseSkeleton from '@/components/BaseSkeleton.vue'
import FadeIn from '@/components/motion/FadeIn.vue'

const route = useRoute()
const router = useRouter()
const toursStore = useToursStore()

const loading = ref(false)
const error = ref(false)
const selectedDepartureId = ref<string | null>(null)

const tour = computed(() => toursStore.getTourBySlug(route.params.slug as string).value)
const reviews = computed(() => toursStore.getReviewsByTourId(tour.value?.id || '').value)
const selectedDeparture = computed(() =>
  tour.value?.departures.find(d => d.id === selectedDepartureId.value) || null
)

const canBook = computed(() => !!selectedDeparture.value && selectedDeparture.value.seatsTaken < selectedDeparture.value.seatsTotal)

const departureDate = computed(() => {
  if (!selectedDeparture.value) return new Date()
  const date = new Date()
  date.setDate(date.getDate() + selectedDeparture.value.offsetDays)
  return date
})

const { data: weatherData, loading: weatherLoading, error: weatherError } = useWeather(
  () => tour.value?.region || 'iremel-tyulyuk',
  departureDate
)

const daysForm = computed(() => tour.value ? pluralize(tour.value.days, ['день', 'дня', 'дней']) : '')

function retry() {
  error.value = false
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}

function book() {
  if (canBook.value && selectedDepartureId.value) {
    router.push({ name: 'booking', params: { departureId: selectedDepartureId.value } })
  }
}

watch(() => tour.value?.departures, (departures) => {
  if (departures && !departures.some(dep => dep.id === selectedDepartureId.value)) {
    const available = departures.filter(d => d.seatsTaken < d.seatsTotal)
    if (available.length) {
      selectedDepartureId.value = available[0].id
    }
  }
}, { immediate: true })
</script>

<style scoped>
.tour-page { padding-bottom: calc(6rem + env(safe-area-inset-bottom)); }
.tour-grid { display: grid; align-items: start; gap: 24px; }
.date-panel { min-width: 0; padding: 16px; border: 1px solid var(--line); border-radius: 16px; background: var(--surface-soft); }
@media (min-width: 768px) {
  .tour-page { padding-bottom: 2rem; }
  .tour-grid { grid-template-columns: minmax(0, 1fr) minmax(285px, .65fr); grid-template-areas: 'details dates'; gap: clamp(20px, 3vw, 44px); }
  .details { grid-area: details; }
  .date-panel { grid-area: dates; position: sticky; top: 20px; padding: 20px; }
}
</style>