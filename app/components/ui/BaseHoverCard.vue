<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '~/utils/cn'

const isOpen = ref(false)
let timeout: NodeJS.Timeout

function onMouseEnter() {
  clearTimeout(timeout)
  isOpen.value = true
}

function onMouseLeave() {
  timeout = setTimeout(() => {
    isOpen.value = false
  }, 300)
}
</script>

<template>
  <div class="relative inline-block w-max" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <slot name="trigger" />
    <div
      v-if="isOpen"
      :class="cn(
        'absolute z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in zoom-in-95',
        'bottom-full left-1/2 -translate-x-1/2 mb-2',
        $attrs.class as string
      )"
    >
      <slot />
    </div>
  </div>
</template>
