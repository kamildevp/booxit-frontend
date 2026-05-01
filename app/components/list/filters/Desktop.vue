<template>
  <aside
    :class="[
      'hidden xl:flex flex-col min-w-sm border-r sticky duration-300 overflow-hidden',
      scrollDir ? 'top-0 max-h-dvh' : 'top-(--header-height) max-h-(--sticky-content-max-height)',
    ]"
  >
    <ListFiltersContainer
      size="lg"
      class="flex-1"
      @apply="emit('apply')"
      @clear="clearFiltersState"
    >
      <slot v-bind="{ getFiltersUtils, filtersState }" />
    </ListFiltersContainer>
  </aside>
</template>

<script setup lang="ts">
import type { ZodObject } from 'zod'
import { getFilter, removeFilter, setFilter } from '~/utils/listFiltersUtils'
import type { FilterKey, FiltersState, FilterValueType } from '~~/types/list'

const { scrollDir } = useScroll()
const filtersState = defineModel<FiltersState>('filtersState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()

function clearFiltersState() {
  filtersState.value = []
  emit('apply')
}

const getFiltersUtils = <S extends ZodObject>() => ({
  getFilter: <K extends FilterKey<S>>(id: K): FilterValueType<S, K> => getFilter(filtersState.value, id),
  removeFilter: <K extends FilterKey<S>>(id: K) => { filtersState.value = removeFilter(filtersState.value, id) },
  setFilter: <K extends FilterKey<S>>(id: K, value: FilterValueType<S, K>) => { filtersState.value = setFilter(filtersState.value, id, value) },
})
</script>
