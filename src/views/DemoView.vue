<template>
  <div class="min-h-screen bg-canvas p-16">
    <div class="max-w-md mx-auto space-y-24">
      <div>
        <h1 class="font-heading text-2xl font-bold text-ink mb-8">Панель демо</h1>
        <p class="text-ink-2 text-sm">Управление состоянием для презентации инвестору</p>
      </div>

      <div class="bg-surface rounded-card p-16 shadow-sm space-y-16">
        <h2 class="font-heading text-lg font-semibold text-ink">Time Machine</h2>
        <div class="flex items-center justify-between">
          <span class="text-ink-2 text-sm">Симулируемая дата:</span>
          <span class="font-body font-medium text-ink nums">{{ formattedDate }}</span>
        </div>
        <div class="flex gap-8">
          <button 
            class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 text-sm font-medium text-ink hover:bg-line transition-colors"
            @click="demoStore.shiftDays(-7)"
          >
            -7 дней
          </button>
          <button 
            class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 text-sm font-medium text-ink hover:bg-line transition-colors"
            @click="demoStore.shiftDays(-1)"
          >
            -1 день
          </button>
          <button 
            class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 text-sm font-medium text-ink hover:bg-line transition-colors"
            @click="demoStore.shiftDays(1)"
          >
            +1 день
          </button>
          <button 
            class="flex-1 bg-surface-soft border border-line rounded-button-secondary px-12 py-8 text-sm font-medium text-ink hover:bg-line transition-colors"
            @click="demoStore.shiftDays(7)"
          >
            +7 дней
          </button>
        </div>
        <button 
          v-if="demoStore.timeOffset !== 0"
          class="w-full text-sm text-g-600 font-medium hover:underline"
          @click="demoStore.shiftDays(-demoStore.timeOffset)"
        >
          Сбросить к сегодняшней дате
        </button>
      </div>

      <div class="bg-surface rounded-card p-16 shadow-sm space-y-16">
        <h2 class="font-heading text-lg font-semibold text-ink">Сброс данных</h2>
        <p class="text-ink-2 text-sm">Очищает localStorage, IndexedDB и кэш. Перезагружает страницу.</p>
        <button 
          class="w-full bg-danger text-white rounded-button-primary px-16 py-12 text-sm font-medium hover:opacity-90 transition-opacity"
          @click="handleReset"
        >
          Полный сброс демо
        </button>
      </div>

      <div class="bg-amber-soft rounded-card p-16 border border-amber/20 space-y-12">
        <h2 class="font-heading text-lg font-semibold text-amber">Что реально, что заглушка</h2>
        <ul class="space-y-8 text-sm text-ink-2">
          <li class="flex gap-8">
            <span class="text-g-600">✓</span>
            <span>Поиск, фильтры, ранжирование, URL-state работают полностью.</span>
          </li>
          <li class="flex gap-8">
            <span class="text-g-600">✓</span>
            <span>Бронирование сохраняет состояние в localStorage.</span>
          </li>
          <li class="flex gap-8">
            <span class="text-g-600">✓</span>
            <span>Загруженные фото хранятся в IndexedDB, а стартовые иллюстрации входят в демо.</span>
          </li>
          <li class="flex gap-8">
            <span class="text-danger">✕</span>
            <span>Оплата: кнопка "Оплатить" просто меняет статус на "paid" без реального списания.</span>
          </li>
          <li class="flex gap-8">
            <span class="text-danger">✕</span>
            <span>Погода и карта: локальные климатические данные и схема маршрута без внешних сервисов.</span>
          </li>
        </ul>
      </div>

      <section v-if="places.length" id="photo-credits" class="bg-surface rounded-card p-16 border border-line">
        <h2 class="text-lg font-semibold mb-8">Фотографии маршрутов</h2>
        <p class="text-sm text-ink-2">Снимки показывают местность, а не участников конкретного выезда. Изображения уменьшены и преобразованы в WebP; в карточках используется кадрирование.</p>
        <ul class="space-y-12 mt-16"><li v-for="p in places" :key="p.id" class="text-sm"><strong>{{ p.title }}</strong><br />{{ p.author }} · <a :href="p.source" target="_blank" rel="noopener noreferrer" class="underline">Оригинал</a> · <a :href="p.licenseUrl" target="_blank" rel="noopener noreferrer" class="underline">{{ p.license }}</a><br /><small>{{ p.changeNote }} Лицензия локальной версии: {{ p.license }}.</small></li></ul>
      </section>
      <div class="text-center pt-16">
        <router-link to="/" class="text-g-600 font-medium hover:underline text-sm">
          Вернуться в каталог
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { places } from '@/data/places'
import { useDemoStore } from '@/store/demo'

const demoStore = useDemoStore()

const formattedDate = computed(() => {
  return demoStore.simulatedToday.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

function handleReset() {
  if (confirm('Вы уверены? Все данные демо будут удалены.')) {
    demoStore.reset()
  }
}
</script>