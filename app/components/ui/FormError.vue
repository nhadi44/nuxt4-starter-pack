<script setup lang="ts">
  import { cn } from '~/utils/cn'

  interface Props {
    error?: string
  }

  defineProps<Props>()
</script>

<template>
  <span
    v-if="error"
    :class="
      cn(
        'text-[11px] font-medium text-destructive mt-1 select-none animate-in fade-in-50 duration-200',
        $attrs.class as string
      )
    "
  >
    {{ error }}
  </span>
</template>
