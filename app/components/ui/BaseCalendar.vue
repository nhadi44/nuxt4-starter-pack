<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

interface Props {
  modelValue?: Date
}
const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', val: Date): void }>()

const currentDate = ref(props.modelValue || new Date())
const currentMonth = ref(currentDate.value.getMonth())
const currentYear = ref(currentDate.value.getFullYear())

const daysInMonth = computed(() => new Date(currentYear.value, currentMonth.value + 1, 0).getDate())
const firstDayOfMonth = computed(() => new Date(currentYear.value, currentMonth.value, 1).getDay())

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDate(day: number) {
  const d = new Date(currentYear.value, currentMonth.value, day)
  emit('update:modelValue', d)
  currentDate.value = d
}

function isSelected(day: number) {
  if (!props.modelValue) return false
  return props.modelValue.getDate() === day &&
         props.modelValue.getMonth() === currentMonth.value &&
         props.modelValue.getFullYear() === currentYear.value
}
</script>

<template>
  <div :class="cn('p-3 border rounded-md bg-popover text-popover-foreground shadow-md w-max', $attrs.class as string)">
    <div class="flex items-center justify-between pt-1 pb-4">
      <button type="button" @click="prevMonth" class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border hover:bg-accent">
        <ChevronLeft class="h-4 w-4" />
      </button>
      <div class="text-sm font-medium">{{ monthNames[currentMonth] }} {{ currentYear }}</div>
      <button type="button" @click="nextMonth" class="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md border hover:bg-accent">
        <ChevronRight class="h-4 w-4" />
      </button>
    </div>
    <div class="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground font-medium mb-2">
      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
    </div>
    <div class="grid grid-cols-7 gap-1">
      <div v-for="i in firstDayOfMonth" :key="'empty-'+i" class="h-8 w-8"></div>
      <button
        v-for="day in daysInMonth"
        :key="day"
        type="button"
        @click="selectDate(day)"
        :class="cn(
          'h-8 w-8 rounded-md text-sm font-normal p-0 hover:bg-accent hover:text-accent-foreground flex items-center justify-center transition-colors',
          isSelected(day) && 'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground'
        )"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>
