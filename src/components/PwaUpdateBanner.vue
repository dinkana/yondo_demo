<template>
    <div
      v-if="needRefresh"
      class="fixed left-16 right-16 bottom-0 z-40 mb-16 flex items-center gap-12 rounded-card bg-surface px-16 py-12 shadow-lg"
      style="bottom: var(--safe-bottom)"
      role="status"
    >
      <p class="flex-1 text-sm text-gray-900">Готово обновление демо</p>
      <button
        class="rounded-button-primary bg-action-ink px-16 py-8 text-sm font-medium text-white"
        @click="update"
      >
        Обновить
      </button>
      <button class="text-sm text-gray-500" @click="needRefresh = false">Позже</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { registerSW } from 'virtual:pwa-register'
  
  const needRefresh = ref(false)
  const updateSW = ref<(() => Promise<void>) | undefined>()
  
  onMounted(() => {
    updateSW.value = registerSW({
      onNeedRefresh() {
        needRefresh.value = true
      }
    })
  })
  
  async function update() {
    needRefresh.value = false
    await updateSW.value?.()
  }
  </script>