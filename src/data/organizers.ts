import type { Organizer, Guide } from '@/schemas/organizer'

export const ORGANIZERS: Organizer[] = [
  {
    id: 'tau-travel',
    name: 'Тау-Тревел',
    legal: 'ООО',
    city: 'Уфа',
    since: 2015,
    verified: true,
    rating: 4.8,
    toursCount: 12,
    about: 'Горные экспедиции по Южному Уралу. Специализация — Иремель и Янгантау.',
    logoId: 'tau-travel',
    type: 'firm'
  },
  {
    id: 'southern-trails',
    name: 'Южные Тропы',
    legal: 'ООО',
    city: 'Миасс',
    since: 2018,
    verified: true,
    rating: 4.7,
    toursCount: 9,
    about: 'Спелео-туры и озёрные экспедиции. Зюраткуль, Айгир, зимние походы.',
    logoId: 'southern-trails',
    type: 'firm'
  },
  {
    id: 'inzer-camps',
    name: 'Инзерские Стоянки',
    legal: 'ИП',
    city: 'Белорецк',
    since: 2012,
    verified: true,
    rating: 4.9,
    toursCount: 7,
    about: 'Сплавы по Инзеру и Павловке. Фото-туры по Нугушу.',
    logoId: 'inzer-camps',
    type: 'guide'
  }
]

export const GUIDES: Guide[] = [
  {
    id: 'rustam',
    name: 'Рустам Ахметшин',
    organizerId: 'tau-travel',
    bio: 'Сертифицированный гид по Иремелю. Знает каждую тропу.',
    experienceYears: 12,
    specialties: ['Иремель', 'горы', 'семейные'],
    rating: 4.9,
    avatarId: 'rustam'
  },
  {
    id: 'aigul',
    name: 'Айгуль Сафина',
    organizerId: 'tau-travel',
    bio: 'Семейные туры по Янгантау. Психолог по образованию.',
    experienceYears: 8,
    specialties: ['Янгантау', 'этно', 'дети'],
    rating: 4.8,
    avatarId: 'aigul'
  },
  {
    id: 'olga',
    name: 'Ольга Верещагина',
    organizerId: 'southern-trails',
    bio: 'Спелеолог, гид по пещерам Зюраткуля.',
    experienceYears: 10,
    specialties: ['пещеры', 'Зюраткуль', 'спелео'],
    rating: 4.7,
    avatarId: 'olga'
  },
  {
    id: 'sergey',
    name: 'Сергей Балашов',
    organizerId: 'southern-trails',
    bio: 'Зимние экспедиции по Айгиру. Фотограф-пейзажист.',
    experienceYears: 15,
    specialties: ['Айгир', 'зима', 'фото'],
    rating: 4.9,
    avatarId: 'sergey'
  },
  {
    id: 'ildar',
    name: 'Ильдар Юмагулов',
    organizerId: 'inzer-camps',
    bio: 'Инструктор по сплавам. 20 лет на воде.',
    experienceYears: 20,
    specialties: ['Инзер', 'Павловка', 'сплавы'],
    rating: 5.0,
    avatarId: 'ildar'
  },
  {
    id: 'dinar',
    name: 'Динар Хасанов',
    organizerId: 'inzer-camps',
    bio: 'Фото-туры по Нугушу. Знает лучшие рассветы.',
    experienceYears: 6,
    specialties: ['Нугуш', 'фото', 'кэмпинг'],
    rating: 4.8,
    avatarId: 'dinar'
  }
]