<template>
 <section class="hero" aria-labelledby="catalog-title">
  <img class="hero-image" :src="heroPhoto ? placeUrl(heroPhoto) : media('hero')" alt="" fetchpriority="high" decoding="async" />
  <div class="hero-shade"></div>
  <div class="hero-inner">
   <div class="hero-copy"><p class="eyebrow"><span></span> Путеводитель по Южному Уралу</p>
   <h1 id="catalog-title">Авторские туры <br />по <em>Южному Уралу</em></h1>
   <p class="intro">Пешком к вершинам, по воде — к тихим бухтам.<br class="wide" /> Выберите маршрут и дату выезда.</p>
   <SearchBar v-model="searchQuery" /></div>
   <div v-if="heroPhoto" class="hero-caption"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></svg>{{ heroPhoto.caption }}</div>
  </div>
 </section>
</template>
<script setup lang="ts">
import { media } from '@/data/media'
import { heroPhoto, placeUrl } from '@/data/places'
import SearchBar from './SearchBar.vue'
const searchQuery=defineModel<string>({default:''})
</script>
<style scoped>
.hero{position:relative;isolation:isolate;overflow:hidden;background:#1d392c;color:#fff}.hero-image,.hero-shade{position:absolute;inset:0;width:100%;height:100%;z-index:-1}.hero-image{object-fit:cover;object-position:50% 51%}.hero-shade{background:linear-gradient(90deg,#10291ff2 0%,#10281fd5 24%,#13291f9c 45%,#162d2110 78%),linear-gradient(0deg,#10281f52,transparent 34%)}.hero-inner{max-width:80rem;margin:auto;padding:36px 16px 40px;position:relative}.hero-copy{max-width:680px}.eyebrow{display:flex;align-items:center;gap:10px;color:#edf2dd;font-size:11px;line-height:18px;font-weight:650;letter-spacing:.13em;text-transform:uppercase}.eyebrow span{width:25px;height:2px;background:#ddba73}.hero h1{font:500 clamp(44px,5.3vw,76px)/.98 Georgia,'Times New Roman',serif;letter-spacing:-.048em;margin:16px 0;color:white}.hero h1 em{font-weight:400;color:#e6eacb}.intro{font-size:clamp(15px,1.13vw,18px);line-height:1.45;color:#f0f4ee;margin:0 0 22px}.hero-caption{position:absolute;bottom:24px;right:16px;display:flex;align-items:center;gap:6px;max-width:32%;padding:7px 11px;border-radius:6px;background:#152b22b8;color:#fff;font-size:12px;line-height:1.35}.hero-caption svg{flex:none}
@media(max-width:640px){.hero-inner{padding:25px 16px 24px}.hero h1{font-size:clamp(39px,10.9vw,57px);margin:14px 0}.hero-shade{background:linear-gradient(90deg,#0c261ee6,#10291fab 67%,#162d2166),linear-gradient(0deg,#10281fa3,transparent 80%)}.wide{display:none}.hero-caption{position:static;width:fit-content;max-width:100%;padding:0;background:none;margin-top:13px;font-size:11px;color:#f0f4ee}.intro{margin-bottom:18px}}
@media(prefers-reduced-motion:no-preference){.hero-copy{animation:trail-arrive 320ms var(--ease)}@keyframes trail-arrive{from{opacity:.85;transform:translateY(5px)}}}
</style>