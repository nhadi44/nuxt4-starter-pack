<script setup lang="ts">
  import BaseAvatar from '../BaseAvatar.vue'
</script>

<template>
  <Story title="Base / BaseAvatar" :layout="{ type: 'grid', width: '300px' }">
    <Variant title="Sizes Showcase">
      <div class="p-6 flex items-center justify-around bg-background border rounded-lg flex-wrap gap-4">
        <BaseAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" size="sm" />
        <BaseAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" size="md" />
        <BaseAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" size="lg" />
        <BaseAvatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Jane Doe" size="xl" />
      </div>
    </Variant>

    <Variant title="Fallbacks">
      <div class="p-6 flex items-center justify-around bg-background border rounded-lg flex-wrap gap-4">
        <BaseAvatar alt="Hadi Wijaya" size="md" />
        <BaseAvatar alt="Hadi Wijaya" fallback="HW" size="md" />
        <BaseAvatar size="md" />
      </div>
    </Variant>
  </Story>
</template>
