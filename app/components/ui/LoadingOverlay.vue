<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

interface Props {
  isLoading: boolean
  text?: string
}

withDefaults(defineProps<Props>(), { 
  text: 'Loading...' 
})
</script>

<template>
  <div 
    v-if="isLoading" 
    :class="cn('absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-inherit', $attrs.class as string)"
  >
    <Loader2 class="h-8 w-8 animate-spin text-primary" />
    <p v-if="text" class="mt-2 text-sm font-medium text-muted-foreground">{{ text }}</p>
  </div>
</template>
