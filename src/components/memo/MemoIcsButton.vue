<template>
    <button
      class="w-full bg-surface border border-line rounded-button-secondary px-24 py-12 font-body font-medium text-ink hover:bg-surface-soft transition-colors"
      @click="download"
    >
      Добавить в календарь
    </button>
  </template>
  
  <script setup lang="ts">
  import type { Tour, Departure } from '@/schemas/tour'
  
  const props = defineProps<{
    tour: Tour
    departure: Departure
  }>()
  
  function pad(n: number): string {
    return n.toString().padStart(2, '0')
  }
  
  function formatIcsDate(date: Date): string {
    return date.getUTCFullYear().toString() +
      pad(date.getUTCMonth() + 1) +
      pad(date.getUTCDate()) + 'T' +
      pad(date.getUTCHours()) +
      pad(date.getUTCMinutes()) +
      pad(date.getUTCSeconds()) + 'Z'
  }
  
  function download() {
    const start = new Date()
    start.setDate(start.getDate() + props.departure.offsetDays)
    start.setHours(7, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + props.tour.days)
  
    const uid = `${props.departure.id}@yondo`
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Yondo//RU',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${uid}`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${props.tour.title}`,
      `DESCRIPTION:${props.tour.subtitle}\\nГид: ${props.tour.guideIds.join(', ')}\\nРегион: ${props.tour.region}`,
      `LOCATION:${props.tour.route.fromCity}`,
      'BEGIN:VALARM',
      'TRIGGER:-P1D',
      'ACTION:DISPLAY',
      'DESCRIPTION:Завтра выезд',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ]
    const content = lines.join('\r\n')
    const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${props.tour.slug}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }
  </script>