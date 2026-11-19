<template>
    <router-link
      :to="{ name: 'tour', params: { slug: tour.slug } }"
      class="trail-card"
    >
      <div class="card-media relative bg-g-100">
        <img
          :src="tour.photos[0]?.src"
          :alt="tour.photos[0]?.alt"
          :width="tour.photos[0]?.w || 800"
          :height="tour.photos[0]?.h || 600"
          class="card-img w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute top-12 left-12 flex flex-wrap gap-4">
          <BaseBadge v-if="hasDeparture && seatsLeft > 0 && seatsLeft <= 2" variant="amber">
            Осталось {{ seatsLeft }} {{ seatsLeftForm }}
          </BaseBadge>
          <BaseBadge v-else-if="hasDeparture && fill >= 0.5 && fill < 0.8" variant="success">
            Почти набрано
          </BaseBadge>
          <BaseBadge v-else-if="hasDeparture && seatsLeft === 0" variant="danger">
            Мест нет
          </BaseBadge>
        </div>
      </div>
      <div class="card-body p-16 space-y-8">
        <div>
          <p class="card-kind">{{ tour.types[0] }} <span aria-hidden="true">/</span> {{ tour.route.fromCity }}</p>
          <h3 class="font-heading text-lg font-semibold text-ink clamp-2">
            {{ tour.title }}
          </h3>
          <p class="font-body text-sm text-ink-2 clamp-2 mt-4">
            {{ tour.subtitle }}
          </p>
        </div>
        <div class="flex items-center gap-8 text-xs text-ink-2">
          <span class="flex items-center gap-4">
            <svg class="w-14 h-14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {{ departureDate }}
          </span>
          <span>·</span>
          <span>{{ tour.days }} {{ daysForm }}</span>
        </div>
        <div class="flex items-center justify-between pt-8 border-t border-line card-foot">
          <div class="flex items-center gap-4">
            <svg class="w-14 h-14 text-star" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span class="font-body text-sm font-medium text-ink nums">{{ tour.rating.toFixed(1) }}</span>
            <span class="font-body text-xs text-ink-3">({{ tour.reviewsCount }})</span>
          </div>
          <div class="text-right">
            <div class="font-body text-lg font-semibold text-ink nums">
              {{ displayPrice }} ₽
            </div>
            <div class="font-body text-xs text-ink-3">за взрослого</div>
          </div>
        </div>
      </div>
    </router-link>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  import type { Tour, Departure } from '@/schemas/tour'
  import BaseBadge from '@/components/BaseBadge.vue'
  import { pluralize } from '@/utils/pluralize'
  
  const props = defineProps<{ tour: Tour }>()
  
  const nextDeparture = computed<Departure | null>(() => {
    const future = props.tour.departures.filter(d => d.offsetDays >= 0)
    if (!future.length) return null
    return future.sort((a, b) => a.offsetDays - b.offsetDays)[0]
  })
  
  const hasDeparture = computed(() => nextDeparture.value !== null)
  
  const seatsLeft = computed(() => {
    if (!nextDeparture.value) return 0
    return nextDeparture.value.seatsTotal - nextDeparture.value.seatsTaken
  })
  
  const fill = computed(() => {
    if (!nextDeparture.value) return 0
    return nextDeparture.value.seatsTaken / nextDeparture.value.seatsTotal
  })
  
  const departureDate = computed(() => {
    if (!nextDeparture.value) return 'Дата уточняется'
    const date = new Date()
    date.setDate(date.getDate() + nextDeparture.value.offsetDays)
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
  })
  
  const displayPrice = computed(() => {
    const price = nextDeparture.value?.priceK || props.tour.basePriceK
    return price.toLocaleString('ru-RU')
  })
  
  const seatsLeftForm = computed(() => pluralize(seatsLeft.value, ['место', 'места', 'мест']))
  const daysForm = computed(() => pluralize(props.tour.days, ['день', 'дня', 'дней']))
  </script>
<style scoped>
.trail-card{display:flex;flex-direction:column;min-width:0;height:100%;overflow:hidden;background:var(--surface);border:1px solid #dcded2;border-radius:17px;box-shadow:0 2px 4px #1d362009;transition:border-color 180ms,box-shadow 180ms}.card-media{aspect-ratio:1.57;overflow:hidden}.card-body{display:flex;flex-direction:column;flex:1}.card-kind{font:600 10px/1.3 Manrope,sans-serif;letter-spacing:.13em;text-transform:uppercase;color:#466650;margin:0 0 7px}.card-kind span{color:#a2ab9b;margin:0 3px}.card-body h3{line-height:1.25;letter-spacing:-.025em}.card-foot{margin-top:auto!important;padding-top:11px;margin-bottom:0}.card-body>.flex:not(.card-foot){padding-bottom:9px}.card-img{transition:transform .32s var(--ease)}.trail-card:focus-visible{outline:3px solid var(--g-600);outline-offset:3px}
@media(hover:hover) and (pointer:fine){.trail-card:hover{border-color:#a6b7a7;box-shadow:0 7px 17px #243e2a14}.trail-card:hover h3{color:var(--g-700)}}@media(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference){.trail-card:hover .card-img{transform:scale(1.035)}}
</style>