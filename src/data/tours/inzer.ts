import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const inzerTours: Tour[] = [
  {
    id: 'inzer-rafting',
    slug: 'inzer-rafting',
    title: 'Сплав по Инзеру',
    subtitle: 'Двухдневный сплав на катамаранах',
    types: ['сплав'],
    region: 'inzer-belorechye',
    difficulty: 2,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 8,
    accommodation: ['палатки'],
    organizerId: 'inzer-camps',
    guideIds: ['ildar'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Старт сплава', lat: 53.85, lng: 57.6833, dayOffset: 0 },
        { name: 'Стоянка на берегу', lat: 53.86, lng: 57.7, dayOffset: 1 }
      ],
      distanceKm: 25,
      ascentM: 0
    },
    included: ['трансфер', 'инструктор', 'катамаран', 'палатки', 'питание'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['непромокаемая одежда', 'сменная обувь', 'спальник'],
    photos: [
      { src: media('inzer-r-1'), alt: 'Катамараны на Инзере', w: 800, h: 600 },
      { src: media('inzer-r-2'), alt: 'Стоянка у костра', w: 800, h: 600 }
    ],
    rating: 4.9,
    reviewsCount: 41,
    departures: [
      {
        id: 'inzer-rafting-1',
        tourId: 'inzer-rafting',
        offsetDays: 14,
        startWeekday: 6,
        seatsTotal: 16,
        seatsTaken: 8,
        priceK: 9500,
        childPriceK: 6650,
        prepayPercent: 50
      }
    ],
    basePriceK: 9500
  },
  {
    id: 'inzer-taiga',
    slug: 'inzer-taiga',
    title: 'Тайга Инзера',
    subtitle: 'Поход по горной тайге с ночёвкой в палатках',
    types: ['кэмпинг', 'горы'],
    region: 'inzer-belorechye',
    difficulty: 3,
    days: 3,
    nights: 2,
    childFriendly: false,
    minChildAge: null,
    accommodation: ['палатки'],
    organizerId: 'inzer-camps',
    guideIds: ['ildar'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Начало тропы', lat: 53.85, lng: 57.6833, dayOffset: 0 },
        { name: 'Горное озеро', lat: 53.87, lng: 57.72, dayOffset: 1 },
        { name: 'Смотровая площадка', lat: 53.88, lng: 57.73, dayOffset: 2 }
      ],
      distanceKm: 32,
      ascentM: 900
    },
    included: ['трансфер', 'гид', 'палатки', 'питание'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['трекинговые ботинки', 'спальник', 'коврик', 'рюкзак'],
    photos: [
      { src: media('inzer-t-1'), alt: 'Тропа в тайге', w: 800, h: 600 },
      { src: media('inzer-t-2'), alt: 'Горное озеро в тайге', w: 800, h: 600 },
      { src: media('inzer-t-3'), alt: 'Вид с смотровой площадки', w: 800, h: 600 }
    ],
    rating: 4.8,
    reviewsCount: 23,
    departures: [
      {
        id: 'inzer-taiga-1',
        tourId: 'inzer-taiga',
        offsetDays: 21,
        startWeekday: 5,
        seatsTotal: 10,
        seatsTaken: 5,
        priceK: 15000,
        childPriceK: 10500,
        prepayPercent: 50
      }
    ],
    basePriceK: 15000
  }
]