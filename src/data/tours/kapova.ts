import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const kapovaTours: Tour[] = [
  {
    id: 'kapova-speleo',
    slug: 'kapova-speleo',
    title: 'Капова пещера: спелео-тур',
    subtitle: 'Экспедиция в одну из крупнейших пещер Урала',
    types: ['пещеры'],
    region: 'kapova',
    difficulty: 3,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 12,
    accommodation: ['гостевой дом'],
    organizerId: 'southern-trails',
    guideIds: ['olga'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Капова пещера', lat: 53.8833, lng: 57.7167, dayOffset: 0 },
        { name: 'Зал рисунков', lat: 53.884, lng: 57.717, dayOffset: 1 }
      ],
      distanceKm: 5,
      ascentM: 100
    },
    included: ['трансфер', 'гид-спелеолог', 'снаряжение', 'проживание', 'питание'],
    excluded: ['личная одежда', 'страховка'],
    gearBase: ['налобный фонарь', 'непромокаемая одежда', 'сменная обувь'],
    photos: [
      { src: media('kapova-s-1'), alt: 'Вход в Капову пещеру', w: 800, h: 600 },
      { src: media('kapova-s-2'), alt: 'Древние рисунки на стенах', w: 800, h: 600 }
    ],
    rating: 4.9,
    reviewsCount: 38,
    departures: [
      {
        id: 'kapova-speleo-1',
        tourId: 'kapova-speleo',
        offsetDays: 12,
        startWeekday: 6,
        seatsTotal: 8,
        seatsTaken: 7,
        priceK: 13000,
        childPriceK: 9100,
        prepayPercent: 50
      }
    ],
    basePriceK: 13000
  },
  {
    id: 'kapova-history',
    slug: 'kapova-history',
    title: 'История Каповой пещеры',
    subtitle: 'Экскурсия с археологом',
    types: ['пещеры', 'этно/гастро'],
    region: 'kapova',
    difficulty: 1,
    days: 1,
    nights: 0,
    childFriendly: true,
    minChildAge: 7,
    accommodation: ['без ночлега'],
    organizerId: 'southern-trails',
    guideIds: ['olga'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Капова пещера', lat: 53.8833, lng: 57.7167, dayOffset: 0 }
      ],
      distanceKm: 3,
      ascentM: 50
    },
    included: ['трансфер', 'гид-археолог', 'обед'],
    excluded: ['личная одежда', 'страховка'],
    gearBase: ['удобная обувь', 'фонарик'],
    photos: [
      { src: media('kapova-h-1'), alt: 'Археолог рассказывает о пещере', w: 800, h: 600 },
      { src: media('kapova-h-2'), alt: 'Река Белая у пещеры', w: 800, h: 600 }
    ],
    rating: 4.7,
    reviewsCount: 29,
    departures: [
      {
        id: 'kapova-history-1',
        tourId: 'kapova-history',
        offsetDays: 5,
        startWeekday: 6,
        seatsTotal: 12,
        seatsTaken: 0,
        priceK: 5500,
        childPriceK: 3850,
        prepayPercent: 50
      }
    ],
    basePriceK: 5500
  }
]