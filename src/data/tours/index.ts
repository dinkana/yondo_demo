import { places, placeUrl } from '@/data/places'
import type { Tour } from '@/schemas/tour'
import { iremelTours } from './iremel'
import { aigirTours } from './aigir'
import { zyuratkulTours } from './zyuratkul'
import { inzerTours } from './inzer'
import { kapovaTours } from './kapova'
import { nugushTours } from './nugush'
import { pavlovkaTours } from './pavlovka'
import { yangantauTours } from './yangantau'

export const TOURS: Tour[] = [
  ...iremelTours,
  ...aigirTours,
  ...zyuratkulTours,
  ...inzerTours,
  ...kapovaTours,
  ...nugushTours,
  ...pavlovkaTours,
  ...yangantauTours
].map(tour => {
  const place = places.find(photo => tour.id.startsWith(`${photo.id}-`))
  const illustrations = tour.photos.map(photo => ({ ...photo, alt: `Иллюстрация: ${photo.alt}` }))
  if (!place) return { ...tour, photos: illustrations }
  return { ...tour, photos: [
    { src: placeUrl(place), alt: place.caption, w: place.width, h: place.height },
    ...illustrations.slice(1)
  ] }
})