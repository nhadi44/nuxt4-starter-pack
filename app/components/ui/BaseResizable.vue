<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  direction?: 'horizontal' | 'vertical' | 'both'
}

withDefaults(defineProps<Props>(), { direction: 'horizontal' })
</script>

<template>
  <div
    :class="cn(
      'overflow-auto border bg-card text-card-foreground shadow-sm rounded-md relative min-h-[100px] min-w-[100px]',
      direction === 'horizontal' && 'resize-x',
      direction === 'vertical' && 'resize-y',
      direction === 'both' && 'resize',
      $attrs.class as string
    )"
  >
    <slot />
  </div>
</template>
