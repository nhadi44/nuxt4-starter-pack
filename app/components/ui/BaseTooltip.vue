<script setup lang="ts">
  import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from 'radix-vue'
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    content: string
    side?: 'top' | 'bottom' | 'left' | 'right'
    delayDuration?: number
  }

  withDefaults(defineProps<Props>(), {
    side: 'top',
    delayDuration: 200,
  })

  const tooltipId = useId()
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration">
    <TooltipRoot>
      <TooltipTrigger as-child :aria-describedby="tooltipId">
        <slot />
      </TooltipTrigger>
      <TooltipContent
        :id="tooltipId"
        :side="side"
        :side-offset="4"
        :class="
          cn(
            'z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            $attrs.class as string
          )
        "
      >
        {{ content }}
      </TooltipContent>
    </TooltipRoot>
  </TooltipProvider>
</template>
