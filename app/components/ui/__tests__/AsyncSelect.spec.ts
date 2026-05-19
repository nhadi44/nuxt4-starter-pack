import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import AsyncSelect from '../AsyncSelect.vue'
import BaseSelect from '../BaseSelect.vue'

describe('AsyncSelect', () => {
  const mockOptions = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ]

  it('fetches options on mount and updates BaseSelect', async () => {
    const fetchOptions = vi.fn().mockResolvedValue(mockOptions)
    
    const wrapper = mount(AsyncSelect, {
      props: {
        fetchOptions,
      },
      global: {
        components: { BaseSelect },
      },
    })

    // Wait for promise resolution
    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()

    expect(fetchOptions).toHaveBeenCalledTimes(1)
    
    const select = wrapper.findComponent(BaseSelect) as any
    expect(select.props('items')).toEqual(mockOptions)
    expect(select.props('disabled')).toBe(false)
    expect(select.props('placeholder')).toBe('Select option...')
    
    wrapper.unmount()
  })

  it('emits update:modelValue when BaseSelect updates', async () => {
    const fetchOptions = vi.fn().mockResolvedValue(mockOptions)
    
    const wrapper = mount(AsyncSelect, {
      props: {
        fetchOptions,
      },
      global: {
        components: { BaseSelect },
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
    await nextTick()

    const select = wrapper.findComponent(BaseSelect) as any
    select.vm.$emit('update:modelValue', '1')

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['1'])
    
    wrapper.unmount()
  })
})
