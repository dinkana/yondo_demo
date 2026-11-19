import type { TourType, Accommodation, RegionId, Difficulty } from '@/schemas/tour'

export const TOUR_TYPES: TourType[] = [
  'горы', 'пещеры', 'кэмпинг', 'сплав', 'озёра', 'джип', 'этно/гастро', 'фото', 'зима'
]

export const ACCOMMODATIONS: Accommodation[] = [
  'палатки', 'глэмпинг', 'турбаза', 'гостевой дом', 'отель', 'приют/изба', 'без ночлега'
]

export const REGIONS: Record<RegionId, string> = {
  'iremel-tyulyuk': 'Иремель и Тюлюк',
  'zyuratkul-satki': 'Зюраткуль и Сатка',
  'inzer-belorechye': 'Инзер и Белорецк',
  'kapova': 'Капова пещера',
  'nugush': 'Нугушское водохранилище',
  'pavlovka': 'Павловка',
  'yangantau': 'Янгантау'
}

export const DIFFICULTIES: Record<Difficulty, string> = {
  1: 'Прогулка',
  2: 'Лёгкий',
  3: 'Средний',
  4: 'Сложный',
  5: 'Экспертный'
}

export const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']