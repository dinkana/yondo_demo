import { clear } from 'idb-keyval'

export async function resetDemoData() {
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('yondo:')) {
      localStorage.removeItem(key)
    }
  })
  
  try {
    await clear()
  } catch (e) {
    console.error('IDB clear failed', e)
  }

  if ('caches' in window) {
    const keys = await caches.keys()
    await Promise.all(keys.map(key => caches.delete(key)))
  }

  window.location.reload()
}

export function getSimulatedToday(): Date {
  const offset = localStorage.getItem('yondo:timeOffset')
  const days = offset ? parseInt(offset, 10) : 0
  const today = new Date()
  today.setDate(today.getDate() + days)
  return today
}

export function setTimeOffset(days: number) {
  localStorage.setItem('yondo:timeOffset', days.toString())
  window.location.reload()
}