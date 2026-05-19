<script setup lang="ts" generic="T extends Record<string, any>">
  import { useId, ref, computed } from 'vue'
  import { Check, ChevronDown } from 'lucide-vue-next'
  import { PopoverRoot, PopoverTrigger, PopoverContent } from 'radix-vue'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: string | number | null
    items: T[]
    valueKey?: keyof T
    labelKey?: keyof T
    placeholder?: string
    label?: string
    error?: string
    disabled?: boolean
    required?: boolean
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: null,
    items: () => [],
    valueKey: 'value' as any,
    labelKey: 'label' as any,
    placeholder: 'Select option...',
    disabled: false,
    required: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: any): void
  }>()

  const selectId = props.id || useId()
  const isOpen = ref(false)

  const selectedItem = computed(() => {
    return props.items.find((item) => String(item[props.valueKey]) === String(props.modelValue))
  })

  const triggerWidth = ref('100%')
  const triggerRef = ref<any>(null)

  function onTriggerRef(el: any) {
    if (el && typeof window !== 'undefined') {
      const rect = el.$el?.getBoundingClientRect() || el.getBoundingClientRect()
      if (rect?.width) {
        triggerWidth.value = `${rect.width}px`
      }
    }
  }

  function selectItem(item: any) {
    emit('update:modelValue', item[props.valueKey])
    isOpen.value = false
  }

  function getLabel(item: any): string {
    if (!item) return ''
    return String(item[props.labelKey])
  }

  function getValue(item: any): any {
    if (!item) return ''
    return item[props.valueKey]
  }
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="selectId" class="text-xs font-semibold text-foreground/80">
      {{ label }}
      <span v-if="required" class="text-destructive ml-0.5">*</span>
    </label>

    <PopoverRoot v-model:open="isOpen">
      <PopoverTrigger
        :id="selectId"
        :ref="onTriggerRef"
        :disabled="disabled"
        :class="
          cn(
            'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-left',
            !selectedItem && 'text-muted-foreground',
            error && 'border-destructive focus:ring-destructive',
            $attrs.class as string
          )
        "
        v-bind="$attrs"
      >
        <span class="truncate">
          {{ selectedItem ? getLabel(selectedItem) : placeholder }}
        </span>
        <ChevronDown class="h-4 w-4 shrink-0 opacity-50 ml-2" />
      </PopoverTrigger>

      <PopoverContent
        :style="{ width: triggerWidth }"
        class="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-80"
        align="start"
      >
        <div class="max-h-[200px] overflow-y-auto p-1 grid gap-0.5">
          <div v-if="items.length === 0" class="py-3 text-center text-xs text-muted-foreground">
            No options available
          </div>
          <button
            v-for="item in items"
            :key="String(getValue(item))"
            type="button"
            @click="selectItem(item)"
            :class="
              cn(
                'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left',
                String(getValue(item)) === String(modelValue) && 'bg-accent/40 font-medium'
              )
            "
          >
            <span
              v-if="String(getValue(item)) === String(modelValue)"
              class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"
            >
              <Check class="h-4 w-4" />
            </span>
            <span class="truncate">{{ getLabel(item) }}</span>
          </button>
        </div>
      </PopoverContent>
    </PopoverRoot>

    <span v-if="error" class="text-[11px] font-medium text-destructive mt-0.5">
      {{ error }}
    </span>
  </div>
</template>
