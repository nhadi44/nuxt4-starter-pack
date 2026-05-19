<script setup lang="ts">
import { ref, computed } from 'vue'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import BasePopover from './BasePopover.vue'
import BaseCalendar from './BaseCalendar.vue'
import { cn } from '~/utils/cn'

interface Props {
  modelValue?: Date
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), { placeholder: 'Pick a date' })
const emit = defineEmits<{ (e: 'update:modelValue', val: Date): void }>()

const isOpen = ref(false)

function onSelect(val: Date) {
  emit('update:modelValue', val)
  isOpen.value = false
}

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  return props.modelValue.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
})
</script>

<template>
  <BasePopover v-model:open="isOpen" content-class="w-auto p-0 border-0 bg-transparent shadow-none">
    <template #trigger>
      <button
        type="button"
        :class="cn(
          'flex h-9 w-full items-center justify-start rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left font-normal',
          !modelValue && 'text-muted-foreground'
        )"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ modelValue ? formattedDate : placeholder }}
      </button>
    </template>
    <BaseCalendar :model-value="modelValue" @update:model-value="onSelect" />
  </BasePopover>
</template>
