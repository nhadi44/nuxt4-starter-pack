<script setup lang="ts">
  import { Users, DollarSign, Activity } from 'lucide-vue-next'
  import BaseStatCard from '../BaseStatCard.vue'
  import BaseMetricCard from '../BaseMetricCard.vue'
  import BaseDescriptionList from '../BaseDescriptionList.vue'
</script>

<template>
  <Story title="Data Display / Cards" :layout="{ type: 'grid', width: '800px' }">
    <Variant title="Stat Cards">
      <div class="p-6 bg-muted/20 rounded-lg border grid grid-cols-3 gap-4">
        <BaseStatCard 
          title="Total Revenue" 
          value="$45,231.89" 
          :trend="20.1" 
          trend-label="from last month"
          :icon="DollarSign"
        />
        <BaseStatCard 
          title="Subscriptions" 
          value="+2350" 
          :trend="180.1" 
          trend-label="from last month"
          :icon="Users"
        />
        <BaseStatCard 
          title="Active Now" 
          value="+573" 
          :trend="-4" 
          trend-label="since last hour"
          :icon="Activity"
        />
      </div>
    </Variant>

    <Variant title="Metric Cards">
      <div class="p-6 bg-muted/20 rounded-lg border grid grid-cols-2 gap-4">
        <BaseMetricCard 
          title="Server Storage" 
          value="450 GB" 
          :progress="45"
          :max="1000"
          description="45% capacity reached"
        />
        <BaseMetricCard 
          title="Monthly Bandwidth" 
          value="1.2 TB" 
          :progress="80"
          :max="100"
          description="Approaching limits"
        />
      </div>
    </Variant>

    <Variant title="Description List">
      <div class="p-6 bg-muted/20 rounded-lg border">
        <BaseDescriptionList 
          title="Applicant Information"
          description="Personal details and application."
          :items="[
            { label: 'Full name', value: 'Margot Foster' },
            { label: 'Application for', value: 'Backend Developer' },
            { label: 'Email address', value: 'margot@example.com' },
            { label: 'Salary expectation', value: '$120,000' },
            { label: 'About', value: 'Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint.' }
          ]"
        />
      </div>
    </Variant>
  </Story>
</template>
