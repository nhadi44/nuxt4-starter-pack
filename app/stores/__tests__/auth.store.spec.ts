import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth.store'

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with initial empty state', () => {
    const store = useAuthStore()
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })

  it('authenticates a user on login', async () => {
    const store = useAuthStore()
    await store.login('hadi@example.com', 'Hadi')
    expect(store.user).not.toBeNull()
    expect(store.user?.name).toBe('Hadi')
    expect(store.user?.email).toBe('hadi@example.com')
    expect(store.isAuthenticated).toBe(true)
    expect(store.token).not.toBeNull()
  })

  it('clears state on logout', async () => {
    const store = useAuthStore()
    await store.login('hadi@example.com', 'Hadi')
    expect(store.isAuthenticated).toBe(true)

    store.logout()
    expect(store.user).toBeNull()
    expect(store.token).toBeNull()
    expect(store.isAuthenticated).toBe(false)
  })
})
