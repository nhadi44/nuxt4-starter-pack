<script setup lang="ts">
  import { ref } from 'vue'
  import AsyncSelect from '../AsyncSelect.vue'

  const selectedUserId = ref(null)

  async function fetchUsers() {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    return [
      { id: '1', name: 'Alice Freeman' },
      { id: '2', name: 'Bob Smith' },
      { id: '3', name: 'Charlie Jenkins' },
      { id: '4', name: 'David Lee' },
    ]
  }
</script>

<template>
  <Story title="Form / AsyncSelect" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Simulated Network Request">
      <div class="p-6 bg-background border rounded-lg space-y-4 flex flex-col min-h-[300px]">
        <AsyncSelect
          v-model="selectedUserId"
          :fetch-options="fetchUsers"
          value-key="id"
          label-key="name"
          label="Assign User"
        />
        
        <p class="text-xs text-muted-foreground font-mono pt-4">
          Selected ID: <span class="font-bold text-primary">{{ selectedUserId || 'none' }}</span>
        </p>
      </div>
    </Variant>
  </Story>
</template>
