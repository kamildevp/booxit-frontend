import type { ZodObject } from 'zod'
import type { FilterKey, FiltersState, FilterValueType } from '~~/types/list'

export const getFilter = <
  S extends ZodObject,
  K extends FilterKey<S>,
>(filtersState: FiltersState, id: K) => {
  return filtersState.find(filter => filter.id == id)?.value as FilterValueType<S, K>
}

export const removeFilter = <
  S extends ZodObject,
  K extends FilterKey<S>,
>(filtersState: FiltersState, id: K) => {
  return filtersState.filter(filter => filter.id != id)
}

export const setFilter = <
  S extends ZodObject,
  K extends FilterKey<S>,
>(filtersState: FiltersState, id: K, value: FilterValueType<S, K>) => {
  const filtered = removeFilter(filtersState, id)
  filtered.push({ id, value })
  return filtered
}
