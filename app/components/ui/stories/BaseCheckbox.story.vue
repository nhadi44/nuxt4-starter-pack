<script setup lang="ts">
  import { ref } from 'vue'
  import BaseCheckbox from '../BaseCheckbox.vue'

  const checked1 = ref(false)
  const checked2 = ref(true)
  const checked3 = ref(false)
</script>

<template>
  <Story title="Base / BaseCheckbox" :layout="{ type: 'grid', width: '300px' }">
    <Variant title="Basic Checkbox">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseCheckbox v-model="checked1" label="Accept terms and conditions" />
        <p class="text-xs text-muted-foreground mt-2">State: {{ checked1 }}</p>
      </div>
    </Variant>

    <Variant title="Pre-checked & Required">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseCheckbox v-model="checked2" label="Subscribe to newsletter" required />
        <BaseCheckbox v-model="checked3" label="Enable telemetry updates" error="Required field" />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseCheckbox :model-value="true" disabled label="Signed-off agreement" />
        <BaseCheckbox :model-value="false" disabled label="Beta testing pipeline" />
      </div>
    </Variant>
  </Story>
</template>
