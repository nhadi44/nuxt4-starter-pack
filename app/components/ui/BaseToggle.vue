<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  modelValue?: boolean
  disabled?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()
</script>
<template>
  <button
    type="button"
    :disabled="disabled"
    :class="cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-3',
      modelValue ? 'bg-accent text-accent-foreground' : 'bg-transparent',
      $attrs.class as string
    )"
    @click="emit('update:modelValue', !modelValue)"
  >
    <slot />
  </button>
</template>
