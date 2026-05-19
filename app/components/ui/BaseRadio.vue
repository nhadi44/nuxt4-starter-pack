<script setup lang="ts">
  import { useId, computed } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: string | number | boolean
    value: string | number | boolean
    label?: string
    name?: string
    disabled?: boolean
    id?: string
    error?: boolean | string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    disabled: false,
    error: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>()

  const radioId = props.id || useId()

  const isChecked = computed(() => props.modelValue === props.value)

  function onChange() {
    emit('update:modelValue', props.value)
  }
</script>

<template>
  <div class="flex items-center gap-2">
    <input
      :id="radioId"
      type="radio"
      :name="name"
      :checked="isChecked"
      :disabled="disabled"
      @change="onChange"
      :class="
        cn(
          'h-4 w-4 rounded-full border border-input text-primary bg-transparent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 accent-primary cursor-pointer',
          error && 'border-destructive focus-visible:ring-destructive',
          $attrs.class as string
        )
      "
      v-bind="$attrs"
    />
    <label
      v-if="label || $slots.default"
      :for="radioId"
      class="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
