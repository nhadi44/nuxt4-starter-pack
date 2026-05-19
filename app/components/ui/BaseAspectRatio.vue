<script setup lang="ts">
import { cn } from '~/utils/cn'

interface Props {
  ratio?: number
}
withDefaults(defineProps<Props>(), { ratio: 1 })
</script>

<template>
  <div class="relative w-full overflow-hidden" :style="{ paddingBottom: `${100 / ratio}%` }">
    <div :class="cn('absolute inset-0', $attrs.class as string)">
      <slot />
    </div>
  </div>
</template>
