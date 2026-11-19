// Demo illustrations live on the same origin. Replace files under public/art
// with approved route imagery, or update the corresponding entries in data/tours.
export function media(name: string): string {
  return `${import.meta.env.BASE_URL}art/${name}.svg`
}
