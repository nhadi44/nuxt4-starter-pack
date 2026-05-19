<script setup lang="ts">
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: boolean
    label?: string
    disabled?: boolean
    error?: boolean | string
    id?: string
    required?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false,
    error: false,
    required: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const checkboxId = props.id || useId()

  function onChange(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).checked)
  }
</script>

<template>
  <div class="flex items-start gap-2.5">
    <div class="flex items-center h-5">
      <input
        :id="checkboxId"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :required="required"
        @change="onChange"
        :class="
          cn(
            'h-4 w-4 rounded border border-input bg-transparent text-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 accent-primary',
            error && 'border-destructive focus-visible:ring-destructive',
            $attrs.class as string
          )
        "
        v-bind="$attrs"
      />
    </div>
    <div v-if="label || $slots.default" class="grid gap-1.5 leading-none">
      <label
        :for="checkboxId"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >
        <slot>{{ label }}</slot>
        <span v-if="required" class="text-destructive ml-0.5">*</span>
      </label>
      <p v-if="typeof error === 'string' && error" class="text-[11px] font-medium text-destructive">
        {{ error }}
      </p>
    </div>
  </div>
</template>
