import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BaseSheet from '../BaseSheet.vue'
import BaseResizable from '../BaseResizable.vue'
import BaseChart from '../BaseChart.vue'

describe('Charting & Complex Views', () => {
  describe('BaseSheet', () => {
    it('passes props correctly to BaseDrawer', async () => {
      const wrapper = mount(BaseSheet, {
        props: { modelValue: true, title: 'Sheet Title', side: 'right' }
      })
      
      // Wait for modal to render
      await new Promise(r => setTimeout(r, 100))
      
      // Since it's a wrapper around BaseDrawer, just check text
      expect(document.body.innerHTML).toContain('Sheet Title')
      wrapper.unmount()
      document.body.innerHTML = ''
    })
  })

  describe('BaseResizable', () => {
    it('applies correct resize classes', () => {
      const hWrapper = mount(BaseResizable, { props: { direction: 'horizontal' } })
      expect(hWrapper.classes()).toContain('resize-x')
      hWrapper.unmount()

      const vWrapper = mount(BaseResizable, { props: { direction: 'vertical' } })
      expect(vWrapper.classes()).toContain('resize-y')
      vWrapper.unmount()
      
      const bWrapper = mount(BaseResizable, { props: { direction: 'both' } })
      expect(bWrapper.classes()).toContain('resize')
      bWrapper.unmount()
    })
  })

  describe('BaseChart', () => {
    it('renders labels and calculates heights correctly', () => {
      const data = [
        { label: 'Jan', value: 50 },
        { label: 'Feb', value: 100 }
      ]
      const wrapper = mount(BaseChart, { props: { data } })
      
      expect(wrapper.text()).toContain('Jan')
      expect(wrapper.text()).toContain('Feb')
      expect(wrapper.text()).toContain('50')
      expect(wrapper.text()).toContain('100')
      
      // Feb has value 100 which is max, so it should be 100% height
      const bars = wrapper.findAll('.bg-primary')
      expect(bars[1]!.attributes('style')).toContain('height: 100%')
      expect(bars[0]!.attributes('style')).toContain('height: 50%')
      
      wrapper.unmount()
    })
  })
})
