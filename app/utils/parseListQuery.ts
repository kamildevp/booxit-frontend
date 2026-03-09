import type { ColumnFiltersState, SortingState } from '@tanstack/vue-table'
import type { LocationQuery } from 'vue-router'
import { z, type ZodObject } from 'zod'

export default function parseListQuery(query: LocationQuery, filtersSchema: ZodObject, sortableColumns: string[]) {
  const sortingSchema = z.object({
    order: z.string().min(1),
  }).refine((data) => {
    const columns = data.order.split(',')
    return columns.every(column =>
      column.length > 0
      && (
        sortableColumns.includes(column)
        || sortableColumns.includes(column.substring(1))
      ),
    )
  })

  const filtersParsingResult = filtersSchema.safeParse(query)
  const sortingParsingResult = sortingSchema.safeParse(query)

  console.log(filtersParsingResult.error)

  return {
    filtersState: filtersParsingResult.success ? convertRawFiltersToFiltersState(filtersParsingResult.data) : [],
    sortingState: sortingParsingResult.success ? convertRawSortingToSortingState(sortingParsingResult.data.order) : [],
  }
}

function convertRawFiltersToFiltersState(rawFilters: Record<string, unknown>): ColumnFiltersState {
  return Object.entries(rawFilters).map(([key, value]) => ({ id: key, value }))
}

function convertRawSortingToSortingState(sorting: string): SortingState {
  return sorting.split(',').map((sort) => {
    const desc = sort.startsWith('-')
    const id = desc ? sort.substring(1) : sort

    return {
      id,
      desc,
    }
  })
}
