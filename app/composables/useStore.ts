import type { FetchResult } from '#app'
import type { PaginatorRequest } from '~~/types/api'
import type { ColumnFiltersState, SortingState } from '@tanstack/vue-table'

type DataT = FetchResult<PaginatorRequest, 'get'> | undefined

export default function<R extends PaginatorRequest>(
  path: R,
  initialPage: number = 1,
  initialPageSize: number = 20,
  initialFiltersState: ColumnFiltersState = [],
  initialSortingState: SortingState = [],
) {
  const page = ref(initialPage)
  const pageSize = ref(initialPageSize)
  const filtersState = ref(initialFiltersState)
  const sortingState = ref(initialSortingState)

  const query = computed(() => createListQuery(
    page.value,
    pageSize.value,
    filtersState.value,
    sortingState.value,
  ))

  const { data, pending, error } = useAuthFetch(path, {
    query,
  })

  const pagesCount = computed(() => (data.value as DataT)?.pages_count)

  function nextPage() {
    if (pagesCount.value && page.value < pagesCount.value) {
      page.value = page.value + 1
    }
  }

  function prevPage() {
    if (page.value > 1) {
      page.value = page.value - 1
    }
  }

  return {
    data,
    page,
    pageSize,
    pagesCount,
    filtersState,
    sortingState,
    nextPage,
    prevPage,
    pending,
    error,
  }
}
