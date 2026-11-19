import { computed, unref } from 'vue'
import type { Tour, Departure } from '@/schemas/tour'
import type { Ref } from 'vue'
import type { CatalogFilters } from './useCatalogFilters'

export function useRanking(tours: Tour[] | Ref<Tour[]>, searchResults: Ref<string[] | null>, filters: Ref<CatalogFilters>) {
  const rankedTours = computed(() => {
    const toursArray = unref(tours)
    const searchIds = unref(searchResults)
    const filtersValue = unref(filters)

    let filtered = toursArray

    if (searchIds) {
      filtered = filtered.filter(t => searchIds.includes(t.id))
    }

    if (filtersValue.days) {
      const [min, max = min] = filtersValue.days.split('-').map(Number)
      filtered = filtered.filter(t => t.days >= min && t.days <= max)
    }

    if (filtersValue.types?.length) {
      filtered = filtered.filter(t => filtersValue.types.some(type => t.types.includes(type)))
    }

    const { priceMax, childAge, accommodation } = filtersValue
    if (priceMax !== null) {
      filtered = filtered.filter(t => t.basePriceK <= priceMax)
    }

    if (filtersValue.organizer) {
      filtered = filtered.filter(t => t.organizerId === filtersValue.organizer)
    }

    if (filtersValue.kids) {
      filtered = filtered.filter(t => t.childFriendly)
      if (childAge !== null) {
        filtered = filtered.filter(t => t.minChildAge === null || t.minChildAge <= childAge)
      }
    }

    if (filtersValue.difficulty) {
      filtered = filtered.filter(t => t.difficulty === filtersValue.difficulty)
    }

    if (accommodation) {
      filtered = filtered.filter(t => t.accommodation.includes(accommodation))
    }

    if (filtersValue.region) {
      filtered = filtered.filter(t => t.region === filtersValue.region)
    }

    if (filtersValue.onlyAvailable) {
      filtered = filtered.filter(t => {
        return t.departures.some(departure => departure.offsetDays >= 0 && departure.seatsTotal > departure.seatsTaken)
      })
    }

    const scored = filtered.map(tour => {
      const departure = getNextDeparture(tour)
      if (!departure) return { tour, score: -1 }

      const seatsLeft = departure.seatsTotal - departure.seatsTaken
      if (seatsLeft === 0) return { tour, score: -1 }

      const fill = departure.seatsTaken / departure.seatsTotal
      const fillBoost = fill >= 0.5 ? Math.pow(fill, 1.5) : fill * 0.4

      const dateProximity = 1 - (departure.offsetDays / 60)
      const popularity = tour.reviewsCount / 50
      const editorial = tour.rating / 5

      const score = 0.45 * fillBoost + 0.20 * (tour.rating / 5) + 0.15 * dateProximity + 0.10 * popularity + 0.10 * editorial

      return { tour, score, departure }
    })

    scored.sort((a, b) => {
      if (a.score === -1 && b.score === -1) return 0
      if (a.score === -1) return 1
      if (b.score === -1) return -1
      if (b.score !== a.score) return b.score - a.score
      if (a.departure!.offsetDays !== b.departure!.offsetDays) {
        return a.departure!.offsetDays - b.departure!.offsetDays
      }
      if (b.tour.rating !== a.tour.rating) return b.tour.rating - a.tour.rating
      return a.tour.id.localeCompare(b.tour.id)
    })

    return scored.map(s => s.tour)
  })

  function getNextDeparture(tour: Tour): Departure | null {
    const futureDepartures = tour.departures.filter(d => d.offsetDays >= 0)
    if (!futureDepartures.length) return null
    return futureDepartures.sort((a, b) => a.offsetDays - b.offsetDays)[0]
  }

  return { rankedTours }
}