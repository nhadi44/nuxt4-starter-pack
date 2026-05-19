import { ref, unref, type Ref } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type TableOptions,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type PaginationState,
  type RowSelectionState,
} from '@tanstack/vue-table'

export function useTableSorting(initialState: SortingState = []) {
  const sorting = ref<SortingState>(initialState)
  const onSortingChange = (updaterOrValue: any) => {
    sorting.value = typeof updaterOrValue === 'function' ? updaterOrValue(sorting.value) : updaterOrValue
  }
  return { sorting, onSortingChange }
}

export function useTableFiltering(initialState: ColumnFiltersState = []) {
  const columnFilters = ref<ColumnFiltersState>(initialState)
  const globalFilter = ref('')
  
  const onColumnFiltersChange = (updaterOrValue: any) => {
    columnFilters.value = typeof updaterOrValue === 'function' ? updaterOrValue(columnFilters.value) : updaterOrValue
  }
  
  const onGlobalFilterChange = (updaterOrValue: any) => {
    globalFilter.value = typeof updaterOrValue === 'function' ? updaterOrValue(globalFilter.value) : updaterOrValue
  }
  
  return { columnFilters, globalFilter, onColumnFiltersChange, onGlobalFilterChange }
}

export function useRowSelection(initialState: RowSelectionState = {}) {
  const rowSelection = ref<RowSelectionState>(initialState)
  const onRowSelectionChange = (updaterOrValue: any) => {
    rowSelection.value = typeof updaterOrValue === 'function' ? updaterOrValue(rowSelection.value) : updaterOrValue
  }
  return { rowSelection, onRowSelectionChange }
}

export function usePagination(initialState: PaginationState = { pageIndex: 0, pageSize: 10 }) {
  const pagination = ref<PaginationState>(initialState)
  const onPaginationChange = (updaterOrValue: any) => {
    pagination.value = typeof updaterOrValue === 'function' ? updaterOrValue(pagination.value) : updaterOrValue
  }
  return { pagination, onPaginationChange }
}

export interface UseDataTableProps<TData> {
  data: Ref<TData[]> | TData[]
  columns: ColumnDef<TData, any>[]
  options?: Omit<TableOptions<TData>, 'getCoreRowModel' | 'data' | 'columns'>
}

export function useDataTable<TData>(props: UseDataTableProps<TData>) {
  const { sorting, onSortingChange } = useTableSorting()
  const { columnFilters, globalFilter, onColumnFiltersChange, onGlobalFilterChange } = useTableFiltering()
  const { rowSelection, onRowSelectionChange } = useRowSelection()
  const { pagination, onPaginationChange } = usePagination()
  const columnVisibility = ref<VisibilityState>({})

  const table = useVueTable({
    get data() { return unref(props.data) },
    get columns() { return props.columns },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      get sorting() { return sorting.value },
      get columnFilters() { return columnFilters.value },
      get columnVisibility() { return columnVisibility.value },
      get rowSelection() { return rowSelection.value },
      get globalFilter() { return globalFilter.value },
      get pagination() { return pagination.value },
    },
    onSortingChange,
    onColumnFiltersChange,
    onRowSelectionChange,
    onGlobalFilterChange,
    onPaginationChange,
    onColumnVisibilityChange: updaterOrValue => {
      columnVisibility.value = typeof updaterOrValue === 'function' ? updaterOrValue(columnVisibility.value) : updaterOrValue
    },
    ...(props.options || {})
  })

  return {
    table,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
    globalFilter,
    pagination,
  }
}
