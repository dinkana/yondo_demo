<template>
  <div class="min-h-screen bg-canvas pb-80 md:pb-16">
    <div v-if="!booking || !tour || !departure" class="max-w-2xl mx-auto px-16 py-48 text-center">
      <p class="text-ink-2 mb-16">Бронирование не найдено</p>
      <router-link to="/" class="text-g-600 font-medium hover:underline">Вернуться в каталог</router-link>
    </div>
    <div v-else class="max-w-2xl mx-auto px-16 py-24 space-y-24">
      <div>
        <h1 class="font-heading text-2xl font-bold text-ink mb-8">Оплата</h1>
        <p class="font-body text-sm text-ink-2">{{ tour.title }}</p>
      </div>

      <div class="bg-surface rounded-card p-16 shadow-sm space-y-12">
        <div class="flex items-center justify-between pb-12 border-b border-line">
          <span class="font-body text-sm text-ink-2">К оплате</span>
          <span class="font-heading text-2xl font-bold text-ink nums">{{ booking.totalK.toLocaleString('ru-RU') }} ₽</span>
        </div>
        <div class="flex items-center justify-between font-body text-sm">
          <span class="text-ink-2">Дата отправления</span>
          <span class="text-ink font-medium">{{ formatDate(departure) }}</span>
        </div>
        <div class="flex items-center justify-between font-body text-sm">
          <span class="text-ink-2">Участники</span>
          <span class="text-ink font-medium">{{ booking.adults }} {{ adultsForm }}<template v-if="booking.children">, {{ booking.children }} {{ childrenForm }}</template></span>
        </div>
      </div>

      <div class="bg-surface rounded-card p-16 shadow-sm space-y-16">
        <h2 class="font-heading text-lg font-semibold text-ink">Демо оплаты по СБП</h2>
        <div v-if="qrLoading" class="flex items-center justify-center py-32">
          <div class="text-ink-3 text-sm">Генерация QR-кода...</div>
        </div>
        <div v-else-if="qrError" class="text-center py-16">
          <p class="text-danger text-sm mb-12">Не удалось сгенерировать QR</p>
          <button class="text-g-600 text-sm font-medium hover:underline" @click="generateQr">Попробовать снова</button>
        </div>
        <div v-else class="flex flex-col items-center gap-16">
          <img v-if="qrDataUrl" :src="qrDataUrl" alt="Демонстрационный QR-код" width="240" height="240" />
          <p class="font-body text-sm text-ink-2 text-center">QR-код не содержит платёжных реквизитов. Для имитации оплаты нажмите кнопку внизу.</p>
        </div>
      </div>

      <div class="bg-surface-soft rounded-card p-16 space-y-8">
        <h3 class="font-heading text-base font-semibold text-ink mb-12">Вымышленные реквизиты</h3>
        <div class="space-y-8 font-body text-sm">
          <div class="flex justify-between">
            <span class="text-ink-2">Получатель</span>
            <span class="text-ink font-medium">ООО «Тау-Тревел»</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ink-2">ИНН</span>
            <span class="text-ink font-medium nums">0276123456</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ink-2">Расчётный счёт</span>
            <span class="text-ink font-medium nums">•••• 2345 (пример)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ink-2">Банк</span>
            <span class="text-ink font-medium">Демо-банк</span>
          </div>
          <div class="flex justify-between">
            <span class="text-ink-2">БИК</span>
            <span class="text-ink font-medium nums">Не используется</span>
          </div>
        </div>
      </div>

      <div class="bg-amber-soft rounded-card p-16 border border-amber/20">
        <p class="font-body text-sm text-amber">
          Демо-режим: реальное списание средств не происходит. Кнопка ниже имитирует успешную оплату.
        </p>
      </div>
    </div>

    <div v-if="booking && tour && departure && booking.status === 'draft'" class="fixed bottom-0 left-0 right-0 bg-surface border-t border-line px-16 py-12 pb-safe md:hidden">
      <button
        :disabled="paying"
        :class="[
          'w-full bg-action-ink text-white rounded-button-primary px-24 py-12 font-body font-medium transition-opacity',
          paying && 'opacity-50 cursor-not-allowed'
        ]"
        @click="pay"
      >
        {{ paying ? 'Обработка...' : 'Оплатить (демо)' }}
      </button>
    </div>

    <div v-if="booking && tour && departure && booking.status === 'draft'" class="hidden md:block max-w-2xl mx-auto px-16 pb-24">
      <button
        :disabled="paying"
        :class="[
          'w-full bg-action-ink text-white rounded-button-primary px-24 py-12 font-body font-medium transition-opacity',
          paying && 'opacity-50 cursor-not-allowed'
        ]"
        @click="pay"
      >
        {{ paying ? 'Обработка...' : 'Оплатить (демо)' }}
      </button>
    </div>
    <p v-if="payError" role="alert" class="max-w-2xl mx-auto px-16 py-12 text-danger">Не удалось забронировать: на рейсе уже нет нужного количества мест.</p>
    <router-link v-if="booking && booking.status !== 'draft'" :to="{ name: 'payment-success', params: { id: bookingId } }" class="block max-w-2xl mx-auto px-16 pb-16 text-g-600 underline">Открыть подтверждение</router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import { pluralize } from '@/utils/pluralize'
import QRCode from 'qrcode'

const route = useRoute()
const router = useRouter()
const bookingsStore = useBookingsStore()
const toursStore = useToursStore()

const bookingId = route.params.bookingId as string
const booking = computed(() => bookingsStore.getById(bookingId))
const tour = computed(() => booking.value ? toursStore.getTourById(booking.value.tourId).value : null)
const departure = computed(() => tour.value?.departures.find(d => d.id === booking.value?.departureId) || null)

const qrDataUrl = ref<string | null>(null)
const qrLoading = ref(true)
const qrError = ref(false)
const paying = ref(false)
const payError = ref(false)

const adultsForm = computed(() => booking.value ? pluralize(booking.value.adults, ['взрослый', 'взрослых', 'взрослых']) : '')
const childrenForm = computed(() => booking.value ? pluralize(booking.value.children, ['ребёнок', 'детей', 'детей']) : '')

function formatDate(dep: any): string {
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}

async function generateQr() {
  if (!booking.value) return
  qrLoading.value = true
  qrError.value = false
  try {
    const payload = `YONDO DEMO: ${booking.value.id} — не для оплаты`
    qrDataUrl.value = await QRCode.toDataURL(payload, {
      width: 240,
      margin: 1,
      color: { dark: '#121813', light: '#FFFFFF' }
    })
    qrLoading.value = false
  } catch (e) {
    qrError.value = true
    qrLoading.value = false
  }
}

function pay() {
  if (!booking.value || paying.value) return
  payError.value = !bookingsStore.markPaid(booking.value.id)
  if (payError.value) return
  paying.value = true
  router.replace({ name: 'payment-success', params: { id: bookingId } })
}

onMounted(generateQr)
</script>