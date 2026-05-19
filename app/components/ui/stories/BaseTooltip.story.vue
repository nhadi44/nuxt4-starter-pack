<script setup lang="ts">
  import BaseTooltip from '../BaseTooltip.vue'
  import BaseButton from '../BaseButton.vue'
</script>

<template>
  <Story title="Overlay / BaseTooltip" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Tooltip Directions">
      <div class="p-12 bg-background border rounded-lg flex flex-wrap gap-4 items-center justify-center">
        <BaseTooltip content="Tooltip displayed on Top" side="top">
          <BaseButton variant="outline" size="sm">Top</BaseButton>
        </BaseTooltip>

        <BaseTooltip content="Tooltip displayed on Bottom" side="bottom">
          <BaseButton variant="outline" size="sm">Bottom</BaseButton>
        </BaseTooltip>

        <BaseTooltip content="Tooltip displayed on Left" side="left">
          <BaseButton variant="outline" size="sm">Left</BaseButton>
        </BaseTooltip>

        <BaseTooltip content="Tooltip displayed on Right" side="right">
          <BaseButton variant="outline" size="sm">Right</BaseButton>
        </BaseTooltip>
      </div>
    </Variant>

    <Variant title="Trigger Elements">
      <div class="p-8 bg-background border rounded-lg flex flex-col gap-4 items-start">
        <div class="text-sm">
          Hover over the text below to see descriptive definitions:
        </div>
        <div>
          We utilize 
          <BaseTooltip content="Multi-Factor Authentication (security keys or SMS codes)" side="top">
            <span class="underline decoration-indigo-500 font-semibold cursor-help">MFA protection</span>
          </BaseTooltip>
          across all transaction endpoints.
        </div>
      </div>
    </Variant>
  </Story>
</template>
