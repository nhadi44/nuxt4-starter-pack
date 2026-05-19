<script setup lang="ts">
  import { ref, computed, useId } from 'vue'
  import { Check, ChevronsUpDown, X } from 'lucide-vue-next'
  import { cn } from '~/utils/cn'
  import BasePopover from './BasePopover.vue'
  import BaseBadge from './BaseBadge.vue'
  import SearchInput from './SearchInput.vue'
  import { useOptionFiltering } from '../../composables/useOptionFiltering'

  interface Option {
    label: string
    value: string | number
    [key: string]: any
  }

  interface Props {
    modelValue?: (string | number)[]
    options?: Option[]
    placeholder?: string
    searchPlaceholder?: string
    disabled?: boolean
    error?: string
    label?: string
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: () => [],
    options: () => [],
    placeholder: 'Select items...',
    searchPlaceholder: 'Search...',
    disabled: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: (string | number)[]): void
  }>()

  const inputId = props.id || useId()
  const isOpen = ref(false)
  const searchQuery = ref('')

  const filteredOptions = useOptionFiltering(computed(() => props.options), searchQuery, 'label')

  function toggleOption(value: string | number) {
    const current = [...props.modelValue]
    const idx = current.indexOf(value)
    if (idx === -1) {
      current.push(value)
    } else {
      current.splice(idx, 1)
    }
    emit('update:modelValue', current)
  }

  function removeOption(value: string | number) {
    if (props.disabled) return
    const current = [...props.modelValue]
    const idx = current.indexOf(value)
    if (idx !== -1) {
      current.splice(idx, 1)
      emit('update:modelValue', current)
    }
  }

  const selectedOptions = computed(() => {
    return props.modelValue.map(val => props.options.find(opt => opt.value === val)).filter(Boolean) as Option[]
  })
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="inputId" class="text-xs font-semibold text-foreground/80">
      {{ label }}
    </label>

    <BasePopover v-model="isOpen">
      <template #trigger>
        <button
          :id="inputId"
          type="button"
          :disabled="disabled"
          role="combobox"
          :aria-expanded="isOpen"
          :class="
            cn(
              'flex min-h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-destructive focus-visible:ring-destructive',
              $attrs.class as string
            )
          "
        >
          <div class="flex flex-wrap gap-1 items-center flex-1 pr-2">
            <template v-if="selectedOptions.length > 0">
              <BaseBadge
                v-for="opt in selectedOptions"
                :key="opt.value"
                variant="secondary"
                class="px-1.5 py-0 text-[11px] font-normal"
              >
                {{ opt.label }}
                <X
                  class="ml-1 h-3 w-3 cursor-pointer text-muted-foreground hover:text-foreground"
                  @click.stop="removeOption(opt.value)"
                />
              </BaseBadge>
            </template>
            <span v-else class="text-muted-foreground">{{ placeholder }}</span>
          </div>
          <ChevronsUpDown class="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </template>

      <div class="w-full min-w-[200px] flex flex-col max-h-[300px]">
        <div class="p-2 border-b">
          <SearchInput
            v-model="searchQuery"
            :placeholder="searchPlaceholder"
            class="h-8"
          />
        </div>
        <div class="overflow-y-auto p-1 flex-1">
          <div
            v-if="filteredOptions.length === 0"
            class="py-6 text-center text-sm text-muted-foreground"
          >
            No results found.
          </div>
          <div
            v-for="option in filteredOptions"
            :key="option.value"
            @click="toggleOption(option.value)"
            :class="
              cn(
                'relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground',
                modelValue.includes(option.value) && 'bg-accent/50 text-accent-foreground'
              )
            "
          >
            <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
              <Check v-if="modelValue.includes(option.value)" class="h-4 w-4" />
            </span>
            {{ option.label }}
          </div>
        </div>
      </div>
    </BasePopover>

    <span v-if="error" class="text-[11px] font-medium text-destructive mt-0.5">
      {{ error }}
    </span>
  </div>
</template>
