import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const aigirTours: Tour[] = [
  {
    id: 'aigir-winter',
    slug: 'aigir-winter',
    title: 'Зимний Айгир на снегоступах',
    subtitle: 'Снежные скалы и водопады',
    types: ['зима', 'горы'],
    region: 'inzer-belorechye',
    difficulty: 3,
    days: 2,
    nights: 1,
    childFriendly: true,
    minChildAge: 10,
    accommodation: ['турбаза'],
    organizerId: 'southern-trails',
    guideIds: ['sergey'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Айгир', lat: 53.8833, lng: 58.4167, dayOffset: 0 },
        { name: 'Скала Сухие скалы', lat: 53.89, lng: 58.42, dayOffset: 1 }
      ],
      distanceKm: 15,
      ascentM: 600
    },
    included: ['трансфер', 'гид', 'снегоступы', 'проживание', 'питание'],
    excluded: ['тёплая одежда', 'страховка'],
    gearBase: ['термобельё', 'пуховик', 'снегоходы'],
    photos: [
      { src: media('aigir-w-1'), alt: 'Зимние скалы Айгира', w: 800, h: 600 },
      { src: media('aigir-w-2'), alt: 'Снегоступы на тропе', w: 800, h: 600 }
    ],
    rating: 4.9,
    reviewsCount: 28,
    departures: [
      {
        id: 'aigir-winter-1',
        tourId: 'aigir-winter',
        offsetDays: 24,
        startWeekday: 6,
        seatsTotal: 12,
        seatsTaken: 12,
        priceK: 14000,
        childPriceK: 9800,
        prepayPercent: 50
      }
    ],
    basePriceK: 14000
  },
  {
    id: 'aigir-photo',
    slug: 'aigir-photo',
    title: 'Фото-тур по Айгиру',
    subtitle: 'Рассветы на скалах с профессиональным фотографом',
    types: ['фото', 'горы'],
    region: 'inzer-belorechye',
    difficulty: 2,
    days: 3,
    nights: 2,
    childFriendly: true,
    minChildAge: 12,
    accommodation: ['глэмпинг'],
    organizerId: 'southern-trails',
    guideIds: ['sergey'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Айгир', lat: 53.8833, lng: 58.4167, dayOffset: 0 },
        { name: 'Скала Большой Шалахан', lat: 53.89, lng: 58.43, dayOffset: 1 },
        { name: 'Скала Сухие скалы', lat: 53.89, lng: 58.42, dayOffset: 2 }
      ],
      distanceKm: 18,
      ascentM: 500
    },
    included: ['трансфер', 'гид-фотограф', 'проживание', 'питание', 'обработка фото'],
    excluded: ['фототехника', 'страховка'],
    gearBase: ['камера', 'штатив', 'тёплая одежда'],
    photos: [
      { src: media('aigir-p-1'), alt: 'Рассвет на скалах Айгира', w: 800, h: 600 },
      { src: media('aigir-p-2'), alt: 'Фотограф на тропе', w: 800, h: 600 },
      { src: media('aigir-p-3'), alt: 'Вид с Большого Шалахана', w: 800, h: 600 }
    ],
    rating: 4.8,
    reviewsCount: 19,
    departures: [
      {
        id: 'aigir-photo-1',
        tourId: 'aigir-photo',
        offsetDays: 31,
        startWeekday: 5,
        seatsTotal: 8,
        seatsTaken: 2,
        priceK: 22000,
        childPriceK: 15400,
        prepayPercent: 50
      }
    ],
    basePriceK: 22000
  }
]