import type { FiltersState, SortingState } from '~~/types/list'

export default function createListQuery(
  page: number,
  pageSize: number,
  filtersState: FiltersState,
  sortingState: SortingState,
): Record<string, string | number | undefined> {
  const rawFilters = convertFiltersStateToRawFilters(filtersState)
  const rawSorting = convertSortingStateToRawSorting(sortingState)

  return {
    page,
    per_page: pageSize,
    ...rawFilters,
    order: rawSorting,
  }
}

function convertFiltersStateToRawFilters(filtersState: FiltersState): Record<string, unknown> {
  return filtersState.filter(el => el.value !== undefined).map(
    item => ({
      id: item.id,
      value: Array.isArray(item.value) ? item.value.map(el => String(el)) : String(item.value),
    }),
  ).filter(
    item => item.value.length > 0 && (!Array.isArray(item.value) || item.value.every(el => el.length > 0)),
  ).reduce((acc, curr) => ({
    ...acc,
    [curr.id]: curr.value,
  }), {})
}

function convertSortingStateToRawSorting(sortingState: SortingState): string | undefined {
  return sortingState.reduce((acc, curr) => {
    const sort = curr.desc ? `-${curr.id}` : `${curr.id}`
    return acc ? `${acc},${sort}` : sort
  }, undefined as string | undefined)
}
