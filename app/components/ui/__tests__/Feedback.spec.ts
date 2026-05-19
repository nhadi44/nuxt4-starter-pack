import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseToast from '../BaseToast.vue'
import LoadingState from '../LoadingState.vue'
import ErrorState from '../ErrorState.vue'
import EmptyState from '../EmptyState.vue'
import LoadingOverlay from '../LoadingOverlay.vue'
import ProgressBar from '../ProgressBar.vue'

describe('Feedback Components', () => {
  it('BaseToast renders without crashing', () => {
    const wrapper = mount(BaseToast)
    expect(wrapper.exists()).toBe(true)
    wrapper.unmount()
  })

  it('LoadingState renders default text', () => {
    const wrapper = mount(LoadingState)
    expect(wrapper.text()).toContain('Loading data...')
    wrapper.unmount()
  })

  it('ErrorState renders default props and emits retry', async () => {
    const wrapper = mount(ErrorState)
    expect(wrapper.text()).toContain('Something went wrong')
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('retry')).toBeTruthy()
    wrapper.unmount()
  })

  it('EmptyState renders custom props and emits action', async () => {
    const wrapper = mount(EmptyState, {
      props: {
        title: 'No logs',
        description: 'Server logs are empty.',
        actionText: 'Refresh'
      }
    })
    expect(wrapper.text()).toContain('No logs')
    
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('action')).toBeTruthy()
    wrapper.unmount()
  })

  it('LoadingOverlay renders only when isLoading is true', () => {
    const wrapperFalse = mount(LoadingOverlay, { props: { isLoading: false } })
    expect(wrapperFalse.find('.bg-background\\/80').exists()).toBe(false)
    wrapperFalse.unmount()

    const wrapperTrue = mount(LoadingOverlay, { props: { isLoading: true } })
    expect(wrapperTrue.find('.bg-background\\/80').exists()).toBe(true)
    wrapperTrue.unmount()
  })

  it('ProgressBar calculates transform correctly', () => {
    const wrapper = mount(ProgressBar, { props: { value: 50, max: 100 } })
    const innerBar = wrapper.find('div > div')
    expect(innerBar.html()).toContain('transform: translateX(-50%)')
    wrapper.unmount()
  })
})
