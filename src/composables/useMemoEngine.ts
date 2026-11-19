import { computed, unref } from 'vue'
import type { MemoContext } from '@/schemas/booking'
import type { Ref } from 'vue'

export interface MemoItem {
  id: string
  title: string
  reason: string
  category: 'base' | 'clothes' | 'gear' | 'kids' | 'weather'
}

export function useMemoEngine(context: Ref<MemoContext | null>) {
  const items = computed<MemoItem[]>(() => {
    const ctx = unref(context)
    if (!ctx) return []

    const result: MemoItem[] = [
      { id: 'passport', title: 'Документы', reason: 'Обязательно для регистрации', category: 'base' },
      { id: 'phone', title: 'Телефон и зарядка', reason: 'Связь с гидом', category: 'base' },
      { id: 'medkit', title: 'Аптечка', reason: 'Личные лекарства', category: 'base' },
      { id: 'water', title: 'Вода 1.5 л', reason: 'На день пути', category: 'base' },
      { id: 'snack', title: 'Перекус', reason: 'Орехи, сухофрукты', category: 'base' },
      { id: 'flashlight', title: 'Налобный фонарь', reason: 'Вечерние переходы', category: 'base' }
    ]

    if (ctx.tMin < 5) {
      result.push(
        { id: 'thermo', title: 'Термобельё', reason: `Ночью ${ctx.tMin}°C`, category: 'clothes' },
        { id: 'fleece', title: 'Флис', reason: `Ночью ${ctx.tMin}°C`, category: 'clothes' },
        { id: 'hat', title: 'Тёплая шапка', reason: `Ночью ${ctx.tMin}°C`, category: 'clothes' }
      )
    }

    if (ctx.precip > 40) {
      result.push(
        { id: 'raincoat', title: 'Дождевик', reason: `Вероятность дождя ${ctx.precip}%`, category: 'clothes' },
        { id: 'hermo', title: 'Гермомешок', reason: `Вероятность дождя ${ctx.precip}%`, category: 'gear' }
      )
    }

    if (ctx.difficulty >= 3) {
      result.push(
        { id: 'boots', title: 'Трекинговые ботинки', reason: 'Сложный маршрут', category: 'gear' },
        { id: 'sticks', title: 'Трекинговые палки', reason: 'Сложный маршрут', category: 'gear' }
      )
    }

    if (ctx.accommodation.includes('палатки')) {
      result.push(
        { id: 'sleeping', title: 'Спальник', reason: 'Ночёвка в палатках', category: 'gear' },
        { id: 'mat', title: 'Коврик', reason: 'Ночёвка в палатках', category: 'gear' }
      )
    }

    if (ctx.hasChild) {
      const age = ctx.childAge || 7
      result.push(
        { id: 'kid-pack', title: 'Детский рюкзак', reason: `Ребёнок ${age} лет`, category: 'kids' },
        { id: 'kid-snack', title: 'Детские перекусы', reason: `Ребёнок ${age} лет`, category: 'kids' },
        { id: 'kid-toy', title: 'Любимая игрушка', reason: `Ребёнок ${age} лет`, category: 'kids' }
      )
    }

    return result
  })

  return { items }
}