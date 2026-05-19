<script setup lang="ts">
  import BaseButton from '../BaseButton.vue'
</script>

<template>
  <Story title="Base / BaseButton" :layout="{ type: 'grid', width: '300px' }">
    <Variant title="Default">
      <div class="p-4 flex items-center justify-center bg-background">
        <BaseButton>Default Button</BaseButton>
      </div>
    </Variant>

    <Variant title="Variants Showcase">
      <div class="p-6 flex flex-col gap-3 bg-background border rounded-lg">
        <BaseButton variant="default">Default</BaseButton>
        <BaseButton variant="secondary">Secondary</BaseButton>
        <BaseButton variant="outline">Outline</BaseButton>
        <BaseButton variant="destructive">Destructive</BaseButton>
        <BaseButton variant="ghost">Ghost</BaseButton>
        <BaseButton variant="link">Link Style</BaseButton>
      </div>
    </Variant>

    <Variant title="Sizes">
      <div class="p-6 flex items-center gap-3 bg-background border rounded-lg flex-wrap">
        <BaseButton size="sm">Small (sm)</BaseButton>
        <BaseButton size="default">Default</BaseButton>
        <BaseButton size="lg">Large (lg)</BaseButton>
      </div>
    </Variant>

    <Variant title="States">
      <div class="p-6 flex flex-col gap-3 bg-background border rounded-lg">
        <BaseButton loading>Loading State</BaseButton>
        <BaseButton disabled>Disabled Button</BaseButton>
      </div>
    </Variant>
  </Story>
</template>
