import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

import BaseBreadcrumb from '../BaseBreadcrumb.vue'
import BaseSeparator from '../BaseSeparator.vue'
import BaseCollapsible from '../BaseCollapsible.vue'
import BaseScrollArea from '../BaseScrollArea.vue'
import BaseNavigationMenu from '../BaseNavigationMenu.vue'
import BaseNavigationMenuItem from '../BaseNavigationMenuItem.vue'
import AppSidebar from '../AppSidebar.vue'

describe('Layout & Navigation Components', () => {
  describe('BaseBreadcrumb', () => {
    it('renders all items correctly', () => {
      const wrapper = mount(BaseBreadcrumb, {
        props: {
          items: [{ label: 'Dashboard', href: '/dashboard' }, { label: 'Settings' }]
        }
      })
      expect(wrapper.text()).toContain('Dashboard')
      expect(wrapper.text()).toContain('Settings')
      wrapper.unmount()
    })
  })

  describe('BaseSeparator', () => {
    it('applies correct orientation classes', () => {
      const hWrapper = mount(BaseSeparator, { props: { orientation: 'horizontal' } })
      expect(hWrapper.classes()).toContain('h-[1px]')
      hWrapper.unmount()

      const vWrapper = mount(BaseSeparator, { props: { orientation: 'vertical' } })
      expect(vWrapper.classes()).toContain('w-[1px]')
      vWrapper.unmount()
    })
  })

  describe('BaseCollapsible', () => {
    it('toggles content on click', async () => {
      const wrapper = mount(BaseCollapsible, {
        props: { title: 'Advanced Settings', defaultOpen: false },
        slots: { default: '<div class="content">Hidden Text</div>' }
      })
      const button = wrapper.find('button')
      const content = wrapper.find('.overflow-hidden')
      
      expect(wrapper.text()).toContain('Advanced Settings')
      expect(content.attributes('style')).toContain('display: none')
      
      await button.trigger('click')
      expect(wrapper.emitted('update:open')).toBeTruthy()
      expect(content.attributes('style')).not.toContain('display: none')
      
      wrapper.unmount()
    })
  })

  describe('BaseScrollArea', () => {
    it('renders and applies overflow classes', () => {
      const wrapper = mount(BaseScrollArea, { props: { orientation: 'vertical' } })
      expect(wrapper.classes()).toContain('overflow-x-hidden')
      wrapper.unmount()
    })
  })

  describe('Navigation Menu', () => {
    it('renders menu and provides active state', async () => {
      const TestComponent = defineComponent({
        components: { BaseNavigationMenu, BaseNavigationMenuItem },
        template: `
          <BaseNavigationMenu>
            <BaseNavigationMenuItem id="menu1" title="Menu 1">Content 1</BaseNavigationMenuItem>
            <BaseNavigationMenuItem id="menu2" title="Menu 2">Content 2</BaseNavigationMenuItem>
          </BaseNavigationMenu>
        `
      })
      const wrapper = mount(TestComponent)
      const buttons = wrapper.findAll('button')
      expect(buttons).toHaveLength(2)
      
      await buttons[0]!.trigger('click')
      expect(wrapper.text()).toContain('Content 1')
      
      await buttons[1]!.trigger('click')
      expect(wrapper.text()).toContain('Content 2')
      expect(wrapper.text()).not.toContain('Content 1')
      
      wrapper.unmount()
    })
  })

  describe('AppSidebar', () => {
    it('toggles collapse state', async () => {
      const wrapper = mount(AppSidebar, {
        slots: {
          default: '<div class="content">Menu Item</div>'
        }
      })
      expect(wrapper.classes()).toContain('w-[280px]')
      
      const toggleBtn = wrapper.find('button')
      await toggleBtn.trigger('click')
      
      expect(wrapper.classes()).toContain('w-[80px]')
      wrapper.unmount()
    })
  })
})
