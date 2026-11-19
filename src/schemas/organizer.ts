import { z } from 'zod'

export const organizerSchema = z.object({
  id: z.string(),
  name: z.string(),
  legal: z.enum(['ООО', 'ИП']),
  city: z.string(),
  since: z.number(),
  verified: z.boolean(),
  rating: z.number(),
  toursCount: z.number(),
  about: z.string(),
  logoId: z.string(),
  type: z.enum(['firm', 'guide'])
})

export const guideSchema = z.object({
  id: z.string(),
  name: z.string(),
  organizerId: z.string(),
  bio: z.string(),
  experienceYears: z.number(),
  specialties: z.array(z.string()),
  rating: z.number(),
  avatarId: z.string()
})

export const reviewSchema = z.object({
  id: z.string(),
  tourId: z.string(),
  author: z.string(),
  avatarSeed: z.string(),
  rating: z.number(),
  text: z.string(),
  offsetAgoDays: z.number(),
  photos: z.array(z.string()),
  organizerReply: z.string().optional()
})

export type Organizer = z.infer<typeof organizerSchema>
export type Guide = z.infer<typeof guideSchema>
export type Review = z.infer<typeof reviewSchema>