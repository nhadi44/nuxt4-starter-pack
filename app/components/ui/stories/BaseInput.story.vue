<script setup lang="ts">
  import { ref } from 'vue'
  import BaseInput from '../BaseInput.vue'

  const textValue = ref('')
  const emailValue = ref('hadi@example.com')
</script>

<template>
  <Story title="Base / BaseInput" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Text Input">
      <div class="p-6 bg-background border rounded-lg">
        <BaseInput
          v-model="textValue"
          label="Full Name"
          placeholder="Enter your name..."
          required
        />
        <p class="text-[10px] text-muted-foreground mt-2">Current Value: {{ textValue || '-' }}</p>
      </div>
    </Variant>

    <Variant title="With Validation Error">
      <div class="p-6 bg-background border rounded-lg">
        <BaseInput
          v-model="emailValue"
          type="email"
          label="Email Address"
          placeholder="Enter email..."
          error="Please enter a valid business email address"
        />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg">
        <BaseInput disabled label="Account Number (Read-only)" model-value="ACC-987123" />
      </div>
    </Variant>
  </Story>
</template>
