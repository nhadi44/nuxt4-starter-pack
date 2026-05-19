<script setup lang="ts">
  import BaseBreadcrumb from '../BaseBreadcrumb.vue'
  import BaseSeparator from '../BaseSeparator.vue'
  import BaseCollapsible from '../BaseCollapsible.vue'
  import BaseScrollArea from '../BaseScrollArea.vue'
  import BaseNavigationMenu from '../BaseNavigationMenu.vue'
  import BaseNavigationMenuItem from '../BaseNavigationMenuItem.vue'
  import AppSidebar from '../AppSidebar.vue'
  import { Settings, Users, LayoutDashboard, Mail } from 'lucide-vue-next'
</script>

<template>
  <Story title="Layout & Navigation / Core" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="AppSidebar">
      <div class="h-[500px] border rounded-lg overflow-hidden flex bg-muted/20 relative w-full">
        <AppSidebar>
          <template #default="{ isCollapsed }">
            <div class="flex flex-col gap-2">
              <button class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-foreground">
                <LayoutDashboard class="h-4 w-4 shrink-0" />
                <span v-if="!isCollapsed">Dashboard</span>
              </button>
              <button class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-foreground">
                <Users class="h-4 w-4 shrink-0" />
                <span v-if="!isCollapsed">Customers</span>
              </button>
              <button class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-foreground">
                <Mail class="h-4 w-4 shrink-0" />
                <span v-if="!isCollapsed">Messages</span>
              </button>
            </div>
          </template>
          <template #footer="{ isCollapsed }">
            <button class="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent text-foreground">
              <Settings class="h-4 w-4 shrink-0" />
              <span v-if="!isCollapsed">Settings</span>
            </button>
          </template>
        </AppSidebar>
        <div class="flex-1 p-8">
          <BaseBreadcrumb :items="[{ label: 'App', href: '/app' }, { label: 'Customers' }]" />
          <h1 class="text-2xl font-bold mt-4">Customers</h1>
          <BaseSeparator class="my-6" />
          <p class="text-muted-foreground">Main content area goes here.</p>
        </div>
      </div>
    </Variant>

    <Variant title="BaseNavigationMenu">
      <div class="p-6 bg-background rounded-lg border h-[300px]">
        <BaseNavigationMenu>
          <BaseNavigationMenuItem id="getting-started" title="Getting Started">
            <div class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <div class="row-span-3">
                <div class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md">
                  <div class="mb-2 mt-4 text-lg font-medium">Nuxt Starter</div>
                  <p class="text-sm leading-tight text-muted-foreground">Beautifully designed components built with Radix Vue and Tailwind CSS.</p>
                </div>
              </div>
              <div class="space-y-1">
                <h4 class="text-sm font-medium leading-none">Introduction</h4>
                <p class="text-sm text-muted-foreground">Re-usable components built using Radix Vue.</p>
              </div>
            </div>
          </BaseNavigationMenuItem>
          <BaseNavigationMenuItem id="components" title="Components">
            <ul class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div class="text-sm font-medium leading-none">Alert Dialog</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">A modal dialog that interrupts the user with important content.</p>
              </li>
              <li class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                <div class="text-sm font-medium leading-none">Hover Card</div>
                <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">For sighted users to preview content available behind a link.</p>
              </li>
            </ul>
          </BaseNavigationMenuItem>
        </BaseNavigationMenu>
      </div>
    </Variant>

    <Variant title="BaseCollapsible & ScrollArea">
      <div class="p-6 bg-background rounded-lg border flex gap-6">
        <div class="w-1/2">
          <BaseCollapsible title="Advanced Configuration">
            <div class="space-y-2">
              <div class="text-sm font-mono p-2 bg-muted rounded">NODE_ENV=production</div>
              <div class="text-sm font-mono p-2 bg-muted rounded">DEBUG=false</div>
              <div class="text-sm font-mono p-2 bg-muted rounded">PORT=3000</div>
            </div>
          </BaseCollapsible>
        </div>
        <div class="w-1/2">
          <BaseScrollArea class="h-48 border rounded-md p-4">
            <h4 class="mb-4 text-sm font-medium leading-none">Jokester's Logs</h4>
            <div v-for="i in 20" :key="i" class="text-sm mb-2">
              > Log entry #{{ i }} generated successfully.
            </div>
          </BaseScrollArea>
        </div>
      </div>
    </Variant>
  </Story>
</template>
