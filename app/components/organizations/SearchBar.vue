<template>
  <AppSearchBar
    v-model="search"
    :items
    :max-results="4"
    :placeholder="$t('components.organizations.SearchBar.placeholder')"
    :loading="pending"
    :size="size"
    @apply="emit('apply', search)"
    @clear="emit('clear')"
  >
    <template #item="{ item }">
      <NuxtLinkLocale
        :to="`/organizations/${item.id}`"
        tabindex="-1"
      >
        <div class="flex gap-4 items-center">
          <NuxtImg
            :src="item.banner_url"
            :alt="item.name"
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
    <template #sideControl>
      <slot name="sideControl" />
    </template>
  </AppSearchBar>
</template>

<script setup lang="ts">
import type { FiltersState } from '~~/types/list'
import type { SearchBarVariants } from '../app/search-bar/variants'

const props = defineProps<{
  filtersState: FiltersState
  size?: SearchBarVariants['size']
}>()
const emit = defineEmits<{
  (e: 'clear'): void
  (e: 'apply', value?: string): void
}>()

const {
  search,
  items,
  filtersState: searchFiltersState,
  pending,
} = useSearch(
  '/api/organizations',
  'name',
  'filters[name]',
  50,
  [...props.filtersState],
  [],
  'organization-searchbar',
)

watch(() => props.filtersState, () => {
  searchFiltersState.value = [...props.filtersState]
})
</script>
