import { readFile, writeFile, access } from 'node:fs/promises'
const source = new URL('../public/places/index.json', import.meta.url)
const dest = new URL('../src/data/place-photos.json', import.meta.url)
const raw = await readFile(source, 'utf8'); const entries = JSON.parse(raw)
const ids = new Set()
for (const p of entries) {
  if (ids.has(p.id) || !/^[a-z]+$/.test(p.id) || p.file !== `${p.id}.webp` || !(p.width > 0 && p.height > 0) || !p.author || !p.licenseUrl || !p.source || !p.changeNote) throw Error(`Invalid place: ${p.id}`)
  ids.add(p.id); await access(new URL(p.file, source))
}
if (raw !== await readFile(dest, 'utf8').catch(()=>'')) await writeFile(dest, raw)
console.log(`Photographs indexed: ${ids.size}`)
