import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useStorage } from '@/composables/useStorage'
import type { Booking } from '@/schemas/booking'
import { bookingSchema } from '@/schemas/booking'
import { useToursStore } from './tours'

export const useBookingsStore = defineStore('bookings', () => {
  const bookings = useStorage<Booking[]>('bookings', [])
  const toursStore = useToursStore()

  // Restore occupied seats once per session. Tour data itself is seeded on reload.
  for (const booking of bookings.value) {
    if (!booking || booking.status === 'draft') continue
    const departure = toursStore.getTourById(booking.tourId).value?.departures.find(d => d.id === booking.departureId)
    if (departure) departure.seatsTaken = Math.min(departure.seatsTotal, departure.seatsTaken + booking.adults + booking.children)
  }

  const paidBookings = computed(() => bookings.value.filter(b => b.status === 'paid'))
  const completedBookings = computed(() => bookings.value.filter(b => b.status === 'completed'))
  const draftBookings = computed(() => bookings.value.filter(b => b.status === 'draft'))

  function getById(id: string) {
    return bookings.value.find(b => b.id === id)
  }

  function create(data: Omit<Booking, 'id' | 'createdAt' | 'status'>): Booking {
    const booking: Booking = {
      ...data,
      id: `bk_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      status: 'draft'
    }
    bookingSchema.parse(booking)
    bookings.value = [...bookings.value, booking]
    return booking
  }

  function markPaid(id: string): boolean {
    const booking = getById(id)
    if (!booking) return false
    if (booking.status !== 'draft') return true
    const departure = toursStore.getTourById(booking.tourId).value?.departures.find(d => d.id === booking.departureId)
    const partySize = booking.adults + booking.children
    if (!departure || partySize > departure.seatsTotal - departure.seatsTaken) return false
    departure.seatsTaken += partySize
    bookings.value = bookings.value.map(b => b.id === id ? { ...b, status: 'paid' } : b)
    return true
  }

  function markCompleted(id: string) {
    bookings.value = bookings.value.map(b =>
      b.id === id ? { ...b, status: 'completed' as const } : b
    )
  }

  function removeDraft(id: string) {
    bookings.value = bookings.value.filter(b => b.id !== id || b.status !== 'draft')
  }

  return {
    bookings,
    paidBookings,
    completedBookings,
    draftBookings,
    getById,
    create,
    markPaid,
    markCompleted,
    removeDraft
  }
})