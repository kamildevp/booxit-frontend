<template>
  <div class="flex-1 flex flex-col">
    <ListView
      resource-url="/api/organizations"
      has-header
      has-filters
      :filters-schema="filtersSchema"
    >
      <template #row="{ item }">
        <OrganizationsListItem
          :id="item.id"
          :name="item.name"
          :description="item.description"
          :banner-url="item.banner_url"
          :address="item.address.formatted_address"
        />
      </template>
      <template #header="{ setFilter, applyFiltersAndSorting, filtersState }">
        <OrganizationsSearchBar
          class="w-full h-fit lg:max-w-160"
          :filters-state="filtersState"
          @apply="(value) => {
            setFilter('filters[name]', value)
            applyFiltersAndSorting()
          }"
        />
      </template>
      <template #filters="{ getFilter, setFilter, removeFilter, applyFiltersAndSorting }">
        <ListFilterWrapper
          title="Category"
          icon="ic:round-category"
        >
          <template #default>
            <AppBadgeMultiSelect
              :entries="categories"
              :model-value="getFilter('filters[service_category][]')"
              :visible-items-count="10"
              @update:model-value="(value) => setFilter('filters[service_category][]', value)"
            />
          </template>
          <template #titleBadge>
            <ListFilterWrapperMultiSelectBadge
              :count="getFilter('filters[service_category][]')?.length ?? 0"
              @remove="() => {
                removeFilter('filters[service_category][]')
                applyFiltersAndSorting()
              }"
            />
          </template>
        </ListFilterWrapper>
      </template>
    </ListView>
  </div>
</template>

<script setup lang="ts">
import z from 'zod'
import serviceCategory, { categories } from '~~/schemas/services/category'

const filtersSchema = z.object({
  'filters[name]': z.string().min(1).optional(),
  'filters[service_category][]': z.array(serviceCategory).optional(),
})
</script>
