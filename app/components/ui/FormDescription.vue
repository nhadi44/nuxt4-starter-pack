<script setup lang="ts">
  import { cn } from '~/utils/cn'
</script>

<template>
  <p
    :class="
      cn(
        'text-[11px] text-muted-foreground select-none mt-0.5 leading-normal',
        $attrs.class as string
      )
    "
  >
    <slot />
  </p>
</template>
