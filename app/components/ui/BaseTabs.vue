<script setup lang="ts">
  import { TabsRoot, TabsList, TabsTrigger, TabsContent } from 'radix-vue'
  import { cn } from '~/utils/cn'

  interface TabItem {
    value: string
    label: string
  }

  interface Props {
    modelValue: string
    items: TabItem[]
  }

  defineProps<Props>()

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
  }>()
</script>

<template>
  <TabsRoot
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
    class="flex flex-col w-full"
  >
    <TabsList
      class="inline-flex h-9 items-center justify-start rounded-lg bg-muted p-1 text-muted-foreground w-max select-none"
    >
      <TabsTrigger
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm cursor-pointer"
      >
        {{ item.label }}
      </TabsTrigger>
    </TabsList>

    <div class="mt-4">
      <TabsContent
        v-for="item in items"
        :key="item.value"
        :value="item.value"
        class="focus-visible:outline-none"
      >
        <slot :name="item.value" />
      </TabsContent>
    </div>
  </TabsRoot>
</template>
