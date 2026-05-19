import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormLabel from '../FormLabel.vue'
import FormDescription from '../FormDescription.vue'
import FormError from '../FormError.vue'
import FormField from '../FormField.vue'
import FormGroup from '../FormGroup.vue'

describe('Form Ecosystem Components', () => {
  describe('FormLabel', () => {
    it('renders label slot content', () => {
      const wrapper = mount(FormLabel, {
        slots: { default: 'User Password' },
      })
      expect(wrapper.text()).toContain('User Password')
      expect(wrapper.text()).not.toContain('*')
      wrapper.unmount()
    })

    it('renders asterisk when required is true', () => {
      const wrapper = mount(FormLabel, {
        props: { required: true },
        slots: { default: 'Email' },
      })
      expect(wrapper.text()).toContain('Email')
      expect(wrapper.text()).toContain('*')
      expect(wrapper.find('.text-destructive').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('FormDescription', () => {
    it('renders helper description text', () => {
      const wrapper = mount(FormDescription, {
        slots: { default: 'Passwords must contain at least one uppercase letter.' },
      })
      expect(wrapper.text()).toBe('Passwords must contain at least one uppercase letter.')
      wrapper.unmount()
    })
  })

  describe('FormError', () => {
    it('renders nothing when error is not provided', () => {
      const wrapper = mount(FormError)
      expect(wrapper.find('span').exists()).toBe(false)
      wrapper.unmount()
    })

    it('renders error message when provided', () => {
      const wrapper = mount(FormError, {
        props: { error: 'Invalid email address format' },
      })
      expect(wrapper.text()).toBe('Invalid email address format')
      expect(wrapper.find('.text-destructive').exists()).toBe(true)
      wrapper.unmount()
    })
  })

  describe('FormField', () => {
    it('renders label, description, and custom inputs with slots', () => {
      const wrapper = mount(FormField, {
        props: {
          label: 'Username',
          description: 'Unique nickname for your profile',
          error: 'Username already taken',
          required: true,
        },
        slots: {
          default: `<template #default="slotProps">
            <input :id="slotProps.id" type="text" class="input-test" />
          </template>`,
        },
        global: {
          components: {
            FormLabel,
            FormDescription,
            FormError,
          },
        },
      })

      expect(wrapper.text()).toContain('Username')
      expect(wrapper.text()).toContain('*')
      expect(wrapper.text()).toContain('Unique nickname for your profile')
      expect(wrapper.text()).toContain('Username already taken')
      
      const input = wrapper.find('.input-test')
      expect(input.exists()).toBe(true)
      expect(input.attributes('id')).toBeDefined()
      
      wrapper.unmount()
    })
  })

  describe('FormGroup', () => {
    it('applies grid column count styles correctly', () => {
      const wrapper1 = mount(FormGroup, { props: { cols: 2 } })
      expect(wrapper1.classes()).toContain('md:grid-cols-2')
      wrapper1.unmount()

      const wrapper2 = mount(FormGroup, { props: { cols: 3 } })
      expect(wrapper2.classes()).toContain('md:grid-cols-3')
      wrapper2.unmount()

      const wrapper3 = mount(FormGroup, { props: { cols: 4 } })
      expect(wrapper3.classes()).toContain('md:grid-cols-4')
      wrapper3.unmount()
    })
  })
})
