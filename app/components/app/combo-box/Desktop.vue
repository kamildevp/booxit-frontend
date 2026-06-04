<template>
  <UiPopover v-model:open="open">
    <UiPopoverTrigger as-child>
      <div class="hidden md:block h-full">
        <AppComboBoxInput
          ref="input"
          v-model="modelValue"
          :listbox-id
          :placeholder
          :size
          class="h-full"
          v-bind="$attrs"
          @click.stop
          @focus="open = true"
          @update:model-value="open = true"
          @apply="onApply"
          @clear="emit('clear')"
          @arrow-down="resultsComponentRef?.focusFirstItem"
          @arrow-up="resultsComponentRef?.focusLastItem"
        >
          <template #icon>
            <slot name="inputIcon" />
          </template>
        </AppComboBoxInput>
      </div>
    </UiPopoverTrigger>
    <UiPopoverContent class="p-0 overflow-hidden w-(--reka-popover-trigger-width)">
      <AppComboBoxResults
        :id="listboxId"
        ref="results"
        :items
        :loading
        :max-results
        @select="onSelect"
        @navigate-out="inputComponentRef?.focus"
      >
        <template #item="slotProps">
          <slot
            name="item"
            v-bind="slotProps"
          />
        </template>
        <template #empty>
          <slot name="empty" />
        </template>
      </AppComboBoxResults>
    </UiPopoverContent>
  </UiPopover>
</template>

<script setup lang="ts" generic="T">
import type { ComboBoxVariants } from './variants'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  items: T[]
  placeholder?: string
  loading?: boolean
  maxResults?: number
  size?: ComboBoxVariants['size']
}
defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'select', item: T): void
  (e: 'apply' | 'clear'): void
}>()

const listboxId = useId()
const open = ref(false)
const inputComponentRef = useTemplateRef('input')
const resultsComponentRef = useTemplateRef('results')

function onSelect(item: T) {
  open.value = false
  emit('select', item)
}

function onApply() {
  open.value = false
  emit('apply')
}
</script>
