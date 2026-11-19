import { defineStore } from 'pinia'
import { useStorage } from '@/composables/useStorage'

export const useWishlistStore = defineStore('wishlist', () => {
  const tourIds = useStorage<string[]>('wishlist', [])

  function toggle(tourId: string) {
    if (tourIds.value.includes(tourId)) {
      tourIds.value = tourIds.value.filter(id => id !== tourId)
    } else {
      tourIds.value = [...tourIds.value, tourId]
    }
  }

  function has(tourId: string): boolean {
    return tourIds.value.includes(tourId)
  }

  return { tourIds, toggle, has }
})