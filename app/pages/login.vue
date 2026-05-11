<template>
  <div class="w-full flex flex-col items-center justify-center flex-1">
    <UiCard class="w-full max-w-sm">
      <LoginFormHeader />
      <UiCardContent>
        <AutoForm
          id="login-form"
          :schema="formSchema"
          translation-path="pages.login.form.field"
          @submit="onSubmit"
        >
          <template #password>
            <LoginPasswordField />
          </template>
        </AutoForm>
      </UiCardContent>
      <UiCardFooter class="flex flex-col gap-2">
        <UiButton
          class="w-full items-center"
          type="submit"
          form="login-form"
          :disabled="pending"
        >
          <UiSpinner v-if="pending" />
          <Icon
            v-else
            size="20"
            name="ic:baseline-log-in"
          />
          {{ $t('pages.login.card.button.login.text') }}
        </UiButton>
        <AppOptionsSeparator />
        <SocialLogin />
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

definePageMeta({
  unauthorizedOnly: true,
})

const { t } = useI18n()
const { login } = useAuth()
const localePath = useLocalePath()

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const pending = ref(false)

const onSubmit = handleSubmit(async (data) => {
  pending.value = true
  const result = await login(data.email, data.password)
  pending.value = false

  if (result) {
    navigateTo(localePath('/'))
  }
  else {
    toast.error(t('pages.login.form.error.invalid_credentials'))
  }
})
</script>
