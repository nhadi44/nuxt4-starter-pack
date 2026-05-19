<script setup lang="ts">
  import { ref } from 'vue'
  import { Command, Calculator, Calendar, Smile, Settings, User } from 'lucide-vue-next'
  import BaseAspectRatio from '../BaseAspectRatio.vue'
  import BaseKbd from '../BaseKbd.vue'
  import BaseHoverCard from '../BaseHoverCard.vue'
  import BaseContextMenu from '../BaseContextMenu.vue'
  import BaseContextMenuItem from '../BaseContextMenuItem.vue'
  import BaseCarousel from '../BaseCarousel.vue'
  import BaseCarouselItem from '../BaseCarouselItem.vue'
  import BaseCommand from '../BaseCommand.vue'
  import BaseButton from '../BaseButton.vue'
  import BaseAvatar from '../BaseAvatar.vue'

  const commandOpen = ref(false)
  const commandItems = [
    { id: '1', title: 'Calendar', icon: Calendar, shortcut: ['⌘', 'C'] },
    { id: '2', title: 'Search Emoji', icon: Smile },
    { id: '3', title: 'Calculator', icon: Calculator },
    { id: '4', title: 'Profile', icon: User, shortcut: ['⌘', 'P'] },
    { id: '5', title: 'Settings', icon: Settings, shortcut: ['⌘', 'S'] }
  ]
</script>

<template>
  <Story title="Overlays & Displays / Advanced" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="BaseCommand (Palette)">
      <div class="p-6 bg-background rounded-lg border h-[200px] flex items-center justify-center">
        <div class="text-center space-y-4">
          <p class="text-sm text-muted-foreground">Press <BaseKbd>⌘</BaseKbd> + <BaseKbd>K</BaseKbd> to open the command palette.</p>
          <BaseButton @click="commandOpen = true">Open Command Palette</BaseButton>
        </div>
        <BaseCommand v-model="commandOpen" :items="commandItems" @select="console.log" />
      </div>
    </Variant>

    <Variant title="BaseContextMenu">
      <div class="p-6 bg-background rounded-lg border h-[300px] flex items-center justify-center">
        <BaseContextMenu>
          <template #trigger>
            <div class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
              Right click here
            </div>
          </template>
          <BaseContextMenuItem>Back</BaseContextMenuItem>
          <BaseContextMenuItem>Forward</BaseContextMenuItem>
          <BaseContextMenuItem>Reload</BaseContextMenuItem>
          <div class="h-px bg-border my-1"></div>
          <BaseContextMenuItem>Save As...</BaseContextMenuItem>
          <BaseContextMenuItem>Print...</BaseContextMenuItem>
        </BaseContextMenu>
      </div>
    </Variant>

    <Variant title="BaseHoverCard">
      <div class="p-6 bg-background rounded-lg border h-[200px] flex items-center justify-center">
        <BaseHoverCard>
          <template #trigger>
            <span class="text-sm font-semibold hover:underline cursor-pointer">@nuxt/ui</span>
          </template>
          <div class="flex justify-between space-x-4">
            <BaseAvatar src="https://github.com/nuxt.png" fallback="N" />
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">@nuxt/ui</h4>
              <p class="text-sm">The Intuitive Vue Framework.</p>
              <div class="flex items-center pt-2">
                <Calendar class="mr-2 h-4 w-4 opacity-70" />
                <span class="text-xs text-muted-foreground">Joined December 2021</span>
              </div>
            </div>
          </div>
        </BaseHoverCard>
      </div>
    </Variant>

    <Variant title="BaseAspectRatio & Carousel">
      <div class="p-6 bg-background rounded-lg border flex gap-6">
        <div class="w-1/3">
          <BaseAspectRatio :ratio="16 / 9" class="bg-muted rounded-md flex items-center justify-center">
            <span class="text-sm text-muted-foreground">16:9 Aspect Ratio</span>
          </BaseAspectRatio>
        </div>
        <div class="w-2/3">
          <BaseCarousel>
            <BaseCarouselItem v-for="i in 5" :key="i" class="basis-1/2">
              <div class="p-1">
                <BaseAspectRatio :ratio="1" class="bg-muted rounded-md flex items-center justify-center border">
                  <span class="text-xl font-semibold">{{ i }}</span>
                </BaseAspectRatio>
              </div>
            </BaseCarouselItem>
          </BaseCarousel>
        </div>
      </div>
    </Variant>
  </Story>
</template>
