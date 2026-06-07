<template>
  <UiSelect v-model="model">
    <UiSelectTrigger
      v-bind="$attrs"
      as-child
      :size
    >
      <slot name="trigger" />
    </UiSelectTrigger>
    <UiSelectContent :side-offset="contentSideOffset">
      <UiSelectItem
        v-for="entry in entries"
        :key="entry[valueKey].toString()"
        :value="entry[valueKey]"
        :size
      >
        <slot
          name="item"
          v-bind="{ item: entry }"
        />
      </UiSelectItem>
    </UiSelectContent>
  </UiSelect>
</template>

<script setup lang="ts"
  generic="
    VK extends string,
    ET extends Record<VK, NonNullable<AcceptableValue>>
  "
>
import type { SelectVariants } from '~/components/ui/select'
import type { AcceptableValue } from 'reka-ui'

interface Props<
  ValueKey extends string,
  EntryType extends Record<ValueKey, NonNullable<AcceptableValue>>,
> {
  valueKey: ValueKey
  entries: EntryType[]
  size?: SelectVariants['size']
  contentSideOffset?: number
}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props<VK, ET>>()
const model = defineModel<ET[VK]>()
</script>
