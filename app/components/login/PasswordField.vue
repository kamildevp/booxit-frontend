<template>
  <VeeField
    v-slot="{ field, errors }"
    name="password"
  >
    <UiField
      :data-invalid="!!errors.length"
      class="gap-1"
    >
      <div class="flex items-center">
        <UiFieldLabel for="password">
          {{ $t('components.login.PasswordField.label') }}
        </UiFieldLabel>
        <NuxtLinkLocale
          to="/"
          class="ml-auto inline-block text-sm underline text-primary"
        >
          {{ $t('components.login.PasswordField.forgot_password.text') }}
        </NuxtLinkLocale>
      </div>
      <UiInput
        id="password"
        type="password"
        v-bind="field"
        :aria-invalid="!!errors.length"
        autocomplete="new-password"
      />
      <UiFieldError
        v-if="errors.length"
        :errors="errors"
      />
    </UiField>
  </VeeField>
</template>

<script setup lang="ts">
import { Field as VeeField } from 'vee-validate'
</script>
