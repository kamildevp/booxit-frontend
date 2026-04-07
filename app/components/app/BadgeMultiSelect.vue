<template>
  <div class="flex flex-col gap-1">
    <template
      v-for="entry, indx in entries"
      :key="indx"
    >
      <UiButton
        v-if="!visibleItemsCount || allEntriesVisible || indx < visibleItemsCount"
        variant="outline"
        :class="[
          'text-sm justify-baseline',
          isSelected(entry.value) ? 'border-primary! text-primary hover:text-primary' : '',
        ]"
        @click="toggleSelected(entry.value)"
      >
        <Icon
          v-if="entry.icon"
          :name="entry.icon"
          size="24"
        />
        {{ $te(entry.text) ? $t(entry.text) : entry.text }}
      </UiButton>
    </template>
    <UiButton
      v-if="visibleItemsCount !== undefined && visibleItemsCount < entries.length"
      variant="link"
      class="hover:no-underline"
      @click="allEntriesVisible = !allEntriesVisible"
    >
      {{ allEntriesVisible ? $t('components.app.BadgeMultiSelect.show_less') : $t('components.app.BadgeMultiSelect.show_more') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts" generic="T extends NonNullable<AcceptableValue>">
import type { AcceptableValue } from 'reka-ui'

type Entry = {
  text: string
  icon?: string
  value: T
}

interface Props {
  entries: Entry[]
  visibleItemsCount?: number
}
defineProps<Props>()
const model = defineModel<T[]>({ default: [] })
const allEntriesVisible = ref(false)

function toggleSelected(value: T) {
  if (isSelected(value)) {
    model.value = model.value.filter(el => el != value)
  }
  else {
    model.value = [...model.value, value]
  }
}

function isSelected(value: T) {
  return model.value.includes(value)
}
</script>
