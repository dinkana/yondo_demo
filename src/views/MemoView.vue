<template>
  <div class="min-h-screen bg-canvas pb-80 md:pb-16">
    <main id="main-content">
      <div v-if="!booking || !tour" class="max-w-2xl mx-auto px-16 py-48 text-center">
        <p class="text-ink-2 mb-16">Поездка не найдена</p>
        <router-link to="/trips" class="text-g-600 font-medium hover:underline">К моим поездкам</router-link>
      </div>
      <FadeIn v-else>
        <div class="max-w-2xl mx-auto px-16 py-24 space-y-24">
          <div>
            <h1 class="font-heading text-2xl font-bold text-ink mb-8">Памятка в поездку</h1>
            <p class="font-body text-sm text-ink-2">{{ tour.title }}</p>
          </div>

          <div class="bg-surface rounded-card p-16 shadow-sm space-y-12">
            <div class="flex items-center justify-between pb-12 border-b border-line">
              <div>
                <div class="font-body text-sm text-ink-2">Дата</div>
                <div class="font-body text-base font-medium text-ink">{{ formatDate(departure) }}</div>
              </div>
              <div class="text-right">
                <div class="font-body text-sm text-ink-2">Участники</div>
                <div class="font-body text-base font-medium text-ink">{{ booking.adults }} {{ adultsForm }}</div>
              </div>
            </div>
          </div>

          <div class="bg-surface rounded-card p-16 shadow-sm">
            <MemoChecklist
              :items="items"
              :checked="memoState?.checked || {}"
              @toggle="toggleItem"
            />
          </div>

          <div class="space-y-12">
            <MemoPdfButton
              :tour="tour"
              :items="items"
              :checked="memoState?.checked || {}"
            />
            <MemoIcsButton
              v-if="departure"
              :tour="tour"
              :departure="departure"
            />
          </div>
        </div>
      </FadeIn>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import { useMemoStore } from '@/store/memo'
import { useMemoEngine } from '@/composables/useMemoEngine'
import { useWeather } from '@/composables/useWeather'
import { pluralize } from '@/utils/pluralize'
import MemoChecklist from '@/components/memo/MemoChecklist.vue'
import MemoPdfButton from '@/components/memo/MemoPdfButton.vue'
import MemoIcsButton from '@/components/memo/MemoIcsButton.vue'
import FadeIn from '@/components/motion/FadeIn.vue'

const route = useRoute()
const bookingsStore = useBookingsStore()
const toursStore = useToursStore()
const memoStore = useMemoStore()

const bookingId = route.params.id as string
const booking = computed(() => bookingsStore.getById(bookingId))
const tour = computed(() => booking.value ? toursStore.getTourById(booking.value.tourId).value : null)
const departure = computed(() => tour.value?.departures.find(d => d.id === booking.value?.departureId) || null)

const departureDate = computed(() => {
  if (!departure.value) return new Date()
  const date = new Date()
  date.setDate(date.getDate() + departure.value.offsetDays)
  return date
})

const { data: weatherData } = useWeather(
  () => tour.value?.region || 'iremel-tyulyuk',
  departureDate
)

const context = computed(() => {
  if (!tour.value || !weatherData.value) return null
  return {
    region: tour.value.region,
    difficulty: tour.value.difficulty,
    accommodation: tour.value.accommodation,
    hasChild: booking.value ? booking.value.children > 0 : false,
    childAge: booking.value?.childAges[0],
    tMin: weatherData.value.tMin,
    precip: weatherData.value.precip
  }
})

const { items } = useMemoEngine(context)

const memoState = computed(() => memoStore.getByBookingId(bookingId))

const adultsForm = computed(() => booking.value ? pluralize(booking.value.adults, ['взрослый', 'взрослых', 'взрослых']) : '')

function formatDate(dep: any): string {
  if (!dep) return ''
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}

function toggleItem(id: string) {
  const current = memoStore.getByBookingId(bookingId)
  const state = current || {
    bookingId,
    checked: {},
    generatedFor: context.value!
  }
  memoStore.upsert({
    ...state,
    checked: {
      ...state.checked,
      [id]: !state.checked[id]
    }
  })
}
</script>