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
      <UiInput
        :id="field.name"
        :type="type"
        :placeholder="placeholder"
        v-bind="field"
        :aria-invalid="!!errors.length"
        :default-value="defaultValue"
        :autocomplete="autocomplete"
        :spellcheck="spellcheck"
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

<script setup lang="ts">
import type { BaseFieldProps } from '../types'
import { Field as VeeField } from 'vee-validate'

export interface Props extends BaseFieldProps<string> {
  type?: string
  placeholder?: string
  autocomplete?: string
  spellcheck?: string
}

defineProps<Props>()
</script>
