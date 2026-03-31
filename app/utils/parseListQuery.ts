import type { LocationQuery } from 'vue-router'
import type { ZodObject } from 'zod'
import type { FiltersState, SortingState } from '~~/types/list'
import { z } from 'zod'

export default function parseListQuery(
  query: LocationQuery,
  filtersSchema?: ZodObject,
  sortableColumns?: string[],
  defaultPage: number = 1,
  defaultPageSize: number = 20,
) {
  const sortingSchema = sortableColumns
    ? z.object({
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
    : undefined

  const paginationSchema = z.object({
    page: z.coerce.number().int().positive().optional(),
    per_page: z.coerce.number().int().positive().optional(),
  })

  const filtersParsingResult = filtersSchema?.safeParse(query)
  const sortingParsingResult = sortingSchema?.safeParse(query)
  const paginationParsingResult = paginationSchema.safeParse(query)

  return {
    page: paginationParsingResult.data?.page ?? defaultPage,
    pageSize: paginationParsingResult.data?.per_page ?? defaultPageSize,
    filtersState: filtersParsingResult?.success ? convertRawFiltersToFiltersState(filtersParsingResult.data) : [],
    sortingState: sortingParsingResult?.success ? convertRawSortingToSortingState(sortingParsingResult.data.order) : [],
  }
}

function convertRawFiltersToFiltersState(rawFilters: Record<string, unknown>): FiltersState {
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
