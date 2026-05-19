<script setup lang="ts">
  import { ref } from 'vue'
  import SearchInput from '../SearchInput.vue'

  const searchQuery1 = ref('')
  const searchQuery2 = ref('Pre-filled search')
</script>

<template>
  <Story title="Form / SearchInput" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Standard Search">
      <div class="p-6 bg-background border rounded-lg space-y-4 flex flex-col justify-center min-h-[150px]">
        <SearchInput v-model="searchQuery1" placeholder="Search components..." />
        
        <p class="text-xs text-muted-foreground font-mono">
          Query: <span class="font-bold text-primary">{{ searchQuery1 || 'empty' }}</span>
        </p>
      </div>
    </Variant>

    <Variant title="Loading State">
      <div class="p-6 bg-background border rounded-lg space-y-4 flex flex-col justify-center min-h-[150px]">
        <SearchInput v-model="searchQuery2" loading placeholder="Searching logs..." />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg space-y-4 flex flex-col justify-center min-h-[150px]">
        <SearchInput disabled placeholder="Search is offline" />
      </div>
    </Variant>
  </Story>
</template>
