<template>
  <AppSearchBar
    v-model="search"
    :items="filteredItems"
    :max-results="4"
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

const props = defineProps<{
  initialSearch?: string
}>()
const { items, filtersState, pagesCount } = useStore(
  '/api/organizations',
  1,
  50,
  [{ id: 'filters[name]', value: props.initialSearch ?? '' }],
  [],
  true,
  'organization-searchbar',
)
const emit = defineEmits<{
  (e: 'apply', value?: string): void
}>()

const { contains } = useFilter({ sensitivity: 'base' })
const search = ref(props.initialSearch)
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

const updateSearch = useDebounceFn((value?: string) => {
  if (value !== undefined && manualSearchPrefix.value !== undefined && value.startsWith(manualSearchPrefix.value)) {
    return
  }
  else {
    filtersState.value = [{ id: 'filters[name]', value: value ?? '' }]
  }
}, 300)
</script>
