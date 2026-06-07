<template>
  <div class="contents">
    <AppSelectDesktop
      v-bind="$attrs"
      v-model="model"
      :entries
      :value-key
      :size
      :content-side-offset
      class="hidden md:flex"
      @update:model-value="(value) => onValueChanged(value as ET[VK])"
    >
      <template #trigger>
        <AppSelectTrigger
          :label="selectedEntry ? selectedEntry[labelKey] : undefined"
          :icon="selectedEntry && iconKey ? selectedEntry[iconKey] : undefined"
          :placeholder
          :size
        />
      </template>
      <template #item="{ item }">
        <AppSelectItem
          :label="item[labelKey]"
          :icon="iconKey ? item[iconKey] : undefined"
        />
      </template>
    </AppSelectDesktop>
    <AppSelectMobile
      v-bind="$attrs"
      v-model="model"
      :entries
      :value-key
      :size
      class="md:hidden"
      @update:model-value="(value) => onValueChanged(value as ET[VK])"
    >
      <template #trigger>
        <AppSelectTrigger
          :label="selectedEntry ? selectedEntry[labelKey] : undefined"
          :icon="selectedEntry && iconKey ? selectedEntry[iconKey] : undefined"
          :placeholder
          :size
        />
      </template>
      <template #item="{ item }">
        <AppSelectItem
          :label="item[labelKey]"
          :icon="iconKey ? item[iconKey] : undefined"
        />
      </template>
    </AppSelectMobile>
  </div>
</template>

<script setup lang="ts"
  generic="
    LK extends string,
    VK extends string,
    IK extends string = 'icon',
    ET extends Entry<LK, VK, IK> = Entry<LK, VK, IK>
  "
>
import type { SelectVariants } from '~/components/ui/select'
import type { Entry } from './types'

export interface Props<
  LabelKey extends string,
  ValueKey extends string,
  IconKey extends string,
  EntryType extends Entry<LabelKey, ValueKey, IconKey>,
> {
  labelKey: LabelKey
  valueKey: ValueKey
  iconKey?: IconKey
  entries: EntryType[]
  placeholder?: string
  defaultValue?: EntryType[ValueKey]
  size?: SelectVariants['size']
  contentSideOffset?: number
}

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props<LK, VK, IK, ET>>()
const model = defineModel<ET[VK]>()
model.value = model.value !== undefined ? model.value : props.defaultValue
const selectedEntry = computed(() => props.entries.find(entry => entry[props.valueKey] === model.value))

const emit = defineEmits<{
  (e: 'valueChanged', value: ET[VK]): void
}>()

function onValueChanged(newValue: ET[VK]) {
  emit('valueChanged', newValue)
}
</script>
