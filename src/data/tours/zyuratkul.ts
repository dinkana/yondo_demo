import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const zyuratkulTours: Tour[] = [
  {
    id: 'zyuratkul-caves',
    slug: 'zyuratkul-caves',
    title: 'Пещеры Зюраткуля',
    subtitle: 'Спелео-экспедиция по карстовым пещерам',
    types: ['пещеры'],
    region: 'zyuratkul-satki',
    difficulty: 3,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 10,
    accommodation: ['турбаза'],
    organizerId: 'southern-trails',
    guideIds: ['olga'],
    route: {
      fromCity: 'Челябинск',
      points: [
        { name: 'Зюраткуль', lat: 54.9167, lng: 59.5833, dayOffset: 0 },
        { name: 'Пещера Зюраткульская', lat: 54.92, lng: 59.59, dayOffset: 1 }
      ],
      distanceKm: 10,
      ascentM: 300
    },
    included: ['трансфер', 'гид-спелеолог', 'снаряжение', 'проживание', 'питание'],
    excluded: ['личная одежда', 'страховка'],
    gearBase: ['налобный фонарь', 'непромокаемая одежда', 'сменная обувь'],
    photos: [
      { src: media('zyuratkul-c-1'), alt: 'Вход в пещеру', w: 800, h: 600 },
      { src: media('zyuratkul-c-2'), alt: 'Сталактиты в пещере', w: 800, h: 600 }
    ],
    rating: 4.7,
    reviewsCount: 35,
    departures: [
      {
        id: 'zyuratkul-caves-1',
        tourId: 'zyuratkul-caves',
        offsetDays: 8,
        startWeekday: 6,
        seatsTotal: 10,
        seatsTaken: 0,
        priceK: 11000,
        childPriceK: 7700,
        prepayPercent: 50
      }
    ],
    basePriceK: 11000
  },
  {
    id: 'zyuratkul-lake',
    slug: 'zyuratkul-lake',
    title: 'Озеро Зюраткуль',
    subtitle: 'Прогулка вокруг горного озера',
    types: ['озёра'],
    region: 'zyuratkul-satki',
    difficulty: 1,
    days: 1,
    nights: 0,
    childFriendly: true,
    minChildAge: 5,
    accommodation: ['без ночлега'],
    organizerId: 'southern-trails',
    guideIds: ['olga'],
    route: {
      fromCity: 'Челябинск',
      points: [
        { name: 'Озеро Зюраткуль', lat: 54.9167, lng: 59.5833, dayOffset: 0 }
      ],
      distanceKm: 8,
      ascentM: 150
    },
    included: ['трансфер', 'гид', 'пикник'],
    excluded: ['личная одежда', 'страховка'],
    gearBase: ['удобная обувь', 'рюкзак', 'солнцезащитные очки'],
    photos: [
      { src: media('zyuratkul-l-1'), alt: 'Озеро Зюраткуль с высоты', w: 800, h: 600 },
      { src: media('zyuratkul-l-2'), alt: 'Тропа вокруг озера', w: 800, h: 600 }
    ],
    rating: 4.6,
    reviewsCount: 52,
    departures: [
      {
        id: 'zyuratkul-lake-1',
        tourId: 'zyuratkul-lake',
        offsetDays: 3,
        startWeekday: 6,
        seatsTotal: 15,
        seatsTaken: 6,
        priceK: 4500,
        childPriceK: 3150,
        prepayPercent: 50
      }
    ],
    basePriceK: 4500
  }
]