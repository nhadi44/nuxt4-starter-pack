<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  value?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  value: 0,
  max: 100
})
</script>

<template>
  <div :class="cn('relative h-2 w-full overflow-hidden rounded-full bg-primary/20', $attrs.class as string)">
    <div
      class="h-full w-full flex-1 bg-primary transition-all duration-300 ease-in-out"
      :style="{ transform: `translateX(-${100 - (value / max) * 100}%)` }"
    />
  </div>
</template>
