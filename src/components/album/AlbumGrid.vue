<template>
    <div class="grid grid-cols-2 md:grid-cols-3 gap-8">
      <div
        v-for="photo in photos"
        :key="photo.id"
        class="relative aspect-square bg-g-100 rounded-image overflow-hidden group"
      >
        <img
          :src="photo.idbKey.startsWith('seed:') ? media(photo.idbKey.slice(5)) : blobUrls[photo.id]"
          :alt="photo.author ? `Фото от ${photo.author}` : 'Фото из поездки'"
          :width="photo.w"
          :height="photo.h"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-if="photo.author && !photo.isOwn" class="absolute top-8 left-8 bg-black/60 text-white text-xs px-8 py-4 rounded-chip font-body">
          {{ photo.author }}
        </div>
        <div v-if="photo.isOwn" class="absolute top-8 right-8 flex gap-4">
          <button
            class="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
            aria-label="Отметить фото" :aria-pressed="photo.liked" @click="$emit('toggleLike', photo.id)"
          >
            <svg
              :class="['w-16 h-16', photo.liked ? 'text-danger' : 'text-ink-3']"
              viewBox="0 0 24 24"
              :fill="photo.liked ? 'currentColor' : 'none'"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            class="w-32 h-32 bg-white/90 rounded-full flex items-center justify-center shadow-sm"
            aria-label="Удалить фото" @click="$emit('remove', photo.id)"
          >
            <svg class="w-16 h-16 text-ink-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onUnmounted } from 'vue'
  import type { AlbumPhoto } from '@/schemas/booking'
  import { media } from '@/data/media'
  import { useAlbumsStore } from '@/store/albums'
  
  const props = defineProps<{ photos: AlbumPhoto[] }>()
  
  defineEmits<{
    toggleLike: [id: string]
    remove: [id: string]
  }>()
  
  const albumsStore = useAlbumsStore()
  const blobUrls = ref<Record<string, string>>({})
  const objectUrls: string[] = []
  
  async function loadBlobs() {
    for (const photo of props.photos) {
      if (photo.idbKey.startsWith('seed:') || blobUrls.value[photo.id]) continue
      const blob = await albumsStore.getPhotoBlob(photo)
      if (blob) {
        const url = URL.createObjectURL(blob)
        blobUrls.value[photo.id] = url
        objectUrls.push(url)
      }
    }
  }
  
  watch(() => props.photos, loadBlobs, { immediate: true })
  
  onUnmounted(() => {
    objectUrls.forEach(url => URL.revokeObjectURL(url))
  })
  </script>