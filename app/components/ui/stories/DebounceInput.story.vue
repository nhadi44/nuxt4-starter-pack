<script setup lang="ts">
  import { ref, watch } from 'vue'
  import DebounceInput from '../DebounceInput.vue'
  import { Loader2 } from 'lucide-vue-next'

  const searchQuery = ref('')
  const apiOutput = ref('')
  const isFetching = ref(false)

  // Simulate API call on update
  watch(searchQuery, (newVal) => {
    isFetching.value = true
    setTimeout(() => {
      apiOutput.value = newVal
      isFetching.value = false
    }, 400)
  })
</script>

<template>
  <Story title="Form / DebounceInput" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="API Search Simulation">
      <div class="p-6 bg-background border rounded-lg space-y-4 flex flex-col justify-center min-h-[200px]">
        <DebounceInput
          v-model="searchQuery"
          :debounce="600"
          label="Search Database (600ms debounce)"
          placeholder="Start typing..."
        />
        
        <div class="h-[60px] p-3 rounded-md border bg-muted/30 text-xs font-mono">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-muted-foreground font-semibold">API State:</span>
            <span v-if="isFetching" class="flex items-center text-primary">
              <Loader2 class="h-3 w-3 mr-1 animate-spin" /> Fetching...
            </span>
            <span v-else class="text-emerald-500">Idle</span>
          </div>
          <div>
            Data: <span class="text-primary">{{ apiOutput || 'null' }}</span>
          </div>
        </div>
      </div>
    </Variant>
  </Story>
</template>
