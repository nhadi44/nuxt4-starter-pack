<script setup lang="ts">
  import { ref } from 'vue'
  import BaseDrawer from '../BaseDrawer.vue'
  import BaseButton from '../BaseButton.vue'

  const isOpen1 = ref(false)
  const isOpen2 = ref(false)
</script>

<template>
  <Story title="Overlay / BaseDrawer" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Right Drawer">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen1 = true">Open Sidebar Drawer</BaseButton>

        <BaseDrawer
          v-model="isOpen1"
          title="Filter Parameters"
          description="Refine your current dashboard transaction outputs."
        >
          <div class="py-4 space-y-4">
            <p class="text-xs text-muted-foreground">Select the active categories you want to include in the visual reporting panels.</p>
            <div class="space-y-2">
              <div class="h-[120px] flex items-center justify-center border border-dashed rounded bg-muted/30">
                <span class="text-xs text-muted-foreground">Filter controls placeholder</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col gap-2 pt-4 border-t">
            <BaseButton @click="isOpen1 = false">Apply Filters</BaseButton>
            <BaseButton variant="outline" @click="isOpen1 = false">Reset All</BaseButton>
          </div>
        </BaseDrawer>
      </div>
    </Variant>

    <Variant title="Custom Header & Content">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen2 = true">Open Activity Feed</BaseButton>

        <BaseDrawer v-model="isOpen2" :close-on-outside-click="false">
          <template #title>
            <div class="flex items-center gap-2 text-rose-500">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span>Live System Logs</span>
            </div>
          </template>
          <template #description>
            <span class="text-xs">Real-time Docker build audit metrics.</span>
          </template>

          <div class="py-4 flex flex-col gap-2 font-mono text-[10px] text-muted-foreground bg-muted/40 p-3 rounded-md border">
            <div>[23:14:02] -> Initializing Webpack production loaders...</div>
            <div>[23:14:05] -> Bundling Vue presentation nodes...</div>
            <div>[23:14:10] -> Tailwind build complete in 820ms.</div>
            <div class="text-emerald-500">[23:14:12] -> Deployment succeeded! Server status active.</div>
          </div>

          <div class="pt-4 flex justify-end">
            <BaseButton @click="isOpen2 = false">Acknowledge</BaseButton>
          </div>
        </BaseDrawer>
      </div>
    </Variant>
  </Story>
</template>
