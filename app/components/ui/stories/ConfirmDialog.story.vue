<script setup lang="ts">
  import { ref } from 'vue'
  import ConfirmDialog from '../ConfirmDialog.vue'
  import BaseButton from '../BaseButton.vue'

  const isOpen1 = ref(false)
  const isOpen2 = ref(false)
  const isOpen3 = ref(false)
  const isPending = ref(false)

  function onConfirm3() {
    isPending.value = true
    setTimeout(() => {
      isPending.value = false
      isOpen3.value = false
    }, 2000)
  }
</script>

<template>
  <Story title="Overlay / ConfirmDialog" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Standard Confirm">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen1 = true">Trigger Dialog</BaseButton>

        <ConfirmDialog
          v-model="isOpen1"
          title="Save Changes?"
          description="Do you want to save draft revisions before signing off?"
          confirm-text="Save draft"
          cancel-text="Discard"
          @confirm="isOpen1 = false"
        />
      </div>
    </Variant>

    <Variant title="Destructive Variant">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton variant="destructive" @click="isOpen2 = true">Confirm Deletion</BaseButton>

        <ConfirmDialog
          v-model="isOpen2"
          variant="destructive"
          title="Permanently Delete Project?"
          description="This will clear all local cache partitions. Recovery is not possible."
          confirm-text="Delete Forever"
          cancel-text="Cancel"
          @confirm="isOpen2 = false"
        />
      </div>
    </Variant>

    <Variant title="Async / Loading State">
      <div class="p-6 bg-background border rounded-lg flex flex-col items-center justify-center min-h-[150px]">
        <BaseButton @click="isOpen3 = true">Slow Operation</BaseButton>

        <ConfirmDialog
          v-model="isOpen3"
          :loading="isPending"
          title="Migrate Databases"
          description="This triggers cloud synchronization routines. Outside click is locked while active."
          confirm-text="Synchronize"
          @confirm="onConfirm3"
        />
      </div>
    </Variant>
  </Story>
</template>
