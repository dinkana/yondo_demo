import { ref, watch, unref } from 'vue'
import MiniSearch from 'minisearch'
import type { Tour } from '@/schemas/tour'
import type { Ref } from 'vue'

export function useCatalogSearch(tours: Tour[] | Ref<Tour[]>) {
  const query = ref('')
  const results = ref<string[] | null>(null)

  const toursArray = unref(tours)

  const miniSearch = new MiniSearch({
    fields: ['title', 'subtitle', 'types', 'region'],
    storeFields: ['id'],
    searchOptions: {
      boost: { title: 3, subtitle: 1.5 },
      fuzzy: 0.2,
      prefix: true
    }
  })

  miniSearch.addAll(toursArray)

  watch(query, (q) => {
    if (!q.trim()) {
      results.value = null
      return
    }
    const searchResults = miniSearch.search(q)
    results.value = searchResults.map(r => r.id)
  })

  return { query, results }
}