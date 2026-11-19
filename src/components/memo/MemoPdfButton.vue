<template>
    <button
      :disabled="loading"
      :class="[
        'w-full bg-action-ink text-white rounded-button-primary px-24 py-12 font-body font-medium transition-opacity',
        loading && 'opacity-50 cursor-not-allowed'
      ]"
      @click="download"
    >
      {{ loading ? 'Генерация...' : 'Скачать PDF' }}
    </button>
    <p v-if="error" role="alert" class="text-danger text-sm mt-8">Не удалось скачать памятку. Попробуйте ещё раз.</p>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import type { MemoItem } from '@/composables/useMemoEngine'
  import type { Tour } from '@/schemas/tour'
  
  const props = defineProps<{
    tour: Tour
    items: MemoItem[]
    checked: Record<string, boolean>
  }>()
  
  const loading = ref(false)
  const error = ref(false)
  
  async function download() {
    if (loading.value) return
    loading.value = true
    error.value = false
    try {
      const [{ jsPDF }, response] = await Promise.all([
        import('jspdf'), fetch(`${import.meta.env.BASE_URL}fonts/DejaVuSans.ttf`)
      ])
      if (!response.ok) throw new Error('PDF font is unavailable')
      const font = new Uint8Array(await response.arrayBuffer())
      let binary = ''
      for (let i = 0; i < font.length; i += 8192) {
        binary += String.fromCharCode(...font.subarray(i, i + 8192))
      }
      const doc = new jsPDF({ unit: 'pt', format: 'a4', compress: true, putOnlyUsedFonts: true })
      doc.addFileToVFS('DejaVuSans.ttf', btoa(binary))
      doc.addFont('DejaVuSans.ttf', 'DejaVuSans', 'normal')
      doc.setFont('DejaVuSans', 'normal')
      const pageWidth = doc.internal.pageSize.getWidth()
      const margin = 48
      let y = margin
  
      doc.setFontSize(20)
      const title: string[] = doc.splitTextToSize(props.tour.title, pageWidth - margin * 2)
      doc.text(title, margin, y)
      y += title.length * 24
  
      doc.setFontSize(11)
      doc.setTextColor(92, 107, 96)
      const subtitle: string[] = doc.splitTextToSize(props.tour.subtitle, pageWidth - margin * 2)
      doc.text(subtitle, margin, y)
      y += subtitle.length * 14 + 18
  
      doc.setTextColor(22, 33, 26)
      doc.setFontSize(13)
      doc.text('Чек-лист', margin, y)
      y += 20
  
      doc.setFontSize(10)
  
      const categoryLabels: Record<string, string> = {
        base: 'Обязательно',
        clothes: 'Одежда',
        gear: 'Снаряжение',
        kids: 'Для ребёнка',
        weather: 'Погода'
      }
  
      const categories = ['base', 'clothes', 'gear', 'kids', 'weather'] as const
      for (const cat of categories) {
        const catItems = props.items.filter(i => i.category === cat)
        if (!catItems.length) continue
  
        if (y > 760) {
          doc.addPage()
          y = margin
        }
  
          doc.setFontSize(11)
        doc.setTextColor(63, 107, 74)
        doc.text(categoryLabels[cat].toUpperCase(), margin, y)
        y += 16
  
          doc.setFontSize(10)
        doc.setTextColor(22, 33, 26)
  
        for (const item of catItems) {
          if (y > 780) {
            doc.addPage()
            y = margin
          }
          const isChecked = props.checked[item.id]
          const boxX = margin
          const boxY = y - 9
          doc.setDrawColor(213, 207, 194)
          doc.setLineWidth(1)
          doc.rect(boxX, boxY, 10, 10)
          if (isChecked) {
            doc.setDrawColor(95, 154, 92)
            doc.setLineWidth(1.5)
            doc.line(boxX + 2, boxY + 5, boxX + 4, boxY + 8)
            doc.line(boxX + 4, boxY + 8, boxX + 8, boxY + 2)
          }
          doc.text(item.title, margin + 18, y)
          doc.setTextColor(139, 150, 140)
          doc.setFontSize(9)
          doc.text(item.reason, margin + 18, y + 12)
          doc.setTextColor(22, 33, 26)
          doc.setFontSize(10)
          y += 24
        }
        y += 8
      }
  
      doc.setFontSize(8)
      doc.setTextColor(139, 150, 140)
      doc.text('Йондо — авторские туры по Южному Уралу', margin, doc.internal.pageSize.getHeight() - 24)
  
      doc.save(`${props.tour.slug}-memo.pdf`)
    } catch {
      error.value = true
    } finally {
      loading.value = false
    }
  }
  </script>