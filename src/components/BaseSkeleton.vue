<template>
    <div :class="['bg-line animate-pulse', className]" />
  </template>
  
  <script setup lang="ts">
  defineProps<{
    className?: string
  }>()
  </script>