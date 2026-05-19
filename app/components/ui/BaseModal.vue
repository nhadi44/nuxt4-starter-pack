<script setup lang="ts">
  import {
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
  } from 'radix-vue'
  import { X } from 'lucide-vue-next'
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: boolean
    title?: string
    description?: string
    closeOnOutsideClick?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    closeOnOutsideClick: true,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'close'): void
  }>()

  const modalId = useId()

  function onUpdate(open: boolean) {
    emit('update:modelValue', open)
    if (!open) emit('close')
  }
</script>

<template>
  <DialogRoot :open="modelValue" @update:open="onUpdate">
    <DialogPortal>
      <DialogOverlay
        class="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
      />
      <DialogContent
        :id="modalId"
        @pointer-down-outside="!closeOnOutsideClick && $event.preventDefault()"
        :class="
          cn(
            'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-48 data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-48 sm:rounded-lg md:w-full',
            $attrs.class as string
          )
        "
      >
        <div class="flex flex-col space-y-1.5 text-center sm:text-left">
          <DialogTitle
            v-if="title || $slots.title"
            class="text-lg font-semibold leading-none tracking-tight"
          >
            <slot name="title">{{ title }}</slot>
          </DialogTitle>
          <DialogDescription
            v-if="description || $slots.description"
            class="text-sm text-muted-foreground"
          >
            <slot name="description">{{ description }}</slot>
          </DialogDescription>
        </div>

        <slot />

        <DialogClose
          class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
