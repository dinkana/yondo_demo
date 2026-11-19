<template>
  <main id="main-content" class="min-h-screen bg-canvas px-16 py-24 md:py-48">
    <div v-if="!booking || booking.status === 'draft'" class="max-w-2xl mx-auto text-center">
      <p class="text-ink-2 mb-16">Бронирование не найдено</p>
      <router-link to="/" class="text-g-700 font-medium hover:underline">Вернуться в каталог</router-link>
    </div>
    <article v-else class="receipt mx-auto max-w-xl">
      <header class="receipt-header">
        <span class="stamp" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path class="check" pathLength="1" d="m7 16 6 6 13-13" /></svg>
        </span>
        <div><p class="kicker">Поездка подтверждена</p>
          <h1 class="font-heading text-3xl md:text-4xl font-bold mt-4">Оплата прошла</h1>
          <p class="mt-6 text-sm">Место забронировано за вами</p>
        </div>
      </header>
      <div class="receipt-body">
        <section aria-labelledby="trip-details">
          <h2 id="trip-details" class="font-heading text-lg font-semibold text-ink">Детали поездки</h2>
          <dl v-if="tour" class="details">
            <div><dt>Тур</dt><dd>{{ tour.title }}</dd></div>
            <div><dt>Дата</dt><dd>{{ formatDate(departure) }}</dd></div>
            <div><dt>Участники</dt><dd>{{ booking.adults }} {{ adultsForm }}<template v-if="booking.children">, {{ booking.children }} {{ childrenForm }}</template></dd></div>
            <div class="paid"><dt>Оплачено</dt><dd class="nums">{{ booking.totalK.toLocaleString('ru-RU') }} ₽</dd></div>
          </dl>
        </section>
        <p class="demo-note">Демо-версия: реального списания не произошло. Бронирование сохранено локально.</p>
        <nav aria-label="Действия с поездкой" class="receipt-actions">
          <router-link :to="{ name: 'album', params: { id: booking.id } }" class="primary">Перейти в альбом поездки <span aria-hidden="true">→</span></router-link>
          <router-link :to="{ name: 'memo', params: { id: booking.id } }" class="secondary">Открыть памятку</router-link>
          <router-link to="/trips" class="all-trips">Все мои поездки</router-link>
        </nav>
      </div>
    </article>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import { pluralize } from '@/utils/pluralize'
import type { Departure } from '@/schemas/tour'

const route = useRoute()
const bookingsStore = useBookingsStore()
const toursStore = useToursStore()

const bookingId = route.params.id as string
const booking = computed(() => bookingsStore.getById(bookingId))
const tour = computed(() => booking.value ? toursStore.getTourById(booking.value.tourId).value : null)
const departure = computed(() => tour.value?.departures.find(d => d.id === booking.value?.departureId) || null)

const adultsForm = computed(() => booking.value ? pluralize(booking.value.adults, ['взрослый', 'взрослых', 'взрослых']) : '')
const childrenForm = computed(() => booking.value ? pluralize(booking.value.children, ['ребёнок', 'детей', 'детей']) : '')

function formatDate(dep: Departure | null): string {
  if (!dep) return ''
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}
</script>

<style scoped>
.receipt { border: 1px solid var(--line-strong); border-radius: 20px; background: var(--surface-soft); box-shadow: 0 8px 30px #18281b0a; }
.receipt-header, .receipt-body { padding: clamp(20px, 4vw, 36px); }
.receipt-header { display: flex; align-items: center; gap: 16px; border-radius: 19px 19px 0 0; background: var(--g-800); color: #fffaf0; }
.stamp { display: grid; place-items: center; flex: 0 0 48px; height: 48px; border: 1px solid #cdddb8; border-radius: 50%; color: #e7efd8; }
.kicker { font-size: .68rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 600; color: #dce9ce; }
.details { margin-top: 14px; font-size: .9rem; }
.details div { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px; padding: 6px 0; }
.details dt { color: var(--ink-2); }
.details dd { text-align: right; font-weight: 600; }
.details .paid { align-items: baseline; border-top: 1px dashed var(--line-strong); padding-top: 16px; margin-top: 12px; }
.paid dd { font-size: 1.4rem; }
.demo-note { margin: 12px 0 20px; padding: 10px 12px; border-radius: 8px; background: var(--amber-soft); color: #654a24; font-size: .8rem; line-height: 1.5; }
.receipt-actions { display: grid; gap: 8px; }
.receipt-actions a { display: flex; justify-content: center; align-items: center; gap: 12px; min-height: 46px; padding: 10px 16px; border-radius: 999px; font-weight: 600; text-align: center; }
.primary { background: var(--g-800); color: white; }
.primary:hover { background: var(--g-700); }
.secondary { border: 1px solid var(--line-strong); color: var(--g-800); }
.secondary:hover { background: var(--g-50); }
.all-trips { color: var(--g-700); font-size: .875rem; }
.all-trips:hover { text-decoration: underline; }
@media (prefers-reduced-motion: no-preference) {
  .check { stroke-dasharray: 1; animation: confirm 330ms ease-out both; }
  @keyframes confirm { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
  .receipt-actions a { transition: background-color 150ms; }
}
</style>