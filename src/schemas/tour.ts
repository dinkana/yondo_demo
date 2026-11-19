import { z } from 'zod'

export const tourTypeSchema = z.enum([
  'горы', 'пещеры', 'кэмпинг', 'сплав', 'озёра', 'джип', 'этно/гастро', 'фото', 'зима'
])

export const accommodationSchema = z.enum([
  'палатки', 'глэмпинг', 'турбаза', 'гостевой дом', 'отель', 'приют/изба', 'без ночлега'
])

export const regionIdSchema = z.enum([
  'iremel-tyulyuk', 'zyuratkul-satki', 'inzer-belorechye', 'kapova', 'nugush', 'pavlovka', 'yangantau'
])

export const difficultySchema = z.union([
  z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)
])

export const routePointSchema = z.object({
  name: z.string(),
  lat: z.number(),
  lng: z.number(),
  dayOffset: z.number()
})

export const tourRouteSchema = z.object({
  fromCity: z.string(),
  points: z.array(routePointSchema),
  distanceKm: z.number(),
  ascentM: z.number()
})

export const photoSchema = z.object({
  src: z.string(),
  alt: z.string(),
  w: z.number(),
  h: z.number()
})

export const departureSchema = z.object({
  id: z.string(),
  tourId: z.string(),
  offsetDays: z.number(),
  startWeekday: z.number(),
  seatsTotal: z.number(),
  seatsTaken: z.number(),
  priceK: z.number(),
  childPriceK: z.number(),
  prepayPercent: z.number()
})

export const tourSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  types: z.array(tourTypeSchema),
  region: regionIdSchema,
  difficulty: difficultySchema,
  days: z.number(),
  nights: z.number(),
  childFriendly: z.boolean(),
  minChildAge: z.number().nullable(),
  accommodation: z.array(accommodationSchema),
  organizerId: z.string(),
  guideIds: z.array(z.string()),
  route: tourRouteSchema,
  included: z.array(z.string()),
  excluded: z.array(z.string()),
  gearBase: z.array(z.string()),
  photos: z.array(photoSchema),
  rating: z.number(),
  reviewsCount: z.number(),
  departures: z.array(departureSchema),
  basePriceK: z.number()
})

export type Tour = z.infer<typeof tourSchema>
export type Departure = z.infer<typeof departureSchema>
export type TourType = z.infer<typeof tourTypeSchema>
export type Accommodation = z.infer<typeof accommodationSchema>
export type RegionId = z.infer<typeof regionIdSchema>
export type Difficulty = z.infer<typeof difficultySchema>