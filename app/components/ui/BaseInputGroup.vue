<script setup lang="ts">
</script>
<template>
  <div class="relative flex w-full items-center">
    <div v-if="$slots.prepend" class="absolute left-3 text-muted-foreground flex items-center justify-center pointer-events-none z-10">
      <slot name="prepend" />
    </div>
    <!-- Slot for BaseInput. Input should have pl-10 or pr-10 dynamically applied by user if slot is used -->
    <slot />
    <div v-if="$slots.append" class="absolute right-3 text-muted-foreground flex items-center justify-center z-10">
      <slot name="append" />
    </div>
  </div>
</template>
