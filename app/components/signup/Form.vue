<template>
  <div class="flex flex-row h-full">
    <div class="hidden lg:flex flex-1">
      <!-- Stock image -->
    </div>
    <div class="flex-1 flex flex-row justify-center p-4">
      <div class="flex flex-col gap-2 lg:gap-4 max-w-md">
        <div class="flex-1" />
        <SignupFormHeader />
        <SocialLoginMethods redirect-path="/" />
        <AppOptionsSeparator />
        <div>
          <AutoForm
            id="signup-form"
            :schema="formSchema"
            translation-path="components.signup.Form.form.field"
            :fields-override="fieldsOverride"
            @submit="onSubmit"
          />
        </div>
        <div class="my-2">
          <UiButton
            class="w-full items-center"
            type="submit"
            form="signup-form"
          >
            <UiSpinner v-if="pending" />
            {{ $t('components.signup.Form.button.create_account.text') }}
          </UiButton>
        </div>
        <div class="flex-1" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import languagePreference, { languages } from '~~/schemas/languagePreference'
import createValidationErrorsSchema from '~~/schemas/validation/users/create'
import type { FieldsOverride } from '~/components/auto-form/types'

const { t, locale } = useI18n()
const { parseValidationErrors } = useFormTools()

const formSchema = z.object({
  name: z.string().min(6).max(50),
  email: z.email(),
  language_preference: languagePreference,
  password: z.string().regex(/^(?=.*\p{L})(?=.*\d)[\p{L}\d!@#$%?&*]{8,20}$/iu),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  error: t('components.signup.Form.form.refine_error.password_confirmation.match'),
  path: ['password_confirmation'],
})

const { handleSubmit, validate, setErrors } = useForm({
  validationSchema: formSchema,
})

const fieldsOverride: FieldsOverride<typeof formSchema> = {
  language_preference: {
    props: {
      defaultValue: locale.value,
      entries: [...languages],
    },
  },
  password: {
    props: {
      type: 'password',
      autocomplete: 'new-password',
    },
  },
  password_confirmation: {
    props: {
      type: 'password',
      autocomplete: 'new-password',
    },
  },
}

const pending = ref(false)
const emit = defineEmits<{
  (e: 'onSuccess'): void
}>()

const onSubmit = handleSubmit(async (data) => {
  validate()
  pending.value = true
  const { password_confirmation, ...body } = data
  const result = await $fetch('/api/users', {
    method: 'POST',
    body,
  }).catch((error) => {
    const errors = parseValidationErrors(error, createValidationErrorsSchema, 'components.signup.Form.form.server_error')
    setErrors(errors)
    return false
  })
  pending.value = false

  if (result) {
    emit('onSuccess')
  }
})
</script>
