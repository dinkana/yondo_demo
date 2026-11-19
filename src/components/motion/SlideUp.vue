<template>
    <Transition
      :name="prefersReducedMotion ? 'none' : 'slide-up'"
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
  .slide-up-enter-active {
    transition: opacity 300ms cubic-bezier(.22, .8, .28, 1), transform 300ms cubic-bezier(.22, .8, .28, 1);
  }
  .slide-up-enter-from {
    opacity: 0;
    transform: translateY(16px);
  }
  </style>