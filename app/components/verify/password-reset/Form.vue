<template>
  <div class="w-full flex flex-col items-center justify-center h-full">
    <UiCard class="w-full max-w-100">
      <UiCardHeader>
        <UiCardTitle class="text-2xl">
          {{ $t('components.verify.password_reset.Form.title') }}
        </UiCardTitle>
        <UiCardDescription>
          {{ $t('components.verify.password_reset.Form.description') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <AutoForm
          id="password-reset-form"
          :schema="formSchema"
          :fields-override="fieldsOverride"
          translation-path="components.verify.password_reset.Form.form.field"
          @submit="onSubmit"
        />
      </UiCardContent>
      <UiCardFooter>
        <UiButton
          class="w-full items-center"
          type="submit"
          form="password-reset-form"
        >
          <UiSpinner v-if="pending" />
          {{ $t('components.verify.password_reset.Form.button.reset_password.text') }}
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'
import type { FieldsOverride } from '~/components/auto-form/types'
import type { VerificationParameters } from '../types'

const { t } = useI18n()

const formSchema = z.object({
  password: z.string().regex(/^(?=.*\p{L})(?=.*\d)[\p{L}\d!@#$%?&*]{8,20}$/iu),
  password_confirmation: z.string(),
}).refine(data => data.password === data.password_confirmation, {
  error: t('components.signup.Form.form.refine_error.password_confirmation.match'),
  path: ['password_confirmation'],
})

const { handleSubmit, validate } = useForm({
  validationSchema: formSchema,
})

const fieldsOverride: FieldsOverride<typeof formSchema> = {
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
const props = defineProps<VerificationParameters>()
const emit = defineEmits<{
  (e: 'onSuccess' | 'onFailure'): void
}>()

const onSubmit = handleSubmit(async (data) => {
  validate()
  pending.value = true

  const result = await $fetch('/api/users/reset-password', {
    method: 'PATCH',
    body: {
      ...props,
      password: data.password,
    },
  }).catch((error) => {
    if (error.status != 422) {
      throw error
    }

    return false
  })
  pending.value = false

  if (result) {
    emit('onSuccess')
  }
  else {
    emit('onFailure')
  }
})
</script>
