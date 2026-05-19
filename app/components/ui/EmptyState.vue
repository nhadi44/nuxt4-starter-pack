<script setup lang="ts">
import { FileQuestion } from 'lucide-vue-next'
import BaseButton from './BaseButton.vue'

interface Props {
  title?: string
  description?: string
  actionText?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No data found',
  description: 'There is nothing to display here.',
})

const emit = defineEmits(['action'])
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center border rounded-lg border-dashed bg-card w-full">
    <div class="rounded-full bg-muted p-4 mb-4">
      <slot name="icon">
        <FileQuestion class="h-8 w-8 text-muted-foreground" />
      </slot>
    </div>
    <h3 class="text-lg font-semibold">{{ title }}</h3>
    <p class="text-sm text-muted-foreground mt-1 max-w-sm mb-4">{{ description }}</p>
    <BaseButton v-if="actionText" @click="emit('action')">{{ actionText }}</BaseButton>
  </div>
</template>
