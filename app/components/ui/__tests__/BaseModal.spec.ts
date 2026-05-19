import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import BaseModal from '../BaseModal.vue'

describe('BaseModal', () => {
  it('does not render content when modelValue is false', () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: false,
        title: 'Test Title',
      },
    })
    // Radix DialogPortal won't append content to body if open is false
    expect(document.body.innerHTML).not.toContain('Test Title')
    wrapper.unmount()
  })

  it('renders title and slot content when open', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        title: 'Test Modal Title',
        description: 'Test Modal Description',
      },
      slots: {
        default: '<div id="modal-slot-content">Hello Modal Content</div>',
      },
    })

    await nextTick()
    
    // Check that title and content appear in the document body due to Radix Portal
    expect(document.body.innerHTML).toContain('Test Modal Title')
    expect(document.body.innerHTML).toContain('Test Modal Description')
    expect(document.body.innerHTML).toContain('Hello Modal Content')
    wrapper.unmount()
  })

  it('emits close and update:modelValue when closed', async () => {
    const wrapper = mount(BaseModal, {
      props: {
        modelValue: true,
        title: 'Close Test',
      },
    })

    await nextTick()
    
    // Find close button
    const closeBtn = document.querySelector('button[type="button"]')
    expect(closeBtn).not.toBeNull()
    
    // Trigger close click
    if (closeBtn) {
      await closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    }

    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    expect(wrapper.emitted()).toHaveProperty('close')
    wrapper.unmount()
  })
})
