<script setup lang="ts">
  import { ref } from 'vue'
  import BaseTabs from '../BaseTabs.vue'

  const activeTab = ref('account')
  const tabsList = [
    { value: 'account', label: 'Account Profile' },
    { value: 'security', label: 'Security Keys' },
    { value: 'billing', label: 'Billing Invoices' }
  ]
</script>

<template>
  <Story title="Base / BaseTabs" :layout="{ type: 'grid', width: '450px' }">
    <Variant title="Interactive Tabs">
      <div class="p-6 bg-background border rounded-lg min-h-[200px]">
        <BaseTabs v-model="activeTab" :items="tabsList">
          <template #account>
            <div class="p-4 bg-muted/40 rounded-md border text-sm">
              <h4 class="font-bold mb-1">User Profile details</h4>
              <p class="text-xs text-muted-foreground">Manage your public information, avatar, and contact emails.</p>
            </div>
          </template>

          <template #security>
            <div class="p-4 bg-muted/40 rounded-md border text-sm">
              <h4 class="font-bold mb-1">Multi-Factor Authentication</h4>
              <p class="text-xs text-muted-foreground">Keep your account secure by rotating security tokens and hardware keys.</p>
            </div>
          </template>

          <template #billing>
            <div class="p-4 bg-muted/40 rounded-md border text-sm">
              <h4 class="font-bold mb-1">Payment History</h4>
              <p class="text-xs text-muted-foreground">Review monthly automated usage reports and PDF invoice copies.</p>
            </div>
          </template>
        </BaseTabs>
        <p class="text-[10px] text-muted-foreground mt-4">Active Tab Ref: {{ activeTab }}</p>
      </div>
    </Variant>
  </Story>
</template>
