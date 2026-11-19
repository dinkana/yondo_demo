<template>
    <div class="bg-surface rounded-card p-16 shadow-sm">
      <div class="flex items-center justify-between">
        <div class="flex-1 pr-16">
          <h3 class="font-heading text-base font-semibold text-ink mb-4">Показать группе</h3>
          <p class="font-body text-sm text-ink-2">
            {{ shared ? 'Показаны примеры фото группы. Ваши фото не отправляются.' : 'Демонстрация: ваши фото остаются на устройстве.' }}
          </p>
        </div>
        <button
          type="button" role="switch" aria-label="Показать группе" :aria-checked="shared"
          :class="[
            'relative w-48 h-28 rounded-full transition-colors',
            shared ? 'bg-g-500' : 'bg-line'
          ]"
          @click="$emit('toggle')"
        >
          <span
            :class="[
              'absolute left-0 top-4 w-20 h-20 rounded-full bg-white shadow-sm transition-transform',
              shared ? 'translate-x-24' : 'translate-x-4'
            ]"
          />
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{ shared: boolean }>()
  defineEmits<{ toggle: [] }>()
  </script>