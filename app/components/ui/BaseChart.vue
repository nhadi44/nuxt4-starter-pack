<script setup lang="ts">
import { computed } from 'vue'

interface DataPoint {
  label: string
  value: number
}

interface Props {
  data: DataPoint[]
  height?: string
  color?: string
}

const props = withDefaults(defineProps<Props>(), {
  height: '250px',
  color: 'bg-primary'
})

const maxVal = computed(() => Math.max(...props.data.map(d => d.value), 1))
</script>

<template>
  <div class="w-full flex flex-col gap-2 pt-6" :style="{ height }">
    <div class="flex-1 flex items-end justify-between gap-2 border-b pb-2">
      <div 
        v-for="point in data" 
        :key="point.label"
        class="group relative flex-1 flex justify-center h-full"
      >
        <div class="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-popover text-popover-foreground text-xs rounded px-2 py-1 shadow-sm border pointer-events-none z-10 whitespace-nowrap">
          {{ point.value }}
        </div>
        <div 
          :class="[color, 'w-full rounded-t-sm transition-all duration-500 hover:brightness-110 self-end']"
          :style="{ height: `${(point.value / maxVal) * 100}%`, minHeight: '4px' }"
        ></div>
      </div>
    </div>
    <div class="flex justify-between gap-2 text-xs text-muted-foreground shrink-0">
      <div v-for="point in data" :key="point.label" class="flex-1 text-center truncate">
        {{ point.label }}
      </div>
    </div>
  </div>
</template>
