<script setup lang="ts">
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-vue-next'
import { cn } from '~/utils/cn'
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()

const icons: Record<string, any> = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
  default: Info,
}
</script>

<template>
  <div class="fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px] gap-2 pointer-events-none">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="cn(
          'pointer-events-auto relative flex w-full items-center justify-between space-x-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all',
          toast.type === 'error' ? 'destructive group border-destructive bg-destructive text-destructive-foreground' : 'bg-background text-foreground'
        )"
      >
        <div class="flex gap-3 items-start">
          <component :is="icons[toast.type || 'default']" class="h-5 w-5 mt-0.5" />
          <div class="grid gap-1">
            <h3 class="text-sm font-semibold">{{ toast.title }}</h3>
            <p v-if="toast.description" class="text-sm opacity-90">{{ toast.description }}</p>
          </div>
        </div>
        <button
          @click="removeToast(toast.id)"
          class="absolute right-1 top-1 rounded-md p-1 opacity-50 transition-opacity hover:opacity-100"
        >
          <X class="h-4 w-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
