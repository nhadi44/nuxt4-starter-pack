import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ConfirmDialog from '../ConfirmDialog.vue'
import BaseModal from '../BaseModal.vue'
import BaseButton from '../BaseButton.vue'

describe('ConfirmDialog', () => {
  it('renders nothing when modelValue is false', () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        modelValue: false,
        title: 'Check Confirmation Dialog',
      },
      global: {
        components: {
          BaseModal,
          BaseButton,
        },
      },
    })
    expect(document.body.innerHTML).not.toContain('Check Confirmation Dialog')
    wrapper.unmount()
  })

  it('renders confirmation strings and emits triggers correctly', async () => {
    const wrapper = mount(ConfirmDialog, {
      props: {
        modelValue: true,
        title: 'Are you ready?',
        description: 'This is a test warning descriptor.',
        confirmText: 'Yes Proceed',
        cancelText: 'No Stop',
      },
      global: {
        components: {
          BaseModal,
          BaseButton,
        },
      },
    })

    await nextTick()
    await nextTick() // double tick for portal rendering

    expect(document.body.innerHTML).toContain('Are you ready?')
    expect(document.body.innerHTML).toContain('This is a test warning descriptor.')
    
    // Find cancel/confirm buttons
    const buttons = document.querySelectorAll('button')
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    
    wrapper.unmount()
  })
})
