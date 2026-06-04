<template>
  <div class="contents">
    <ul
      v-if="!loading"
      :id="id"
      ref="results-list"
      class="flex flex-col gap-1 w-full overflow-auto md:max-h-70"
      role="listbox"
      @keydown.down.prevent="focusNextItem"
      @keydown.up.prevent="focusPrevItem"
      @keydown.esc="emit('navigateOut')"
    >
      <li
        v-for="(item, indx) in displayedItems"
        :key="indx"
        class="hover:bg-accent hover:text-accent-foreground has-focus:bg-accent has-focus:text-accent-foreground p-2 px-4"
        role="option"
        tabindex="-1"
        :aria-selected="activeItemIndex === indx"
        @focusin="activeItemIndex = indx"
        @focusout="activeItemIndex = undefined"
        @click="emit('select', item)"
        @keydown.enter="emit('select', item)"
      >
        <slot
          name="item"
          v-bind="{ item }"
        />
      </li>
    </ul>
    <UiSpinner
      v-else
      class="size-10 m-4 mx-auto"
    />
    <template v-if="displayedItems.length === 0">
      <slot name="empty">
        <AppComboBoxEmptyResults />
      </slot>
    </template>
  </div>
</template>

<script setup lang="ts" generic="T">
interface Props {
  id: string
  items: T[]
  loading?: boolean
  maxResults?: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'select', item: T): void
  (e: 'navigateOut'): void
}>()
const resultsListElRef = useTemplateRef('results-list')
const displayedItems = computed(() => props.maxResults === undefined ? props.items : props.items.slice(0, props.maxResults))
const activeItemIndex = ref<number | undefined>(undefined)

function getListItems(): HTMLElement[] {
  const options = resultsListElRef.value?.querySelectorAll('li[role="option"]') ?? []
  return Array.from(options).map(li => (li.querySelector('a, button, [tabindex]') ?? li) as HTMLElement)
}

function focusFirstItem() {
  getListItems()[0]?.focus()
}

function focusLastItem() {
  const items = getListItems()
  items[items.length - 1]?.focus()
}

function focusNextItem() {
  const items = getListItems()
  const index = activeItemIndex.value
  if (index === undefined) {
    return
  }

  if (index === items.length - 1) {
    emit('navigateOut')
  }
  else {
    items[index + 1]?.focus()
  }
}

function focusPrevItem() {
  const items = getListItems()
  const index = activeItemIndex.value
  if (index === undefined) {
    return
  }

  if (index === 0) {
    emit('navigateOut')
  }
  else {
    items[index - 1]?.focus()
  }
}

defineExpose({ focusFirstItem, focusLastItem })
</script>
