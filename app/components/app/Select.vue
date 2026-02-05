<template>
  <div>
    <UiSelect
      :default-value="defaultValue"
      @update:model-value="(value) => onValueChanged(value as ET[VK])"
    >
      <UiSelectTrigger>
        <UiSelectValue :placeholder="placeholder">
          <div
            v-if="selectedEntry"
            class="flex items-center gap-1 min-w-20"
          >
            <Icon
              v-if="iconKey && selectedEntry[iconKey]"
              class="border bg-cover"
              size="16"
              :name="selectedEntry[iconKey]"
            />
            {{ selectedEntry && ($te(selectedEntry[labelKey]) ? $t(selectedEntry[labelKey]) : selectedEntry[labelKey]) }}
          </div>
        </UiSelectValue>
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="entry in entries"
          :key="entry[valueKey]"
          :value="entry[valueKey]"
        >
          <div class="flex items-center gap-1">
            <Icon
              v-if="iconKey && entry[iconKey]"
              class="border bg-cover"
              size="16"
              :name="entry[iconKey]"
            />
            {{ $te(entry[labelKey]) ? $t(entry[labelKey]) : entry[labelKey] }}
          </div>
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script setup lang="ts"
  generic="
    LK extends string,
    VK extends string,
    IK extends string,
    ET extends Entry<LK, VK, IK>
  "
>
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
}

const props = defineProps<Props<LK, VK, IK, ET>>()
const defaultEntry = props.entries.find(entry => props.defaultValue != undefined && entry[props.valueKey] === props.defaultValue)
const selectedValue = ref(defaultEntry ? defaultEntry[props.valueKey] : undefined)
const selectedEntry = computed(() => props.entries.find(entry => entry[props.valueKey] === selectedValue.value))

const emit = defineEmits<{
  (e: 'valueChanged', value: ET[VK]): void
}>()

function onValueChanged(newValue: ET[VK]) {
  selectedValue.value = newValue
  emit('valueChanged', newValue)
}
</script>

<script lang="ts">
export type Entry<
  LabelKey extends string,
  ValueKey extends string,
  IconKey extends string,
  ValueType extends string | number = string | number,
> = {
  [K in LabelKey]: string
} & {
  [K in ValueKey]: ValueType
} & {
  [K in IconKey]?: string
}
</script>
