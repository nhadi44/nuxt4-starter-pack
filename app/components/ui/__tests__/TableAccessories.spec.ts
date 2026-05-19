import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BasePagination from '../BasePagination.vue'
import TableToolbar from '../TableToolbar.vue'
import TableEmptyState from '../TableEmptyState.vue'
import TableLoadingState from '../TableLoadingState.vue'

describe('Table Accessories', () => {
  describe('BasePagination', () => {
    it('computes boundaries and renders correctly', () => {
      const wrapper = mount(BasePagination, {
        props: {
          page: 1,
          pageSize: 10,
          total: 25,
        },
      })
      expect(wrapper.text()).toContain('Total 25 items')
      expect(wrapper.text()).toContain('Page 1 of 3') // 25 / 10 = ceil(2.5) = 3
      
      const buttons = wrapper.findAll('button')
      // Prev button is disabled on page 1
      expect((buttons[buttons.length - 2]!.element as HTMLButtonElement).disabled).toBe(true)
      // Next button is enabled
      expect((buttons[buttons.length - 1]!.element as HTMLButtonElement).disabled).toBe(false)
      wrapper.unmount()
    })

    it('emits update:page on button click', async () => {
      const wrapper = mount(BasePagination, {
        props: {
          page: 2,
          pageSize: 10,
          total: 25,
        },
      })
      const buttons = wrapper.findAll('button')
      await buttons[buttons.length - 1]!.trigger('click') // Next
      
      expect(wrapper.emitted('update:page')).toBeTruthy()
      expect(wrapper.emitted('update:page')?.[0]).toEqual([3])
      wrapper.unmount()
    })
  })

  describe('TableToolbar', () => {
    it('renders search and emits updates', () => {
      const wrapper = mount(TableToolbar, {
        props: {
          searchQuery: 'test',
          searchPlaceholder: 'Search users...',
        },
      })
      const input = wrapper.find('input')
      expect(input.exists()).toBe(true)
      expect(input.attributes('placeholder')).toBe('Search users...')
      expect((input.element as HTMLInputElement).value).toBe('test')
      wrapper.unmount()
    })
  })

  describe('TableEmptyState', () => {
    it('renders default text', () => {
      const wrapper = mount(TableEmptyState)
      expect(wrapper.text()).toContain('No results found')
      wrapper.unmount()
    })

    it('renders custom text', () => {
      const wrapper = mount(TableEmptyState, {
        props: {
          title: 'Custom Title',
          description: 'Custom Description',
        },
      })
      expect(wrapper.text()).toContain('Custom Title')
      expect(wrapper.text()).toContain('Custom Description')
      wrapper.unmount()
    })
  })

  describe('TableLoadingState', () => {
    it('renders skeletons by default', () => {
      const wrapper = mount(TableLoadingState, {
        props: {
          rows: 3,
        },
      })
      // Should have 3 skeleton divs
      const children = wrapper.find('div.w-full.space-y-4').findAll('div')
      expect(children).toHaveLength(3)
      wrapper.unmount()
    })

    it('renders spinner when type is spinner', () => {
      const wrapper = mount(TableLoadingState, {
        props: {
          type: 'spinner',
        },
      })
      expect(wrapper.text()).toContain('Loading data...')
      expect(wrapper.find('svg').exists()).toBe(true)
      wrapper.unmount()
    })
  })
})
