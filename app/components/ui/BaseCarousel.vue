<script setup lang="ts">
import { ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const scrollContainer = ref<HTMLElement | null>(null)

function scroll(direction: 'left' | 'right') {
  if (!scrollContainer.value) return
  const scrollAmount = scrollContainer.value.clientWidth * 0.8
  scrollContainer.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}
</script>

<template>
  <div class="relative group w-full">
    <div 
      ref="scrollContainer" 
      class="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 w-full"
    >
      <slot />
    </div>
    <button
      type="button"
      @click="scroll('left')"
      class="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
    >
      <ChevronLeft class="h-4 w-4" />
    </button>
    <button
      type="button"
      @click="scroll('right')"
      class="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border bg-background shadow-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
    >
      <ChevronRight class="h-4 w-4" />
    </button>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
