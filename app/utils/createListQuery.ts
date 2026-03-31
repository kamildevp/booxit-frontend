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
  return filtersState.reduce((acc, curr) => ({ ...acc, [curr.id]: JSON.stringify(curr.value) }), {})
}

function convertSortingStateToRawSorting(sortingState: SortingState): string | undefined {
  return sortingState.reduce((acc, curr) => {
    const sort = curr.desc ? `-${curr.id}` : `${curr.id}`
    return acc ? `${acc},${sort}` : sort
  }, undefined as string | undefined)
}
