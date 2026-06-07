<template>
  <div class="flex flex-col gap-2 md:gap-0 md:flex-row">
    <div class="md:flex-1 flex flex-col items-center md:gap-1 bg-input/30 border md:border-r-0 rounded-xl md:rounded-full md:rounded-r-none md:flex-row has-focus:border-primary">
      <AppComboBox
        v-model="model"
        :items="items"
        class="border-none bg-transparent min-h-12 md:min-h-auto"
        :placeholder
        :max-results
        :loading
        :size
        @apply="emit('apply')"
        @clear="emit('clear')"
        @select="(value) => emit('select', value)"
      >
        <template #item="slotProps">
          <slot
            name="item"
            v-bind="slotProps"
          />
        </template>
        <template #inputIcon>
          <Icon
            name="ic:round-search"
            :class="[
              'mr-1 ml-2',
              iconVariants({ size }),
            ]"
            aria-hidden="true"
          />
        </template>
      </AppComboBox>
      <slot name="sideControl" />
    </div>
    <UiButton
      class="md:h-auto! md:rounded-l-none"
      :size="size"
      :aria-label="$t('components.app.search_bar.SearchBar.search_button_label')"
      @click="emit('apply')"
    >
      <Icon
        name="ic:round-search"
        :class="iconVariants({ size })"
      />
      <span class="md:hidden text-lg">
        {{ $t('components.app.search_bar.SearchBar.search_button_label') }}
      </span>
    </UiButton>
  </div>
</template>

<script setup lang="ts" generic="T">
import type { ButtonVariants } from '~/components/ui/button'
import type { ComboBoxVariants } from '~/components/app/combo-box/variants'
import { iconVariants } from '~/components/app/combo-box/variants'

interface Props {
  items: T[]
  placeholder?: string
  maxResults?: number
  loading?: boolean
  size?: ComboBoxVariants['size'] & ButtonVariants['size']
}
defineProps<Props>()
const model = defineModel<string>()
const emit = defineEmits<{
  (e: 'select', item: T): void
  (e: 'apply' | 'clear'): void
}>()
</script>
