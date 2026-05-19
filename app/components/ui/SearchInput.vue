<script setup lang="ts">
  import { useId, ref, nextTick } from 'vue'
  import { Search, X, Loader2 } from 'lucide-vue-next'
  import { cn } from '~/utils/cn'

  interface Props {
    modelValue?: string | number
    placeholder?: string
    disabled?: boolean
    loading?: boolean
    id?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: 'Search...',
    disabled: false,
    loading: false,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'clear'): void
  }>()

  const inputId = props.id || useId()
  const inputRef = ref<HTMLInputElement | null>(null)

  function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
  }

  async function onClear() {
    emit('update:modelValue', '')
    emit('clear')
    await nextTick()
    inputRef.value?.focus()
  }
</script>

<template>
  <div :class="cn('relative w-full', $attrs.class as string)">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <Search class="h-4 w-4 text-muted-foreground" />
    </div>

    <input
      :id="inputId"
      ref="inputRef"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="onInput"
      class="flex h-9 w-full rounded-md border border-input bg-transparent py-1 pl-9 pr-9 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
    />

    <div
      v-if="loading"
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
    >
      <Loader2 class="h-4 w-4 text-muted-foreground animate-spin" />
    </div>
    <div
      v-else-if="String(modelValue).length > 0 && !disabled"
      class="absolute inset-y-0 right-0 flex items-center pr-2"
    >
      <button
        type="button"
        tabindex="-1"
        aria-label="Clear search"
        @click="onClear"
        class="flex h-5 w-5 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      >
        <X class="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
</template>
