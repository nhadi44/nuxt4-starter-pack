<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import {
    TrendingUp,
    Activity,
    Cpu,
    Clock,
    Sparkles,
    UserCheck,
    LogOut,
    BellRing,
  } from 'lucide-vue-next'
  import { useAuthStore } from '../stores/auth.store'
  import { userRepository } from '../../repositories/user.repository'
  import type { User } from '../../types/user.type'

  const authStore = useAuthStore()

  // State
  const stats = ref([
    {
      label: 'Active Users',
      value: '3,842',
      change: '+12%',
      icon: UserCheck,
      desc: 'vs last month',
    },
    {
      label: 'API Success Rate',
      value: '99.98%',
      change: 'Stable',
      icon: Activity,
      desc: 'healthy',
    },
    { label: 'CPU Usage', value: '24.8%', change: '-3%', icon: Cpu, desc: 'optimal load' },
    {
      label: 'Response Latency',
      value: '112ms',
      change: '-14ms',
      icon: Clock,
      desc: 'excellent speed',
    },
  ])

  const users = ref<User[]>([])
  const loadingUsers = ref(false)
  const toastShow = ref(false)
  const toastMsg = ref('')
  const toastVariant = ref<'default' | 'success' | 'info'>('default')

  onMounted(async () => {
    // Simulate active session login if not done yet
    if (!authStore.isAuthenticated) {
      await authStore.login('hadi@example.com', 'Hadi')
    }

    await fetchUsers()
  })

  async function fetchUsers() {
    loadingUsers.value = true
    try {
      users.value = await userRepository.getUsers()
    } catch (err) {
      console.error(err)
    } finally {
      loadingUsers.value = false
    }
  }

  function triggerToast(variant: 'default' | 'success' | 'info', message: string) {
    toastVariant.value = variant
    toastMsg.value = message
    toastShow.value = true
  }

  function handleLogout() {
    authStore.logout()
    triggerToast('info', 'Logged out of mock session successfully')
  }

  async function handleLogin() {
    await authStore.login('hadi@example.com', 'Hadi')
    triggerToast('success', 'Logged in as Hadi successfully')
    await fetchUsers()
  }
</script>

<template>
  <div class="space-y-8 animate-in fade-in-50 duration-300">
    <!-- Welcome Header banner -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-primary/10 via-secondary/20 to-transparent p-6 rounded-2xl border border-border/50"
    >
      <div class="space-y-1">
        <h1 class="text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <span>Welcome back,</span>
          <span class="text-primary font-black">{{ authStore.user?.name || 'Developer' }}</span>
          <Sparkles class="h-5 w-5 text-amber-500 fill-amber-500 animate-pulse" />
        </h1>
        <p class="text-xs text-muted-foreground">
          Your enterprise Nuxt 4 template is fully primed and running. All baseline metrics are
          green.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <BaseButton
          v-if="authStore.isAuthenticated"
          variant="outline"
          size="sm"
          class="bg-background"
          @click="handleLogout"
        >
          <LogOut class="h-4 w-4 mr-1.5" /> Log Out
        </BaseButton>
        <BaseButton v-else variant="default" size="sm" @click="handleLogin">
          <UserCheck class="h-4 w-4 mr-1.5" /> Log In Mock
        </BaseButton>
      </div>
    </div>

    <!-- Alert Notifications -->
    <BaseAlert
      variant="info"
      title="System Status Check"
      description="Histoire stories successfully compiled. TypeScript typings generated in .nuxt/. Vitest completed with 10 passed tests."
    />

    <!-- Stats Cards Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <BaseCard
        v-for="stat in stats"
        :key="stat.label"
        class="hover:shadow-md hover:border-primary/20 transition-all duration-300 relative overflow-hidden group"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{{
            stat.label
          }}</span>
          <component
            :is="stat.icon"
            class="h-4 w-4 text-muted-foreground/70 group-hover:text-primary transition-colors"
          />
        </div>
        <div class="mt-2.5 flex items-baseline gap-2">
          <span class="text-2xl font-black tracking-tight">{{ stat.value }}</span>
          <span
            :class="
              cn(
                'text-[10px] font-bold px-1.5 py-0.5 rounded-full',
                stat.change.startsWith('+') || stat.change === 'Stable'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'bg-destructive/10 text-destructive'
              )
            "
          >
            {{ stat.change }}
          </span>
        </div>
        <p class="text-[10px] text-muted-foreground mt-1 select-none">{{ stat.desc }}</p>
      </BaseCard>
    </div>

    <!-- Main Section Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Users list -->
      <BaseCard
        title="Active CRM Profiles"
        description="A list of loaded users in the current local repository database."
        class="lg:col-span-2 shadow-sm"
      >
        <div v-if="loadingUsers" class="py-12 flex justify-center">
          <BaseSpinner size="lg" />
        </div>
        <div v-else-if="users.length === 0" class="py-6">
          <EmptyState />
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div
            v-for="user in users"
            :key="user.id"
            class="flex items-center gap-3.5 p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <BaseAvatar :src="user.avatar" :alt="user.name" />
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-xs truncate">{{ user.name }}</h4>
              <p class="text-[10px] text-muted-foreground truncate">{{ user.email }}</p>
            </div>
            <BaseBadge variant="secondary">{{ user.role || 'Member' }}</BaseBadge>
          </div>
        </div>
      </BaseCard>

      <!-- Sandbox quick actions panel -->
      <BaseCard
        title="Interactive Sandbox"
        description="Verify template widgets dynamically."
        class="shadow-sm"
      >
        <div class="flex flex-col gap-3 mt-4">
          <BaseButton
            variant="outline"
            class="w-full text-xs"
            @click="triggerToast('success', 'Database connection successfully simulated!')"
          >
            <BellRing class="h-3.5 w-3.5 mr-1.5" /> Toast Success Banner
          </BaseButton>
          <BaseButton
            variant="outline"
            class="w-full text-xs"
            @click="triggerToast('info', 'There are no background operations active at this time.')"
          >
            <Activity class="h-3.5 w-3.5 mr-1.5" /> Toast Info Banner
          </BaseButton>

          <div class="border-t border-border/80 pt-4 mt-2">
            <h4 class="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3">
              Live States Verification
            </h4>
            <div class="flex items-center justify-between p-3 rounded-lg border bg-muted/20">
              <span class="text-xs">Database Connection</span>
              <BaseBadge variant="default">Connected</BaseBadge>
            </div>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Active dynamic toast alerts -->
    <BaseToast
      v-model="toastShow"
      :variant="toastVariant"
      title="Dynamic Alert triggered"
      :description="toastMsg"
    />
  </div>
</template>
