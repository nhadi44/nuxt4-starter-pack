<script setup lang="ts">
import { ref, provide } from 'vue'

const activeMenu = ref<string | null>(null)

function setActiveMenu(menuId: string | null) {
  activeMenu.value = menuId
}

// Provide activeMenu state to children
provide('activeMenu', activeMenu)
provide('setActiveMenu', setActiveMenu)
</script>

<template>
  <nav class="relative z-10 flex w-max items-center justify-center">
    <ul class="flex flex-1 list-none items-center space-x-1">
      <slot />
    </ul>
  </nav>
</template>
