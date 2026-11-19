export type TourType = 'горы' | 'пещеры' | 'кэмпинг' | 'сплав' | 'озёра' | 'джип' | 'этно/гастро' | 'фото' | 'зима'

export type Accommodation = 'палатки' | 'глэмпинг' | 'турбаза' | 'гостевой дом' | 'отель' | 'приют/изба' | 'без ночлега'

export type RegionId = 'iremel-tyulyuk' | 'zyuratkul-satki' | 'inzer-belorechye' | 'kapova' | 'nugush' | 'pavlovka' | 'yangantau'

export type Difficulty = 1 | 2 | 3 | 4 | 5

export interface RoutePoint {
  name: string
  lat: number
  lng: number
  dayOffset: number
}

export interface TourRoute {
  fromCity: string
  points: RoutePoint[]
  distanceKm: number
  ascentM: number
}

export interface Photo {
  src: string
  alt: string
  w: number
  h: number
}

export interface Departure {
  id: string
  tourId: string
  offsetDays: number
  startWeekday: number
  seatsTotal: number
  seatsTaken: number
  priceK: number
  childPriceK: number
  prepayPercent: number
}

export interface Tour {
  id: string
  slug: string
  title: string
  subtitle: string
  types: TourType[]
  region: RegionId
  difficulty: Difficulty
  days: number
  nights: number
  childFriendly: boolean
  minChildAge: number | null
  accommodation: Accommodation[]
  organizerId: string
  guideIds: string[]
  route: TourRoute
  included: string[]
  excluded: string[]
  gearBase: string[]
  photos: Photo[]
  rating: number
  reviewsCount: number
  departures: Departure[]
  basePriceK: number
}

export interface Organizer {
  id: string
  name: string
  legal: 'ООО' | 'ИП'
  city: string
  since: number
  verified: boolean
  rating: number
  toursCount: number
  about: string
  logoId: string
  type: 'firm' | 'guide'
}

export interface Guide {
  id: string
  name: string
  organizerId: string
  bio: string
  experienceYears: number
  specialties: string[]
  rating: number
  avatarId: string
}

export interface Review {
  id: string
  tourId: string
  author: string
  avatarSeed: string
  rating: number
  text: string
  offsetAgoDays: number
  photos: string[]
  organizerReply?: string
}

export interface Booking {
  id: string
  departureId: string
  tourId: string
  adults: number
  children: number
  childAges: number[]
  touristGender: 'male' | 'female'
  contacts: {
    name: string
    phone: string
  }
  totalK: number
  status: 'draft' | 'paid' | 'completed'
  createdAt: string
}

export interface MemoState {
  bookingId: string
  checked: Record<string, boolean>
  generatedFor: MemoContext
}

export interface MemoContext {
  region: RegionId
  difficulty: Difficulty
  accommodation: Accommodation[]
  hasChild: boolean
  childAge?: number
  tMin: number
  precip: number
}

export interface AlbumPhoto {
  id: string
  idbKey: string
  w: number
  h: number
  createdAt: string
  liked: boolean
}

export interface Album {
  bookingId: string
  photos: AlbumPhoto[]
  shared: boolean
}