import { media } from '@/data/media'
import type { Tour } from '@/schemas/tour'

export const yangantauTours: Tour[] = [
  {
    id: 'yangantau-ethno',
    slug: 'yangantau-ethno',
    title: 'Янгантау: этно и гастро',
    subtitle: 'Целебные грязи и башкирская кухня',
    types: ['этно/гастро'],
    region: 'yangantau',
    difficulty: 1,
    days: 3,
    nights: 2,
    childFriendly: true,
    minChildAge: 5,
    accommodation: ['отель'],
    organizerId: 'tau-travel',
    guideIds: ['aigul'],
    route: {
      fromCity: 'Уфа',
      points: [
        { name: 'Янгантау', lat: 54.3167, lng: 56.3833, dayOffset: 0 }
      ],
      distanceKm: 5,
      ascentM: 50
    },
    included: ['трансфер', 'гид', 'проживание', 'питание', 'грязелечение'],
    excluded: ['личная одежда', 'страховка'],
    gearBase: ['купальник', 'удобная обувь'],
    photos: [
      { src: media('yangantau-e-1'), alt: 'Курорт Янгантау', w: 800, h: 600 },
      { src: media('yangantau-e-2'), alt: 'Башкирская кухня', w: 800, h: 600 },
      { src: media('yangantau-e-3'), alt: 'Целебные грязи', w: 800, h: 600 }
    ],
    rating: 4.8,
    reviewsCount: 51,
    departures: [
      {
        id: 'yangantau-ethno-1',
        tourId: 'yangantau-ethno',
        offsetDays: 25,
        startWeekday: 5,
        seatsTotal: 10,
        seatsTaken: 3,
        priceK: 19000,
        childPriceK: 13300,
        prepayPercent: 50
      }
    ],
    basePriceK: 19000
  }
]