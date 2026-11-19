<template>
 <div class="trail-search" role="search">
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/></svg>
  <input ref="field" type="search" aria-label="Поиск туров" v-model="model" placeholder="Куда хотите поехать?" @keydown.enter="go" />
  <button v-if="model" type="button" class="clear" aria-label="Очистить поиск" @click="clear">×</button>
  <button type="button" class="go" aria-label="К результатам поиска" @click="go"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg></button>
 </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const model=defineModel<string>({default:''}); const field=ref<HTMLInputElement|null>(null)
function clear(){model.value='';field.value?.focus()}
function go(){const target=document.getElementById('routes-heading');target?.focus({preventScroll:true});target?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
</script>
<style scoped>
.trail-search{display:flex;align-items:center;gap:12px;width:min(100%,490px);background:#fff;border:1px solid #e2e7df;border-radius:13px;padding:6px 6px 6px 16px;color:#3b5947;box-shadow:0 6px 18px #11251c17}.trail-search:focus-within{outline:2px solid #badeae;outline-offset:3px}.trail-search input{flex:1;min-width:0;height:38px;border:0;background:none;font-size:16px;color:#173124;outline:none}.trail-search input::placeholder{color:#626e64}.trail-search input::-webkit-search-cancel-button{display:none}.trail-search svg{flex:none}.go,.clear{display:grid;place-items:center;flex:none;min-width:40px;height:40px;border-radius:9px}.go{background:#224a37;color:#fff;transition:background-color .15s}.go:hover{background:#326249}.clear{font-size:22px;min-width:32px}.trail-search:has(.clear){gap:5px}
</style>
