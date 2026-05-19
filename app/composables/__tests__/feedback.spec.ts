import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useToast } from '../useToast'
import { useLoading } from '../useLoading'

describe('Feedback Composables', () => {
  beforeEach(() => {
    const { toasts } = useToast()
    toasts.value = []
  })

  describe('useToast', () => {
    it('adds and removes toasts', () => {
      const { toasts, success, removeToast } = useToast()
      
      const id = success('Test Toast', 'Description')
      expect(toasts.value).toHaveLength(1)
      expect(toasts.value[0]!.title).toBe('Test Toast')
      
      removeToast(id)
      expect(toasts.value).toHaveLength(0)
    })
  })

  describe('useLoading', () => {
    it('starts and stops loading state', () => {
      const { isLoading, start, stop } = useLoading()
      
      expect(isLoading.value).toBe(false)
      start()
      expect(isLoading.value).toBe(true)
      stop()
      expect(isLoading.value).toBe(false)
    })
    
    it('wraps a promise correctly', async () => {
      const { isLoading, wrap } = useLoading()
      
      const promise = new Promise((resolve) => setTimeout(() => resolve('done'), 10))
      const wrapPromise = wrap(promise)
      
      expect(isLoading.value).toBe(true)
      const result = await wrapPromise
      expect(result).toBe('done')
      expect(isLoading.value).toBe(false)
    })
  })
})
