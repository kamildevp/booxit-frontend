<template>
  <div class="flex-1 justify-center">
    <ListSortingDesktop
      :active-sorting-count="activeSortingCount"
      :active-local-sorting-count="activeLocalSortingCount"
      @apply="setSortingState(localSortingState)"
      @clear="setSortingState([])"
      @close="resetLocalSortingState"
    >
      <ListSortingContent
        v-model:sorting-state="localSortingState"
        :sortable-columns="sortableColumns"
      />
    </ListSortingDesktop>
    <ListSortingMobile
      :active-sorting-count="activeSortingCount"
      :active-local-sorting-count="activeLocalSortingCount"
      @apply="setSortingState(localSortingState)"
      @clear="setSortingState([])"
      @close="resetLocalSortingState"
    >
      <ListSortingContent
        v-model:sorting-state="localSortingState"
        :sortable-columns="sortableColumns"
      />
    </ListSortingMobile>
  </div>
</template>

<script setup lang="ts">
import type { SortingState } from '~~/types/list'

interface Props {
  sortableColumns?: SortingState
}
defineProps<Props>()
const sortingState = defineModel<SortingState>('sortingState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()
const localSortingState = ref([...sortingState.value])
const activeSortingCount = computed(() => sortingState.value.length)
const activeLocalSortingCount = computed(() => localSortingState.value.length)

function setSortingState(state: SortingState) {
  sortingState.value = [...state]
  localSortingState.value = [...state]
  emit('apply')
}

function resetLocalSortingState() {
  localSortingState.value = [...sortingState.value]
}
</script>
