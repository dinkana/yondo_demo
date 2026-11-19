<template>
    <div>
      <label
        :class="[
          'flex flex-col items-center justify-center gap-8 p-24 border-2 border-dashed rounded-card cursor-pointer transition-colors',
          dragOver ? 'border-g-500 bg-g-50' : 'border-line bg-surface-soft hover:border-line-strong'
        ]"
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="onDrop"
      >
        <svg class="w-32 h-32 text-ink-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
        </svg>
        <span class="font-body text-sm font-medium text-ink">Загрузить фото</span>
        <span class="font-body text-xs text-ink-3">До 5 фото, EXIF удаляется</span>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          multiple
          class="hidden"
          @change="onFileSelect"
        />
      </label>
      <p v-if="error" class="mt-8 text-sm text-danger">{{ error }}</p>
      <p v-if="uploading" class="mt-8 text-sm text-ink-2">Обработка...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { resizeImage } from '@/composables/useImageResize'
  
  const props = defineProps<{
    currentCount: number
    maxCount?: number
  }>()
  
  const emit = defineEmits<{
    upload: [file: File]
  }>()
  
  const maxCount = props.maxCount || 5
  const dragOver = ref(false)
  const uploading = ref(false)
  const error = ref<string | null>(null)
  const fileInput = ref<HTMLInputElement | null>(null)
  
  async function handleFiles(files: FileList | File[]) {
    error.value = null
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'))
    if (!fileArray.length) {
      error.value = 'Выберите изображения'
      return
    }
    const available = maxCount - props.currentCount
    if (fileArray.length > available) {
      error.value = `Можно загрузить ещё ${available} фото`
      return
    }
    uploading.value = true
    try {
      for (const file of fileArray) {
        const resized = await resizeImage(file)
        const resizedFile = new File([resized], file.name, { type: 'image/jpeg' })
        emit('upload', resizedFile)
      }
    } catch (e) {
      error.value = 'Ошибка обработки фото'
    } finally {
      uploading.value = false
      if (fileInput.value) fileInput.value.value = ''
    }
  }
  
  function onFileSelect(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.files) handleFiles(input.files)
  }
  
  function onDrop(e: DragEvent) {
    dragOver.value = false
    if (e.dataTransfer?.files) handleFiles(e.dataTransfer.files)
  }
  </script>