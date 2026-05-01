<template>
  <div
    :class="[
      'w-full flex p-2 sticky duration-300 z-5 bg-background border-b items-center flex-wrap gap-2',
      scrollDir ? '-translate-y-full top-0' : 'top-(--header-height)',
    ]"
  >
    <slot v-bind="{ getFiltersUtils }" />
    <div class="flex-1 flex items-center">
      <ListFiltersMobile
        v-if="hasFilters"
        v-model:filters-state="filtersState"
        @apply="emit('apply')"
      >
        <template #default="slotProps">
          <slot
            name="filters"
            v-bind="slotProps"
          />
        </template>
      </ListFiltersMobile>
      <ListSorting
        v-if="sortableColumns"
        v-model:sorting-state="sortingState"
        :sortable-columns="sortableColumns"
        @apply="emit('apply')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ZodObject } from 'zod'
import type { FilterKey, FiltersState, FilterValueType, SortingState } from '~~/types/list'

const { scrollDir } = useScroll()

interface Props {
  hasFilters?: boolean
  sortableColumns?: SortingState
}
defineProps<Props>()
const filtersState = defineModel<FiltersState>('filtersState', { required: true })
const sortingState = defineModel<SortingState>('sortingState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()

const getFiltersUtils = <S extends ZodObject>() => ({
  getFilter: <K extends FilterKey<S>>(id: K): FilterValueType<S, K> => getFilter(filtersState.value, id),
  removeFilter: <K extends FilterKey<S>>(id: K) => { filtersState.value = removeFilter(filtersState.value, id) },
  setFilter: <K extends FilterKey<S>>(id: K, value: FilterValueType<S, K>) => { filtersState.value = setFilter(filtersState.value, id, value) },
})
</script>
