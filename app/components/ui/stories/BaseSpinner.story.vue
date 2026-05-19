<script setup lang="ts">
  import BaseSpinner from '../BaseSpinner.vue'
</script>

<template>
  <Story title="Base / BaseSpinner" :layout="{ type: 'grid', width: '250px' }">
    <Variant title="Different Sizes">
      <div class="p-6 flex items-center justify-around bg-background border rounded-lg">
        <BaseSpinner size="sm" />
        <BaseSpinner size="md" />
        <BaseSpinner size="lg" />
        <BaseSpinner size="xl" />
      </div>
    </Variant>

    <Variant title="Custom Colors">
      <div class="p-6 flex items-center justify-around bg-background border rounded-lg">
        <BaseSpinner size="md" color="text-emerald-500" />
        <BaseSpinner size="md" color="text-amber-500" />
        <BaseSpinner size="md" color="text-rose-500" />
        <BaseSpinner size="md" color="text-indigo-500" />
      </div>
    </Variant>
  </Story>
</template>
