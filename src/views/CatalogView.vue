<template>
  <div class="min-h-screen bg-canvas">
    <main id="main-content">
      <HeroBlock v-model="searchQuery" />
      <FilterChips
        :filters="filters"
        @update="updateFilters"
        @openSheet="sheetOpen = true"
      />
      <div class="max-w-7xl mx-auto px-16 py-24">
        <div class="flex items-baseline justify-between flex-wrap gap-8 mb-16">
          <h2 id="routes-heading" tabindex="-1" class="routes-heading">Маршруты</h2>
          <ResultsCounter :count="rankedTours.length" />
        </div>
        <div class="flex gap-24">
          <FilterSidebar
            :filters="filters"
            @update="updateFilters"
            @reset="resetFilters"
          />
          <div class="min-w-0 flex-1">
            <FadeIn>
              <CatalogGrid
                :tours="rankedTours"
                :loading="loading"
                :error="error"
                @retry="retry"
                @reset="clearCatalog"
              />
            </FadeIn>
          </div>
        </div>
      </div>
      <FilterSheet
        :open="sheetOpen"
        :filters="filters"
        @close="sheetOpen = false"
        @reset="resetFilters"
        @update="updateFilters"
      />
      <LiveRegion live="polite" :atomic="true">
        {{ `Найдено ${rankedTours.length} туров` }}
      </LiveRegion>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useToursStore } from '@/store/tours'
import { useCatalogSearch } from '@/composables/useCatalogSearch'
import { useCatalogFilters } from '@/composables/useCatalogFilters'
import { useRanking } from '@/composables/useRanking'
import HeroBlock from '@/components/catalog/HeroBlock.vue'
import FilterChips from '@/components/catalog/FilterChips.vue'
import FilterSheet from '@/components/catalog/FilterSheet.vue'
import FilterSidebar from '@/components/catalog/FilterSidebar.vue'
import CatalogGrid from '@/components/catalog/CatalogGrid.vue'
import ResultsCounter from '@/components/catalog/ResultsCounter.vue'
import FadeIn from '@/components/motion/FadeIn.vue'
import LiveRegion from '@/components/a11y/LiveRegion.vue'

const toursStore = useToursStore()
const { query: searchQuery, results: searchResults } = useCatalogSearch(toursStore.tours)
const { filters, updateFilters, resetFilters } = useCatalogFilters()
const { rankedTours } = useRanking(toursStore.tours, searchResults, filters)

const sheetOpen = ref(false)
const loading = ref(false)
const error = ref(false)

function clearCatalog() { searchQuery.value = ''; resetFilters() }

function retry() {
  error.value = false
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>
<style scoped>
.routes-heading{font:500 clamp(29px,3.4vw,44px)/1.12 Georgia,'Times New Roman',serif;letter-spacing:-.045em;scroll-margin-top:18px}.routes-heading:focus:not(:focus-visible){outline:none}
</style>