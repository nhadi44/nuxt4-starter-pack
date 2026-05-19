<script setup lang="ts">
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    label?: string
    description?: string
    error?: string
    required?: boolean
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    required: false,
  })

  const fieldId = props.id || useId()
</script>

<template>
  <div :class="cn('flex flex-col gap-1.5 w-full', $attrs.class as string)">
    <FormLabel v-if="label" :for-id="fieldId" :required="required">
      {{ label }}
    </FormLabel>

    <FormDescription v-if="description || $slots.description">
      <slot name="description">{{ description }}</slot>
    </FormDescription>

    <div class="relative w-full">
      <slot :id="fieldId" :error="error" />
    </div>

    <FormError :error="error" />
  </div>
</template>
