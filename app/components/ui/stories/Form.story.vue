<script setup lang="ts">
  import { ref } from 'vue'
  import FormField from '../FormField.vue'
  import FormGroup from '../FormGroup.vue'
  import BaseInput from '../BaseInput.vue'
  import BaseButton from '../BaseButton.vue'
  import BaseCheckbox from '../BaseCheckbox.vue'

  const username = ref('')
  const firstName = ref('')
  const lastName = ref('')
  const email = ref('invalid-email')
  const newsletter = ref(false)
</script>

<template>
  <Story title="Form / Structure" :layout="{ type: 'grid', width: '450px' }">
    <Variant title="Single Field Layout">
      <div class="p-6 bg-background border rounded-lg space-y-4">
        <FormField
          label="Profile Username"
          description="This is your public display name. It can only contain letters, numbers, and dashes."
          required
        >
          <template #default="{ id }">
            <BaseInput :id="id" v-model="username" placeholder="e.g. hadi-wijaya" />
          </template>
        </FormField>
      </div>
    </Variant>

    <Variant title="Grid Columns Group">
      <div class="p-6 bg-background border rounded-lg space-y-4">
        <FormGroup :cols="2">
          <FormField label="First Name" required>
            <template #default="{ id }">
              <BaseInput :id="id" v-model="firstName" placeholder="Hadi" />
            </template>
          </FormField>

          <FormField label="Last Name" required>
            <template #default="{ id }">
              <BaseInput :id="id" v-model="lastName" placeholder="Wijaya" />
            </template>
          </FormField>
        </FormGroup>

        <FormField
          label="Business Email"
          description="We will send invoice receipts to this address."
          error="Please check your email formatting (missing @ symbol)"
        >
          <template #default="{ id, error }">
            <BaseInput :id="id" v-model="email" :error="error" />
          </template>
        </FormField>

        <div class="pt-2">
          <BaseCheckbox v-model="newsletter" label="Accept automated service updates" />
        </div>

        <div class="flex justify-end gap-2 pt-4 border-t">
          <BaseButton variant="outline" size="sm">Cancel</BaseButton>
          <BaseButton size="sm">Save Account</BaseButton>
        </div>
      </div>
    </Variant>
  </Story>
</template>
