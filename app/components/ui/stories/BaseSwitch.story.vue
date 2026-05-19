<script setup lang="ts">
  import { ref } from 'vue'
  import BaseSwitch from '../BaseSwitch.vue'

  const active1 = ref(false)
  const active2 = ref(true)
</script>

<template>
  <Story title="Base / BaseSwitch" :layout="{ type: 'grid', width: '300px' }">
    <Variant title="Basic Switch">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseSwitch v-model="active1" label="Enable notifications" />
        <p class="text-xs text-muted-foreground mt-2">Active state: {{ active1 }}</p>
      </div>
    </Variant>

    <Variant title="Active Switch">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseSwitch v-model="active2" label="Dark mode mode" />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-3">
        <BaseSwitch :model-value="true" disabled label="Biometric Sign-in (Hardware offline)" />
        <BaseSwitch :model-value="false" disabled label="Automatic updates" />
      </div>
    </Variant>
  </Story>
</template>
