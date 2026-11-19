import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const pavlovkaTours: Tour[] = [
  {
    id: 'pavlovka-weekend',
    slug: 'pavlovka-weekend',
    title: 'Выходные на Павловке',
    subtitle: 'Сплав по Уфимскому водохранилищу',
    types: ['сплав'],
    region: 'pavlovka',
    difficulty: 1,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 6,
    accommodation: ['палатки'],
    organizerId: 'inzer-camps',
    guideIds: ['ildar'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Павловка', lat: 55.3833, lng: 56.0833, dayOffset: 0 }
      ],
      distanceKm: 20,
      ascentM: 0
    },
    included: ['трансфер', 'инструктор', 'катамаран', 'палатки', 'питание'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['непромокаемая одежда', 'сменная обувь', 'спальник'],
    photos: [
      { src: media('pavlovka-w-1'), alt: 'Катамараны на Павловке', w: 800, h: 600 },
      { src: media('pavlovka-w-2'), alt: 'Стоянка у костра', w: 800, h: 600 }
    ],
    rating: 4.7,
    reviewsCount: 36,
    departures: [
      {
        id: 'pavlovka-weekend-1',
        tourId: 'pavlovka-weekend',
        offsetDays: 7,
        startWeekday: 6,
        seatsTotal: 16,
        seatsTaken: 10,
        priceK: 8000,
        childPriceK: 5600,
        prepayPercent: 50
      }
    ],
    basePriceK: 8000
  },
  {
    id: 'pavlovka-fishing',
    slug: 'pavlovka-fishing',
    title: 'Рыбалка на Павловке',
    subtitle: 'Сплав с рыбалкой и ночёвкой',
    types: ['сплав', 'кэмпинг'],
    region: 'pavlovka',
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
        { name: 'Павловка', lat: 55.3833, lng: 56.0833, dayOffset: 0 }
      ],
      distanceKm: 18,
      ascentM: 0
    },
    included: ['трансфер', 'инструктор', 'катамаран', 'палатки', 'питание', 'снасти'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['непромокаемая одежда', 'сменная обувь', 'спальник'],
    photos: [
      { src: media('pavlovka-f-1'), alt: 'Рыбалка на Павловке', w: 800, h: 600 },
      { src: media('pavlovka-f-2'), alt: 'Улов дня', w: 800, h: 600 }
    ],
    rating: 4.6,
    reviewsCount: 27,
    departures: [
      {
        id: 'pavlovka-fishing-1',
        tourId: 'pavlovka-fishing',
        offsetDays: 15,
        startWeekday: 6,
        seatsTotal: 12,
        seatsTaken: 12,
        priceK: 9000,
        childPriceK: 6300,
        prepayPercent: 50
      }
    ],
    basePriceK: 9000
  }
]