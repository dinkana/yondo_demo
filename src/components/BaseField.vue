<template>
    <div>
      <label v-if="label" class="block font-body text-sm font-medium text-ink mb-8">
        {{ label }}
      </label>
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :class="[
          'w-full font-body text-ink bg-surface border rounded-input px-12 py-12',
          'focus:outline-none focus:ring-2 focus:ring-g-600 focus:border-transparent',
          error ? 'border-danger' : 'border-line'
        ]"
      />
      <p v-if="error" class="mt-4 text-sm text-danger">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    modelValue: string
    label?: string
    type?: string
    placeholder?: string
    error?: string
  }>()
  
  defineEmits<{
    'update:modelValue': [value: string]
  }>()
  </script>