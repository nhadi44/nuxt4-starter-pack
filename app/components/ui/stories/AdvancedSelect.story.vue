<script setup lang="ts">
  import { ref } from 'vue'
  import SearchSelect from '../SearchSelect.vue'
  import MultiSelect from '../MultiSelect.vue'
  import DebounceSelect from '../DebounceSelect.vue'

  const frameworks = [
    { label: 'Vue.js', value: 'vue' },
    { label: 'Nuxt.js', value: 'nuxt' },
    { label: 'React', value: 'react' },
    { label: 'Next.js', value: 'next' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'SvelteKit', value: 'sveltekit' },
    { label: 'Angular', value: 'angular' },
    { label: 'Solid', value: 'solid' },
  ]

  const selectedFramework = ref(null)
  const selectedFrameworks = ref(['vue', 'nuxt'])
  
  const debounceValue = ref(null)
  const isSearching = ref(false)
  const asyncOptions = ref<{label: string, value: string}[]>([])

  function handleSearch(query: string) {
    if (!query) {
      asyncOptions.value = []
      return
    }
    isSearching.value = true
    setTimeout(() => {
      asyncOptions.value = [
        { label: `${query} result 1`, value: `${query}-1` },
        { label: `${query} result 2`, value: `${query}-2` },
        { label: `${query} result 3`, value: `${query}-3` },
      ]
      isSearching.value = false
    }, 1000)
  }
</script>

<template>
  <Story title="Form / Advanced Select Ecosystem" :layout="{ type: 'grid', width: '500px' }">
    <Variant title="SearchSelect">
      <div class="p-6 bg-background rounded-lg border h-[400px]">
        <SearchSelect
          v-model="selectedFramework"
          :options="frameworks"
          label="Favorite Framework"
          placeholder="Select a framework..."
        />
        <div class="mt-4 text-xs font-mono text-muted-foreground">
          Selected: {{ selectedFramework || 'null' }}
        </div>
      </div>
    </Variant>

    <Variant title="MultiSelect">
      <div class="p-6 bg-background rounded-lg border h-[400px]">
        <MultiSelect
          v-model="selectedFrameworks"
          :options="frameworks"
          label="Tech Stack"
          placeholder="Select frameworks..."
        />
        <div class="mt-4 text-xs font-mono text-muted-foreground">
          Selected: {{ selectedFrameworks }}
        </div>
      </div>
    </Variant>

    <Variant title="DebounceSelect (Async)">
      <div class="p-6 bg-background rounded-lg border h-[400px]">
        <DebounceSelect
          v-model="debounceValue"
          :options="asyncOptions"
          :is-loading="isSearching"
          label="Search Github Repositories"
          placeholder="Type to search..."
          search-placeholder="E.g. vuejs/core..."
          @search="handleSearch"
        />
        <div class="mt-4 text-xs font-mono text-muted-foreground">
          Selected: {{ debounceValue || 'null' }}
        </div>
      </div>
    </Variant>
  </Story>
</template>
