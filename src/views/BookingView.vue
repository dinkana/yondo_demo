<template>
  <main id="main-content" class="checkout min-h-screen bg-canvas">
    <div v-if="!departure" class="max-w-2xl mx-auto px-16 py-48 text-center">
      <p class="text-ink-2 mb-16">Рейс не найден</p>
      <router-link to="/" class="text-g-700 font-medium hover:underline">Вернуться в каталог</router-link>
    </div>
    <form v-else class="max-w-5xl mx-auto px-16 py-24 md:py-40" @submit.prevent="submit">
      <header class="mb-24">
        <p class="kicker">Оформление · 01 / 02</p>
        <h1 class="font-heading text-3xl md:text-4xl font-bold text-ink mt-4">Бронирование</h1>
        <p class="text-ink-2 mt-8">{{ tour?.title }}</p>
      </header>
      <div class="checkout-grid">
        <div class="min-w-0 space-y-16">
          <section class="panel" aria-label="Рейс">
            <dl class="trip-facts">
              <div><dt>Дата отправления</dt><dd class="text-base">{{ formatDate(departure) }}</dd></div>
              <div><dt>Длительность</dt><dd>{{ tour?.days }} {{ daysForm }}</dd></div>
              <div><dt>Осталось мест</dt><dd>{{ seatsLeft }} {{ seatsLeftForm }}</dd></div>
              <div><dt>Цена за взрослого</dt><dd class="nums">{{ departure.priceK.toLocaleString('ru-RU') }} ₽</dd></div>
            </dl>
          </section>
          <section class="panel" aria-labelledby="party-title">
            <h2 id="party-title" class="section-title">Участники</h2>
            <div role="group" aria-labelledby="adults-label" class="party-row">
              <span id="adults-label">Взрослые</span>
              <div class="stepper">
                <button type="button" aria-describedby="adults-label" :disabled="adults <= 1" @click="adults--">−</button>
                <output aria-label="Количество взрослых">{{ adults }}</output>
                <button type="button" aria-describedby="adults-label" :disabled="adults + children >= seatsLeft" @click="adults++">+</button>
              </div>
            </div>
            <div role="group" aria-labelledby="children-label" class="party-row">
              <span id="children-label">Дети</span>
              <div class="stepper">
                <button type="button" aria-describedby="children-label" :disabled="children <= 0" @click="removeChild">−</button>
                <output aria-label="Количество детей">{{ children }}</output>
                <button type="button" aria-describedby="children-label" :disabled="!tour?.childFriendly || adults + children >= seatsLeft" @click="addChild">+</button>
              </div>
            </div>
            <p v-if="!tour?.childFriendly" class="text-sm text-ink-2">Этот рейс только для взрослых.</p>
            <p v-else-if="tour.minChildAge !== null" class="text-sm text-ink-2">Минимальный возраст: {{ tour.minChildAge }}</p>
            <div v-for="(_, idx) in childAges" :key="idx" class="age-row">
              <label :for="`age-${idx}`">Возраст ребёнка {{ idx + 1 }}</label>
              <input :id="`age-${idx}`" v-model.number="childAges[idx]" type="number" inputmode="numeric" :min="tour?.minChildAge ?? 0" max="17" required placeholder="Возраст" class="field" :aria-invalid="!validAge(childAges[idx])" :aria-describedby="!validAge(childAges[idx]) ? `age-help-${idx}` : undefined" />
              <p v-if="!validAge(childAges[idx])" :id="`age-help-${idx}`" class="age-error">Укажите целое число от {{ tour?.minChildAge ?? 0 }} до 17.</p>
            </div>
          </section>
          <section class="panel space-y-16" aria-labelledby="contacts-title">
            <h2 id="contacts-title" class="section-title">Контакты</h2>
            <fieldset>
              <legend class="text-sm font-medium mb-8">Пол туриста</legend>
              <div class="flex gap-8">
                <label v-for="option in genders" :key="option.value" class="gender-option">
                  <input v-model="touristGender" class="sr-only" type="radio" name="tourist-gender" :value="option.value" />{{ option.label }}
                </label>
              </div>
            </fieldset>
            <label class="block text-sm font-medium">Имя
              <input v-model="contactName" autocomplete="name" required class="field mt-6 w-full" placeholder="Иван Иванов" />
            </label>
            <label class="block text-sm font-medium">Телефон
              <input v-model="contactPhone" type="tel" autocomplete="tel" required class="field mt-6 w-full" placeholder="+7 999 123-45-67" />
            </label>
          </section>
        </div>
        <aside class="summary panel" aria-labelledby="total-title">
          <h2 id="total-title" class="section-title">Итого</h2>
          <dl class="breakdown">
            <div><dt>{{ adults }} {{ adultsForm }} × {{ departure.priceK.toLocaleString('ru-RU') }} ₽</dt><dd>{{ (adults * departure.priceK).toLocaleString('ru-RU') }} ₽</dd></div>
            <div v-if="children"><dt>{{ children }} {{ childrenForm }} × {{ departure.childPriceK.toLocaleString('ru-RU') }} ₽</dt><dd>{{ (children * departure.childPriceK).toLocaleString('ru-RU') }} ₽</dd></div>
          </dl>
          <label class="consent"><input v-model="agreed" type="checkbox" required />Я согласен с условиями оферты и политикой обработки персональных данных</label>
          <p id="booking-hint" aria-live="polite" class="text-sm text-ink-2">{{ submitHint }}</p>
          <div class="pay-bar">
            <div aria-live="polite" aria-atomic="true"><span class="block text-xs text-ink-2">К оплате</span><strong class="font-heading nums text-xl whitespace-nowrap">{{ totalK.toLocaleString('ru-RU') }} ₽</strong></div>
            <button type="submit" class="pay-button" :disabled="!canSubmit || submitting" aria-describedby="booking-hint">Перейти к оплате</button>
          </div>
        </aside>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToursStore } from '@/store/tours'
import { useBookingsStore } from '@/store/bookings'
import { pluralize } from '@/utils/pluralize'
import type { Departure } from '@/schemas/tour'

const route = useRoute()
const router = useRouter()
const toursStore = useToursStore()
const bookingsStore = useBookingsStore()

const departureId = route.params.departureId as string
const departure = computed(() => {
  for (const tour of toursStore.tours) {
    const dep = tour.departures.find(d => d.id === departureId)
    if (dep) return dep
  }
  return null
})

const tour = computed(() => departure.value ? toursStore.getTourById(departure.value.tourId).value : null)

const adults = ref(Math.max(1, Math.min(2, (departure.value?.seatsTotal ?? 0) - (departure.value?.seatsTaken ?? 0))))
const children = ref(0)
const childAges = ref<number[]>([])
const touristGender = ref<'male' | 'female'>('male')
const contactName = ref('Иван Иванов')
const contactPhone = ref('+7 999 123-45-67')
const agreed = ref(false)
const submitting = ref(false)
const genders = [{ value: 'male', label: 'Мужской' }, { value: 'female', label: 'Женский' }] as const

const seatsLeft = computed(() => departure.value ? departure.value.seatsTotal - departure.value.seatsTaken : 0)
const totalK = computed(() => adults.value * (departure.value?.priceK || 0) + children.value * (departure.value?.childPriceK || 0))

function validAge(age: number) {
  return Number.isInteger(age) && age >= (tour.value?.minChildAge ?? 0) && age <= 17
}
const submitHint = computed(() => {
  if (!departure.value || !tour.value || adults.value + children.value > seatsLeft.value) return 'На этот рейс недостаточно мест.'
  if (children.value && !tour.value.childFriendly) return 'Этот рейс только для взрослых.'
  if (childAges.value.length !== children.value || !childAges.value.every(validAge)) return 'Проверьте возраст детей.'
  if (!contactName.value.trim() || !contactPhone.value.trim()) return 'Укажите имя и телефон.'
  if (!agreed.value) return 'Для перехода к оплате подтвердите согласие.'
  return ''
})
const canSubmit = computed(() => !submitHint.value)

const daysForm = computed(() => tour.value ? pluralize(tour.value.days, ['день', 'дня', 'дней']) : '')
const seatsLeftForm = computed(() => pluralize(seatsLeft.value, ['место', 'места', 'мест']))
const adultsForm = computed(() => pluralize(adults.value, ['взрослый', 'взрослых', 'взрослых']))
const childrenForm = computed(() => pluralize(children.value, ['ребёнок', 'детей', 'детей']))

function formatDate(dep: Departure): string {
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}

function addChild() {
  children.value++
  childAges.value.push(Math.max(7, tour.value?.minChildAge ?? 0))
}

function removeChild() {
  children.value--
  childAges.value.pop()
}

async function submit() {
  if (!departure.value || !tour.value || !canSubmit.value || submitting.value) return
  submitting.value = true
  try {
    const booking = bookingsStore.create({
      departureId: departure.value.id,
      tourId: tour.value.id,
      adults: adults.value,
      children: children.value,
      childAges: [...childAges.value],
      touristGender: touristGender.value,
      contacts: {
        name: contactName.value,
        phone: contactPhone.value
      },
      totalK: totalK.value
    })

    await router.push({ name: 'payment', params: { bookingId: booking.id } })
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.checkout { padding-bottom: calc(6rem + env(safe-area-inset-bottom)); }
.checkout-grid { display: grid; gap: 16px; align-items: start; }
.kicker { font-size: .7rem; font-weight: 700; letter-spacing: .13em; text-transform: uppercase; color: var(--g-700); }
.panel { padding: clamp(16px, 3vw, 24px); background: var(--surface-soft); border: 1px solid var(--line); border-radius: 16px; }
.section-title { font-size: 1.15rem; font-weight: 700; }
.trip-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.trip-facts dt { color: var(--ink-2); font-size: .8rem; }
.trip-facts dd { margin-top: 4px; font-weight: 600; }
.party-row, .age-row { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 0; }
.party-row + .party-row, .age-row { border-top: 1px solid var(--line); }
.stepper { display: inline-flex; align-items: center; border: 1px solid var(--line-strong); border-radius: 999px; background: var(--surface); }
.stepper button { width: 44px; height: 44px; border-radius: 50%; font-size: 1.15rem; color: var(--g-800); }
.stepper button:disabled { color: var(--ink-3); cursor: not-allowed; }
.stepper button:not(:disabled):hover { background: var(--g-100); }
.stepper output { min-width: 2ch; text-align: center; font-variant-numeric: tabular-nums; font-weight: 600; }
.age-row { flex-wrap: wrap; margin-top: 12px; font-size: .875rem; }
.age-row input { width: 6rem; }
.age-error { flex-basis: 100%; color: var(--danger); }
.field, .gender-option { min-height: 44px; padding: 9px 12px; border: 1px solid var(--line-strong); border-radius: 10px; background: var(--surface); }
.field { font-size: 1rem; font-weight: 400; }
.field[aria-invalid='true'] { border-color: var(--danger); }
.gender-option { flex: 1; display: grid; place-items: center; cursor: pointer; font-size: .875rem; }
.gender-option:has(:checked) { background: var(--g-800); border-color: var(--g-800); color: white; }
.gender-option:has(:focus-visible) { outline: 2px solid var(--g-600); outline-offset: 2px; }
.summary { min-width: 0; }
.breakdown { padding-block: 14px; border-bottom: 1px dashed var(--line-strong); font-size: .875rem; }
.breakdown div { display: flex; justify-content: space-between; gap: 12px; margin-block: 4px; }
.breakdown dt, .consent { color: var(--ink-2); }
.breakdown dd { font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
.consent { display: flex; align-items: flex-start; gap: 12px; padding: 16px 0; font-size: .875rem; cursor: pointer; }
.consent input { width: 18px; height: 18px; margin-top: 2px; }
.pay-bar { position: fixed; z-index: 40; inset: auto 0 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); border-top: 1px solid var(--line-strong); background: var(--surface-soft); }
.pay-button { min-height: 48px; padding: 10px 16px; border-radius: 999px; flex: 1 1 auto; background: var(--g-800); color: white; font-weight: 600; }
.pay-button:not(:disabled):hover { background: var(--g-700); }
.pay-button:disabled { background: var(--line); color: var(--ink-2); cursor: not-allowed; }
@media (min-width: 768px) {
  .checkout { padding-bottom: 1rem; }
  .checkout-grid { grid-template-columns: minmax(0, 1.3fr) minmax(280px, .85fr); gap: 24px; }
  .summary { position: sticky; top: 20px; }
  .pay-bar { position: static; margin-top: 16px; padding: 16px 0 0; }
  .pay-button { width: 100%; }
}
@media (prefers-reduced-motion: no-preference) {
  .stepper button, .gender-option, .pay-button { transition: background-color 140ms ease; }
}
</style>