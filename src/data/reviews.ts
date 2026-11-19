import { media } from '@/data/media'
import type { Review } from '@/schemas/organizer'

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    tourId: 'iremel-summit',
    author: 'Мария К.',
    avatarSeed: 'maria',
    rating: 5,
    text: 'Невероятный опыт! Рустам — потрясающий гид, всё рассказал, показал. Виды с вершины — просто космос.',
    offsetAgoDays: 45,
    photos: [media('rev-1-1')]
  },
  {
    id: 'rev-2',
    tourId: 'iremel-summit',
    author: 'Алексей П.',
    avatarSeed: 'alexey',
    rating: 5,
    text: 'Сложный маршрут, но оно того стоит. Организация на высоте, питание вкусное.',
    offsetAgoDays: 62,
    photos: []
  },
  {
    id: 'rev-3',
    tourId: 'iremel-family',
    author: 'Елена С.',
    avatarSeed: 'elena',
    rating: 5,
    text: 'Отличный семейный тур! Дети в восторге, маршрут простой, виды красивые.',
    offsetAgoDays: 30,
    photos: [media('rev-3-1')]
  },
  {
    id: 'rev-4',
    tourId: 'aigir-winter',
    author: 'Дмитрий В.',
    avatarSeed: 'dmitry',
    rating: 5,
    text: 'Зимний Айгир — это сказка! Снегоступы удобные, Сергей — отличный гид.',
    offsetAgoDays: 90,
    photos: []
  },
  {
    id: 'rev-5',
    tourId: 'aigir-photo',
    author: 'Ольга М.',
    avatarSeed: 'olga-m',
    rating: 5,
    text: 'Фото получились потрясающие! Сергей знает все лучшие локации.',
    offsetAgoDays: 55,
    photos: [media('rev-5-1')]
  },
  {
    id: 'rev-6',
    tourId: 'zyuratkul-caves',
    author: 'Игорь Л.',
    avatarSeed: 'igor',
    rating: 4,
    text: 'Интересная экспедиция, пещеры впечатляют. Немного холодно было.',
    offsetAgoDays: 40,
    photos: []
  },
  {
    id: 'rev-7',
    tourId: 'zyuratkul-lake',
    author: 'Наталья Р.',
    avatarSeed: 'natalia',
    rating: 5,
    text: 'Прекрасное озеро, хорошая организация. Однодневный тур — идеальный формат.',
    offsetAgoDays: 25,
    photos: [media('rev-7-1')]
  },
  {
    id: 'rev-8',
    tourId: 'inzer-rafting',
    author: 'Сергей К.',
    avatarSeed: 'sergey-k',
    rating: 5,
    text: 'Сплав — это адреналин! Ильдар — профессионал, всё чётко.',
    offsetAgoDays: 70,
    photos: []
  },
  {
    id: 'rev-9',
    tourId: 'kapova-speleo',
    author: 'Анна Т.',
    avatarSeed: 'anna',
    rating: 5,
    text: 'Капова пещера — это что-то невероятное! Ольга — замечательный гид.',
    offsetAgoDays: 50,
    photos: [media('rev-9-1')]
  },
  {
    id: 'rev-10',
    tourId: 'nugush-camping',
    author: 'Павел Н.',
    avatarSeed: 'pavel',
    rating: 5,
    text: 'Нугуш — красота! Фото получились отличные, Динар знает своё дело.',
    offsetAgoDays: 35,
    photos: [media('rev-10-1')]
  },
  {
    id: 'rev-11',
    tourId: 'pavlovka-weekend',
    author: 'Виктор С.',
    avatarSeed: 'viktor',
    rating: 4,
    text: 'Хороший сплав для выходных. Немного много людей, но в целом отлично.',
    offsetAgoDays: 60,
    photos: []
  },
  {
    id: 'rev-12',
    tourId: 'yangantau-ethno',
    author: 'Светлана Б.',
    avatarSeed: 'svetlana',
    rating: 5,
    text: 'Янгантау — это релакс! Грязи помогают, кухня вкусная. Айгуль — душка.',
    offsetAgoDays: 80,
    photos: [media('rev-12-1')]
  }
]