<template>
    <button type="button" :aria-pressed="!!active"
      :class="[
        'font-body text-sm font-medium px-12 py-8 rounded-chip transition-colors duration-150',
        active
          ? 'bg-g-700 text-white border border-g-700'
          : 'bg-surface text-ink-2 border border-line hover:border-line-strong'
      ]"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    active?: boolean
  }>()
  </script>