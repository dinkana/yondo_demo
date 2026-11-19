import entries from './place-photos.json'
export type PlacePhoto = {id:string; file:string; caption:string; author:string; source:string; license:string; licenseUrl:string; title:string; changeNote:string; width:number; height:number}
export const places: PlacePhoto[] = entries as PlacePhoto[]
export const placeUrl = (photo:PlacePhoto) => `${import.meta.env.BASE_URL}places/${photo.file}`
export const heroPhoto = places.find(p=>p.id==='iremel') ?? places.find(p=>p.id==='aigir') ?? places[0]
