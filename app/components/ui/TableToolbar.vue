<script setup lang="ts">
  import SearchInput from './SearchInput.vue'

  interface Props {
    searchQuery?: string
    searchPlaceholder?: string
    showSearch?: boolean
  }

  withDefaults(defineProps<Props>(), {
    searchQuery: '',
    searchPlaceholder: 'Search...',
    showSearch: true,
  })

  const emit = defineEmits<{
    (e: 'update:searchQuery', value: string): void
  }>()

  function onSearchUpdate(val: string) {
    emit('update:searchQuery', val)
  }
</script>

<template>
  <div class="flex items-center justify-between py-4">
    <div class="flex flex-1 items-center space-x-2">
      <div v-if="showSearch" class="w-full max-w-[250px]">
        <SearchInput
          :model-value="searchQuery"
          @update:model-value="onSearchUpdate"
          :placeholder="searchPlaceholder"
        />
      </div>
      <slot name="left" />
    </div>
    
    <div class="flex items-center space-x-2">
      <slot name="right" />
    </div>
  </div>
</template>
