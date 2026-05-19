<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '~/utils/cn'

interface Props {
  title?: string
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const isOpen = ref(props.defaultOpen)

function toggle() {
  isOpen.value = !isOpen.value
  emit('update:open', isOpen.value)
}
</script>

<template>
  <div class="flex flex-col rounded-md border bg-card w-full">
    <button
      type="button"
      class="flex w-full items-center justify-between p-4 font-medium transition-all hover:bg-muted/50"
      @click="toggle"
      :aria-expanded="isOpen"
    >
      <slot name="trigger">
        <span class="text-sm font-semibold">{{ title }}</span>
      </slot>
      <ChevronDown
        :class="cn('h-4 w-4 transition-transform duration-200 text-muted-foreground', isOpen && 'rotate-180')"
      />
    </button>
    <div
      v-show="isOpen"
      class="overflow-hidden border-t px-4 py-3 text-sm"
    >
      <slot />
    </div>
  </div>
</template>
