import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import DebounceInput from '../DebounceInput.vue'
import BaseInput from '../BaseInput.vue'

describe('DebounceInput', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders BaseInput correctly', () => {
    const wrapper = mount(DebounceInput, {
      props: {
        placeholder: 'Enter search term...',
      },
      global: {
        components: { BaseInput },
      },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Enter search term...')
    wrapper.unmount()
  })

  it('debounces update:modelValue events', async () => {
    const wrapper = mount(DebounceInput, {
      props: {
        debounce: 300,
      },
      global: {
        components: { BaseInput },
      },
    })

    const input = wrapper.findComponent(BaseInput) as any
    
    // Trigger multiple rapid updates
    input.vm.$emit('update:modelValue', 'h')
    input.vm.$emit('update:modelValue', 'he')
    input.vm.$emit('update:modelValue', 'hel')
    input.vm.$emit('update:modelValue', 'hello')

    // At this point, no emit should have happened yet
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    // Advance time by 150ms
    vi.advanceTimersByTime(150)
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    // Advance time past the 300ms debounce
    vi.advanceTimersByTime(200)

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    // Should only emit the final value
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])

    wrapper.unmount()
  })

  it('syncs external modelValue changes down to local value', async () => {
    const wrapper = mount(DebounceInput, {
      props: {
        modelValue: 'initial',
      },
      global: {
        components: { BaseInput },
      },
    })

    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).value).toBe('initial')

    // External change
    await wrapper.setProps({ modelValue: 'external change' })
    await nextTick()

    expect((input.element as HTMLInputElement).value).toBe('external change')
    wrapper.unmount()
  })
})
