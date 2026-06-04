<template>
  <div class="flex bg-input/30 rounded-full overflow-hidden border has-focus:border-primary">
    <div class="flex-1 flex items-center relative">
      <slot name="icon">
        <span class="mr-5" />
      </slot>
      <UiInput
        ref="input"
        v-model="modelValue"
        :placeholder
        :size
        :class="[
          'border-none bg-transparent! ring-0! px-0 py-1 shadow-none mr-8',
          { 'pointer-events-none': readonly },
        ]"
        role="combobox"
        :aria-label="placeholder"
        :aria-expanded
        aria-haspopup="listbox"
        :aria-controls="listboxId"
        :readonly
        @focus="emit('focus')"
        @keydown.enter="apply"
        @keydown.down.prevent="emit('arrow-down')"
        @keydown.up.prevent="emit('arrow-up')"
      />
      <UiButton
        v-show="modelValue && modelValue.length > 0"
        variant="ghost"
        class="size-auto p-1 absolute top-1/2 right-1 -translate-y-1/2 "
        :aria-label="$t('components.app.combo_box.Input.clear_button_label')"
        @click="clear"
      >
        <Icon
          name="ic:round-close"
          :class="clearIconVariants({ size })"
        />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ComboBoxVariants } from './variants'
import { clearIconVariants } from './variants'

interface Props {
  listboxId: string
  placeholder?: string
  size?: ComboBoxVariants['size']
  readonly?: boolean
  ariaExpanded?: boolean
}
defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'focus' | 'apply' | 'clear' | 'arrow-up' | 'arrow-down'): void
}>()

const inputComponentRef = useTemplateRef('input')

function focus() {
  inputComponentRef.value?.focus()
}

function clear() {
  modelValue.value = ''
  focus()
  emit('clear')
}

function apply() {
  inputComponentRef.value?.blur()
  emit('apply')
}

defineExpose({ focus })
</script>
