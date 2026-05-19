<script setup lang="ts">
  import { ref } from 'vue'
  import BaseModal from '../BaseModal.vue'
  import BaseButton from '../BaseButton.vue'

  const isOpen1 = ref(false)
  const isOpen2 = ref(false)
  const isOpen3 = ref(false)
</script>

<template>
  <Story title="Overlay / BaseModal" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Basic Modal">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen1 = true">Open Standard Modal</BaseButton>

        <BaseModal
          v-model="isOpen1"
          title="Delete Confirmation"
          description="Are you absolutely sure you want to delete this resource? This action cannot be undone."
        >
          <div class="py-4 text-sm">
            <p class="text-muted-foreground">All stored data corresponding to this user account will be permanently wiped from our server clusters.</p>
          </div>
          <div class="flex justify-end gap-3">
            <BaseButton variant="outline" @click="isOpen1 = false">Cancel</BaseButton>
            <BaseButton variant="destructive" @click="isOpen1 = false">Confirm Delete</BaseButton>
          </div>
        </BaseModal>
      </div>
    </Variant>

    <Variant title="Custom Header Slots">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen2 = true">Open Custom Header Modal</BaseButton>

        <BaseModal v-model="isOpen2">
          <template #title>
            <div class="flex items-center gap-2 text-indigo-500">
              <span>🚀</span>
              <span>Advanced Features Unlocked</span>
            </div>
          </template>
          <template #description>
            <span class="text-indigo-400/80 font-medium">Exclusive early-access features for beta developers.</span>
          </template>

          <div class="py-4 space-y-3">
            <div class="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-xs text-indigo-400">
              You now have access to multi-region server scaling and automated Docker image deploys!
            </div>
          </div>
          <div class="flex justify-end">
            <BaseButton @click="isOpen2 = false">Let's Go!</BaseButton>
          </div>
        </BaseModal>
      </div>
    </Variant>

    <Variant title="No Outside Click Close">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen3 = true">Open Locked Modal</BaseButton>

        <BaseModal
          v-model="isOpen3"
          :close-on-outside-click="false"
          title="Important Agreement"
          description="Please review and confirm to proceed."
        >
          <div class="py-4 text-xs text-muted-foreground leading-relaxed">
            By clicking agree, you acknowledge that clicking outside of this dialog window will not close it. You must explicitly choose an action below to dismiss.
          </div>
          <div class="flex justify-end gap-2">
            <BaseButton variant="ghost" @click="isOpen3 = false">Decline</BaseButton>
            <BaseButton @click="isOpen3 = false">Agree & Continue</BaseButton>
          </div>
        </BaseModal>
      </div>
    </Variant>
  </Story>
</template>
