import type { ColumnFiltersState, SortingState } from '@tanstack/vue-table'

export default function createListQuery(
  page: number,
  pageSize: number,
  filtersState: ColumnFiltersState,
  sortingState: SortingState,
): Record<string, unknown> {
  const rawFilters = convertFiltersStateToRawFilters(filtersState)
  const rawSorting = convertSortingStateToRawSorting(sortingState)

  return {
    page,
    per_page: pageSize,
    ...rawFilters,
    order: rawSorting,
  }
}

function convertFiltersStateToRawFilters(filtersState: ColumnFiltersState): Record<string, unknown> {
  return filtersState.reduce((acc, curr) => ({ ...acc, [curr.id]: curr.value }), {})
}

function convertSortingStateToRawSorting(sortingState: SortingState): string | undefined {
  return sortingState.reduce((acc, curr) => {
    const sort = curr.desc ? `-${curr.id}` : `${curr.id}`
    return acc ? `${acc},${sort}` : sort
  }, undefined as string | undefined)
}
