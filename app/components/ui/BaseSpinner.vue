<script setup lang="ts">
  import { Loader2 } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    color?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 'md',
    color: 'text-primary',
  })

  const sizeClasses = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'h-4 w-4'
      case 'lg':
        return 'h-8 w-8'
      case 'xl':
        return 'h-12 w-12'
      case 'md':
      default:
        return 'h-6 w-6'
    }
  })
</script>

<template>
  <Loader2
    :class="cn('animate-spin', color, sizeClasses, $attrs.class as string)"
    aria-hidden="true"
  />
</template>
