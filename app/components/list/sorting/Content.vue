<template>
  <div class="flex flex-col gap-2">
    <UiBadge
      v-for="sort, indx in sortingState"
      :key="indx"
      variant="outline"
      class="border-primary text-primary text-sm w-full justify-between p-2 px-4"
    >
      {{ sort.desc ? $t(`${translationPath}.sort_text.-${sort.id}`) : $t(`${translationPath}.sort_text.${sort.id}`) }}
      <UiButton
        variant="ghost"
        class="text-primary hover:bg-transparent! w-4 h-4"
        size="icon-sm"
        @click="removeSorting(sort)"
      >
        <Icon name="ic:baseline-close" />
      </UiButton>
    </UiBadge>
    <AppSelect
      v-if="entries.length > 0"
      :entries="entries"
      label-key="name"
      value-key="value"
      :placeholder="$t(`${translationPath}.select.placeholder`)"
      :model-value="selectValue"
      trigger-cls="text-primary! border-primary! w-full"
      @value-changed="(value) => addSorting(value)"
    />
  </div>
</template>

<script setup lang="ts">
import type { ColumnSort, SortingState } from '~~/types/list'

const translationPath = 'components.list.sorting.Content'
interface Props {
  sortableColumns?: SortingState
}
const props = defineProps<Props>()
const sortingState = defineModel<SortingState>('sortingState', { required: true })
const entries = computed(() => props.sortableColumns?.filter(
  item => !sortingState.value.some(sort => sort.id == item.id && sort.desc == sort.desc,
  )).map(sort => ({
  name: sort.desc ? `${translationPath}.sort_text.-${sort.id}` : `${translationPath}.sort_text.${sort.id}`,
  value: sort,
})) ?? [],
)
const selectValue = ref<ColumnSort | undefined>(undefined)

function addSorting(sort: ColumnSort) {
  sortingState.value.push(sort)
  selectValue.value = undefined
}

function removeSorting(sort: ColumnSort) {
  sortingState.value = sortingState.value.filter(item => !(item.id == sort.id && item.desc == sort.desc))
}
</script>
