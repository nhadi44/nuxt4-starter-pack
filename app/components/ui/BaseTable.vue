<script setup lang="ts">
  import { cn } from '~/utils/cn'
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn('w-full caption-bottom text-sm', $attrs.class as string)" v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
