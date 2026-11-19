<template>
  <Teleport to="body"><dialog ref="sheet" :aria-label="title" class="field-sheet" @cancel.prevent="emit('close')" @click="onBackdrop">
    <div><header class="field-head"><h2>{{ title }}</h2><button type="button" autofocus aria-label="Закрыть окно" @click="emit('close')">×</button></header>
    <div class="field-body"><slot /></div></div>
  </dialog></Teleport>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
const props=defineProps<{ open:boolean; title:string }>(); const emit=defineEmits<{close:[]}>()
const sheet=ref<HTMLDialogElement|null>(null); let opener:HTMLElement|null=null; let before=''
function sync(){
 const el=sheet.value; if(!el) return
 if(props.open && !el.open){opener=document.activeElement instanceof HTMLElement ? document.activeElement : null; before=document.body.style.overflow; el.showModal(); document.body.style.overflow='hidden'}
 else if(!props.open && el.open){el.close(); document.body.style.overflow=before; opener?.focus({preventScroll:true})}
}
function onBackdrop(e:MouseEvent){if(e.target===sheet.value) emit('close')}
watch(()=>props.open,sync,{flush:'post'}); onMounted(sync)
onBeforeUnmount(()=>{if(sheet.value?.open){sheet.value.close();document.body.style.overflow=before}})
</script>
<style scoped>
.field-sheet{position:fixed;inset:auto 0 0;width:min(100%,32rem);max-width:100vw;max-height:88dvh;padding:0;margin:0 auto;border:1px solid var(--line);border-radius:24px 24px 0 0;background:var(--surface);color:var(--ink);overflow:auto;overscroll-behavior:contain;box-shadow:0 -14px 80px #122a2028}.field-sheet::backdrop{background:#0e271fc2}.field-head{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:14px 22px;border-bottom:1px solid var(--line);background:var(--surface);position:sticky;top:0;z-index:1}.field-head h2{font-size:22px}.field-head button{width:44px;height:44px;font-size:26px;line-height:1;background:var(--surface-soft);border-radius:50%}.field-body{padding:20px 22px max(24px,env(safe-area-inset-bottom));}
@media(min-width:768px){.field-sheet{inset:0;margin:auto;height:fit-content;border-radius:22px}}
@media(prefers-reduced-motion:no-preference){.field-sheet[open]{animation:sheet-in 200ms var(--ease)}.field-sheet[open]::backdrop{animation:veil-in 160ms ease-out}@keyframes sheet-in{from{transform:translateY(18px);opacity:.65}}@keyframes veil-in{from{opacity:0}}}
</style>