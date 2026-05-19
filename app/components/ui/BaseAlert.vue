<script setup lang="ts">
  import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-vue-next'
  import { computed } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info'
    title?: string
    description?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
  })

  const variantClasses = computed(() => {
    switch (props.variant) {
      case 'destructive':
        return 'bg-destructive/10 text-destructive border-destructive/20 dark:border-destructive/30'
      case 'success':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 dark:border-emerald-500/30'
      case 'warning':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
      case 'info':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20'
      case 'default':
      default:
        return 'bg-background text-foreground border-border'
    }
  })

  const icon = computed(() => {
    switch (props.variant) {
      case 'destructive':
        return AlertCircle
      case 'success':
        return CheckCircle
      case 'warning':
        return AlertTriangle
      case 'info':
      case 'default':
      default:
        return Info
    }
  })
</script>

<template>
  <div
    role="alert"
    :class="
      cn(
        'relative w-full rounded-lg border p-4 flex gap-3 items-start',
        variantClasses,
        $attrs.class as string
      )
    "
  >
    <component :is="icon" class="h-4 w-4 shrink-0 mt-0.5" />
    <div class="flex flex-col gap-1">
      <h5 v-if="title || $slots.title" class="font-semibold leading-none tracking-tight text-sm">
        <slot name="title">{{ title }}</slot>
      </h5>
      <div v-if="description || $slots.default" class="text-xs leading-relaxed opacity-90">
        <slot>{{ description }}</slot>
      </div>
    </div>
  </div>
</template>
