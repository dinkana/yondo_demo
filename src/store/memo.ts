import { defineStore } from 'pinia'
import { useStorage } from '@/composables/useStorage'
import type { MemoState } from '@/schemas/booking'

export const useMemoStore = defineStore('memo', () => {
  const states = useStorage<MemoState[]>('memo', [])

  function getByBookingId(bookingId: string): MemoState | undefined {
    return states.value.find(s => s.bookingId === bookingId)
  }

  function upsert(state: MemoState) {
    const idx = states.value.findIndex(s => s.bookingId === state.bookingId)
    if (idx >= 0) {
      states.value = states.value.map((s, i) => i === idx ? state : s)
    } else {
      states.value = [...states.value, state]
    }
  }

  function toggleItem(bookingId: string, itemId: string) {
    states.value = states.value.map(s => {
      if (s.bookingId !== bookingId) return s
      return {
        ...s,
        checked: {
          ...s.checked,
          [itemId]: !s.checked[itemId]
        }
      }
    })
  }

  return { states, getByBookingId, upsert, toggleItem }
})