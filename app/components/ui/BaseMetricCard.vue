<script setup lang="ts">
import ProgressBar from './ProgressBar.vue'

interface Props {
  title: string
  value: string | number
  progress?: number
  max?: number
  description?: string
}

withDefaults(defineProps<Props>(), { max: 100 })
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6 flex flex-col gap-4 w-full">
    <div>
      <p class="text-sm font-medium text-muted-foreground">{{ title }}</p>
      <h3 class="text-2xl font-bold mt-1">{{ value }}</h3>
    </div>
    <div v-if="progress !== undefined" class="space-y-1.5">
      <ProgressBar :value="progress" :max="max" />
      <p v-if="description" class="text-xs text-muted-foreground">{{ description }}</p>
    </div>
  </div>
</template>
