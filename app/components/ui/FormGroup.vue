<script setup lang="ts">
  import { computed } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    cols?: 1 | 2 | 3 | 4
  }

  const props = withDefaults(defineProps<Props>(), {
    cols: 1,
  })

  const colsClass = computed(() => {
    switch (props.cols) {
      case 2:
        return 'md:grid-cols-2'
      case 3:
        return 'md:grid-cols-3'
      case 4:
        return 'md:grid-cols-4'
      case 1:
      default:
        return 'grid-cols-1'
    }
  })
</script>

<template>
  <div :class="cn('grid grid-cols-1 gap-4 w-full', colsClass, $attrs.class as string)">
    <slot />
  </div>
</template>
