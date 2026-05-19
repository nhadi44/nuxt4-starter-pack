<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core'
  import { Sun, Moon } from 'lucide-vue-next'

  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: '',
  })
  const toggleDark = useToggle(isDark)
</script>

<template>
  <button
    @click="toggleDark()"
    class="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    aria-label="Toggle theme"
  >
    <Sun v-if="isDark" class="h-4 w-4 text-amber-500 transition-all" />
    <Moon v-else class="h-4 w-4 text-slate-700 transition-all" />
  </button>
</template>
