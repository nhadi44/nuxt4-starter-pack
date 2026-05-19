<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  modelValue?: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  min: 0,
  max: 100,
  step: 1
})

const emit = defineEmits<{ (e: 'update:modelValue', val: number): void }>()

function onInput(e: Event) {
  emit('update:modelValue', Number((e.target as HTMLInputElement).value))
}
</script>

<template>
  <div class="relative flex w-full touch-none select-none items-center">
    <input
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      @input="onInput"
      :class="cn(
        'w-full h-2 bg-secondary rounded-full appearance-none cursor-pointer',
        '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:ring-offset-background [&::-webkit-slider-thumb]:transition-colors focus-visible:[&::-webkit-slider-thumb]:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-ring focus-visible:[&::-webkit-slider-thumb]:ring-offset-2 disabled:[&::-webkit-slider-thumb]:pointer-events-none disabled:[&::-webkit-slider-thumb]:opacity-50',
        $attrs.class as string
      )"
    />
  </div>
</template>

<style scoped>
/* Scoped fallback for appearance-none if needed */
input[type=range] {
  -webkit-appearance: none;
}
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;
}
</style>
