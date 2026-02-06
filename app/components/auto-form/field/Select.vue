<template>
  <VeeField
    v-slot="{ field, errors }"
    :name="name"
  >
    <UiField
      :data-invalid="!!errors.length"
      class="gap-2"
    >
      <UiFieldLabel :for="field.name">
        {{ $t(`${translationPath}.label`) }}
      </UiFieldLabel>
      <AppSelect
        :id="field.name"
        :label-key="labelKey"
        :value-key="valueKey"
        :entries="entries"
        :icon-key="iconKey"
        :default-value="defaultValue"
        :placeholder="placeholder"
        :aria-invalid="!!errors.length"
        :model-value="field.value"
        @update:model-value="field.onChange"
      />
      <UiFieldDescription>
        {{ $te(`${translationPath}.description`) ? $t(`${translationPath}.description`) : '' }}
      </UiFieldDescription>
      <UiFieldError
        v-if="errors.length"
        :errors="errors"
      />
    </UiField>
  </VeeField>
</template>

<script setup lang="ts"
  generic="
    LK extends string,
    VK extends string,
    IK extends string,
    ET extends Entry<LK, VK, IK>
  "
>
import type { BaseFieldProps } from '../types'
import { Field as VeeField } from 'vee-validate'
import type { Entry } from '~/components/app/Select.vue'

export interface Props<
  LabelKey extends string,
  ValueKey extends string,
  IconKey extends string,
  EntryType extends Entry<LabelKey, ValueKey, IconKey> = Entry<LabelKey, ValueKey, IconKey>,
> extends BaseFieldProps<EntryType[ValueKey]> {
  labelKey: LabelKey
  valueKey: ValueKey
  iconKey?: IconKey
  entries: EntryType[]
  placeholder?: string
  defaultValue?: EntryType[ValueKey]
}

defineProps<Props<LK, VK, IK, ET>>()
</script>
