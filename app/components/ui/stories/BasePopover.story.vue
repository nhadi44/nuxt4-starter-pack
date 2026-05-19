<script setup lang="ts">
  import { ref } from 'vue'
  import { ShieldAlert, HelpCircle } from 'lucide-vue-next'
  import BasePopover from '../BasePopover.vue'
  import BaseButton from '../BaseButton.vue'
  import BaseInput from '../BaseInput.vue'

  const customEmail = ref('')
</script>

<template>
  <Story title="Overlay / BasePopover" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Popover">
      <div class="p-12 bg-background border rounded-lg flex items-center justify-center min-h-[180px]">
        <BasePopover>
          <template #trigger>
            <BaseButton variant="outline" size="sm">
              <HelpCircle class="h-4 w-4 mr-1.5" />
              Help Info
            </BaseButton>
          </template>

          <div class="space-y-2">
            <h4 class="font-semibold text-sm">Deployment Zones</h4>
            <p class="text-xs text-muted-foreground leading-relaxed">
              These are geo-redundant regional server clusters that store automatic database backup targets.
            </p>
          </div>
        </BasePopover>
      </div>
    </Variant>

    <Variant title="Interactive Popover w/ Arrow">
      <div class="p-12 bg-background border rounded-lg flex items-center justify-center min-h-[220px]">
        <BasePopover show-arrow align="end" side="top">
          <template #trigger>
            <BaseButton size="sm">
              Verify Account
            </BaseButton>
          </template>

          <div class="space-y-3">
            <div class="flex items-center gap-2 text-rose-500 text-xs font-semibold">
              <ShieldAlert class="h-4 w-4" />
              <span>Identity Verification Required</span>
            </div>
            <p class="text-[11px] text-muted-foreground">
              Please enter your business contact email below to generate security keys.
            </p>
            <BaseInput v-model="customEmail" placeholder="hadi@company.com" size="sm" />
            <div class="flex justify-end pt-1">
              <BaseButton size="sm" class="h-7 text-xs">Request Key</BaseButton>
            </div>
          </div>
        </BasePopover>
      </div>
    </Variant>
  </Story>
</template>
