import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseAspectRatio from '../BaseAspectRatio.vue'
import BaseKbd from '../BaseKbd.vue'
import BaseHoverCard from '../BaseHoverCard.vue'
import BaseContextMenu from '../BaseContextMenu.vue'
import BaseCarousel from '../BaseCarousel.vue'
import BaseCommand from '../BaseCommand.vue'

describe('Advanced Overlays Components', () => {
  describe('BaseAspectRatio', () => {
    it('applies correct padding bottom based on ratio', () => {
      const wrapper = mount(BaseAspectRatio, { props: { ratio: 16 / 9 } })
      // 100 / (16/9) = 56.25%
      expect(wrapper.attributes('style')).toContain('padding-bottom: 56.25%')
      wrapper.unmount()
    })
  })

  describe('BaseKbd', () => {
    it('renders keyboard shortcut', () => {
      const wrapper = mount(BaseKbd, { slots: { default: 'Ctrl' } })
      expect(wrapper.text()).toBe('Ctrl')
      expect(wrapper.element.tagName).toBe('KBD')
      wrapper.unmount()
    })
  })

  describe('BaseHoverCard', () => {
    it('shows content on hover', async () => {
      const wrapper = mount(BaseHoverCard, {
        slots: { trigger: '<button>Hover me</button>', default: '<div class="content">Hovered Info</div>' }
      })
      
      expect(wrapper.text()).not.toContain('Hovered Info')
      await wrapper.trigger('mouseenter')
      expect(wrapper.text()).toContain('Hovered Info')
      
      wrapper.unmount()
    })
  })

  describe('BaseContextMenu', () => {
    it('opens menu on contextmenu event', async () => {
      const wrapper = mount(BaseContextMenu, {
        slots: { trigger: '<div class="area">Right click here</div>', default: '<div class="menu">Options</div>' }
      })
      
      await wrapper.trigger('contextmenu')
      // Content is teleported to body, so we check document body
      expect(document.body.innerHTML).toContain('Options')
      
      // Clean up body
      document.body.innerHTML = ''
      wrapper.unmount()
    })
  })

  describe('BaseCarousel', () => {
    it('renders carousel slots and navigation buttons', () => {
      const wrapper = mount(BaseCarousel, {
        slots: { default: '<div class="item">Slide 1</div><div class="item">Slide 2</div>' }
      })
      expect(wrapper.text()).toContain('Slide 1')
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(2) // Left and Right chevrons
      wrapper.unmount()
    })
  })

  describe('BaseCommand', () => {
    it('filters items based on query', async () => {
      const items = [
        { id: '1', title: 'Settings' },
        { id: '2', title: 'Profile' }
      ]
      const wrapper = mount(BaseCommand, { 
        props: { modelValue: true, items }
      })
      
      // wait for modal to mount via teleport
      await new Promise(r => setTimeout(r, 100))
      
      // Content is teleported to body
      const input = document.body.querySelector('input') as HTMLInputElement
      input.value = 'set'
      input.dispatchEvent(new Event('input'))
      
      // wait for reactivity
      await new Promise(r => setTimeout(r, 100))
      
      expect(document.body.innerHTML).toContain('Settings')
      expect(document.body.innerHTML).not.toContain('Profile')
      
      wrapper.unmount()
      document.body.innerHTML = ''
    })
  })
})
