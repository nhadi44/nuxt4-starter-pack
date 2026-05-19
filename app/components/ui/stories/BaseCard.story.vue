<script setup lang="ts">
  import BaseCard from '../BaseCard.vue'
  import BaseButton from '../BaseButton.vue'
</script>

<template>
  <Story title="Base / BaseCard" :layout="{ type: 'grid', width: '400px' }">
    <Variant title="Simple Card">
      <div class="p-4 bg-background">
        <BaseCard title="Overview statistics" description="Daily active users across EMEA region.">
          <div class="h-[100px] flex items-center justify-center border-2 border-dashed rounded-md bg-muted/20">
            <span class="text-2xl font-bold">12,489</span>
          </div>
        </BaseCard>
      </div>
    </Variant>

    <Variant title="Interactive Card with Footer">
      <div class="p-4 bg-background">
        <BaseCard
          title="Account Settings"
          description="Review or update your personal account verification settings."
        >
          <div class="flex flex-col gap-2">
            <div class="flex justify-between text-sm py-1 border-b">
              <span class="text-muted-foreground">User Status:</span>
              <span class="font-medium text-emerald-500">Verified</span>
            </div>
            <div class="flex justify-between text-sm py-1 border-b">
              <span class="text-muted-foreground">Plan:</span>
              <span class="font-medium">Nuxt Pro Sandbox</span>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-end gap-2 w-full mt-2">
              <BaseButton variant="outline" size="sm">Cancel</BaseButton>
              <BaseButton size="sm">Save Changes</BaseButton>
            </div>
          </template>
        </BaseCard>
      </div>
    </Variant>
  </Story>
</template>
