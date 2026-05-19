<script setup lang="ts">
  import BaseAlert from '../BaseAlert.vue'
</script>

<template>
  <Story title="Base / BaseAlert" :layout="{ type: 'grid', width: '400px' }">
    <Variant title="Default Info">
      <div class="p-4 bg-background">
        <BaseAlert
          title="Notification"
          description="Your profile was updated successfully. No further action is required."
        />
      </div>
    </Variant>

    <Variant title="Destructive / Error">
      <div class="p-4 bg-background">
        <BaseAlert
          variant="destructive"
          title="System Outage"
          description="There was a connection loss to the remote API. Please try again."
        />
      </div>
    </Variant>

    <Variant title="Success">
      <div class="p-4 bg-background">
        <BaseAlert
          variant="success"
          title="File Uploaded"
          description="The backup archive has been processed and saved securely."
        />
      </div>
    </Variant>

    <Variant title="Warning">
      <div class="p-4 bg-background">
        <BaseAlert
          variant="warning"
          title="Storage Limit Reached"
          description="You are currently at 92% of your total subscription quota."
        />
      </div>
    </Variant>

    <Variant title="Info Variant">
      <div class="p-4 bg-background">
        <BaseAlert
          variant="info"
          title="New Feature Available"
          description="We just added dark mode presets to our primary config dashboard!"
        />
      </div>
    </Variant>
  </Story>
</template>
