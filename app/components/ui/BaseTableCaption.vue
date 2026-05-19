<script setup lang="ts">
  import { cn } from '~/utils/cn'
</script>

<template>
  <caption :class="cn('mt-4 text-sm text-muted-foreground', $attrs.class as string)" v-bind="$attrs">
    <slot />
  </caption>
</template>
