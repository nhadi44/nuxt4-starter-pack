import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MultiSelect from '../MultiSelect.vue'

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

describe('MultiSelect', () => {
  it('renders placeholder when empty array', () => {
    const wrapper = mount(MultiSelect, {
      props: {
        placeholder: 'Select multiple',
        modelValue: [],
      },
    })
    expect(wrapper.find('button').text()).toContain('Select multiple')
    wrapper.unmount()
  })

  it('renders badges for selected options', () => {
    const wrapper = mount(MultiSelect, {
      props: {
        options: mockOptions,
        modelValue: ['apple', 'cherry'],
      },
    })
    
    const text = wrapper.find('button').text()
    expect(text).toContain('Apple')
    expect(text).toContain('Cherry')
    expect(text).not.toContain('Banana')
    wrapper.unmount()
  })
})
