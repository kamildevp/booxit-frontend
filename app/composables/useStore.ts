import type { PaginatorRequest, PaginatorResponse } from '~~/types/api'
import type { FiltersState, SortingState } from '~~/types/list'

export default function<R extends PaginatorRequest>(
  path: R,
  initialPage: number = 1,
  initialPageSize: number = 20,
  initialFiltersState: FiltersState = [],
  initialSortingState: SortingState = [],
  autoRefresh: boolean = true,
  cacheKey: string = '',
) {
  const route = useRoute()
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

  const { data, pending, error, refresh } = useAuthFetch<PaginatorResponse<R>>(path, {
    query,
    watch: autoRefresh ? undefined : false,
    key: `${route.path}-${path}-${cacheKey}`,
  })

  const pagesCount = computed(() => (data.value)?.pages_count)
  const resultsCount = computed(() => (data.value)?.total)
  const items = computed(() => (data.value)?.items)

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
    items,
    page,
    pageSize,
    pagesCount,
    resultsCount,
    filtersState,
    sortingState,
    nextPage,
    prevPage,
    pending,
    error,
    refresh,
  }
}
