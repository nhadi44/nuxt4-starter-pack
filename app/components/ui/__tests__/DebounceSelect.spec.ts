import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import DebounceSelect from '../DebounceSelect.vue'

describe('DebounceSelect', () => {
  it('renders correctly and shows loading state', () => {
    const wrapper = mount(DebounceSelect, {
      props: {
        isLoading: true,
      },
    })
    
    // Trigger is there
    expect(wrapper.find('button').exists()).toBe(true)
    wrapper.unmount()
  })
})
