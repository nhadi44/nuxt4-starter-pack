<script setup lang="ts">
  import { cn } from '~/utils/cn'
</script>

<template>
  <thead :class="cn('[&_tr]:border-b bg-muted/50', $attrs.class as string)" v-bind="$attrs">
    <slot />
  </thead>
</template>
