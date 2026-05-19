<script setup lang="ts" generic="TData, TValue">
import { type Table, FlexRender } from '@tanstack/vue-table'
import BaseTable from './BaseTable.vue'
import BaseTableHeader from './BaseTableHeader.vue'
import BaseTableRow from './BaseTableRow.vue'
import BaseTableHead from './BaseTableHead.vue'
import BaseTableBody from './BaseTableBody.vue'
import BaseTableCell from './BaseTableCell.vue'
import TableEmptyState from './TableEmptyState.vue'
import TableLoadingState from './TableLoadingState.vue'

interface Props {
  table: Table<TData>
  isLoading?: boolean
  loadingType?: 'skeleton' | 'spinner'
  loadingRows?: number
  emptyTitle?: string
  emptyDescription?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  loadingType: 'skeleton',
  loadingRows: 5,
  emptyTitle: 'No results.',
  emptyDescription: 'No data matches your criteria.',
})
</script>

<template>
  <div class="rounded-md border bg-card">
    <BaseTable>
      <BaseTableHeader>
        <BaseTableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
          <BaseTableHead 
            v-for="header in headerGroup.headers" 
            :key="header.id" 
            :colspan="header.colSpan"
            :class="header.column.getCanSort() ? 'cursor-pointer select-none hover:bg-muted/80' : ''"
            @click="header.column.getToggleSortingHandler()?.($event)"
          >
            <div v-if="!header.isPlaceholder" class="flex items-center gap-2">
              <FlexRender
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
              <span v-if="header.column.getIsSorted()" class="text-[10px]">
                {{ header.column.getIsSorted() === 'asc' ? '▲' : '▼' }}
              </span>
            </div>
          </BaseTableHead>
        </BaseTableRow>
      </BaseTableHeader>
      
      <BaseTableBody>
        <template v-if="isLoading">
          <BaseTableRow>
            <BaseTableCell :colspan="table.getAllColumns().length" class="p-0 h-24">
              <TableLoadingState :type="loadingType" :rows="loadingRows" />
            </BaseTableCell>
          </BaseTableRow>
        </template>
        
        <template v-else-if="table.getRowModel().rows?.length">
          <BaseTableRow
            v-for="row in table.getRowModel().rows"
            :key="row.id"
            :data-state="row.getIsSelected() ? 'selected' : undefined"
          >
            <BaseTableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
              <FlexRender
                :render="cell.column.columnDef.cell"
                :props="cell.getContext()"
              />
            </BaseTableCell>
          </BaseTableRow>
        </template>
        
        <template v-else>
          <BaseTableRow>
            <BaseTableCell :colspan="table.getAllColumns().length" class="h-24 p-0">
              <TableEmptyState :title="emptyTitle" :description="emptyDescription" />
            </BaseTableCell>
          </BaseTableRow>
        </template>
      </BaseTableBody>
    </BaseTable>
  </div>
</template>
