import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import BaseDataTable from '../BaseDataTable.vue'
import { useDataTable } from '../../../composables/useDataTable'

const mockData = [
  { id: 1, name: 'John Doe', status: 'Active' },
  { id: 2, name: 'Jane Smith', status: 'Inactive' },
]

const mockColumns: ColumnDef<any, any>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
]

const TestTable = defineComponent({
  components: { BaseDataTable },
  props: {
    isLoading: Boolean,
  },
  setup(props) {
    const { table } = useDataTable({
      data: mockData,
      columns: mockColumns,
    })

    return { table, isLoading: props.isLoading }
  },
  template: `
    <BaseDataTable :table="table" :is-loading="isLoading" />
  `,
})

describe('BaseDataTable and useDataTable', () => {
  it('renders table headers and rows correctly', () => {
    const wrapper = mount(TestTable)

    // Check headers
    const headers = wrapper.findAll('th')
    expect(headers).toHaveLength(3)
    expect(headers[0]!.text()).toContain('ID')
    expect(headers[1]!.text()).toContain('Name')
    expect(headers[2]!.text()).toContain('Status')

    // Check rows
    const rows = wrapper.findAll('tbody tr')
    expect(rows).toHaveLength(2)
    const cells = rows[0]!.findAll('td')
    expect(cells).toHaveLength(3)
    expect(cells[0]!.text()).toBe('1')
    expect(cells[1]!.text()).toBe('John Doe')
    expect(cells[2]!.text()).toBe('Active')
    
    wrapper.unmount()
  })

  it('renders loading state when isLoading is true', () => {
    const wrapper = mount(TestTable, {
      props: {
        isLoading: true,
      },
    })
    
    // Rows should not be rendered, skeleton should be visible
    expect(wrapper.text()).not.toContain('John Doe')
    const skeleton = wrapper.find('div.w-full.space-y-4') // TableLoadingState skeleton
    expect(skeleton.exists()).toBe(true)
    
    wrapper.unmount()
  })

  it('renders empty state when data is empty', () => {
    const EmptyTestTable = defineComponent({
      components: { BaseDataTable },
      setup() {
        const { table } = useDataTable({
          data: [],
          columns: mockColumns,
        })
        return { table }
      },
      template: `<BaseDataTable :table="table" />`,
    })

    const wrapper = mount(EmptyTestTable)
    
    expect(wrapper.text()).toContain('No results.')
    expect(wrapper.text()).toContain('No data matches your criteria.')
    
    wrapper.unmount()
  })
})
