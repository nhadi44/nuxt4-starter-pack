<script setup lang="ts">
  import { ref } from 'vue'
  import BaseTextarea from '../BaseTextarea.vue'

  const messageVal = ref('')
  const commentVal = ref('This is a pre-filled comment area.')
</script>

<template>
  <Story title="Base / BaseTextarea" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Textarea">
      <div class="p-6 bg-background border rounded-lg">
        <BaseTextarea
          v-model="messageVal"
          label="Your Feedback"
          placeholder="Tell us what you think..."
          required
        />
        <p class="text-[10px] text-muted-foreground mt-2">Current Length: {{ messageVal.length }} characters</p>
      </div>
    </Variant>

    <Variant title="With Validation Error">
      <div class="p-6 bg-background border rounded-lg">
        <BaseTextarea
          v-model="commentVal"
          label="Review Notes"
          error="Comments must be at least 50 characters long"
        />
      </div>
    </Variant>

    <Variant title="Disabled State">
      <div class="p-6 bg-background border rounded-lg">
        <BaseTextarea
          disabled
          label="Agreement Summary (Locked)"
          model-value="This contract is fully executed. Modifications are disabled."
        />
      </div>
    </Variant>
  </Story>
</template>
