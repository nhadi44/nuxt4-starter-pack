<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { useDebounceFn } from '@vueuse/core'
  import BaseInput from './BaseInput.vue'

  interface Props {
    modelValue?: string | number
    debounce?: number
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
    required?: boolean
    id?: string
    type?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    debounce: 500,
    disabled: false,
    required: false,
    type: 'text',
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string | number): void
  }>()

  const localValue = ref(props.modelValue)

  // Sync external changes down to local value
  watch(
    () => props.modelValue,
    (val) => {
      localValue.value = val
    }
  )

  const debouncedEmit = useDebounceFn((val: string | number) => {
    emit('update:modelValue', val)
  }, props.debounce)

  function onUpdate(val: string | number) {
    localValue.value = val
    debouncedEmit(val)
  }
</script>

<template>
  <BaseInput
    :id="id"
    :type="type"
    :model-value="localValue"
    @update:model-value="onUpdate"
    :placeholder="placeholder"
    :label="label"
    :error="error"
    :disabled="disabled"
    :required="required"
    v-bind="$attrs"
  />
</template>
