<script setup lang="ts">
  import { PopoverRoot, PopoverTrigger, PopoverContent, PopoverPortal, PopoverArrow } from 'radix-vue'
  import { useId, ref } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    align?: 'start' | 'center' | 'end'
    side?: 'top' | 'bottom' | 'left' | 'right'
    sideOffset?: number
    showArrow?: boolean
    contentClass?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    align: 'center',
    side: 'bottom',
    sideOffset: 4,
    showArrow: false,
    contentClass: '',
  })

  const emit = defineEmits<{
    (e: 'update:open', value: boolean): void
  }>()

  const popoverId = useId()
  const isOpen = ref(false)

  function onUpdate(open: boolean) {
    isOpen.value = open
    emit('update:open', open)
  }
</script>

<template>
  <PopoverRoot v-model:open="isOpen" @update:open="onUpdate">
    <PopoverTrigger as-child :aria-describedby="popoverId">
      <slot name="trigger" />
    </PopoverTrigger>

    <PopoverPortal>
      <PopoverContent
        :id="popoverId"
        :align="align"
        :side="side"
        :side-offset="sideOffset"
        :class="
          cn(
            'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            contentClass,
            $attrs.class as string
          )
        "
        v-bind="$attrs"
      >
        <slot />
        <PopoverArrow v-if="showArrow" class="fill-popover stroke-border stroke-[1px]" />
      </PopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>
