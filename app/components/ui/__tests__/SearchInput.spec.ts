import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import SearchInput from '../SearchInput.vue'

describe('SearchInput', () => {
  it('renders input field with search icon', () => {
    const wrapper = mount(SearchInput, {
      props: {
        placeholder: 'Find projects...',
      },
    })
    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Find projects...')
    // SVG icons check
    expect(wrapper.find('svg').exists()).toBe(true)
    wrapper.unmount()
  })

  it('emits update:modelValue on input change', async () => {
    const wrapper = mount(SearchInput)
    const input = wrapper.find('input')
    
    await input.setValue('alpha')
    
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['alpha'])
    wrapper.unmount()
  })

  it('shows clear button when input has value and clears it on click', async () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: 'beta',
      },
    })
    
    const clearBtn = wrapper.find('button[aria-label="Clear search"]')
    expect(clearBtn.exists()).toBe(true)
    
    await clearBtn.trigger('click')
    
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    // Should emit empty string when cleared
    const updateEvents = wrapper.emitted('update:modelValue')
    expect(updateEvents?.[updateEvents.length - 1]).toEqual([''])
    expect(wrapper.emitted()).toHaveProperty('clear')
    
    wrapper.unmount()
  })

  it('hides clear button when empty', () => {
    const wrapper = mount(SearchInput, {
      props: {
        modelValue: '',
      },
    })
    
    const clearBtn = wrapper.find('button[aria-label="Clear search"]')
    expect(clearBtn.exists()).toBe(false)
    wrapper.unmount()
  })

  it('shows loader when loading prop is true', () => {
    const wrapper = mount(SearchInput, {
      props: {
        loading: true,
        modelValue: 'query',
      },
    })
    
    // Clear button should not exist if loading
    expect(wrapper.find('button[aria-label="Clear search"]').exists()).toBe(false)
    // Loader SVG should be present
    const svgElements = wrapper.findAll('svg')
    // One for search icon, one for loader
    expect(svgElements.length).toBeGreaterThanOrEqual(2)
    expect(wrapper.html()).toContain('animate-spin')
    
    wrapper.unmount()
  })

  it('disables input when disabled prop is true', () => {
    const wrapper = mount(SearchInput, {
      props: {
        disabled: true,
        modelValue: 'query',
      },
    })
    
    const input = wrapper.find('input')
    expect((input.element as HTMLInputElement).disabled).toBe(true)
    // Clear button should not exist if disabled
    expect(wrapper.find('button[aria-label="Clear search"]').exists()).toBe(false)
    
    wrapper.unmount()
  })
})
