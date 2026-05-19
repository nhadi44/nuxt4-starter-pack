<script setup lang="ts">
  import { ref } from 'vue'

  interface Props {
    modelValue?: boolean
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
    loading?: boolean
    variant?: 'default' | 'destructive'
  }

  withDefaults(defineProps<Props>(), {
    modelValue: false,
    title: 'Are you absolute sure?',
    description: 'This action cannot be undone.',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    loading: false,
    variant: 'default',
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'confirm'): void
    (e: 'cancel'): void
  }>()

  function onConfirm() {
    emit('confirm')
  }

  function onCancel() {
    emit('cancel')
    emit('update:modelValue', false)
  }
</script>

<template>
  <BaseModal
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    :title="title"
    :description="description"
    :close-on-outside-click="!loading"
  >
    <div class="flex justify-end gap-3 mt-4">
      <BaseButton variant="outline" :disabled="loading" @click="onCancel">
        {{ cancelText }}
      </BaseButton>
      <BaseButton
        :variant="variant === 'destructive' ? 'destructive' : 'default'"
        :loading="loading"
        @click="onConfirm"
      >
        {{ confirmText }}
      </BaseButton>
    </div>
  </BaseModal>
</template>
