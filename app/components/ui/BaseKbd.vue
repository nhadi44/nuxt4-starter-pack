<script setup lang="ts">
import { cn } from '~/utils/cn'
</script>

<template>
  <kbd
    :class="cn(
      'pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100',
      $attrs.class as string
    )"
  >
    <slot />
  </kbd>
</template>
