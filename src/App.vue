<template>
  <SkipLink />
  <header class="site-head">
    <nav aria-label="Главное меню" class="site-nav">
      <router-link to="/" class="brand" aria-label="Йондо — на главную"><svg aria-hidden="true" viewBox="0 0 40 40" width="33" height="33" fill="none"><rect width="40" height="40" rx="11" fill="#204a37"/><path d="m6 27 9-15 5 9 4-7 10 13" stroke="#f0eedb" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="28" cy="10" r="2.3" fill="#e4b876"/></svg>Йондо</router-link>
      <router-link to="/" class="nav-link">Туры</router-link>
      <router-link to="/trips" class="nav-link">Мои поездки</router-link>
      <router-link to="/demo" class="nav-link">О демо</router-link>
    </nav>
  </header>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <PwaUpdateBanner />
</template>

<script setup lang="ts">
import PwaUpdateBanner from '@/components/PwaUpdateBanner.vue'
import SkipLink from '@/components/a11y/SkipLink.vue'
</script>
<style scoped>
.site-head{background:#fffefa;border-bottom:1px solid var(--line)}.site-nav{display:flex;align-items:center;gap:clamp(12px,2vw,28px);max-width:80rem;margin:auto;padding:0 16px;min-height:60px;color:#47594b}.brand{margin-right:auto;display:flex;align-items:center;gap:8px;letter-spacing:-.055em;font:700 24px/1 Manrope,system-ui,sans-serif;color:#204633}.nav-link{position:relative;display:inline-flex;align-items:center;min-height:44px;font:500 14px/1.2 Inter,sans-serif;white-space:nowrap}.nav-link::after{content:'';position:absolute;inset:auto 0 4px;height:2px;background:#477057;transform:scaleX(0);transform-origin:left;transition:transform 160ms var(--ease)}.nav-link.router-link-exact-active::after,.nav-link:hover::after,.nav-link:focus-visible::after{transform:scaleX(1)}
@media(max-width:410px){.site-nav{min-height:56px;gap:11px;padding-inline:12px}.brand{font-size:21px;gap:5px}.brand svg{width:27px}.nav-link{font-size:12px}}
</style>