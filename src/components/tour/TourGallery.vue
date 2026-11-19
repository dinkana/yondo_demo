<template>
  <section v-if="photo" class="gallery" aria-label="Фотографии маршрута" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
    <button ref="opener" type="button" class="photo-frame" aria-haspopup="dialog" :aria-label="`Увеличить фото: ${photo.alt}`" @click="dialog?.showModal()">
      <img :key="photo.src" :src="photo.src" :alt="photo.alt" :width="photo.w" :height="photo.h" class="hero-photo" @touchstart.passive="startSwipe" @touchend="endSwipe" @touchcancel="swipe = null" />
      <span class="expand-chip" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 4h6v6M20 4l-7 7M10 20H4v-6m0 6 7-7" /></svg>Увеличить
      </span>
    </button>
    <div class="gallery-bar">
      <div aria-live="polite" aria-atomic="true">
        <p class="eyebrow">Полевой альбом · <span class="nums">{{ counter }}</span></p>
        <p class="caption">{{ photo.alt }}</p>
      </div>
      <div v-if="photos.length > 1" class="controls">
        <button v-for="nav in controls" :key="nav.step" type="button" :aria-label="nav.label" @click="move(nav.step)"><span aria-hidden="true">{{ nav.arrow }}</span></button>
      </div>
    </div>
  </section>
  <Teleport to="body">
    <dialog v-if="photo" ref="dialog" class="tour-lightbox" aria-label="Просмотр фотографий маршрута" @close="opener?.focus({ preventScroll: true })" @click.self="dialog?.close()" @keydown.left.prevent="move(-1)" @keydown.right.prevent="move(1)">
      <div class="viewer">
        <div class="gallery-bar"><span class="eyebrow">Полевой альбом</span>
          <button type="button" autofocus aria-label="Закрыть просмотр" class="viewer-close" @click="dialog?.close()"><span aria-hidden="true">×</span></button>
        </div>
        <img :src="photo.src" :alt="photo.alt" :width="photo.w" :height="photo.h" class="viewer-photo" @touchstart.passive="startSwipe" @touchend="endSwipe" @touchcancel="swipe = null" />
        <div class="gallery-bar">
          <div aria-live="polite" aria-atomic="true"><p class="eyebrow nums">Кадр {{ counter }}</p><p class="caption">{{ photo.alt }}</p></div>
          <div v-if="photos.length > 1" class="controls">
            <button v-for="nav in controls" :key="nav.step" type="button" :aria-label="nav.label" @click="move(nav.step)"><span aria-hidden="true">{{ nav.arrow }}</span></button>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Photo } from '@/types'

const props = defineProps<{ photos: Photo[] }>()
const index = ref(0)
const photo = computed(() => props.photos[index.value])
const counter = computed(() => `${String(index.value + 1).padStart(2, '0')} / ${String(props.photos.length).padStart(2, '0')}`)
const dialog = ref<HTMLDialogElement | null>(null)
const opener = ref<HTMLButtonElement | null>(null)
const controls = [
  { step: -1, label: 'Предыдущее фото', arrow: '←' },
  { step: 1, label: 'Следующее фото', arrow: '→' }
]
function move(step: number) {
  const length = props.photos.length
  if (length > 1) index.value = (index.value + step + length) % length
}
let swipe: { x: number; y: number } | null = null
function startSwipe(event: TouchEvent) {
  const touch = event.touches[0]
  swipe = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null
}
function endSwipe(event: TouchEvent) {
  if (!swipe) return
  const touch = event.changedTouches[0]
  const dx = touch.clientX - swipe.x
  const dy = touch.clientY - swipe.y
  swipe = null
  if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    if (event.cancelable) event.preventDefault() // A swipe must not also open the photo.
    move(dx < 0 ? 1 : -1)
  }
}
</script>

<style scoped>
.gallery { overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: var(--surface-soft); }
.photo-frame { position: relative; display: block; width: 100%; aspect-ratio: 4 / 3; cursor: zoom-in; overflow: hidden; background: var(--g-800); touch-action: pan-y pinch-zoom; }
.photo-frame:focus-visible { outline: 3px solid white; outline-offset: -5px; z-index: 1; }
.hero-photo { width: 100%; height: 100%; object-fit: cover; }
.expand-chip { position: absolute; bottom: 12px; right: 12px; display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border-radius: 999px; background: #172a21ed; color: white; font-size: .75rem; font-weight: 600; }
.gallery-bar { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 12px 16px; }
.eyebrow { font-size: .68rem; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--g-700); }
.caption { margin-top: 3px; font-size: .9rem; line-height: 1.45; overflow-wrap: anywhere; }
.controls { display: flex; flex: none; gap: 4px; }
.controls button, .viewer-close { width: 44px; height: 44px; display: grid; place-items: center; border: 1px solid var(--line-strong); border-radius: 50%; font-size: 1.25rem; }
.controls button:hover { background: var(--g-100); }
.tour-lightbox { width: min(94vw, 1120px); max-width: none; max-height: 94dvh; margin: auto; padding: 0; border: 1px solid #526156; border-radius: 16px; overflow: auto; overscroll-behavior: contain; background: #18251e; color: #faf8f0; }
.tour-lightbox::backdrop { background: #0a110eef; }
:global(html:has(.tour-lightbox[open])) { overflow: hidden; }
.viewer-photo { width: 100%; height: min(65dvh, 720px); object-fit: contain; background: #101912; touch-action: pan-y pinch-zoom; }
.viewer .eyebrow { color: #ccdbc9; }
.viewer button { border-color: #657569; }
.viewer button:hover { background: #324438; }
.viewer button:focus-visible { outline: 2px solid #f3dcaa; outline-offset: 2px; }
@media (min-width: 768px) { .photo-frame { aspect-ratio: 2.35 / 1; } .gallery-bar { padding-inline: 22px; } }
@media (prefers-reduced-motion: no-preference) {
  .hero-photo { animation: develop 180ms ease-out; }
  .controls button, .viewer-close { transition: background-color 140ms ease; }
  @keyframes develop { from { opacity: .8; } to { opacity: 1; } }
}
</style>