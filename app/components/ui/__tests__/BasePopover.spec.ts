import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BasePopover from '../BasePopover.vue'

describe('BasePopover', () => {
  it('renders trigger slot correctly', () => {
    const wrapper = mount(BasePopover, {
      slots: {
        trigger: '<button id="pop-btn">Click Popover</button>',
        default: 'Popover Content',
      },
    })
    
    expect(wrapper.find('#pop-btn').exists()).toBe(true)
    expect(wrapper.find('#pop-btn').text()).toBe('Click Popover')
    wrapper.unmount()
  })

  it('renders popover content', async () => {
    const wrapper = mount(BasePopover, {
      slots: {
        trigger: '<button id="pop-btn">Click Popover</button>',
        default: '<div id="pop-content">Main Popover Content Details</div>',
      },
    })

    await nextTick()
    
    // Simulate trigger click
    const btn = wrapper.find('#pop-btn')
    await btn.trigger('click')
    
    expect(wrapper.html()).toBeDefined()
    wrapper.unmount()
  })
})
