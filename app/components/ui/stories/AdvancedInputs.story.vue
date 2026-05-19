<script setup lang="ts">
  import { ref } from 'vue'
  import { Search, Mail } from 'lucide-vue-next'
  import BaseCalendar from '../BaseCalendar.vue'
  import BaseDatePicker from '../BaseDatePicker.vue'
  import BaseInputOTP from '../BaseInputOTP.vue'
  import BaseInputGroup from '../BaseInputGroup.vue'
  import BaseInput from '../BaseInput.vue'
  import BaseToggle from '../BaseToggle.vue'
  import BaseToggleGroup from '../BaseToggleGroup.vue'
  import BaseToggleGroupItem from '../BaseToggleGroupItem.vue'
  import BaseSlider from '../BaseSlider.vue'

  const date1 = ref<Date>()
  const date2 = ref<Date>()
  const otpValue = ref('')
  const toggleValue = ref(false)
  const singleToggle = ref('')
  const multiToggle = ref<string[]>([])
  const sliderValue = ref(50)
</script>

<template>
  <Story title="Forms & Inputs / Advanced" :layout="{ type: 'grid', width: '600px' }">
    <Variant title="BaseDatePicker & Calendar">
      <div class="p-6 bg-background rounded-lg border flex gap-4 h-[400px]">
        <div class="flex flex-col gap-2 w-[250px]">
          <label class="text-sm font-medium">Date Picker Popover</label>
          <BaseDatePicker v-model="date1" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Standalone Calendar</label>
          <BaseCalendar v-model="date2" />
        </div>
      </div>
    </Variant>

    <Variant title="BaseInputOTP">
      <div class="p-6 bg-background rounded-lg border flex flex-col gap-4">
        <label class="text-sm font-medium">One-Time Password</label>
        <BaseInputOTP v-model="otpValue" :length="6" />
        <div class="text-xs text-muted-foreground">Value: {{ otpValue }}</div>
      </div>
    </Variant>

    <Variant title="BaseInputGroup">
      <div class="p-6 bg-background rounded-lg border flex flex-col gap-4">
        <BaseInputGroup>
          <template #prepend>
            <Search class="h-4 w-4" />
          </template>
          <BaseInput class="pl-10" placeholder="Search..." />
        </BaseInputGroup>
        
        <BaseInputGroup>
          <BaseInput class="pr-10" placeholder="Email address" />
          <template #append>
            <Mail class="h-4 w-4" />
          </template>
        </BaseInputGroup>
      </div>
    </Variant>

    <Variant title="BaseToggle & ToggleGroup">
      <div class="p-6 bg-background rounded-lg border flex flex-col gap-6">
        <div class="flex items-center gap-4">
          <BaseToggle v-model="toggleValue">Bold</BaseToggle>
          <span class="text-sm text-muted-foreground">State: {{ toggleValue }}</span>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Single Select Group</label>
          <BaseToggleGroup type="single" v-model="singleToggle">
            <BaseToggleGroupItem value="left">Left</BaseToggleGroupItem>
            <BaseToggleGroupItem value="center">Center</BaseToggleGroupItem>
            <BaseToggleGroupItem value="right">Right</BaseToggleGroupItem>
          </BaseToggleGroup>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-sm font-medium">Multi Select Group</label>
          <BaseToggleGroup type="multiple" v-model="multiToggle">
            <BaseToggleGroupItem value="bold">B</BaseToggleGroupItem>
            <BaseToggleGroupItem value="italic">I</BaseToggleGroupItem>
            <BaseToggleGroupItem value="underline">U</BaseToggleGroupItem>
          </BaseToggleGroup>
        </div>
      </div>
    </Variant>

    <Variant title="BaseSlider">
      <div class="p-6 bg-background rounded-lg border flex flex-col gap-4">
        <BaseSlider v-model="sliderValue" :min="0" :max="100" />
        <div class="text-sm text-muted-foreground">Value: {{ sliderValue }}</div>
      </div>
    </Variant>
  </Story>
</template>
