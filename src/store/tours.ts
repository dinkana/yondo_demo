import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { TOURS } from '@/data/tours'
import { REVIEWS } from '@/data/reviews'
import { ORGANIZERS, GUIDES } from '@/data/organizers'
import { tourSchema } from '@/schemas/tour'
import { organizerSchema, guideSchema, reviewSchema } from '@/schemas/organizer'

export const useToursStore = defineStore('tours', () => {
  const tours = ref(TOURS.map(t => tourSchema.parse(t)))
  const organizers = ref(ORGANIZERS.map(o => organizerSchema.parse(o)))
  const guides = ref(GUIDES.map(g => guideSchema.parse(g)))
  const reviews = ref(REVIEWS.map(r => reviewSchema.parse(r)))

  const getTourBySlug = (slug: string) => computed(() => tours.value.find(t => t.slug === slug))
  const getTourById = (id: string) => computed(() => tours.value.find(t => t.id === id))
  const getOrganizerById = (id: string) => computed(() => organizers.value.find(o => o.id === id))
  const getGuideById = (id: string) => computed(() => guides.value.find(g => g.id === id))
  const getReviewsByTourId = (tourId: string) => computed(() => reviews.value.filter(r => r.tourId === tourId))

  return {
    tours,
    organizers,
    guides,
    reviews,
    getTourBySlug,
    getTourById,
    getOrganizerById,
    getGuideById,
    getReviewsByTourId
  }
})