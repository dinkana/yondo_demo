import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getSimulatedToday, setTimeOffset, resetDemoData } from '@/utils/storage'

export const useDemoStore = defineStore('demo', () => {
  const offsetStr = localStorage.getItem('yondo:timeOffset')
  const initialOffset = offsetStr ? parseInt(offsetStr, 10) : 0
  
  const timeOffset = ref<number>(initialOffset)

  const simulatedToday = computed(() => getSimulatedToday())

  function shiftDays(days: number) {
    const newOffset = timeOffset.value + days
    timeOffset.value = newOffset
    setTimeOffset(newOffset)
  }

  function reset() {
    resetDemoData()
  }

  return {
    timeOffset,
    simulatedToday,
    shiftDays,
    reset
  }
})