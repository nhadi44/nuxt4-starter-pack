<script setup lang="ts">
interface Item {
  label: string
  value: string | number | null
}

interface Props {
  title?: string
  description?: string
  items: Item[]
}

defineProps<Props>()
</script>

<template>
  <div class="rounded-xl border bg-card shadow-sm overflow-hidden w-full">
    <div v-if="title || description" class="px-6 py-5 border-b bg-muted/30">
      <h3 v-if="title" class="text-base font-semibold leading-6 text-foreground">{{ title }}</h3>
      <p v-if="description" class="mt-1 max-w-2xl text-sm text-muted-foreground">{{ description }}</p>
    </div>
    <div class="px-6 py-5">
      <dl class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6">
        <div v-for="item in items" :key="item.label" class="col-span-1">
          <dt class="text-sm font-medium text-muted-foreground">{{ item.label }}</dt>
          <dd class="mt-1 text-sm text-foreground font-medium">{{ item.value || '-' }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
