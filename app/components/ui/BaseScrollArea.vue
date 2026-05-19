<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  orientation?: 'vertical' | 'horizontal' | 'both'
}

withDefaults(defineProps<Props>(), {
  orientation: 'vertical',
})
</script>

<template>
  <div
    :class="cn(
      'relative overflow-auto',
      orientation === 'vertical' && 'overflow-x-hidden',
      orientation === 'horizontal' && 'overflow-y-hidden',
      'scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent',
      $attrs.class as string
    )"
  >
    <div class="h-full w-full rounded-[inherit]">
      <slot />
    </div>
  </div>
</template>
