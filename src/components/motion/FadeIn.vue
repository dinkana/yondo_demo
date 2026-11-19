<template>
    <Transition
      :name="prefersReducedMotion ? 'none' : 'fade-in'"
      :appear="appear"
    >
      <slot />
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { useMotion } from '@/composables/useMotion'
  
  defineProps<{ appear?: boolean }>()
  
  const { prefersReducedMotion } = useMotion()
  </script>
  
  <style scoped>
  .fade-in-enter-active {
    transition: opacity 250ms cubic-bezier(.22, .8, .28, 1), transform 250ms cubic-bezier(.22, .8, .28, 1);
  }
  .fade-in-enter-from {
    opacity: 0;
    transform: translateY(8px);
  }
  </style>