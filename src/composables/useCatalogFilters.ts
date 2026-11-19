import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { tourTypeSchema } from '@/schemas/tour'
import type { TourType, Accommodation, RegionId, Difficulty } from '@/schemas/tour'

export interface CatalogFilters {
  days: string | null
  types: TourType[]
  priceMax: number | null
  organizer: string | null
  kids: boolean
  childAge: number | null
  difficulty: Difficulty | null
  accommodation: Accommodation | null
  region: RegionId | null
  date: string | null
  onlyAvailable: boolean
}

const pitchTypes: Record<string, TourType> = { peaks: 'горы', caves: 'пещеры' }

export function useCatalogFilters() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed<CatalogFilters>(() => ({
    days: route.query.days as string || null,
    types: String(route.query.types ?? route.query.type ?? '').split(',')
      .map(type => pitchTypes[type] ?? type)
      .filter((type): type is TourType => tourTypeSchema.safeParse(type).success),
    priceMax: Number(route.query.priceMax ?? route.query.max) || null,
    organizer: route.query.organizer as string || null,
    kids: route.query.kids === '1',
    childAge: route.query.childAge ? parseInt(route.query.childAge as string) : null,
    difficulty: route.query.difficulty ? parseInt(route.query.difficulty as string) as Difficulty : null,
    accommodation: route.query.accommodation as Accommodation || null,
    region: route.query.region as RegionId || null,
    date: route.query.date as string || null,
    onlyAvailable: route.query.available === '1'
  }))

  function updateFilters(newFilters: Partial<CatalogFilters>) {
    const query: Record<string, string> = {}
    const merged = { ...filters.value, ...newFilters }

    if (merged.days) query.days = merged.days
    if (merged.types.length) query.types = merged.types.join(',')
    if (merged.priceMax) query.priceMax = merged.priceMax.toString()
    if (merged.organizer) query.organizer = merged.organizer
    if (merged.kids) query.kids = '1'
    if (merged.childAge !== null) query.childAge = merged.childAge.toString()
    if (merged.difficulty) query.difficulty = merged.difficulty.toString()
    if (merged.accommodation) query.accommodation = merged.accommodation
    if (merged.region) query.region = merged.region
    if (merged.date) query.date = merged.date
    if (merged.onlyAvailable) query.available = '1'

    router.push({ query })
  }

  function resetFilters() {
    router.push({ query: {} })
  }

  return { filters, updateFilters, resetFilters }
}