<script setup lang="ts">
  import { Loader2 } from 'lucide-vue-next'
  import BaseSkeleton from './BaseSkeleton.vue'

  interface Props {
    type?: 'spinner' | 'skeleton'
    rows?: number
  }

  withDefaults(defineProps<Props>(), {
    type: 'skeleton',
    rows: 5,
  })
</script>

<template>
  <div v-if="type === 'spinner'" class="flex items-center justify-center p-12 w-full h-full min-h-[200px]">
    <div class="flex flex-col items-center gap-2">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
      <span class="text-sm text-muted-foreground">Loading data...</span>
    </div>
  </div>
  
  <div v-else class="w-full space-y-4 p-4">
    <BaseSkeleton v-for="i in rows" :key="i" class="h-10 w-full rounded-md" />
  </div>
</template>
