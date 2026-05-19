import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseStatCard from '../BaseStatCard.vue'
import BaseMetricCard from '../BaseMetricCard.vue'
import BaseDescriptionList from '../BaseDescriptionList.vue'

describe('Data Display Components', () => {
  describe('BaseStatCard', () => {
    it('renders title and value', () => {
      const wrapper = mount(BaseStatCard, {
        props: { title: 'Total Revenue', value: '$45,231.89' }
      })
      expect(wrapper.text()).toContain('Total Revenue')
      expect(wrapper.text()).toContain('$45,231.89')
      wrapper.unmount()
    })

    it('renders positive trend correctly', () => {
      const wrapper = mount(BaseStatCard, {
        props: { title: 'Users', value: '2k', trend: 15, trendLabel: 'vs last month' }
      })
      expect(wrapper.text()).toContain('15%')
      expect(wrapper.text()).toContain('vs last month')
      expect(wrapper.html()).toContain('text-emerald-500')
      wrapper.unmount()
    })
    
    it('renders negative trend correctly', () => {
      const wrapper = mount(BaseStatCard, {
        props: { title: 'Bounce Rate', value: '55%', trend: -5 }
      })
      expect(wrapper.text()).toContain('5%') // uses Math.abs
      expect(wrapper.html()).toContain('text-destructive')
      wrapper.unmount()
    })
  })

  describe('BaseMetricCard', () => {
    it('renders title, value, and description', () => {
      const wrapper = mount(BaseMetricCard, {
        props: { title: 'Storage Used', value: '45 GB', progress: 45, description: 'Out of 100 GB' }
      })
      expect(wrapper.text()).toContain('Storage Used')
      expect(wrapper.text()).toContain('45 GB')
      expect(wrapper.text()).toContain('Out of 100 GB')
      wrapper.unmount()
    })
  })

  describe('BaseDescriptionList', () => {
    it('renders list of items', () => {
      const wrapper = mount(BaseDescriptionList, {
        props: {
          title: 'System Info',
          items: [
            { label: 'OS', value: 'Linux' },
            { label: 'Uptime', value: '99.9%' }
          ]
        }
      })
      expect(wrapper.text()).toContain('System Info')
      expect(wrapper.text()).toContain('OS')
      expect(wrapper.text()).toContain('Linux')
      expect(wrapper.text()).toContain('Uptime')
      expect(wrapper.text()).toContain('99.9%')
      wrapper.unmount()
    })
  })
})
