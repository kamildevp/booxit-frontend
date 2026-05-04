<template>
  <ListFiltersContainer
    :active-filters-count="activeFiltersCount"
    @apply="setFiltersState(localFiltersState)"
    @clear="setFiltersState([])"
  >
    <slot v-bind="{ getFiltersUtils, filtersState: localFiltersState }" />
  </ListFiltersContainer>
</template>

<script setup lang="ts">
import type { ZodObject } from 'zod'
import { getFilter, removeFilter, setFilter } from '~/utils/listFiltersUtils'
import type { FilterKey, FiltersState, FilterValueType } from '~~/types/list'

const filtersState = defineModel<FiltersState>('filtersState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()
const localFiltersState = ref([...filtersState.value])
const activeFiltersCount = computed(() => filtersState.value.filter(el => !Array.isArray(el.value) || el.value.length > 0).length)
defineExpose({ resetLocalFiltersState })

watch(filtersState, (value) => {
  localFiltersState.value = [...value]
})

function setFiltersState(state: FiltersState) {
  filtersState.value = [...state]
  localFiltersState.value = [...state]
  emit('apply')
}

function resetLocalFiltersState() {
  localFiltersState.value = [...filtersState.value]
}

const getFiltersUtils = <S extends ZodObject>() => ({
  getFilter: <K extends FilterKey<S>>(id: K): FilterValueType<S, K> => getFilter(localFiltersState.value, id),
  removeFilter: <K extends FilterKey<S>>(id: K) => { localFiltersState.value = removeFilter(localFiltersState.value, id) },
  setFilter: <K extends FilterKey<S>>(id: K, value: FilterValueType<S, K>) => { localFiltersState.value = setFilter(localFiltersState.value, id, value) },
})
</script>
