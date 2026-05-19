<script setup lang="ts">
import { ChevronRight, Home } from 'lucide-vue-next'

interface Crumb {
  label: string
  href?: string
}

defineProps<{ 
  items: Crumb[] 
}>()
</script>

<template>
  <nav class="flex text-sm text-muted-foreground font-medium" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2">
      <li class="inline-flex items-center">
        <NuxtLink to="/" class="hover:text-foreground flex items-center transition-colors">
          <Home class="h-4 w-4" />
        </NuxtLink>
      </li>
      <li v-for="(item, index) in items" :key="index">
        <div class="flex items-center">
          <ChevronRight class="h-4 w-4 mx-1 opacity-50" />
          <NuxtLink v-if="item.href && index !== items.length - 1" :to="item.href" class="hover:text-foreground transition-colors">
            {{ item.label }}
          </NuxtLink>
          <span v-else class="text-foreground">{{ item.label }}</span>
        </div>
      </li>
    </ol>
  </nav>
</template>
