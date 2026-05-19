<script setup lang="ts">
  import { ref, computed } from 'vue'
  import type { ColumnDef } from '@tanstack/vue-table'
  import BaseDataTable from '../BaseDataTable.vue'
  import TableToolbar from '../TableToolbar.vue'
  import BasePagination from '../BasePagination.vue'
  import BaseBadge from '../BaseBadge.vue'
  import { useDataTable } from '../../../composables/useDataTable'

  type Payment = {
    id: string
    amount: number
    status: 'pending' | 'processing' | 'success' | 'failed'
    email: string
  }

  const data = ref<Payment[]>([
    { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
    { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
    { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
    { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
    { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
    { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
    { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
    { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
    { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
    { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
    { id: 'm5gr84i9', amount: 316, status: 'success', email: 'ken99@yahoo.com' },
    { id: '3u1reuv4', amount: 242, status: 'success', email: 'Abe45@gmail.com' },
    { id: 'derv1ws0', amount: 837, status: 'processing', email: 'Monserrat44@gmail.com' },
    { id: '5kma53ae', amount: 874, status: 'success', email: 'Silas22@gmail.com' },
    { id: 'bhqecj4p', amount: 721, status: 'failed', email: 'carmella@hotmail.com' },
  ])

  const columns: ColumnDef<Payment, any>[] = [
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        const variantMap: Record<string, string> = {
          success: 'default',
          processing: 'secondary',
          failed: 'destructive',
          pending: 'outline',
        }
        return h(BaseBadge, { variant: variantMap[status] as any }, () => status)
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        const formatted = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(amount)
        return h('div', { class: 'text-right font-medium' }, formatted)
      },
    },
  ]

  const {
    table,
    globalFilter,
    pagination,
  } = useDataTable({
    data,
    columns,
  })

  // Since it's client-side, the table handles pagination internally.
  // We can pass `table.getFilteredRowModel().rows.length` to total.
  const totalRows = computed(() => table.getFilteredRowModel().rows.length)
</script>

<template>
  <Story title="Data Display / BaseDataTable" :layout="{ type: 'grid', width: '1000px' }">
    <Variant title="Interactive Table (Client-Side)">
      <div class="p-6 bg-background rounded-lg space-y-4">
        <TableToolbar
          v-model:search-query="globalFilter"
          search-placeholder="Search emails..."
        />
        
        <BaseDataTable
          :table="table"
        />
        
        <BasePagination
          :page="pagination.pageIndex + 1"
          :page-size="pagination.pageSize"
          :total="totalRows"
          @update:page="idx => table.setPageIndex(idx - 1)"
          @update:page-size="size => table.setPageSize(size)"
        />
      </div>
    </Variant>

    <Variant title="Loading State">
      <div class="p-6 bg-background rounded-lg space-y-4">
        <BaseDataTable
          :table="table"
          is-loading
          loading-type="skeleton"
        />
      </div>
    </Variant>
  </Story>
</template>
