<script setup lang="ts">
  import { cn } from '~/utils/cn'

  interface Props {
    forId?: string
    required?: boolean
  }

  defineProps<Props>()
</script>

<template>
  <label
    :for="forId"
    :class="
      cn(
        'text-xs font-semibold text-foreground/80 flex items-center select-none',
        $attrs.class as string
      )
    "
  >
    <slot />
    <span v-if="required" class="text-destructive ml-0.5">*</span>
  </label>
</template>
