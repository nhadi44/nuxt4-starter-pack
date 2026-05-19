import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseRadio from '../BaseRadio.vue'

describe('BaseRadio', () => {
  it('renders radio input and label correctly', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'option1',
        label: 'First Option',
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.exists()).toBe(true)
    expect(wrapper.text()).toBe('First Option')
    wrapper.unmount()
  })

  it('renders checkmark when value matches modelValue', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'option1',
        modelValue: 'option1',
        label: 'Selected Option',
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect((input.element as HTMLInputElement).checked).toBe(true)
    wrapper.unmount()
  })

  it('emits update:modelValue when selected', async () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'option2',
        modelValue: 'option1',
        label: 'Second Option',
      },
    })

    const input = wrapper.find('input[type="radio"]')
    await input.setValue()

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option2'])
    wrapper.unmount()
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'option1',
        disabled: true,
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
    wrapper.unmount()
  })

  it('applies error class when error is true', () => {
    const wrapper = mount(BaseRadio, {
      props: {
        value: 'option1',
        error: true,
      },
    })

    const input = wrapper.find('input[type="radio"]')
    expect(input.classes()).toContain('border-destructive')
    wrapper.unmount()
  })
})
