<script setup lang="ts">
  import { AvatarRoot, AvatarImage, AvatarFallback } from 'radix-vue'
  import { computed } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    src?: string
    alt?: string
    fallback?: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }

  const props = withDefaults(defineProps<Props>(), {
    src: '',
    alt: 'Avatar',
    fallback: '?',
    size: 'md',
  })

  const sizeClasses = computed(() => {
    switch (props.size) {
      case 'sm':
        return 'h-8 w-8 text-xs'
      case 'lg':
        return 'h-12 w-12 text-base'
      case 'xl':
        return 'h-16 w-16 text-lg'
      case 'md':
      default:
        return 'h-10 w-10 text-sm'
    }
  })

  const initialFallback = computed(() => {
    if (!props.fallback || props.fallback === '?') {
      if (props.alt && props.alt !== 'Avatar') {
        return props.alt
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      }
      return '?'
    }
    return props.fallback
  })
</script>

<template>
  <AvatarRoot
    :class="
      cn(
        'relative flex shrink-0 overflow-hidden rounded-full bg-muted border border-border select-none items-center justify-center font-bold text-muted-foreground',
        sizeClasses,
        $attrs.class as string
      )
    "
  >
    <AvatarImage
      v-if="src"
      :src="src"
      :alt="alt"
      class="aspect-square h-full w-full object-cover"
    />
    <AvatarFallback
      class="flex h-full w-full items-center justify-center rounded-full bg-secondary text-secondary-foreground"
      :delay-ms="600"
    >
      {{ initialFallback }}
    </AvatarFallback>
  </AvatarRoot>
</template>
