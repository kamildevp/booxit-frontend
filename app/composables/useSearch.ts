import type { PaginatorItem, PaginatorRequest } from '~~/types/api'
import type { PickByValue } from '~~/types/base'
import type { FiltersState, SortingState } from '~~/types/list'
import { useFilter } from 'reka-ui'
import { useDebounceFn } from '@vueuse/core'

export function useSearch<
  R extends PaginatorRequest,
  SF extends keyof PickByValue<PaginatorItem<R>, string>,
>(
  path: R,
  searchField: SF,
  searchFilterName: string,
  perPage: number = 50,
  initialFiltersState: FiltersState = [],
  initialSortingState: SortingState = [],
  cacheKey: string = '',
) {
  const {
    items,
    pending,
    error,
    pagesCount,
    filtersState,
    sortingState,
  } = useStore(
    path,
    1,
    perPage,
    [...initialFiltersState],
    [...initialSortingState],
    true,
    cacheKey,
  )

  const { contains } = useFilter({ sensitivity: 'base' })
  const search = ref(getSearchFilterValue())
  const localFilterPrefix = ref<string | undefined>(undefined)
  const filteredItems = computed(() => getFilteredItems())

  watch(filtersState, () => {
    search.value = getSearchFilterValue()
  })

  watch(items, () => {
    if (pagesCount.value === undefined || pagesCount.value > 1) {
      localFilterPrefix.value = undefined
    }
    else {
      localFilterPrefix.value = search.value ?? ''
    }
  }, { immediate: true })

  const updateSearch = useDebounceFn((value?: string) => {
    if (value !== undefined && localFilterPrefix.value !== undefined && value.startsWith(localFilterPrefix.value)) {
      return
    }
    else {
      updateFilters()
    }
  }, 300)

  watch(search, (value) => {
    if (value !== getSearchFilterValue()) {
      updateSearch(value)
    }
  })

  function getSearchFilterValue() {
    return filtersState.value.find(el => el.id === searchFilterName)?.value as string | undefined
  }

  function getFilteredItems() {
    const searchVal = search.value
    if (searchVal && localFilterPrefix.value !== undefined && searchVal.startsWith(localFilterPrefix.value)) {
      return (items.value ?? []).filter(item => contains(item[searchField] as string, searchVal))
    }
    else {
      return items.value ?? []
    }
  }

  function updateFilters() {
    const newValue = [...filtersState.value].filter(el => el.id !== searchFilterName)
    if (search.value !== undefined && search.value.length > 0) {
      newValue.push({ id: searchFilterName, value: search.value })
    }
    filtersState.value = newValue
  }

  return {
    search,
    items: filteredItems,
    filtersState,
    sortingState,
    pending,
    error,
    pagesCount,
  }
}
