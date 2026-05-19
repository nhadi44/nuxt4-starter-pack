<script setup lang="ts">
import BaseDrawer from './BaseDrawer.vue'

interface Props {
  modelValue?: boolean
  title?: string
  description?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', val: boolean): void }>()
</script>

<template>
  <BaseDrawer
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    :title="title"
    :description="description"
    :side="side"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </BaseDrawer>
</template>
