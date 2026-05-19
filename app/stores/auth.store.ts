import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../../types/user.type'
import { userRepository } from '../../repositories/user.repository'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => user.value !== null)
  const currentUser = computed(() => user.value)

  async function login(email: string, name: string) {
    loading.value = true
    error.value = null
    try {
      // Simulate API response
      const newUser = await userRepository.createUser({
        name,
        email,
        role: 'Admin',
      })

      user.value = newUser
      token.value = 'mock_jwt_token_' + Math.random().toString(36).substring(7)

      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', token.value)
      }
      return newUser
    } catch (err: any) {
      error.value = err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = null
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
  }

  async function fetchProfile() {
    if (!token.value && typeof window !== 'undefined') {
      token.value = localStorage.getItem('auth_token')
    }

    if (!token.value) return null

    loading.value = true
    error.value = null
    try {
      const users = await userRepository.getUsers()
      if (users.length > 0) {
        user.value = users[0] || null
      }
      return user.value
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch profile'
      logout()
      return null
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    currentUser,
    login,
    logout,
    fetchProfile,
  }
})
