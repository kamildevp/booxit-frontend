<template>
  <div class="flex flex-col overflow-hidden">
    <div class="flex-1 p-4 overflow-auto">
      <slot />
    </div>
    <div :class="[variants({ size })]">
      <UiButton
        v-for="button, indx in buttons"
        :key="indx"
        :variant="button.variant"
        class="gap-1 p-2 flex-1"
        @click="button.onClick"
      >
        <Icon
          :name="button.icon"
          size="20"
        />
        {{ $t(button.text) }}
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

const variants = cva(
  'flex justify-around border-t gap-2',
  {
    variants: {
      size: {
        default: 'p-2 text-lg',
        lg: 'p-4 text-lg',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
)
interface Props {
  size?: VariantProps<typeof variants>['size']
}
defineProps<Props>()
const emit = defineEmits<{
  (e: 'apply' | 'clear'): void
}>()

const buttons = [
  {
    text: 'components.list.FiltersContainer.button.clear.text',
    icon: 'ic:round-close',
    variant: 'ghost',
    onClick: () => emit('clear'),
  },
  {
    text: 'components.list.FiltersContainer.button.apply.text',
    icon: 'ic:round-manage-search',
    variant: 'default',
    onClick: () => emit('apply'),
  },
] as const
</script>
