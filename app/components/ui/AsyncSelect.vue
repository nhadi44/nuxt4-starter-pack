<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import BaseSelect from './BaseSelect.vue'

  interface Props {
    modelValue?: string | number | null
    fetchOptions: () => Promise<any[]>
    valueKey?: string
    labelKey?: string
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
    required?: boolean
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    valueKey: 'value',
    labelKey: 'label',
    placeholder: 'Select option...',
    disabled: false,
    required: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>()

  const items = ref<any[]>([])
  const isLoading = ref(false)

  async function loadOptions() {
    isLoading.value = true
    try {
      items.value = await props.fetchOptions()
    } catch (e) {
      console.error('Failed to load AsyncSelect options', e)
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    loadOptions()
  })

  function onUpdate(val: any) {
    emit('update:modelValue', val)
  }
</script>

<template>
  <div class="relative w-full">
    <BaseSelect
      :id="id"
      :model-value="modelValue"
      @update:model-value="onUpdate"
      :items="items"
      :value-key="valueKey"
      :label-key="labelKey"
      :placeholder="isLoading ? 'Loading options...' : placeholder"
      :label="label"
      :error="error"
      :disabled="disabled || isLoading"
      :required="required"
      v-bind="$attrs"
    />
  </div>
</template>
