import { computed, toValue, type MaybeRefOrGetter } from 'vue'
import type { RegionId } from '@/schemas/tour'

const CLIMATE: Record<RegionId, Record<number, { tMin: number; tMax: number; precip: number }>> = {
  'iremel-tyulyuk': {
    1: { tMin: -15, tMax: -8, precip: 60 },
    2: { tMin: -14, tMax: -6, precip: 50 },
    3: { tMin: -8, tMax: 2, precip: 55 },
    4: { tMin: -2, tMax: 8, precip: 65 },
    5: { tMin: 4, tMax: 16, precip: 75 },
    6: { tMin: 9, tMax: 21, precip: 85 },
    7: { tMin: 12, tMax: 24, precip: 90 },
    8: { tMin: 10, tMax: 22, precip: 80 },
    9: { tMin: 4, tMax: 14, precip: 70 },
    10: { tMin: -2, tMax: 6, precip: 65 },
    11: { tMin: -9, tMax: -2, precip: 60 },
    12: { tMin: -14, tMax: -7, precip: 65 }
  },
  'zyuratkul-satki': {
    1: { tMin: -16, tMax: -9, precip: 55 },
    2: { tMin: -15, tMax: -7, precip: 45 },
    3: { tMin: -9, tMax: 1, precip: 50 },
    4: { tMin: -1, tMax: 9, precip: 60 },
    5: { tMin: 5, tMax: 17, precip: 70 },
    6: { tMin: 10, tMax: 22, precip: 80 },
    7: { tMin: 13, tMax: 25, precip: 85 },
    8: { tMin: 11, tMax: 23, precip: 75 },
    9: { tMin: 5, tMax: 15, precip: 65 },
    10: { tMin: -1, tMax: 7, precip: 60 },
    11: { tMin: -8, tMax: -1, precip: 55 },
    12: { tMin: -13, tMax: -6, precip: 60 }
  },
  'inzer-belorechye': {
    1: { tMin: -17, tMax: -10, precip: 50 },
    2: { tMin: -16, tMax: -8, precip: 40 },
    3: { tMin: -10, tMax: 0, precip: 50 },
    4: { tMin: -2, tMax: 8, precip: 60 },
    5: { tMin: 4, tMax: 16, precip: 70 },
    6: { tMin: 9, tMax: 21, precip: 80 },
    7: { tMin: 12, tMax: 24, precip: 85 },
    8: { tMin: 10, tMax: 22, precip: 75 },
    9: { tMin: 4, tMax: 14, precip: 65 },
    10: { tMin: -2, tMax: 6, precip: 60 },
    11: { tMin: -9, tMax: -2, precip: 55 },
    12: { tMin: -15, tMax: -8, precip: 55 }
  },
  'kapova': {
    1: { tMin: -16, tMax: -9, precip: 45 },
    2: { tMin: -15, tMax: -7, precip: 40 },
    3: { tMin: -9, tMax: 1, precip: 45 },
    4: { tMin: -1, tMax: 9, precip: 55 },
    5: { tMin: 5, tMax: 17, precip: 65 },
    6: { tMin: 10, tMax: 22, precip: 75 },
    7: { tMin: 13, tMax: 25, precip: 80 },
    8: { tMin: 11, tMax: 23, precip: 70 },
    9: { tMin: 5, tMax: 15, precip: 60 },
    10: { tMin: -1, tMax: 7, precip: 55 },
    11: { tMin: -8, tMax: -1, precip: 50 },
    12: { tMin: -14, tMax: -7, precip: 50 }
  },
  'nugush': {
    1: { tMin: -15, tMax: -8, precip: 45 },
    2: { tMin: -14, tMax: -6, precip: 40 },
    3: { tMin: -8, tMax: 2, precip: 45 },
    4: { tMin: -1, tMax: 9, precip: 55 },
    5: { tMin: 5, tMax: 17, precip: 65 },
    6: { tMin: 10, tMax: 22, precip: 75 },
    7: { tMin: 13, tMax: 25, precip: 80 },
    8: { tMin: 11, tMax: 23, precip: 70 },
    9: { tMin: 5, tMax: 15, precip: 60 },
    10: { tMin: -1, tMax: 7, precip: 55 },
    11: { tMin: -8, tMax: -1, precip: 50 },
    12: { tMin: -13, tMax: -6, precip: 50 }
  },
  'pavlovka': {
    1: { tMin: -14, tMax: -7, precip: 45 },
    2: { tMin: -13, tMax: -5, precip: 40 },
    3: { tMin: -7, tMax: 3, precip: 45 },
    4: { tMin: 0, tMax: 10, precip: 55 },
    5: { tMin: 6, tMax: 18, precip: 65 },
    6: { tMin: 11, tMax: 23, precip: 75 },
    7: { tMin: 14, tMax: 26, precip: 80 },
    8: { tMin: 12, tMax: 24, precip: 70 },
    9: { tMin: 6, tMax: 16, precip: 60 },
    10: { tMin: 0, tMax: 8, precip: 55 },
    11: { tMin: -7, tMax: 0, precip: 50 },
    12: { tMin: -12, tMax: -5, precip: 50 }
  },
  'yangantau': {
    1: { tMin: -14, tMax: -7, precip: 45 },
    2: { tMin: -13, tMax: -5, precip: 40 },
    3: { tMin: -7, tMax: 3, precip: 45 },
    4: { tMin: 0, tMax: 10, precip: 55 },
    5: { tMin: 6, tMax: 18, precip: 65 },
    6: { tMin: 11, tMax: 23, precip: 75 },
    7: { tMin: 14, tMax: 26, precip: 80 },
    8: { tMin: 12, tMax: 24, precip: 70 },
    9: { tMin: 6, tMax: 16, precip: 60 },
    10: { tMin: 0, tMax: 8, precip: 55 },
    11: { tMin: -7, tMax: 0, precip: 50 },
    12: { tMin: -12, tMax: -5, precip: 50 }
  }
}

// This demo uses the local climate table, not a live forecast.
export function useWeather(region: MaybeRefOrGetter<RegionId>, date: MaybeRefOrGetter<Date>) {
  const data = computed(() => ({ ...CLIMATE[toValue(region)][toValue(date).getMonth() + 1], source: 'climate' as const }))
  return { data, loading: false, error: null }
}
