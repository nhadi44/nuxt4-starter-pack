<script setup lang="ts">
import { inject, computed } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  id: string
  title: string
}>()

const activeMenu = inject('activeMenu') as any
const setActiveMenu = inject('setActiveMenu') as any

const isOpen = computed(() => activeMenu.value === props.id)

function toggle() {
  if (isOpen.value) {
    setActiveMenu(null)
  } else {
    setActiveMenu(props.id)
  }
}
</script>

<template>
  <li class="relative">
    <button
      @click="toggle"
      class="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active=true]:bg-accent/50"
      :data-active="isOpen"
    >
      {{ title }}
      <ChevronDown
        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200"
        :class="isOpen ? 'rotate-180' : ''"
      />
    </button>
    <div
      v-if="isOpen"
      class="absolute left-0 top-full mt-1.5 w-max rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none z-50 animate-in fade-in zoom-in-95"
    >
      <slot />
    </div>
  </li>
</template>
