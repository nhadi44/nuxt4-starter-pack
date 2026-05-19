<script setup lang="ts">
  import BaseTable from '../BaseTable.vue'
  import BaseTableHeader from '../BaseTableHeader.vue'
  import BaseTableBody from '../BaseTableBody.vue'
  import BaseTableRow from '../BaseTableRow.vue'
  import BaseTableHead from '../BaseTableHead.vue'
  import BaseTableCell from '../BaseTableCell.vue'
  import BaseTableCaption from '../BaseTableCaption.vue'

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
  ]
</script>

<template>
  <Story title="Data Display / BaseTable" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="Primitive Table">
      <div class="p-6 bg-background border rounded-lg">
        <BaseTable>
          <BaseTableCaption>A list of your recent invoices.</BaseTableCaption>
          <BaseTableHeader>
            <BaseTableRow>
              <BaseTableHead class="w-[100px]">Invoice</BaseTableHead>
              <BaseTableHead>Status</BaseTableHead>
              <BaseTableHead>Method</BaseTableHead>
              <BaseTableHead class="text-right">Amount</BaseTableHead>
            </BaseTableRow>
          </BaseTableHeader>
          <BaseTableBody>
            <BaseTableRow v-for="invoice in invoices" :key="invoice.invoice">
              <BaseTableCell class="font-medium">{{ invoice.invoice }}</BaseTableCell>
              <BaseTableCell>{{ invoice.paymentStatus }}</BaseTableCell>
              <BaseTableCell>{{ invoice.paymentMethod }}</BaseTableCell>
              <BaseTableCell class="text-right">{{ invoice.totalAmount }}</BaseTableCell>
            </BaseTableRow>
          </BaseTableBody>
        </BaseTable>
      </div>
    </Variant>
  </Story>
</template>
