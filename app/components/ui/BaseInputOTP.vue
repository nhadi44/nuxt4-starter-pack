<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

interface Props {
  modelValue?: string
  length?: number
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  length: 6,
})
const emit = defineEmits<{ (e: 'update:modelValue', val: string): void }>()

const inputRefs = ref<HTMLInputElement[]>([])
const values = ref<string[]>(Array(props.length).fill(''))

watch(() => props.modelValue, (newVal) => {
  const chars = (newVal || '').split('')
  for (let i = 0; i < props.length; i++) {
    values.value[i] = chars[i] || ''
  }
}, { immediate: true })

function updateValue() {
  emit('update:modelValue', values.value.join(''))
}

function onInput(e: Event, index: number) {
  const target = e.target as HTMLInputElement
  const val = target.value
  
  // Handle paste
  if (val.length > 1) {
    const chars = val.split('').slice(0, props.length)
    for (let i = 0; i < chars.length; i++) {
      values.value[i] = chars[i] || ''
    }
    updateValue()
    if (inputRefs.value[Math.min(chars.length, props.length - 1)]) {
      inputRefs.value[Math.min(chars.length, props.length - 1)]!.focus()
    }
    return
  }
  
  values.value[index] = val
  updateValue()
  
  if (val && index < props.length - 1) {
    nextTick(() => {
      inputRefs.value[index + 1]?.focus()
    })
  }
}

function onKeyDown(e: KeyboardEvent, index: number) {
  if (e.key === 'Backspace' && !values.value[index] && index > 0) {
    inputRefs.value[index - 1]?.focus()
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      v-for="(_, index) in length"
      :key="index"
      :ref="(el) => { if (el) inputRefs[index] = el as HTMLInputElement }"
      type="text"
      maxlength="1"
      inputmode="numeric"
      :value="values[index]"
      @input="onInput($event, index)"
      @keydown="onKeyDown($event, index)"
      class="flex h-10 w-10 text-center text-lg rounded-md border border-input bg-background px-3 py-2 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />
  </div>
</template>
