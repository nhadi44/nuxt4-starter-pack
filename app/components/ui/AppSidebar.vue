<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/utils/cn'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const isCollapsed = ref(false)

function toggle() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<template>
  <aside
    :class="
      cn(
        'relative flex h-screen flex-col border-r bg-card transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-[80px]' : 'w-[280px]',
        $attrs.class as string
      )
    "
  >
    <div class="flex h-14 items-center justify-between border-b px-4 shrink-0">
      <slot name="header" :is-collapsed="isCollapsed">
        <span v-if="!isCollapsed" class="font-bold text-lg">App</span>
        <span v-else class="font-bold text-center w-full">A</span>
      </slot>
    </div>
    
    <div class="flex-1 overflow-y-auto overflow-x-hidden p-4 scrollbar-thin scrollbar-thumb-border">
      <slot :is-collapsed="isCollapsed" />
    </div>

    <div v-if="$slots.footer" class="border-t p-4 flex items-center justify-between shrink-0">
      <slot name="footer" :is-collapsed="isCollapsed" />
    </div>

    <button
      @click="toggle"
      class="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border bg-background shadow-md hover:bg-muted text-muted-foreground hover:text-foreground"
    >
      <ChevronRight v-if="isCollapsed" class="h-4 w-4" />
      <ChevronLeft v-else class="h-4 w-4" />
    </button>
  </aside>
</template>
