import { defineStore } from 'pinia'
import { useStorage } from '@/composables/useStorage'
import { idbSet, idbGet, idbDel } from '@/composables/useIdb'
import type { Album, AlbumPhoto } from '@/schemas/booking'
import { albumSchema } from '@/schemas/booking'
import { makeOwnSeeds } from '@/composables/useAlbumSeeds'

export const useAlbumsStore = defineStore('albums', () => {
  const albums = useStorage<Album[]>('albums', [])

  function getByBookingId(bookingId: string): Album {
    const existing = albums.value.find(a => a.bookingId === bookingId)
    if (existing) return existing
    const fresh: Album = { bookingId, photos: makeOwnSeeds(), shared: false }
    albumSchema.parse(fresh)
    albums.value = [...albums.value, fresh]
    return fresh
  }

  async function addPhoto(
    bookingId: string,
    file: File,
    meta?: { id?: string; w?: number; h?: number; isOwn?: boolean; author?: string }
  ): Promise<AlbumPhoto> {
    getByBookingId(bookingId)
    const id = meta?.id || `ph_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    const idbKey = `yondo:media:${id}`
    const bitmap = await createImageBitmap(file)
    const { width, height } = bitmap
    bitmap.close()
    const photo: AlbumPhoto = {
      id,
      idbKey,
      w: meta?.w || width,
      h: meta?.h || height,
      createdAt: new Date().toISOString(),
      liked: false,
      isOwn: meta?.isOwn ?? true,
      author: meta?.author
    }
    await idbSet(idbKey, file)
    albums.value = albums.value.map(a =>
      a.bookingId === bookingId ? { ...a, photos: [...a.photos, photo] } : a
    )
    return photo
  }

  async function removePhoto(bookingId: string, photoId: string) {
    const album = albums.value.find(a => a.bookingId === bookingId)
    if (!album) return
    const photo = album.photos.find(p => p.id === photoId)
    if (photo && !photo.idbKey.startsWith('seed:')) await idbDel(photo.idbKey)
    albums.value = albums.value.map(a =>
      a.bookingId === bookingId ? { ...a, photos: a.photos.filter(p => p.id !== photoId) } : a
    )
  }

  function toggleLike(bookingId: string, photoId: string) {
    albums.value = albums.value.map(a =>
      a.bookingId === bookingId
        ? { ...a, photos: a.photos.map(p => p.id === photoId ? { ...p, liked: !p.liked } : p) }
        : a
    )
  }

  function toggleShared(bookingId: string) {
    albums.value = albums.value.map(a =>
      a.bookingId === bookingId ? { ...a, shared: !a.shared } : a
    )
  }

  async function getPhotoBlob(photo: AlbumPhoto): Promise<Blob | undefined> {
    return await idbGet<Blob>(photo.idbKey)
  }

  return {
    albums,
    getByBookingId,
    addPhoto,
    removePhoto,
    toggleLike,
    toggleShared,
    getPhotoBlob
  }
})