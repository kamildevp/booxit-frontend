<template>
  <AppSearchBar
    v-model="search"
    :items="filteredItems"
    :max-results="4"
    :placeholder="$t('components.organizations.SearchBar.placeholder')"
    @apply="emit('apply', search)"
  >
    <template #item="{ item }">
      <NuxtLinkLocale :to="`/organizations/${item.id}`">
        <div class="flex gap-4 items-center">
          <NuxtImg
            :src="item.banner_url"
            alt="Banner"
            class="object-cover rounded-lg"
            format="webp"
            height="40"
            width="40"
          />
          <div>
            <div>
              {{ item.name }}
            </div>
            <div class="flex items-center text-muted-foreground text-sm gap-1">
              <Icon
                name="ic:baseline-location-on"
                class="text-green-600"
              />
              {{ item.address.formatted_address }}
            </div>
          </div>
        </div>
      </NuxtLinkLocale>
    </template>
  </AppSearchBar>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useFilter } from 'reka-ui'
import type { FiltersState } from '~~/types/list'

const props = defineProps<{
  filtersState: FiltersState
}>()
const { items, filtersState: searchFiltersState, pagesCount } = useStore(
  '/api/organizations',
  1,
  50,
  [...props.filtersState],
  [],
  true,
  'organization-searchbar',
)
const emit = defineEmits<{
  (e: 'apply', value?: string): void
}>()

const { contains } = useFilter({ sensitivity: 'base' })
const search = ref(getNameFilterValue())
const manualSearchPrefix = ref<string | undefined>(undefined)
const filteredItems = computed(() => {
  const searchVal = search.value
  if (searchVal && manualSearchPrefix.value !== undefined && searchVal.startsWith(manualSearchPrefix.value)) {
    return (items.value ?? []).filter(item => contains(item.name, searchVal))
  }
  else {
    return items.value ?? []
  }
})

watch(() => props.filtersState, () => {
  search.value = getNameFilterValue()
  updateSearchFiltersState()
})

watch(pagesCount, (value) => {
  if (value && value > 1) {
    manualSearchPrefix.value = undefined
  }
  else {
    manualSearchPrefix.value = search.value ?? ''
  }
}, { immediate: true })

watch(search, (value) => {
  updateSearch(value)
})

function getNameFilterValue() {
  return props.filtersState.find(el => el.id === 'filters[name]')?.value as string | undefined
}

function updateSearchFiltersState() {
  const newValue = [...props.filtersState].filter(el => el.id !== 'filters[name]')
  newValue.push({ id: 'filters[name]', value: search.value })
  searchFiltersState.value = newValue
}

const updateSearch = useDebounceFn((value?: string) => {
  if (value !== undefined && manualSearchPrefix.value !== undefined && value.startsWith(manualSearchPrefix.value)) {
    return
  }
  else {
    updateSearchFiltersState()
  }
}, 300)
</script>
