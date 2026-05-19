<script setup lang="ts">
  import {
    DropdownMenuRoot,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from 'radix-vue'
  import { ref } from 'vue'
  import { cn } from '~/utils/cn'

  export interface DropdownItem {
    label: string
    value: string | number
    icon?: any
    disabled?: boolean
    destructive?: boolean
  }

  interface Props {
    items: DropdownItem[]
    align?: 'start' | 'center' | 'end'
  }

  withDefaults(defineProps<Props>(), {
    align: 'end',
  })

  const emit = defineEmits<{
    (e: 'select', value: string | number): void
  }>()

  const isOpen = ref(false)
</script>

<template>
  <DropdownMenuRoot v-model:open="isOpen">
    <DropdownMenuTrigger
      class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-3"
      v-bind="$attrs"
    >
      <slot />
    </DropdownMenuTrigger>

    <DropdownMenuContent
      :align="align"
      :side-offset="4"
      class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-80 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2"
    >
      <DropdownMenuItem
        v-for="item in items"
        :key="String(item.value)"
        :disabled="item.disabled"
        @select="emit('select', item.value)"
        :class="
          cn(
            'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer',
            item.destructive && 'text-destructive focus:bg-destructive/10 focus:text-destructive'
          )
        "
      >
        <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4 shrink-0" />
        <span>{{ item.label }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenuRoot>
</template>
