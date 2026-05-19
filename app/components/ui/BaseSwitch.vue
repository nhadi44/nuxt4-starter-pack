<script setup lang="ts">
  import { SwitchRoot, SwitchThumb } from 'radix-vue'
  import { useId } from 'vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: boolean
    label?: string
    disabled?: boolean
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    disabled: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const switchId = props.id || useId()

  function onCheckedChange(checked: boolean) {
    emit('update:modelValue', checked)
  }
</script>

<template>
  <div class="flex items-center gap-2">
    <SwitchRoot
      :id="switchId"
      :checked="modelValue"
      :disabled="disabled"
      @update:checked="onCheckedChange"
      :class="
        cn(
          'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
          $attrs.class as string
        )
      "
      v-bind="$attrs"
    >
      <SwitchThumb
        :class="
          cn(
            'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0'
          )
        "
      />
    </SwitchRoot>
    <label
      v-if="label || $slots.default"
      :for="switchId"
      class="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
    >
      <slot>{{ label }}</slot>
    </label>
  </div>
</template>
