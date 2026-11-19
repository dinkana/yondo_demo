import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const nugushTours: Tour[] = [
  {
    id: 'nugush-camping',
    slug: 'nugush-camping',
    title: 'Нугушское водохранилище',
    subtitle: 'Кэмпинг на берегу с фото-сессией на рассвете',
    types: ['кэмпинг', 'озёра', 'фото'],
    region: 'nugush',
    difficulty: 1,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 5,
    accommodation: ['палатки'],
    organizerId: 'inzer-camps',
    guideIds: ['dinar'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Нугушское водохранилище', lat: 53.3833, lng: 56.5833, dayOffset: 0 }
      ],
      distanceKm: 5,
      ascentM: 50
    },
    included: ['трансфер', 'гид-фотограф', 'палатки', 'питание', 'обработка фото'],
    excluded: ['личное снаряжение', 'страховка'],
    gearBase: ['спальник', 'коврик', 'тёплая одежда'],
    photos: [
      { src: media('nugush-c-1'), alt: 'Нугушское водохранилище на рассвете', w: 800, h: 600 },
      { src: media('nugush-c-2'), alt: 'Палатки на берегу', w: 800, h: 600 },
      { src: media('nugush-c-3'), alt: 'Каяки на воде', w: 800, h: 600 }
    ],
    rating: 4.8,
    reviewsCount: 44,
    departures: [
      {
        id: 'nugush-camping-1',
        tourId: 'nugush-camping',
        offsetDays: 18,
        startWeekday: 6,
        seatsTotal: 12,
        seatsTaken: 9,
        priceK: 8500,
        childPriceK: 5950,
        prepayPercent: 50
      }
    ],
    basePriceK: 8500
  }
]