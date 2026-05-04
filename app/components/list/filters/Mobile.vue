<template>
  <div class="xl:hidden flex flex-1 justify-center">
    <UiDrawer v-model:open="open">
      <UiDrawerTrigger as-child>
        <UiButton
          class="gap-1 text-lg max-w-36 w-full"
          variant="outline"
        >
          <Icon
            name="ic:round-tune"
            size="24"
          />
          {{ $t('components.list.filters.Mobile.drawer_trigger_text') }}
          <UiBadge
            v-show="activeFiltersCount > 0"
            class="ml-2"
            variant="destructive"
          >
            {{ activeFiltersCount }}
          </UiBadge>
        </UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <UiDrawerHeader>
          <UiDrawerTitle class="text-center text-lg">
            {{ $t('components.list.filters.Mobile.drawer_title') }}
          </UiDrawerTitle>
          <UiDrawerDescription />
        </UiDrawerHeader>
        <ListFiltersContainer
          :active-filters-count="activeFiltersCount"
          @apply="setFiltersState(localFiltersState)"
          @clear="setFiltersState([])"
        >
          <slot v-bind="{ getFiltersUtils, filtersState: localFiltersState }" />
        </ListFiltersContainer>
        <UiDrawerFooter class="hidden" />
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script setup lang="ts">
import type { ZodObject } from 'zod'
import { getFilter, removeFilter, setFilter } from '~/utils/listFiltersUtils'
import type { FilterKey, FiltersState, FilterValueType } from '~~/types/list'

const filtersState = defineModel<FiltersState>('filtersState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()
const localFiltersState = ref([...filtersState.value])
const activeFiltersCount = computed(() => filtersState.value.filter(el => !Array.isArray(el.value) || el.value.length > 0).length)

const open = ref(false)
watch(open, () => {
  resetLocalFiltersState()
})

function setFiltersState(state: FiltersState) {
  filtersState.value = [...state]
  localFiltersState.value = [...state]
  emit('apply')
  open.value = false
}

function resetLocalFiltersState() {
  localFiltersState.value = [...filtersState.value]
}

const getFiltersUtils = <S extends ZodObject>() => ({
  getFilter: <K extends FilterKey<S>>(id: K): FilterValueType<S, K> => getFilter(localFiltersState.value, id),
  removeFilter: <K extends FilterKey<S>>(id: K) => { localFiltersState.value = removeFilter(localFiltersState.value, id) },
  setFilter: <K extends FilterKey<S>>(id: K, value: FilterValueType<S, K>) => { localFiltersState.value = setFilter(localFiltersState.value, id, value) },
})
</script>
