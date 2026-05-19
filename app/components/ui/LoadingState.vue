<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

interface Props {
  text?: string
}

withDefaults(defineProps<Props>(), {
  text: 'Loading data...',
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-12 text-center border rounded-lg border-dashed bg-card w-full">
    <Loader2 class="h-8 w-8 animate-spin text-primary mb-4" />
    <p class="text-sm text-muted-foreground">{{ text }}</p>
  </div>
</template>
