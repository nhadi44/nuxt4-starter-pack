import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseTable from '../BaseTable.vue'
import BaseTableHeader from '../BaseTableHeader.vue'
import BaseTableBody from '../BaseTableBody.vue'
import BaseTableRow from '../BaseTableRow.vue'
import BaseTableHead from '../BaseTableHead.vue'
import BaseTableCell from '../BaseTableCell.vue'
import BaseTableCaption from '../BaseTableCaption.vue'

describe('BaseTable primitives', () => {
  it('renders a full table structure correctly', () => {
    const wrapper = mount({
      components: {
        BaseTable,
        BaseTableHeader,
        BaseTableBody,
        BaseTableRow,
        BaseTableHead,
        BaseTableCell,
        BaseTableCaption,
      },
      template: `
        <BaseTable>
          <BaseTableCaption>Test Caption</BaseTableCaption>
          <BaseTableHeader>
            <BaseTableRow>
              <BaseTableHead>Header 1</BaseTableHead>
              <BaseTableHead>Header 2</BaseTableHead>
            </BaseTableRow>
          </BaseTableHeader>
          <BaseTableBody>
            <BaseTableRow>
              <BaseTableCell>Cell 1</BaseTableCell>
              <BaseTableCell>Cell 2</BaseTableCell>
            </BaseTableRow>
          </BaseTableBody>
        </BaseTable>
      `,
    })

    expect(wrapper.find('table').exists()).toBe(true)
    expect(wrapper.find('caption').text()).toBe('Test Caption')
    expect(wrapper.find('thead').exists()).toBe(true)
    expect(wrapper.findAll('th')).toHaveLength(2)
    expect(wrapper.findAll('th')[0]!.text()).toBe('Header 1')
    
    expect(wrapper.find('tbody').exists()).toBe(true)
    expect(wrapper.findAll('td')).toHaveLength(2)
    expect(wrapper.findAll('td')[0]!.text()).toBe('Cell 1')
    
    wrapper.unmount()
  })

  it('allows custom classes on BaseTableRow', () => {
    const wrapper = mount(BaseTableRow, {
      attrs: { class: 'custom-row-class' },
    })
    expect(wrapper.classes()).toContain('custom-row-class')
    expect(wrapper.classes()).toContain('border-b')
    wrapper.unmount()
  })
})
