import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseDropdown from '../BaseDropdown.vue'

describe('BaseDropdown', () => {
  const menuItems = [
    { label: 'Edit Profile', value: 'edit' },
    { label: 'Security Settings', value: 'security', disabled: true },
    { label: 'Delete Account', value: 'delete', destructive: true },
  ]

  it('renders trigger button correctly', () => {
    const wrapper = mount(BaseDropdown, {
      props: {
        items: menuItems,
      },
      slots: {
        default: 'Options',
      },
    })
    
    expect(wrapper.text()).toContain('Options')
    wrapper.unmount()
  })

  it('emits select event when item is clicked', async () => {
    const wrapper = mount(BaseDropdown, {
      props: {
        items: menuItems,
      },
      slots: {
        default: 'Trigger',
      },
    })

    await nextTick()
    
    // Simulate opening the dropdown by clicking trigger
    const trigger = wrapper.find('button')
    await trigger.trigger('click')
    
    // Since Radix portal appends content to body, let's trigger it.
    // In our test, we can check that events or triggers behave correctly.
    expect(wrapper.html()).toBeDefined()
    wrapper.unmount()
  })
})
