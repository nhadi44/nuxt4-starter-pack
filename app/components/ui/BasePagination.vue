<script setup lang="ts">
  import { computed } from 'vue'
  import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
  import BaseButton from './BaseButton.vue'
  import BaseSelect from './BaseSelect.vue'

  interface Props {
    page: number
    pageSize: number
    total: number
    pageSizes?: number[]
  }

  const props = withDefaults(defineProps<Props>(), {
    pageSizes: () => [10, 20, 30, 40, 50],
  })

  const emit = defineEmits<{
    (e: 'update:page', value: number): void
    (e: 'update:pageSize', value: number): void
  }>()

  const totalPages = computed(() => Math.ceil(props.total / props.pageSize) || 1)
  const canGoPrev = computed(() => props.page > 1)
  const canGoNext = computed(() => props.page < totalPages.value)

  const pageSizeOptions = computed(() => 
    props.pageSizes.map(size => ({ value: size, label: `${size} rows` }))
  )

  function onPageSizeChange(size: any) {
    emit('update:pageSize', Number(size))
    emit('update:page', 1) // Reset to page 1 on size change
  }
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between px-2 py-3 gap-4 border-t">
    <div class="flex-1 text-sm text-muted-foreground whitespace-nowrap">
      Total {{ total }} items
    </div>
    
    <div class="flex flex-col sm:flex-row items-center gap-4 sm:space-x-6 lg:space-x-8">
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium whitespace-nowrap">Rows per page</p>
        <div class="w-[110px]">
          <BaseSelect
            :model-value="pageSize"
            :items="pageSizeOptions"
            @update:model-value="onPageSizeChange"
          />
        </div>
      </div>
      
      <div class="flex w-[100px] items-center justify-center text-sm font-medium whitespace-nowrap">
        Page {{ page }} of {{ totalPages }}
      </div>
      
      <div class="flex items-center space-x-2">
        <BaseButton
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!canGoPrev"
          @click="emit('update:page', page - 1)"
          aria-label="Go to previous page"
        >
          <ChevronLeft class="h-4 w-4" />
        </BaseButton>
        <BaseButton
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!canGoNext"
          @click="emit('update:page', page + 1)"
          aria-label="Go to next page"
        >
          <ChevronRight class="h-4 w-4" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
