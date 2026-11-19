<template>
    <button
      :class="[
        'font-body font-medium transition-colors duration-150',
        variant === 'primary' && 'bg-action-ink text-white rounded-button-primary px-24 py-12',
        variant === 'secondary' && 'bg-surface text-ink border border-line rounded-button-secondary px-24 py-12',
        variant === 'ghost' && 'text-ink-2 hover:text-ink px-12 py-8',
        disabled && 'opacity-50 cursor-not-allowed'
      ]"
      :disabled="disabled"
    >
      <slot />
    </button>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    disabled?: boolean
  }>()
  </script>