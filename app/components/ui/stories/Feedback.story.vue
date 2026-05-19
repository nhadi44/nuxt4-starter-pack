<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BaseButton from '../BaseButton.vue'
  import LoadingState from '../LoadingState.vue'
  import ErrorState from '../ErrorState.vue'
  import EmptyState from '../EmptyState.vue'
  import LoadingOverlay from '../LoadingOverlay.vue'
  import ProgressBar from '../ProgressBar.vue'
  import BaseToast from '../BaseToast.vue'
  import { useNotification } from '../../../composables/useNotification'

  const { notify, success, error, info, warning } = useNotification()
  const isLoading = ref(false)
  const progress = ref(0)

  onMounted(() => {
    setInterval(() => {
      progress.value = (progress.value + 10) % 110
    }, 1000)
  })

  function toggleLoading() {
    isLoading.value = true
    setTimeout(() => {
      isLoading.value = false
    }, 3000)
  }
</script>

<template>
  <Story title="Feedback / States & Notifications" :layout="{ type: 'grid', width: '500px' }">
    <Variant title="Toast Notifications">
      <div class="p-6 bg-background rounded-lg border h-[300px] flex flex-col gap-2 relative">
        <BaseButton @click="success('Profile updated!', 'Your settings have been saved.')" variant="outline">
          Show Success Toast
        </BaseButton>
        <BaseButton @click="error('Connection failed', 'Unable to reach the server.')" variant="destructive">
          Show Error Toast
        </BaseButton>
        <BaseButton @click="info('New feature available', 'Try out the new dark mode.')" variant="secondary">
          Show Info Toast
        </BaseButton>
        <BaseButton @click="warning('Storage nearly full', 'You have used 90% of your storage.')" variant="outline">
          Show Warning Toast
        </BaseButton>
        <!-- The BaseToast component acts as the global provider in this demo -->
        <BaseToast />
      </div>
    </Variant>

    <Variant title="State Components">
      <div class="p-6 bg-background rounded-lg border space-y-4 flex flex-col items-center">
        <LoadingState text="Fetching records..." />
        <ErrorState />
        <EmptyState />
      </div>
    </Variant>

    <Variant title="Loading Overlay">
      <div class="p-6 bg-background rounded-lg border h-[300px] relative overflow-hidden">
        <div class="prose dark:prose-invert">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <BaseButton @click="toggleLoading" class="mt-4">Start 3s Loading</BaseButton>
        <LoadingOverlay :is-loading="isLoading" text="Processing payment..." />
      </div>
    </Variant>

    <Variant title="ProgressBar">
      <div class="p-6 bg-background rounded-lg border flex flex-col justify-center h-32 gap-4">
        <ProgressBar :value="progress" :max="100" />
        <div class="text-xs text-muted-foreground text-center">Progress: {{ progress }}%</div>
      </div>
    </Variant>
  </Story>
</template>
