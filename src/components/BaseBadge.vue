<template>
    <span
      :class="[
        'inline-flex items-center font-body text-xs font-medium px-8 py-4 rounded-chip',
        variant === 'amber' && 'bg-amber-soft text-[#754711]',
        variant === 'danger' && 'bg-red-100 text-danger',
        variant === 'success' && 'bg-g-100 text-g-700'
      ]"
    >
      <slot />
    </span>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    variant?: 'amber' | 'danger' | 'success'
  }>()
  </script>