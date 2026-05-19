<script setup lang="ts">
import { provide, computed } from 'vue'

interface Props {
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  type: 'single'
})

const emit = defineEmits<{ (e: 'update:modelValue', val: any): void }>()

function toggleItem(val: string) {
  if (props.type === 'single') {
    emit('update:modelValue', props.modelValue === val ? '' : val)
  } else {
    const current = Array.isArray(props.modelValue) ? [...props.modelValue] : []
    const index = current.indexOf(val)
    if (index === -1) current.push(val)
    else current.splice(index, 1)
    emit('update:modelValue', current)
  }
}

provide('toggleGroupState', {
  modelValue: computed(() => props.modelValue),
  toggleItem
})
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <slot />
  </div>
</template>
