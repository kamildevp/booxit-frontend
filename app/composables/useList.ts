import type { PaginatorItem, PaginatorRequest } from '~~/types/api'
import type { ZodObject } from 'zod'
import type { SortingState } from '~~/types/list'

export function useList<R extends PaginatorRequest>(
  path: R,
  filtersSchema?: ZodObject,
  sortableColumns?: SortingState,
  appendDataOnPageChange: boolean = false,
) {
  const route = useRoute()
  const router = useRouter()
  const parsedQuery = computed(() => parseListQuery(route.query, filtersSchema, sortableColumns))
  const dataAcc: Ref<PaginatorItem<R>[] | undefined> = ref(undefined)
  const {
    items,
    pending,
    error,
    resultsCount,
    page,
    pageSize,
    pagesCount,
    filtersState,
    sortingState,
    refresh,
  } = useStore(
    path,
    parsedQuery.value.page,
    parsedQuery.value.pageSize,
    [...parsedQuery.value.filtersState],
    [...parsedQuery.value.sortingState],
    false,
  )

  const data = computed(() => !appendDataOnPageChange || !dataAcc.value ? items.value : dataAcc.value)

  if (appendDataOnPageChange) {
    watch(items, value => updateDataAcc(value), {
      immediate: true,
    })
  }

  watch(page, () => {
    updateQuery(!appendDataOnPageChange)
  })

  watch(pageSize, () => {
    if (appendDataOnPageChange) {
      resetData()
    }
    updateQuery()
  })

  watch(parsedQuery, async (value) => {
    filtersState.value = [...value.filtersState]
    sortingState.value = [...value.sortingState]
    page.value = value.page
    pageSize.value = value.pageSize
    await refresh()
  })

  function updateDataAcc(value?: PaginatorItem<R>[]) {
    if (!value) {
      return
    }

    dataAcc.value = [...(dataAcc.value ?? []), ...value]
  }

  function resetData() {
    dataAcc.value = undefined
    page.value = 1
  }

  function applyFiltersAndSorting() {
    resetData()
    updateQuery()
  }

  function updateQuery(push: boolean = true) {
    const query = createListQuery(page.value, pageSize.value, filtersState.value, sortingState.value)
    if (push) {
      router.push({ query })
    }
    else {
      router.replace({ query })
    }
  }

  return {
    data,
    pending,
    error,
    resultsCount,
    page,
    pageSize,
    pagesCount,
    filtersState,
    sortingState,
    applyFiltersAndSorting,
  }
}
