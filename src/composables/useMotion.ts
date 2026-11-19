import { ref, onMounted, onUnmounted } from 'vue'

export function useMotion() {
  const query = typeof window === 'undefined' ? null : window.matchMedia('(prefers-reduced-motion: reduce)')
  const prefersReducedMotion = ref(query?.matches ?? false)
  const update = (event: MediaQueryListEvent) => { prefersReducedMotion.value = event.matches }
  onMounted(() => query?.addEventListener('change', update))
  onUnmounted(() => query?.removeEventListener('change', update))
  return { prefersReducedMotion }
}