<script setup lang="ts">
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: string
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
    required?: boolean
    rows?: number
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    disabled: false,
    required: false,
    rows: 3,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'blur', event: FocusEvent): void
    (e: 'focus', event: FocusEvent): void
  }>()

  const textareaId = props.id || useId()

  function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
  }
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="textareaId" class="text-xs font-semibold text-foreground/80">
      {{ label }}
      <span v-if="required" class="text-destructive ml-0.5">*</span>
    </label>
    <textarea
      :id="textareaId"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :rows="rows"
      @input="onInput"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      :class="
        cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y',
          error && 'border-destructive focus-visible:ring-destructive',
          $attrs.class as string
        )
      "
      v-bind="$attrs"
    />
    <span v-if="error" class="text-[11px] font-medium text-destructive mt-0.5">
      {{ error }}
    </span>
  </div>
</template>
