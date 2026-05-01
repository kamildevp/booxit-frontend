<template>
  <div class="flex">
    <div
      ref="search-bar-wrapper"
      class="w-full relative"
    >
      <div
        :class="[
          'h-full flex items-center rounded-l-full rounded-r-none border border-input bg-input/30 px-2',
          { 'border-primary': open },
        ]"
      >
        <Icon
          v-show="open"
          name="ic:round-search"
          size="24"
        />
        <UiInput
          ref="search-bar-input"
          v-model="modelValue"
          :placeholder="placeholder"
          class="h-auto border-none bg-transparent! ring-0! px-2 py-0 shadow-none"
          @focus="open = true"
          @click="open = true"
          @input="open = true"
          @blur="onBlur"
          @keydown.esc="open = false"
          @keydown.enter="emit('apply')"
        />
        <UiButton
          v-show="modelValue && modelValue.length > 0"
          variant="ghost"
          size="icon-sm"
          @click="clear"
        >
          <Icon
            name="ic:round-close"
            size="20"
          />
        </UiButton>
      </div>
      <ul
        v-show="open"
        class="flex flex-col gap-1 absolute top-11 z-5 rounded-xl bg-popover border dark:border-none w-full overflow-auto max-h-70"
        role="listbox"
      >
        <li
          v-for="item, indx in displayedItems"
          :key="indx"
          class="hover:bg-accent hover:text-accent-foreground p-2 px-4"
          role="option"
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
    <UiButton
      class="rounded-l-none"
      @click="emit('apply')"
    >
      <Icon
        name="ic:round-search"
        size="24"
      />
    </UiButton>
  </div>
</template>

<script setup lang="ts" generic="T extends AcceptableValue">
import type { AcceptableValue } from 'reka-ui'

interface Props {
  items: T[]
  placeholder?: string
  maxResults?: number
}
const props = defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'apply'): void
}>()

const open = ref(false)
const wrapperElRef = useTemplateRef('search-bar-wrapper')
const inputComponentRef = useTemplateRef('search-bar-input')
const displayedItems = computed(() => props.maxResults === undefined ? props.items : props.items.slice(0, props.maxResults))

function onBlur(e: FocusEvent) {
  const next = e.relatedTarget as Node | null

  if (!wrapperElRef.value?.contains(next)) {
    open.value = false
  }
}

function clear() {
  modelValue.value = undefined
  inputComponentRef.value?.focus()
}
</script>
