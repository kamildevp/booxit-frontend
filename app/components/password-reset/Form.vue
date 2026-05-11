<template>
  <div class="w-full flex flex-col items-center justify-center flex-1">
    <UiCard class="w-full max-w-sm">
      <UiCardHeader>
        <UiCardTitle class="text-2xl">
          {{ $t('components.password_reset.Form.title') }}
        </UiCardTitle>
        <UiCardDescription>
          {{ $t('components.password_reset.Form.description') }}
        </UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <AutoForm
          id="password-reset-form"
          :schema="formSchema"
          translation-path="components.password_reset.Form.form.field"
          @submit="onSubmit"
        />
      </UiCardContent>
      <UiCardFooter>
        <UiButton
          class="w-full items-center"
          type="submit"
          form="password-reset-form"
          :disabled="pending"
        >
          <UiSpinner v-if="pending" />
          {{ $t('components.password_reset.Form.button.reset_password.text') }}
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { z } from 'zod'

const formSchema = z.object({
  email: z.email(),
})

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const pending = ref(false)
const emit = defineEmits<{
  (e: 'onSuccess'): void
}>()

const onSubmit = handleSubmit(async (data) => {
  pending.value = true
  await $fetch('/api/users/reset-password-request', {
    method: 'POST',
    body: data,
  })
  pending.value = false
  emit('onSuccess')
})
</script>
