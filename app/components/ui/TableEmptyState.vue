<script setup lang="ts">
  import { FileQuestion } from 'lucide-vue-next'

  interface Props {
    title?: string
    description?: string
  }

  withDefaults(defineProps<Props>(), {
    title: 'No results found',
    description: 'Try adjusting your filters or search query.',
  })
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div class="rounded-full bg-muted/50 p-4 mb-4">
      <slot name="icon">
        <FileQuestion class="h-8 w-8 text-muted-foreground" />
      </slot>
    </div>
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-sm text-muted-foreground mt-1 max-w-sm">{{ description }}</p>
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>
