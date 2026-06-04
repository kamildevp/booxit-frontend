<template>
  <div class="h-full w-full">
    <AppComboBoxDesktop
      v-bind="{ ...props, ...$attrs }"
      v-model="modelValue"
      @select="(item) => emit('select', item)"
      @apply="emit('apply')"
      @clear="emit('clear')"
    >
      <template #inputIcon>
        <slot name="inputIcon" />
      </template>
      <template #item="slotProps">
        <slot
          name="item"
          v-bind="slotProps"
        />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </AppComboBoxDesktop>
    <AppComboBoxMobile
      v-bind="{ ...props, ...$attrs }"
      v-model="modelValue"
      @select="(item) => emit('select', item)"
      @apply="emit('apply')"
      @clear="emit('clear')"
    >
      <template #inputIcon>
        <slot name="inputIcon" />
      </template>
      <template #item="slotProps">
        <slot
          name="item"
          v-bind="slotProps"
        />
      </template>
      <template #empty>
        <slot name="empty" />
      </template>
    </AppComboBoxMobile>
  </div>
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
const props = defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'select', item: T): void
  (e: 'apply' | 'clear'): void
}>()
</script>
