import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const iremelTours: Tour[] = [
  {
    id: 'iremel-summit',
    slug: 'iremel-summit',
    title: 'Восхождение на Иремель',
    subtitle: 'К вершине Большого Иремеля, 1582 м',
    types: ['горы'],
    region: 'iremel-tyulyuk',
    difficulty: 4,
    days: 3,
    nights: 2,
    childFriendly: false,
    minChildAge: null,
    accommodation: ['палатки', 'приют/изба'],
    organizerId: 'tau-travel',
    guideIds: ['rustam'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Тюлюк', lat: 54.4833, lng: 58.6833, dayOffset: 0 },
        { name: 'Иремель', lat: 54.5, lng: 58.7, dayOffset: 1 }
      ],
      distanceKm: 28,
      ascentM: 1200
    },
    included: ['трансфер', 'гид', 'палатки', 'питание'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['трекинговые ботинки', 'спальник', 'коврик', 'рюкзак'],
    photos: [
      { src: media('iremel-1'), alt: 'Гора Иремель на рассвете', w: 800, h: 600 },
      { src: media('iremel-2'), alt: 'Курумник на пути к вершине', w: 800, h: 600 },
      { src: media('iremel-3'), alt: 'Вид с вершины Иремеля', w: 800, h: 600 }
    ],
    rating: 4.9,
    reviewsCount: 47,
    departures: [
      {
        id: 'iremel-summit-1',
        tourId: 'iremel-summit',
        offsetDays: 10,
        startWeekday: 5,
        seatsTotal: 12,
        seatsTaken: 10,
        priceK: 18000,
        childPriceK: 12600,
        prepayPercent: 50
      }
    ],
    basePriceK: 18000
  },
  {
    id: 'iremel-family',
    slug: 'iremel-family',
    title: 'Иремель для всей семьи',
    subtitle: 'Лёгкий маршрут до подножия',
    types: ['горы'],
    region: 'iremel-tyulyuk',
    difficulty: 2,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 7,
    accommodation: ['турбаза'],
    organizerId: 'tau-travel',
    guideIds: ['rustam'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Тюлюк', lat: 54.4833, lng: 58.6833, dayOffset: 0 },
        { name: 'Подножие Иремеля', lat: 54.49, lng: 58.69, dayOffset: 1 }
      ],
      distanceKm: 12,
      ascentM: 400
    },
    included: ['трансфер', 'гид', 'проживание', 'питание'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['удобная обувь', 'рюкзак', 'фонарик'],
    photos: [
      { src: media('iremel-fam-1'), alt: 'Семья на тропе к Иремелю', w: 800, h: 600 },
      { src: media('iremel-fam-2'), alt: 'Турбаза у подножия', w: 800, h: 600 }
    ],
    rating: 4.8,
    reviewsCount: 32,
    departures: [
      {
        id: 'iremel-family-1',
        tourId: 'iremel-family',
        offsetDays: 17,
        startWeekday: 6,
        seatsTotal: 12,
        seatsTaken: 4,
        priceK: 12000,
        childPriceK: 8400,
        prepayPercent: 50
      }
    ],
    basePriceK: 12000
  }
]