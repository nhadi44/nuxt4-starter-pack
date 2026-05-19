<script setup lang="ts">
  import { LayoutDashboard, Users, Heart } from 'lucide-vue-next'
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground flex flex-col antialiased transition-colors duration-300"
  >
    <!-- Top Navigation Header -->
    <header
      class="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div class="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div
            class="h-7 w-7 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold select-none text-sm"
          >
            N
          </div>
          <span class="font-bold text-sm tracking-tight hidden sm:inline-block"
            >Nuxt Enterprise</span
          >
        </div>

        <!-- Navigation Links -->
        <nav class="flex items-center gap-4 sm:gap-6 text-sm font-semibold">
          <NuxtLink
            to="/"
            class="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="!text-foreground"
          >
            <LayoutDashboard class="h-4 w-4" />
            <span>Dashboard</span>
          </NuxtLink>
          <NuxtLink
            to="/crud"
            class="flex items-center gap-1.5 transition-colors hover:text-foreground/80 text-foreground/60"
            active-class="!text-foreground"
          >
            <Users class="h-4 w-4" />
            <span>Users CRM</span>
          </NuxtLink>
        </nav>

        <!-- Right Side controls -->
        <div class="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-1 container max-w-screen-2xl p-4 sm:p-6 md:p-8">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border/40 py-6 md:px-8 bg-card/20 select-none">
      <div
        class="container flex flex-col items-center justify-between gap-4 md:h-12 md:flex-row md:py-0 px-4"
      >
        <p class="text-center text-xs leading-loose text-muted-foreground md:text-left">
          Built with Nuxt 4, Pinia, Axios, Vitest, Histoire, and Tailwind CSS.
        </p>
        <div class="flex items-center gap-1 text-xs text-muted-foreground">
          Made with <Heart class="h-3 w-3 text-red-500 fill-red-500" /> by Antigravity
        </div>
      </div>
    </footer>
  </div>
</template>
