<template>
  <div
    :class="[
      'flex flex-row flex-1',
      scrollDir ? 'min-h-dvh' : 'min-h-(--sticky-content-max-height)',
    ]"
  >
    <ListFiltersDesktop
      v-if="hasFilters"
      v-model:filters-state="filtersState"
      @apply="applyFiltersAndSorting"
    >
      <template #default="{ getFiltersUtils }">
        <slot
          name="filters"
          v-bind="{ ...getFiltersUtils<S>() }"
        />
      </template>
    </ListFiltersDesktop>
    <div class="flex flex-col flex-1 items-center">
      <ListHeader
        v-if="hasHeader"
        v-model:filters-state="filtersState"
        v-model:sorting-state="sortingState"
        :has-filters="hasFilters"
        :sortable-columns="sortableColumns"
        @apply="applyFiltersAndSorting"
      >
        <template #default="{ getFiltersUtils }">
          <slot
            name="header"
            v-bind="{ ...getFiltersUtils<S>() }"
          />
        </template>
        <template #filters="{ getFiltersUtils }">
          <slot
            name="filters"
            v-bind="{ ...getFiltersUtils<S>() }"
          />
        </template>
      </ListHeader>
      <ListResults
        :items="data ?? []"
        :results-count="resultsCount ?? 0"
      >
        <template #default="{ item }">
          <slot
            name="row"
            :item="item"
          />
        </template>
      </ListResults>
      <UiSpinner
        v-if="pending"
        class="size-14 m-4"
      />
      <ListPagination
        v-else
        :page="page"
        :page-size="pageSize"
        :pages-count="pagesCount ?? 1"
        :total="resultsCount ?? 0"
        @update:page="(value) => page = value"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="R extends PaginatorRequest, S extends ZodObject">
import type { ZodObject } from 'zod'
import type { PaginatorRequest } from '~~/types/api'
import type { SortingState } from '~~/types/list'

const { scrollDir } = useScroll()

interface Props {
  resourceUrl: R
  hasFilters?: boolean
  hasHeader?: boolean
  filtersSchema?: S
  sortableColumns?: SortingState
}
const props = defineProps<Props>()
const {
  data,
  pending,
  resultsCount,
  page,
  pageSize,
  pagesCount,
  sortingState,
  filtersState,
  applyFiltersAndSorting,
} = useList(
  props.resourceUrl,
  props.filtersSchema,
  props.sortableColumns,
  true,
)
</script>
