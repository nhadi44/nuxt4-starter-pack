<script setup lang="ts">
  import BaseSkeleton from '../BaseSkeleton.vue'
</script>

<template>
  <Story title="Base / BaseSkeleton" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Profile Card Loading skeleton">
      <div class="p-6 bg-background border rounded-lg flex items-center gap-3">
        <BaseSkeleton class="h-10 w-10 rounded-full shrink-0" />
        <div class="space-y-2 w-full">
          <BaseSkeleton class="h-4 w-[60%]" />
          <BaseSkeleton class="h-3 w-[80%]" />
        </div>
      </div>
    </Variant>

    <Variant title="Complex Table / Layout mock">
      <div class="p-6 bg-background border rounded-lg flex flex-col gap-4">
        <BaseSkeleton class="h-6 w-[40%]" />
        <div class="space-y-1.5">
          <BaseSkeleton class="h-3 w-full" />
          <BaseSkeleton class="h-3 w-full" />
          <BaseSkeleton class="h-3 w-[90%]" />
          <BaseSkeleton class="h-3 w-[45%]" />
        </div>
      </div>
    </Variant>
  </Story>
</template>
