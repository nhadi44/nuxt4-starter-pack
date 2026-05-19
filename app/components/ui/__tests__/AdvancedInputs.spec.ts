import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'

import BaseCalendar from '../BaseCalendar.vue'
import BaseInputOTP from '../BaseInputOTP.vue'
import BaseInputGroup from '../BaseInputGroup.vue'
import BaseToggle from '../BaseToggle.vue'
import BaseToggleGroup from '../BaseToggleGroup.vue'
import BaseToggleGroupItem from '../BaseToggleGroupItem.vue'
import BaseSlider from '../BaseSlider.vue'

describe('Advanced Inputs Components', () => {
  describe('BaseCalendar', () => {
    it('renders current month and year', () => {
      const date = new Date(2023, 5, 15) // June 15, 2023
      const wrapper = mount(BaseCalendar, { props: { modelValue: date } })
      expect(wrapper.text()).toContain('June 2023')
      expect(wrapper.text()).toContain('15')
      wrapper.unmount()
    })
    
    it('emits update:modelValue on day click', async () => {
      const date = new Date(2023, 5, 15)
      const wrapper = mount(BaseCalendar, { props: { modelValue: date } })
      
      const buttons = wrapper.findAll('button')
      // Find a day button (e.g., day 10)
      const day10 = buttons.find(b => b.text() === '10')
      await day10!.trigger('click')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect((wrapper.emitted('update:modelValue')![0] as Date[])[0]!.getDate()).toBe(10)
      wrapper.unmount()
    })
  })

  describe('BaseInputOTP', () => {
    it('renders correct number of inputs', () => {
      const wrapper = mount(BaseInputOTP, { props: { length: 4 } })
      expect(wrapper.findAll('input')).toHaveLength(4)
      wrapper.unmount()
    })

    it('emits joined value on input', async () => {
      const wrapper = mount(BaseInputOTP, { props: { length: 4 } })
      const inputs = wrapper.findAll('input')
      
      await inputs[0]!.setValue('1')
      await inputs[1]!.setValue('2')
      
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted![emitted!.length - 1]).toEqual(['12'])
      wrapper.unmount()
    })
  })

  describe('BaseToggle', () => {
    it('toggles state on click', async () => {
      const wrapper = mount(BaseToggle, { props: { modelValue: false } })
      expect(wrapper.classes()).not.toContain('bg-accent')
      
      await wrapper.trigger('click')
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([true])
      wrapper.unmount()
    })
  })

  describe('BaseToggleGroup', () => {
    it('handles single selection mode', async () => {
      const TestComponent = defineComponent({
        components: { BaseToggleGroup, BaseToggleGroupItem },
        template: `
          <BaseToggleGroup type="single" modelValue="a" @update:modelValue="$emit('changed', $event)">
            <BaseToggleGroupItem value="a">A</BaseToggleGroupItem>
            <BaseToggleGroupItem value="b">B</BaseToggleGroupItem>
          </BaseToggleGroup>
        `
      })
      const wrapper = mount(TestComponent)
      const buttons = wrapper.findAll('button')
      
      // Click 'b'
      await buttons[1]!.trigger('click')
      expect(wrapper.emitted('changed')![0]).toEqual(['b'])
      wrapper.unmount()
    })
  })

  describe('BaseSlider', () => {
    it('emits value on input', async () => {
      const wrapper = mount(BaseSlider, { props: { modelValue: 50 } })
      const input = wrapper.find('input')
      
      await input.setValue('75')
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([75])
      wrapper.unmount()
    })
  })
})
