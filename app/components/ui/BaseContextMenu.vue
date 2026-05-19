<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const position = ref({ x: 0, y: 0 })

function onContextMenu(e: MouseEvent) {
  e.preventDefault()
  isOpen.value = true
  position.value = { x: e.clientX, y: e.clientY }
}

function close() {
  isOpen.value = false
}

onMounted(() => document.addEventListener('click', close))
onUnmounted(() => document.removeEventListener('click', close))
</script>

<template>
  <div @contextmenu="onContextMenu" class="h-full w-full">
    <slot name="trigger" />
    <Teleport to="body">
      <div
        v-if="isOpen"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        class="fixed z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in zoom-in-95"
        @click.stop
      >
        <slot />
      </div>
    </Teleport>
  </div>
</template>
