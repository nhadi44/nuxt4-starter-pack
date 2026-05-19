<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  description?: string
  retryText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  description: 'An error occurred while processing your request.',
  retryText: 'Try Again'
})

const emit = defineEmits(['retry'])
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-destructive/10 border-destructive/20 w-full">
    <AlertCircle class="h-10 w-10 text-destructive mb-4" />
    <h3 class="text-lg font-semibold text-foreground">{{ title }}</h3>
    <p class="text-sm text-muted-foreground mt-2 max-w-sm mb-4">{{ description }}</p>
    <BaseButton variant="destructive" @click="emit('retry')">{{ retryText }}</BaseButton>
  </div>
</template>
