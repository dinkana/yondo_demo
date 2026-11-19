<template>
  <div class="min-h-screen bg-canvas">
    <div class="max-w-2xl mx-auto px-16 py-24 space-y-24">
      <div>
        <h1 class="font-heading text-2xl font-bold text-ink mb-8">Мои поездки</h1>
      </div>

      <div class="flex gap-8 border-b border-line">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          :class="[
            'px-16 py-12 font-body text-sm font-medium transition-colors',
            activeTab === tab.id ? 'text-g-600 border-b-2 border-g-600' : 'text-ink-2 hover:text-ink'
          ]"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <div v-if="activeTab === 'upcoming'">
        <div v-if="!upcoming.length" class="text-center py-48">
          <p class="text-ink-2 mb-16">Нет предстоящих поездок</p>
          <router-link to="/" class="text-g-600 font-medium hover:underline">Выбрать тур</router-link>
        </div>
        <div v-else class="space-y-12">
          <div
            v-for="booking in upcoming"
            :key="booking.id"
            class="bg-surface rounded-card p-16 shadow-sm space-y-12"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="font-heading text-base font-semibold text-ink mb-4">{{ getTour(booking.tourId)?.title }}</h3>
                <p class="font-body text-sm text-ink-2">{{ formatDate(getDeparture(booking)) }}</p>
              </div>
              <BaseBadge variant="success">Оплачено</BaseBadge>
            </div>
            <div class="flex gap-8">
              <router-link
                :to="{ name: 'memo', params: { id: booking.id } }"
                class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 font-body text-sm font-medium text-ink text-center"
              >
                Памятка
              </router-link>
              <router-link
                :to="{ name: 'album', params: { id: booking.id } }"
                class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 font-body text-sm font-medium text-ink text-center"
              >
                Альбом
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'past'">
        <div v-if="!past.length" class="text-center py-48">
          <p class="text-ink-2">Нет прошедших поездок</p>
        </div>
        <div v-else class="space-y-12">
          <div
            v-for="booking in past"
            :key="booking.id"
            class="bg-surface rounded-card p-16 shadow-sm space-y-12"
          >
            <div>
              <h3 class="font-heading text-base font-semibold text-ink mb-4">{{ getTour(booking.tourId)?.title }}</h3>
              <p class="font-body text-sm text-ink-2">{{ formatDate(getDeparture(booking)) }}</p>
            </div>
            <div class="flex gap-8">
              <router-link
                :to="{ name: 'album', params: { id: booking.id } }"
                class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 font-body text-sm font-medium text-ink text-center"
              >
                Альбом
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'wishlist'">
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
              <h3 class="font-heading text-base font-semibold text-ink mb-4">{{ tour.title }}</h3>
              <p class="font-body text-sm text-ink-2">{{ tour.subtitle }}</p>
              <div class="mt-8 font-body text-lg font-semibold text-ink nums">
                от {{ tour.basePriceK.toLocaleString('ru-RU') }} ₽
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import { useWishlistStore } from '@/store/wishlist'
import BaseBadge from '@/components/BaseBadge.vue'
import type { Booking } from '@/schemas/booking'
import type { Tour, Departure } from '@/schemas/tour'

const bookingsStore = useBookingsStore()
const toursStore = useToursStore()
const wishlistStore = useWishlistStore()

const tabs = [
  { id: 'upcoming', label: 'Предстоящие' },
  { id: 'past', label: 'Прошедшие' },
  { id: 'wishlist', label: 'Желаемое' }
]

const activeTab = ref('upcoming')

const paidBookings = computed(() => bookingsStore.paidBookings)

const upcoming = computed(() => {
  return paidBookings.value.filter(b => {
    const dep = getDeparture(b)
    return dep && dep.offsetDays >= 0
  })
})

const past = computed(() => {
  return paidBookings.value.filter(b => {
    const dep = getDeparture(b)
    return dep && dep.offsetDays < 0
  })
})

const wishlistTours = computed(() => {
  return toursStore.tours.filter(t => wishlistStore.has(t.id))
})

function getTour(tourId: string): Tour | undefined {
  return toursStore.getTourById(tourId).value
}

function getDeparture(booking: Booking): Departure | null {
  const tour = getTour(booking.tourId)
  if (!tour) return null
  return tour.departures.find(d => d.id === booking.departureId) || null
}

function formatDate(dep: Departure | null): string {
  if (!dep) return ''
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}
</script>