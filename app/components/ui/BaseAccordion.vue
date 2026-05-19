<script setup lang="ts">
  import {
    AccordionRoot,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionContent,
  } from 'radix-vue'
  import { ChevronDown } from 'lucide-vue-next'
  import { cn } from '~/utils/cn'

  export interface AccordionItemData {
    value: string
    title: string
    content?: string
  }

  interface Props {
    items: AccordionItemData[]
    type?: 'single' | 'multiple'
    collapsible?: boolean
    modelValue?: string | string[]
  }

  withDefaults(defineProps<Props>(), {
    type: 'single',
    collapsible: true,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>()
</script>

<template>
  <AccordionRoot
    :type="type"
    :collapsible="collapsible"
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    class="w-full divide-y divide-border border-b border-t"
  >
    <AccordionItem v-for="item in items" :key="item.value" :value="item.value" class="py-2">
      <AccordionHeader class="flex">
        <AccordionTrigger
          class="flex flex-1 items-center justify-between py-4 text-sm font-semibold transition-all hover:underline [&[data-state=open]>svg]:rotate-180 text-left cursor-pointer"
        >
          <slot name="trigger" :item="item">
            {{ item.title }}
          </slot>
          <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent
        class="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      >
        <div class="pb-4 pt-0 text-muted-foreground text-xs leading-relaxed">
          <slot :name="item.value" :item="item">
            {{ item.content }}
          </slot>
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
