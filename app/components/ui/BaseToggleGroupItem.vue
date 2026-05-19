<script setup lang="ts">
import { inject, computed } from 'vue'
import BaseToggle from './BaseToggle.vue'

const props = defineProps<{ value: string }>()
const { modelValue, toggleItem } = inject('toggleGroupState') as any

const isPressed = computed(() => {
  if (Array.isArray(modelValue.value)) {
    return modelValue.value.includes(props.value)
  }
  return modelValue.value === props.value
})
</script>

<template>
  <BaseToggle :model-value="isPressed" @update:model-value="toggleItem(value)">
    <slot />
  </BaseToggle>
</template>
