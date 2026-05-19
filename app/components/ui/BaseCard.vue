<script setup lang="ts">
  import { cn } from '~/utils/cn'

  interface Props {
    title?: string
    description?: string
  }

  defineProps<Props>()
</script>

<template>
  <div
    :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', $attrs.class as string)"
  >
    <div
      v-if="title || description || $slots.title || $slots.description || $slots.header"
      class="flex flex-col space-y-1.5 p-6"
    >
      <slot name="header">
        <h3 v-if="title || $slots.title" class="text-lg font-semibold leading-none tracking-tight">
          <slot name="title">{{ title }}</slot>
        </h3>
        <p v-if="description || $slots.description" class="text-sm text-muted-foreground">
          <slot name="description">{{ description }}</slot>
        </p>
      </slot>
    </div>

    <div class="p-6 pt-0">
      <slot />
    </div>

    <div v-if="$slots.footer" class="flex items-center p-6 pt-0 border-t border-border/50 mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>
