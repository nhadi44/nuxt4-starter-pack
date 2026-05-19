<script setup lang="ts">
  import BaseBadge from '../BaseBadge.vue'
</script>

<template>
  <Story title="Base / BaseBadge" :layout="{ type: 'grid', width: '200px' }">
    <Variant title="Default">
      <div class="p-4 flex items-center justify-center bg-background">
        <BaseBadge>Default</BaseBadge>
      </div>
    </Variant>

    <Variant title="Secondary">
      <div class="p-4 flex items-center justify-center bg-background">
        <BaseBadge variant="secondary">Secondary</BaseBadge>
      </div>
    </Variant>

    <Variant title="Destructive">
      <div class="p-4 flex items-center justify-center bg-background">
        <BaseBadge variant="destructive">Destructive</BaseBadge>
      </div>
    </Variant>

    <Variant title="Outline">
      <div class="p-4 flex items-center justify-center bg-background">
        <BaseBadge variant="outline">Outline</BaseBadge>
      </div>
    </Variant>
  </Story>
</template>
