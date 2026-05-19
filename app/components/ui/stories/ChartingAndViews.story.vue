<script setup lang="ts">
  import { ref } from 'vue'
  import BaseSheet from '../BaseSheet.vue'
  import BaseResizable from '../BaseResizable.vue'
  import BaseChart from '../BaseChart.vue'
  import BaseButton from '../BaseButton.vue'

  const sheetOpen = ref(false)
  const chartData = [
    { label: 'Jan', value: 400 },
    { label: 'Feb', value: 300 },
    { label: 'Mar', value: 550 },
    { label: 'Apr', value: 450 },
    { label: 'May', value: 700 },
    { label: 'Jun', value: 650 },
  ]
</script>

<template>
  <Story title="Data Display / Complex Views" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="BaseChart (Bar)">
      <div class="p-6 bg-background rounded-lg border">
        <h3 class="font-semibold text-lg mb-4">Monthly Revenue</h3>
        <BaseChart :data="chartData" height="250px" />
      </div>
    </Variant>

    <Variant title="BaseSheet (Slide-out)">
      <div class="p-6 bg-background rounded-lg border flex items-center justify-center h-[200px]">
        <BaseButton @click="sheetOpen = true">Open Edit Profile Sheet</BaseButton>
        <BaseSheet 
          v-model="sheetOpen" 
          title="Edit profile" 
          description="Make changes to your profile here. Click save when you're done."
          side="right"
        >
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-sm font-medium">Name</label>
              <input value="Pedro Duarte" class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
            <div class="grid grid-cols-4 items-center gap-4">
              <label class="text-right text-sm font-medium">Username</label>
              <input value="@peduarte" class="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
            </div>
          </div>
          <template #footer>
            <BaseButton type="submit">Save changes</BaseButton>
          </template>
        </BaseSheet>
      </div>
    </Variant>

    <Variant title="BaseResizable">
      <div class="p-6 bg-background rounded-lg border h-[300px] flex items-center justify-center">
        <BaseResizable direction="both" class="flex items-center justify-center p-6 bg-muted/50 border w-[200px] h-[150px]">
          <span class="font-semibold select-none text-center text-sm text-muted-foreground">Drag bottom-right corner to resize</span>
        </BaseResizable>
      </div>
    </Variant>
  </Story>
</template>
