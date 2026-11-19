import { ref, watch, type Ref } from 'vue'

const PREFIX = 'yondo:v1:'

export function useStorage<T>(key: string, initial: T) {
  const fullKey = PREFIX + key
  let stored = initial
  try {
    const raw = localStorage.getItem(fullKey)
    if (raw) {
      const value = JSON.parse(raw)
      if (value !== null && (Array.isArray(initial) ? Array.isArray(value) : typeof value === typeof initial)) stored = value
    }
  } catch {
    // The current session still works if storage is blocked or malformed.
  }
  const data = ref(stored) as Ref<T>
  watch(data, (val) => {
    try {
      localStorage.setItem(fullKey, JSON.stringify(val))
    } catch {
      // Keep the in-memory demo usable if the browser denies persistence.
    }
  }, { deep: true, flush: 'sync' })
  return data
}
