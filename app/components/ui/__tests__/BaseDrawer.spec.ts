import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseDrawer from '../BaseDrawer.vue'

describe('BaseDrawer', () => {
  it('does not render content when modelValue is false', () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        modelValue: false,
        title: 'Drawer Title',
      },
    })
    expect(document.body.innerHTML).not.toContain('Drawer Title')
    wrapper.unmount()
  })

  it('renders title, description and content when open', async () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        modelValue: true,
        title: 'User Profile Settings',
        description: 'Edit your details below',
      },
      slots: {
        default: '<div id="drawer-inner">Inner Drawer Data</div>',
      },
    })

    await nextTick()
    
    expect(document.body.innerHTML).toContain('User Profile Settings')
    expect(document.body.innerHTML).toContain('Edit your details below')
    expect(document.body.innerHTML).toContain('Inner Drawer Data')
    wrapper.unmount()
  })

  it('emits close event when close button is clicked', async () => {
    const wrapper = mount(BaseDrawer, {
      props: {
        modelValue: true,
        title: 'Close Drawer Test',
      },
    })

    await nextTick()
    
    const closeBtn = document.querySelector('button[type="button"]')
    expect(closeBtn).not.toBeNull()
    
    if (closeBtn) {
      await closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted()).toHaveProperty('close')
    wrapper.unmount()
  })
})
