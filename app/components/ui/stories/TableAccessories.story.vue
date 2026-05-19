<script setup lang="ts">
  import { ref } from 'vue'
  import BasePagination from '../BasePagination.vue'
  import TableToolbar from '../TableToolbar.vue'
  import TableEmptyState from '../TableEmptyState.vue'
  import TableLoadingState from '../TableLoadingState.vue'
  import BaseButton from '../BaseButton.vue'

  const currentPage = ref(2)
  const pageSize = ref(10)
  const searchQuery = ref('')
</script>

<template>
  <Story title="Data Display / Table Accessories" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="BasePagination">
      <div class="p-6 bg-background border rounded-lg">
        <BasePagination
          v-model:page="currentPage"
          v-model:page-size="pageSize"
          :total="125"
        />
        <div class="mt-4 text-xs font-mono text-muted-foreground">
          State: Page {{ currentPage }} | Size {{ pageSize }}
        </div>
      </div>
    </Variant>

    <Variant title="TableToolbar">
      <div class="p-6 bg-background border rounded-lg">
        <TableToolbar
          v-model:search-query="searchQuery"
          search-placeholder="Filter users..."
        >
          <template #right>
            <BaseButton variant="outline" class="h-9">Export</BaseButton>
            <BaseButton class="h-9">Add User</BaseButton>
          </template>
        </TableToolbar>
        <div class="mt-4 text-xs font-mono text-muted-foreground">
          Search: "{{ searchQuery }}"
        </div>
      </div>
    </Variant>

    <Variant title="TableEmptyState">
      <div class="p-6 bg-background border rounded-lg">
        <TableEmptyState
          title="No projects found"
          description="You haven't created any projects matching this filter yet."
        >
          <BaseButton>Clear Filters</BaseButton>
        </TableEmptyState>
      </div>
    </Variant>

    <Variant title="TableLoadingState (Skeleton)">
      <div class="p-6 bg-background border rounded-lg">
        <TableLoadingState type="skeleton" :rows="4" />
      </div>
    </Variant>

    <Variant title="TableLoadingState (Spinner)">
      <div class="p-6 bg-background border rounded-lg">
        <TableLoadingState type="spinner" />
      </div>
    </Variant>
  </Story>
</template>
