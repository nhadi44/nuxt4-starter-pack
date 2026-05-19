<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useForm, useField } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as zod from 'zod'
  import { Plus, Edit2, Trash2, ShieldCheck, Mail, UserCheck } from 'lucide-vue-next'
  import { userRepository } from '../../repositories/user.repository'
  import type { User } from '../../types/user.type'

  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const isDrawerOpen = ref(false)
  const isDeleteOpen = ref(false)
  const selectedUser = ref<User | null>(null)
  const deleteLoading = ref(false)

  // Toast Alert State
  const toastShow = ref(false)
  const toastMsg = ref('')
  const toastVariant = ref<'success' | 'destructive' | 'info'>('success')

  // Form validation schema with Zod
  const userValidationSchema = zod.object({
    name: zod
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be less than 50 characters'),
    email: zod.string().min(1, 'Email is required').email('Please enter a valid email address'),
    role: zod.string().min(1, 'Please select a role'),
  })

  // Setup vee-validate form
  const { handleSubmit, resetForm, setValues, errors } = useForm({
    validationSchema: toTypedSchema(userValidationSchema),
    initialValues: {
      name: '',
      email: '',
      role: 'Member',
    },
  })

  const { value: name } = useField<string>('name')
  const { value: email } = useField<string>('email')
  const { value: role } = useField<string>('role')

  const roleOptions = [
    { value: 'Admin', label: 'Admin (System Operator)' },
    { value: 'Developer', label: 'Developer (Code Contributor)' },
    { value: 'Reviewer', label: 'Reviewer (Quality Analyst)' },
    { value: 'Member', label: 'Member (General access)' },
  ]

  // Table Column Definitions
  const columns = [
    { key: 'avatar', label: 'Profile', align: 'center' as const },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'createdAt', label: 'Created At', sortable: true },
    { key: 'actions', label: 'Actions', align: 'right' as const },
  ]

  onMounted(async () => {
    await fetchUsers()
  })

  async function fetchUsers() {
    loading.value = true
    try {
      users.value = await userRepository.getUsers()
    } catch (err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  function triggerToast(variant: 'success' | 'destructive' | 'info', message: string) {
    toastVariant.value = variant
    toastMsg.value = message
    toastShow.value = true
  }

  // Drawer Open Triggers
  function openCreateDrawer() {
    selectedUser.value = null
    resetForm({
      values: {
        name: '',
        email: '',
        role: 'Member',
      },
    })
    isDrawerOpen.value = true
  }

  function openEditDrawer(user: User) {
    selectedUser.value = user
    setValues({
      name: user.name,
      email: user.email,
      role: user.role || 'Member',
    })
    isDrawerOpen.value = true
  }

  // Form Submit (Create or Update)
  const onSubmit = handleSubmit(async (values) => {
    try {
      if (selectedUser.value) {
        // Edit mode
        await userRepository.updateUser(selectedUser.value.id, values)
        triggerToast('success', `User '${values.name}' successfully updated!`)
      } else {
        // Create mode
        await userRepository.createUser(values)
        triggerToast('success', `User '${values.name}' successfully created!`)
      }
      isDrawerOpen.value = false
      await fetchUsers()
    } catch (err: any) {
      triggerToast('destructive', err.message || 'Operation failed')
    }
  })

  // Delete flow
  function confirmDelete(user: User) {
    selectedUser.value = user
    isDeleteOpen.value = true
  }

  async function handleDelete() {
    if (!selectedUser.value) return
    deleteLoading.value = true
    try {
      await userRepository.deleteUser(selectedUser.value.id)
      triggerToast('success', 'User profile successfully deleted')
      isDeleteOpen.value = false
      await fetchUsers()
    } catch (err: any) {
      triggerToast('destructive', err.message || 'Deletion failed')
    } finally {
      deleteLoading.value = false
    }
  }
</script>

<template>
  <div class="space-y-6 animate-in fade-in-50 duration-300">
    <!-- Header Summary Block -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <h1 class="text-2xl font-black tracking-tight text-foreground">CRM User Directory</h1>
        <p class="text-xs text-muted-foreground">
          Create, edit, view, and purge user records. Changes simulate in our repository fallback
          system.
        </p>
      </div>
    </div>

    <!-- Data Table Showcase -->
    <BaseDataTable
      :columns="columns"
      :items="users"
      :loading="loading"
      search-placeholder="Filter CRM users..."
    >
      <template #actions>
        <BaseButton size="sm" class="text-xs shadow-sm" @click="openCreateDrawer">
          <Plus class="h-4 w-4 mr-1.5" /> Add New User
        </BaseButton>
      </template>

      <!-- Profile Avatar Cell -->
      <template #cell(avatar)="{ item }">
        <div class="flex justify-center">
          <BaseAvatar :src="item.avatar" :alt="item.name" size="sm" />
        </div>
      </template>

      <!-- Role Badge Cell -->
      <template #cell(role)="{ value }">
        <BaseBadge
          :variant="value === 'Admin' ? 'default' : value === 'Developer' ? 'secondary' : 'outline'"
        >
          {{ value }}
        </BaseBadge>
      </template>

      <!-- Actions Cell -->
      <template #cell(actions)="{ item }">
        <div class="flex items-center justify-end gap-2">
          <BaseButton variant="ghost" size="icon" class="h-7 w-7" @click="openEditDrawer(item)">
            <Edit2 class="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
          </BaseButton>
          <BaseButton
            variant="ghost"
            size="icon"
            class="h-7 w-7 hover:bg-destructive/15"
            @click="confirmDelete(item)"
          >
            <Trash2 class="h-3.5 w-3.5 text-destructive" />
          </BaseButton>
        </div>
      </template>
    </BaseDataTable>

    <!-- Side Form Drawer (Add/Edit) -->
    <BaseDrawer
      v-model="isDrawerOpen"
      :title="selectedUser ? 'Edit User CRM profile' : 'Create User profile'"
      description="Fill in all parameters to commit changes to the CRM database."
    >
      <form @submit.prevent="onSubmit" class="space-y-6 mt-4">
        <FormGroup :cols="1">
          <!-- Name Field -->
          <FormField label="Full Name" :error="errors.name" required>
            <template #default="{ id, error }">
              <div class="relative flex items-center">
                <UserCheck
                  class="absolute left-3 h-4 w-4 text-muted-foreground/75 pointer-events-none"
                />
                <BaseInput
                  :id="id"
                  v-model="name"
                  placeholder="Enter name..."
                  :error="error"
                  class="pl-9 bg-background"
                />
              </div>
            </template>
          </FormField>

          <!-- Email Field -->
          <FormField label="Email Address" :error="errors.email" required>
            <template #default="{ id, error }">
              <div class="relative flex items-center">
                <Mail
                  class="absolute left-3 h-4 w-4 text-muted-foreground/75 pointer-events-none"
                />
                <BaseInput
                  :id="id"
                  v-model="email"
                  placeholder="Enter email..."
                  :error="error"
                  class="pl-9 bg-background"
                />
              </div>
            </template>
          </FormField>

          <!-- Role Selection Field -->
          <FormField label="Assigned System Role" :error="errors.role" required>
            <template #default="{ id, error }">
              <div class="relative flex items-center">
                <ShieldCheck
                  class="absolute left-3 h-4 w-4 text-muted-foreground/75 pointer-events-none z-10"
                />
                <BaseSelect
                  :id="id"
                  v-model="role"
                  :items="roleOptions"
                  placeholder="Choose access level..."
                  :error="error"
                  class="pl-9 bg-background"
                />
              </div>
            </template>
          </FormField>
        </FormGroup>

        <!-- Form controls -->
        <div class="flex items-center justify-end gap-3 pt-6 border-t border-border mt-8">
          <BaseButton type="button" variant="outline" @click="isDrawerOpen = false">
            Cancel
          </BaseButton>
          <BaseButton type="submit">
            {{ selectedUser ? 'Save changes' : 'Create user' }}
          </BaseButton>
        </div>
      </form>
    </BaseDrawer>

    <!-- Delete Confirm Modal Dialogue -->
    <ConfirmDialog
      v-model="isDeleteOpen"
      title="Are you absolute sure you want to delete this profile?"
      :description="`This will purge the CRM profile record for '${selectedUser?.name}'. This action cannot be reverted.`"
      confirm-text="Purge User"
      variant="destructive"
      :loading="deleteLoading"
      @confirm="handleDelete"
    />

    <!-- Operation Toasts -->
    <BaseToast
      v-model="toastShow"
      :variant="toastVariant"
      title="CRM Operation Notice"
      :description="toastMsg"
    />
  </div>
</template>
