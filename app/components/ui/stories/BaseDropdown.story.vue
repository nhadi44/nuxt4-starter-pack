<script setup lang="ts">
  import { ref } from 'vue'
  import { User, Settings, ShieldAlert, Trash2, ExternalLink } from 'lucide-vue-next'
  import BaseDropdown from '../BaseDropdown.vue'

  const selectedAction = ref<string | number>('')

  const menuItems = [
    { label: 'View Profile', value: 'profile', icon: User },
    { label: 'System Configuration', value: 'config', icon: Settings },
    { label: 'Security Protocols', value: 'security', icon: ShieldAlert, disabled: true },
    { label: 'Open Logs', value: 'logs', icon: ExternalLink },
    { label: 'Purge Credentials', value: 'purge', icon: Trash2, destructive: true }
  ]

  function onSelect(val: string | number) {
    selectedAction.value = val
  }
</script>

<template>
  <Story title="Overlay / BaseDropdown" :layout="{ type: 'grid', width: '350px' }">
    <Variant title="Standard Actions">
      <div class="p-12 bg-background border rounded-lg flex flex-col items-center justify-center gap-4 min-h-[220px]">
        <BaseDropdown :items="menuItems" align="center" @select="onSelect">
          Options Menu
        </BaseDropdown>

        <p class="text-xs text-muted-foreground mt-4">
          Last Selected Action: <span class="font-bold font-mono text-primary">{{ selectedAction || 'None' }}</span>
        </p>
      </div>
    </Variant>

    <Variant title="Alignment Showcase">
      <div class="p-12 bg-background border rounded-lg flex justify-between items-center gap-2 min-h-[220px]">
        <BaseDropdown :items="menuItems" align="start">
          Align Start
        </BaseDropdown>

        <BaseDropdown :items="menuItems" align="end">
          Align End
        </BaseDropdown>
      </div>
    </Variant>
  </Story>
</template>
