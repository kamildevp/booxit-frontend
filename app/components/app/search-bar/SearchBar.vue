<template>
  <div class="flex relative">
    <div class="w-full">
      <div
        ref="input-wrapper"
        :class="[
          'h-full flex items-center rounded-l-full rounded-r-none border border-input bg-input/30 px-3',
          { 'border-primary': open },
        ]"
      >
        <Icon
          v-show="inputFocused || open"
          name="ic:round-search"
          :class="iconVariants({ size })"
          aria-hidden="true"
        />
        <UiInput
          ref="search-bar-input"
          v-model="modelValue"
          :placeholder="placeholder"
          :size="size"
          class="h-auto border-none bg-transparent! ring-0! px-2 py-0 shadow-none"
          role="combobox"
          :aria-expanded="open"
          aria-haspopup="listbox"
          :aria-controls="listboxId"
          @focus="onInputFocus"
          @click="open = true"
          @input="open = true"
          @blur="onBlur"
          @keydown.esc="closeAndFocusInput"
          @keydown.enter="apply"
          @keydown.down.prevent="focusFirstItem"
          @keydown.up.prevent="focusLastItem"
        />
        <UiButton
          v-show="modelValue && modelValue.length > 0"
          variant="ghost"
          :size="clearButtonSizes[size ?? 'default']"
          :aria-label="$t('components.app.SearchBar.clear_button_label')"
          @click="clear"
        >
          <Icon
            name="ic:round-close"
            :class="clearIconVariants({ size })"
          />
        </UiButton>
      </div>
    </div>
    <UiButton
      class="rounded-l-none"
      :size="size"
      :aria-label="$t('components.app.SearchBar.search_button_label')"
      @click="apply"
    >
      <Icon
        name="ic:round-search"
        :class="iconVariants({ size })"
      />
    </UiButton>
    <ul
      v-if="open"
      :id="listboxId"
      ref="results-list"
      :class="resultsListVariants({ size })"
      role="listbox"
      @keydown.down.prevent="focusNextItem"
      @keydown.up.prevent="focusPrevItem"
      @keydown.esc="closeAndFocusInput"
      @keydown.tab="open = false"
    >
      <li
        v-for="(item, indx) in displayedItems"
        :key="indx"
        class="hover:bg-accent hover:text-accent-foreground has-focus:bg-accent has-focus:text-accent-foreground  p-2 px-4"
        role="option"
        tabindex="-1"
        :aria-selected="activeItemIndex === indx"
        @focusin="activeItemIndex = indx"
        @focusout="activeItemIndex = undefined"
        @click="open = false"
      >
        <slot
          name="item"
          v-bind="{ item }"
        />
      </li>
      <li
        v-show="displayedItems.length === 0"
        class="p-2"
      >
        <slot name="empty">
          <div class="flex flex-col gap-1 items-center text-muted-foreground p-2">
            <Icon
              name="ic:round-search-off"
              size="48"
            />
            {{ $t('components.app.SearchBar.empty_text') }}
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { Variants } from './variants'
import { clearButtonSizes, clearIconVariants, iconVariants, resultsListVariants } from './variants'

interface Props {
  items: T[]
  placeholder?: string
  maxResults?: number
  size?: Variants
}
const props = defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'apply' | 'clear'): void
}>()

const listboxId = useId()
const open = ref(false)
const inputFocused = ref(false)
const activeItemIndex = ref<number | undefined>(undefined)
const inputWrapperElRef = useTemplateRef('input-wrapper')
const resultsListElRef = useTemplateRef('results-list')
const inputComponentRef = useTemplateRef('search-bar-input')
const displayedItems = computed(() => props.maxResults === undefined ? props.items : props.items.slice(0, props.maxResults))

function getListItems(): HTMLElement[] {
  const options = resultsListElRef.value?.querySelectorAll('li[role="option"]') ?? []
  return Array.from(options).map(li => li.querySelector('a, button, [tabindex]') ?? li as HTMLElement)
}

function onInputFocus() {
  open.value = true
  inputFocused.value = true
}

function onBlur(e: FocusEvent) {
  const next = e.relatedTarget as Node | null
  inputFocused.value = false

  if (!resultsListElRef.value?.contains(next) && !inputWrapperElRef.value?.contains(next)) {
    open.value = false
  }
}

function clear() {
  modelValue.value = ''
  inputComponentRef.value?.focus()
  emit('clear')
}

function apply() {
  open.value = false
  emit('apply')
}

function closeAndFocusInput() {
  open.value = false
  inputComponentRef.value?.focus()
}

function focusFirstItem() {
  if (!open.value) {
    return
  }
  getListItems()[0]?.focus()
}

function focusLastItem() {
  if (!open.value) {
    return
  }
  const items = getListItems()
  items[items.length - 1]?.focus()
}

function focusNextItem() {
  const items = getListItems()
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (index === items.length - 1) {
    closeAndFocusInput()
  }
  else {
    items[index + 1]?.focus()
  }
}

function focusPrevItem() {
  const items = getListItems()
  const index = items.indexOf(document.activeElement as HTMLElement)
  if (index === 0) {
    closeAndFocusInput()
  }
  else {
    items[index - 1]?.focus()
  }
}
</script>
