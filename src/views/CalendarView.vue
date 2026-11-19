<template>
  <div class="min-h-screen bg-canvas pb-80 md:pb-16">
    <main id="main-content">
      <div class="max-w-2xl mx-auto px-16 py-24 space-y-24">
        <div class="flex items-center justify-between">
          <h1 class="font-heading text-2xl font-bold text-ink">Календарь</h1>
          <button
            v-if="trips.length"
            class="bg-surface border border-line rounded-button-secondary px-16 py-8 font-body text-sm font-medium text-ink"
            @click="exportAll"
          >
            Экспорт .ics
          </button>
        </div>

        <div class="bg-surface rounded-card p-16 shadow-sm">
          <div class="flex items-center justify-between mb-16">
            <button class="text-ink-2 hover:text-ink" @click="changeMonth(-1)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h2 class="font-heading text-lg font-semibold text-ink">
              {{ monthLabel }}
            </h2>
            <button class="text-ink-2 hover:text-ink" @click="changeMonth(1)">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          <div class="grid grid-cols-7 gap-4 mb-8">
            <div v-for="day in weekdays" :key="day" class="text-center font-body text-xs font-medium text-ink-3 py-4">
              {{ day }}
            </div>
          </div>

          <div class="grid grid-cols-7 gap-4">
            <div
              v-for="day in calendarDays"
              :key="day.key"
              :class="[
                'aspect-square rounded-image flex flex-col items-center justify-center relative',
                day.isCurrentMonth ? 'bg-surface-soft' : 'bg-canvas',
                day.isToday && 'ring-2 ring-g-500'
              ]"
            >
              <span :class="['font-body text-sm nums', day.isCurrentMonth ? 'text-ink' : 'text-ink-3']">
                {{ day.date.getDate() }}
              </span>
              <div v-if="day.trips.length" class="flex gap-2 mt-2">
                <span
                  v-for="(_, idx) in day.trips.slice(0, 3)"
                  :key="idx"
                  class="w-4 h-4 rounded-full bg-g-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="trips.length" class="space-y-12">
          <h2 class="font-heading text-lg font-semibold text-ink">Предстоящие поездки</h2>
          <div
            v-for="trip in trips"
            :key="trip.booking.id"
            class="bg-surface rounded-card p-16 shadow-sm space-y-8"
          >
            <div class="flex items-start justify-between">
              <div>
                <h3 class="font-heading text-base font-semibold text-ink">{{ getTour(trip.booking.tourId)?.title }}</h3>
                <p class="font-body text-sm text-ink-2">{{ formatDate(trip.departure) }}</p>
              </div>
              <button
                class="text-g-600 text-sm font-medium hover:underline"
                @click="exportSingle(trip)"
              >
                .ics
              </button>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-48">
          <p class="text-ink-2 mb-16">Нет предстоящих поездок</p>
          <router-link to="/" class="text-g-600 font-medium hover:underline">Выбрать тур</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import type { Tour, Departure } from '@/schemas/tour'
import type { Booking } from '@/schemas/booking'

const bookingsStore = useBookingsStore()
const toursStore = useToursStore()

const currentDate = ref(new Date())
const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']

interface Trip {
  booking: Booking
  tour: Tour
  departure: Departure
  startDate: Date
  endDate: Date
}

const trips = computed<Trip[]>(() => {
  return bookingsStore.paidBookings
    .map(b => {
      const tour = toursStore.getTourById(b.tourId).value
      if (!tour) return null
      const dep = tour.departures.find(d => d.id === b.departureId)
      if (!dep || dep.offsetDays < 0) return null
      const start = new Date()
      start.setDate(start.getDate() + dep.offsetDays)
      const end = new Date(start)
      end.setDate(end.getDate() + tour.days)
      return { booking: b, tour, departure: dep, startDate: start, endDate: end }
    })
    .filter((t): t is Trip => t !== null)
    .sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
})

const monthLabel = computed(() => {
  return currentDate.value.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekday = (firstDay.getDay() + 6) % 7
  const days = []

  for (let i = 0; i < startWeekday; i++) {
    const date = new Date(year, month, -startWeekday + i + 1)
    days.push({ date, isCurrentMonth: false, isToday: false, key: date.toISOString(), trips: [] })
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    const isToday = date.toDateString() === new Date().toDateString()
    const dayTrips = trips.value.filter(t => {
      const d = date.getTime()
      return d >= t.startDate.getTime() && d < t.endDate.getTime()
    })
    days.push({ date, isCurrentMonth: true, isToday, key: date.toISOString(), trips: dayTrips })
  }

  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    const date = new Date(year, month + 1, i)
    days.push({ date, isCurrentMonth: false, isToday: false, key: date.toISOString(), trips: [] })
  }

  return days
})

function changeMonth(delta: number) {
  const d = new Date(currentDate.value)
  d.setMonth(d.getMonth() + delta)
  currentDate.value = d
}

function getTour(tourId: string): Tour | undefined {
  return toursStore.getTourById(tourId).value
}

function formatDate(dep: Departure): string {
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}

function pad(n: number): string {
  return n.toString().padStart(2, '0')
}

function formatIcsDate(date: Date): string {
  return date.getUTCFullYear().toString() +
    pad(date.getUTCMonth() + 1) +
    pad(date.getUTCDate()) + 'T' +
    pad(date.getUTCHours()) +
    pad(date.getUTCMinutes()) +
    pad(date.getUTCSeconds()) + 'Z'
}

function generateIcs(trip: Trip): string {
  const uid = `${trip.booking.id}@yondo`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yondo//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${formatIcsDate(new Date())}`,
    `DTSTART:${formatIcsDate(trip.startDate)}`,
    `DTEND:${formatIcsDate(trip.endDate)}`,
    `SUMMARY:${trip.tour.title}`,
    `DESCRIPTION:Авторский тур по Южному Уралу`,
    `LOCATION:${trip.tour.route.fromCity}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Завтра выезд',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR'
  ]
  return lines.join('\r\n')
}

function downloadIcs(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function exportSingle(trip: Trip) {
  const content = generateIcs(trip)
  downloadIcs(content, `${trip.tour.slug}.ics`)
}

function exportAll() {
  const events = trips.value.map(trip => {
    const uid = `${trip.booking.id}@yondo`
    return [
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(trip.startDate)}`,
      `DTEND:${formatIcsDate(trip.endDate)}`,
      `SUMMARY:${trip.tour.title}`,
      `DESCRIPTION:Авторский тур по Южному Уралу`,
      `LOCATION:${trip.tour.route.fromCity}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Завтра выезд',
      'END:VALARM',
      'END:VEVENT'
    ].join('\r\n')
  }).join('\r\n')

  const content = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Yondo//RU',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    events,
    'END:VCALENDAR'
  ].join('\r\n')

  downloadIcs(content, 'yondo-trips.ics')
}
</script>