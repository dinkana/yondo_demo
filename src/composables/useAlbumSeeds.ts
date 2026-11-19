import type { AlbumPhoto } from '@/schemas/booking'

function seed(name: string, author?: string): AlbumPhoto {
  return {
    id: `seed-${name}`, idbKey: `seed:${name}`, w: 800, h: 600,
    createdAt: '1970-01-01T00:00:00.000Z', liked: false, isOwn: !author, author
  }
}

export function makeOwnSeeds(): AlbumPhoto[] {
  return ['trip-1', 'trip-2', 'trip-3'].map(name => seed(name))
}

export const groupSeeds = [
  seed('group-1', 'Мария К.'), seed('group-2', 'Алексей П.'),
  seed('group-3', 'Елена С.'), seed('group-4', 'Дмитрий В.')
]
