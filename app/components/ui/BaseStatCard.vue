<script setup lang="ts">
import { ArrowUpRight, ArrowDownRight } from 'lucide-vue-next'

interface Props {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  icon?: any
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-xl border bg-card text-card-foreground shadow-sm p-6 w-full">
    <div class="flex flex-row items-center justify-between space-y-0 pb-2">
      <h3 class="tracking-tight text-sm font-medium">{{ title }}</h3>
      <component v-if="icon" :is="icon" class="h-4 w-4 text-muted-foreground" />
    </div>
    <div class="flex flex-col gap-1">
      <div class="text-2xl font-bold">{{ value }}</div>
      <p v-if="trend !== undefined" class="text-xs text-muted-foreground flex items-center gap-1">
        <span :class="trend >= 0 ? 'text-emerald-500 flex items-center' : 'text-destructive flex items-center'">
          <ArrowUpRight v-if="trend >= 0" class="h-3 w-3 mr-0.5" />
          <ArrowDownRight v-else class="h-3 w-3 mr-0.5" />
          {{ Math.abs(trend) }}%
        </span>
        <span v-if="trendLabel">{{ trendLabel }}</span>
      </p>
    </div>
  </div>
</template>
