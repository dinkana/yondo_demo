import { z } from 'zod'

export const bookingSchema = z.object({
  id: z.string(),
  departureId: z.string(),
  tourId: z.string(),
  adults: z.number(),
  children: z.number(),
  childAges: z.array(z.number()),
  touristGender: z.enum(['male', 'female']),
  contacts: z.object({
    name: z.string(),
    phone: z.string()
  }),
  totalK: z.number(),
  status: z.enum(['draft', 'paid', 'completed']),
  createdAt: z.string()
})

export const memoContextSchema = z.object({
  region: z.string(),
  difficulty: z.number(),
  accommodation: z.array(z.string()),
  hasChild: z.boolean(),
  childAge: z.number().optional(),
  tMin: z.number(),
  precip: z.number()
})

export const memoStateSchema = z.object({
  bookingId: z.string(),
  checked: z.record(z.string(), z.boolean()),
  generatedFor: memoContextSchema
})

export const albumPhotoSchema = z.object({
  id: z.string(),
  idbKey: z.string(),
  w: z.number(),
  h: z.number(),
  createdAt: z.string(),
  liked: z.boolean(),
  isOwn: z.boolean().optional(),
  author: z.string().optional()
})

export const albumSchema = z.object({
  bookingId: z.string(),
  photos: z.array(albumPhotoSchema),
  shared: z.boolean()
})

export type Booking = z.infer<typeof bookingSchema>
export type MemoContext = z.infer<typeof memoContextSchema>
export type MemoState = z.infer<typeof memoStateSchema>
export type AlbumPhoto = z.infer<typeof albumPhotoSchema>
export type Album = z.infer<typeof albumSchema>