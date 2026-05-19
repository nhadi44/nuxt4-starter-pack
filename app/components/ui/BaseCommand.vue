<script setup lang="ts">
import { ref, computed } from 'vue'
import { Search } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'

interface CommandItem {
  id: string
  title: string
  icon?: any
  shortcut?: string[]
}

interface Props {
  modelValue?: boolean
  items: CommandItem[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'select', val: CommandItem): void
}>()

const isOpen = computed({
  get: () => props.modelValue ?? false,
  set: (val) => emit('update:modelValue', val)
})

const query = ref('')

const filteredItems = computed(() => {
  if (!query.value) return props.items
  return props.items.filter(item => item.title.toLowerCase().includes(query.value.toLowerCase()))
})

function onSelect(item: CommandItem) {
  emit('select', item)
  isOpen.value = false
  query.value = ''
}
</script>

<template>
  <BaseModal v-model="isOpen" :show-close="false">
    <div class="-mx-6 -mt-6">
      <div class="flex items-center border-b px-3">
        <Search class="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          v-model="query"
          class="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Type a command or search..."
        />
      </div>
      <div class="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scrollbar-thin scrollbar-thumb-border">
        <div v-if="filteredItems.length === 0" class="py-6 text-center text-sm text-muted-foreground">
          No results found.
        </div>
        <button
          v-for="item in filteredItems"
          :key="item.id"
          @click="onSelect(item)"
          class="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 transition-colors"
        >
          <component v-if="item.icon" :is="item.icon" class="mr-2 h-4 w-4" />
          <span>{{ item.title }}</span>
          <div v-if="item.shortcut" class="ml-auto flex gap-1">
            <kbd v-for="key in item.shortcut" :key="key" class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
              {{ key }}
            </kbd>
          </div>
        </button>
      </div>
    </div>
  </BaseModal>
</template>
