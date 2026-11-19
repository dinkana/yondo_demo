<template>
  <div class="min-h-screen bg-canvas pb-80 md:pb-16">
    <main id="main-content">
      <div v-if="!booking || booking.status === 'draft' || !tour" class="max-w-2xl mx-auto px-16 py-48 text-center">
        <p class="text-ink-2 mb-16">Альбом не найден</p>
        <router-link to="/trips" class="text-g-600 font-medium hover:underline">К моим поездкам</router-link>
      </div>
      <FadeIn v-else>
        <div class="max-w-2xl mx-auto px-16 py-24 space-y-24">
          <div>
            <h1 class="font-heading text-2xl font-bold text-ink mb-8">Альбом поездки</h1>
            <p class="font-body text-sm text-ink-2">{{ tour.title }}</p>
          </div>

          <div class="bg-surface rounded-card p-16 shadow-sm space-y-12">
            <div class="flex items-center justify-between pb-12 border-b border-line">
              <div>
                <div class="font-body text-sm text-ink-2">Дата</div>
                <div class="font-body text-base font-medium text-ink">{{ formatDate(departure) }}</div>
              </div>
              <div class="text-right">
                <div class="font-body text-sm text-ink-2">Фото</div>
                <div class="font-body text-base font-medium text-ink nums">{{ album.photos.length }} / {{ maxPhotos }}</div>
              </div>
            </div>
          </div>

          <AlbumSharedToggle :shared="album.shared" @toggle="toggleShared" />

          <div v-if="album.photos.length < maxPhotos">
            <p v-if="uploadError" role="alert" class="text-danger text-sm mb-8">Не удалось сохранить фото на этом устройстве.</p>
            <AlbumUpload
              :currentCount="album.photos.length"
              :maxCount="maxPhotos"
              @upload="uploadPhoto"
            />
          </div>

          <div v-if="album.photos.length">
            <AlbumGrid
              :photos="visiblePhotos"
              @toggleLike="toggleLike"
              @remove="removePhoto"
            />
          </div>

          <div v-else class="text-center py-32">
            <p class="text-ink-2">Пока нет фото</p>
          </div>

          <div v-if="album.shared && otherPhotos.length" class="space-y-12">
            <h2 class="font-heading text-lg font-semibold text-ink">Фото группы</h2>
            <AlbumGrid
              :photos="otherPhotos"
              @toggleLike="toggleLike"
            />
          </div>
          <router-link :to="{ name: 'memo', params: { id: bookingId } }" class="block text-g-600 font-medium underline">Открыть памятку</router-link>
        </div>
      </FadeIn>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useBookingsStore } from '@/store/bookings'
import { useToursStore } from '@/store/tours'
import { useAlbumsStore } from '@/store/albums'
import { groupSeeds } from '@/composables/useAlbumSeeds'
import AlbumGrid from '@/components/album/AlbumGrid.vue'
import AlbumUpload from '@/components/album/AlbumUpload.vue'
import AlbumSharedToggle from '@/components/album/AlbumSharedToggle.vue'
import FadeIn from '@/components/motion/FadeIn.vue'

const route = useRoute()
const bookingsStore = useBookingsStore()
const toursStore = useToursStore()
const albumsStore = useAlbumsStore()
const uploadError = ref(false)

const bookingId = route.params.id as string
const maxPhotos = 5

const booking = computed(() => bookingsStore.getById(bookingId))
const tour = computed(() => booking.value ? toursStore.getTourById(booking.value.tourId).value : null)
const departure = computed(() => tour.value?.departures.find(d => d.id === booking.value?.departureId) || null)
onMounted(() => {
  if (booking.value && booking.value.status !== 'draft') albumsStore.getByBookingId(bookingId)
})
const album = computed(() => albumsStore.albums.find(entry => entry.bookingId === bookingId) ?? { photos: [], shared: false })

const visiblePhotos = computed(() => album.value.photos.filter(p => p.isOwn !== false))
const otherPhotos = groupSeeds

function formatDate(dep: any): string {
  if (!dep) return ''
  const date = new Date()
  date.setDate(date.getDate() + dep.offsetDays)
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', weekday: 'short' })
}

async function uploadPhoto(file: File) {
  uploadError.value = false
  try {
    await albumsStore.addPhoto(bookingId, file)
  } catch {
    uploadError.value = true
  }
}

function toggleLike(photoId: string) {
  albumsStore.toggleLike(bookingId, photoId)
}

async function removePhoto(photoId: string) {
  await albumsStore.removePhoto(bookingId, photoId)
}

function toggleShared() {
  albumsStore.toggleShared(bookingId)
}

</script>