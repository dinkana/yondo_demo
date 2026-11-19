import type { RegionId } from '@/schemas/tour'
import iremel from './iremel.svg?url'
import zyuratkul from './zyuratkul.svg?url'
import inzer from './inzer.svg?url'
import kapova from './kapova.svg?url'
import nugush from './nugush.svg?url'
import pavlovka from './pavlovka.svg?url'
import yangantau from './yangantau.svg?url'

export const REGION_MAPS: Record<RegionId, string> = {
  'iremel-tyulyuk': iremel, 'zyuratkul-satki': zyuratkul, 'inzer-belorechye': inzer,
  kapova, nugush, pavlovka, yangantau
}
