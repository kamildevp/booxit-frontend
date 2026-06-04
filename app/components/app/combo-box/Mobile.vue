<template>
  <UiDialog
    v-model:open="open"
    modal
  >
    <UiDialogTrigger as-child>
      <AppComboBoxInput
        v-model="modelValue"
        :listbox-id
        :placeholder
        :size
        class="md:hidden h-full"
        v-bind="$attrs"
        readonly
        :aria-expanded="open"
        @clear="emit('clear')"
      >
        <template #icon>
          <slot name="inputIcon" />
        </template>
      </AppComboBoxInput>
    </UiDialogTrigger>
    <UiDialogContent
      class="w-full h-dvh top-0 left-0 translate-0 max-w-none! flex flex-col rounded-none border-none pt-16 overflow-hidden overscroll-contain"
      disable-outside-pointer-events
      :show-close-button="false"
      :style="viewportHeight ? { height: `${viewportHeight}px` } : undefined"
      tabindex="-1"
    >
      <template #overlay>
        <DialogOverlay class="bg-background" />
      </template>
      <UiDialogHeader>
        <UiDialogTitle class="text-2xl">
          {{ placeholder }}
        </UiDialogTitle>
        <VisuallyHidden>
          <UiDialogDescription>{{ $t('components.app.combo_box.Mobile.dialog.description') }}</UiDialogDescription>
        </VisuallyHidden>
      </UiDialogHeader>
      <UiDialogClose as-child>
        <UiButton
          variant="ghost"
          size="icon-lg"
          class="absolute top-4 right-4"
          :aria-label="$t('components.app.combo_box.Mobile.dialog.close_button_label')"
        >
          <Icon
            name="ic:round-close"
            size="24"
          />
        </UiButton>
      </UiDialogClose>
      <AppComboBoxInput
        ref="input"
        v-model="modelValue"
        :listbox-id
        :placeholder
        size="lg"
        class="p-1 min-h-12"
        :aria-expanded="open"
        @apply="onApply"
        @clear="emit('clear')"
        @arrow-down="resultsComponentRef?.focusFirstItem"
        @arrow-up="resultsComponentRef?.focusLastItem"
        @vue:mounted="inputComponentRef?.focus()"
      >
        <template #icon>
          <slot name="inputIcon" />
        </template>
      </AppComboBoxInput>
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
    </UiDialogContent>
  </UiDialog>
</template>

<script setup lang="ts" generic="T">
import { VisuallyHidden } from 'reka-ui'
import type { ComboBoxVariants } from './variants'
import DialogOverlay from '~/components/ui/dialog/DialogOverlay.vue'

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
const viewportHeight = ref<number | undefined>(undefined)

const onViewportResize = () => {
  if (window.visualViewport) {
    viewportHeight.value = window.visualViewport.height
  }
}

onMounted(() =>
  window.visualViewport?.addEventListener('resize', onViewportResize),
)
onUnmounted(() => {
  window.visualViewport?.removeEventListener('resize', onViewportResize)
})

function onSelect(item: T) {
  open.value = false
  emit('select', item)
}

function onApply() {
  open.value = false
  emit('apply')
}
</script>
