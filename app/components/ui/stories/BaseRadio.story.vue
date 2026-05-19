<script setup lang="ts">
  import { ref } from 'vue'
  import BaseRadio from '../BaseRadio.vue'

  const activePlan = ref('pro')
  const newsletterChoice = ref('yes')
</script>

<template>
  <Story title="Form / BaseRadio" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Radio Group Selection">
      <div class="p-6 bg-background border rounded-lg space-y-4">
        <h4 class="text-sm font-semibold text-foreground/80">Select Workspace Size</h4>
        
        <div class="flex flex-col gap-3">
          <BaseRadio
            v-model="activePlan"
            value="starter"
            name="workspace-size"
            label="Starter Tier (Up to 5 seats)"
          />
          
          <BaseRadio
            v-model="activePlan"
            value="pro"
            name="workspace-size"
            label="Professional Tier (Up to 25 seats)"
          />
          
          <BaseRadio
            v-model="activePlan"
            value="enterprise"
            name="workspace-size"
            label="Enterprise Tier (Unlimited seats)"
          />
        </div>

        <p class="text-xs text-muted-foreground pt-2 border-t font-mono">
          Selected plan value: <span class="text-primary font-bold">{{ activePlan }}</span>
        </p>
      </div>
    </Variant>

    <Variant title="Disabled and Error States">
      <div class="p-6 bg-background border rounded-lg space-y-4">
        <div class="flex flex-col gap-3">
          <BaseRadio
            v-model="newsletterChoice"
            value="yes"
            name="demo-states"
            label="Enable daily logs digest (Error focus)"
            error
          />

          <BaseRadio
            v-model="newsletterChoice"
            value="no"
            name="demo-states"
            label="Disable logs digest (Disabled)"
            disabled
          />
        </div>
      </div>
    </Variant>
  </Story>
</template>
