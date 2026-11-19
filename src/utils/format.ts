export function formatPrice(priceK: number): string {
    return `${priceK.toLocaleString('ru-RU')} ₽`
  }
  
  export function formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      weekday: 'short'
    })
  }
  
  export function formatWeekday(weekday: number): string {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
    return days[weekday]
  }