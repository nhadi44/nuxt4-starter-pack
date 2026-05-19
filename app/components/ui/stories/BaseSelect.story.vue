<script setup lang="ts">
  import { ref } from 'vue'
  import BaseSelect from '../BaseSelect.vue'

  const selectedVal1 = ref<string | null>(null)
  const selectedVal2 = ref<string | null>('id-2')

  const fruits = [
    { value: 'id-1', label: 'Apple 🍎' },
    { value: 'id-2', label: 'Banana 🍌' },
    { value: 'id-3', label: 'Cherry 🍒' },
    { value: 'id-4', label: 'Dragonfruit 🐉' }
  ]
</script>

<template>
  <Story title="Base / BaseSelect" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Select">
      <div class="p-6 bg-background border rounded-lg h-[300px]">
        <BaseSelect
          v-model="selectedVal1"
          :items="fruits"
          label="Favorite Fruit"
          placeholder="Choose a delicious fruit..."
        />
        <p class="text-xs text-muted-foreground mt-4">Selected Key: {{ selectedVal1 || 'None' }}</p>
      </div>
    </Variant>

    <Variant title="With Validation / Pre-selected">
      <div class="p-6 bg-background border rounded-lg h-[300px]">
        <BaseSelect
          v-model="selectedVal2"
          :items="fruits"
          label="Billing Category"
          error="You must verify the billing code corresponds to this category"
          required
        />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg h-[150px]">
        <BaseSelect
          :model-value="'id-3'"
          :items="fruits"
          label="Country / Region"
          disabled
        />
      </div>
    </Variant>
  </Story>
</template>
