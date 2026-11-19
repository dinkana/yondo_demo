<template>
    <div
      :aria-live="live"
      :aria-atomic="atomic"
      class="sr-only"
    >
      <slot />
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    live?: 'polite' | 'assertive'
    atomic?: boolean
  }>()
  </script>