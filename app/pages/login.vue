<template>
  <div class="w-full flex flex-col items-center justify-center h-full">
    <UiCard class="w-full max-w-sm">
      <UiCardHeader class="flex flex-row justify-between items-center">
        <UiCardTitle class="text-2xl flex flex-row items-center gap-2">
          <Icon
            size="36"
            name="ic:baseline-account-circle"
          />
          {{ $t('pages.login.card.title') }}
        </UiCardTitle>
        <UiCardAction>
          <UiButton
            variant="outline"
            class="rounded-full text-primary hover:text-primary"
          >
            {{ $t('pages.login.card.button.sign_up.text') }}
          </UiButton>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent>
        <AutoForm
          id="login-form"
          :schema="formSchema"
          translation-path="pages.login.form.field"
          @submit="onSubmit"
        >
          <template #password>
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
                    {{ $t('pages.login.form.field.password.label') }}
                  </UiFieldLabel>
                  <NuxtLinkLocale
                    to="/"
                    class="ml-auto inline-block text-sm underline text-primary"
                  >
                    {{ $t('pages.login.card.button.forgot_password.text') }}
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
        </AutoForm>
      </UiCardContent>
      <UiCardFooter class="flex flex-col gap-2">
        <UiButton
          class="w-full items-center"
          type="submit"
          form="login-form"
        >
          <UiSpinner v-if="pending" />
          <Icon
            v-else
            size="20"
            name="ic:baseline-log-in"
          />
          {{ $t('pages.login.card.button.login.text') }}
        </UiButton>
        <div class="flex flex-row justify-between items-center text-muted-foreground w-full gap-4 text-xs">
          <UiSeparator class="flex-1" />
          <div>{{ $t('pages.login.card.buttons_separator.text') }}</div>
          <UiSeparator class="flex-1" />
        </div>
        <UiButton
          variant="outline"
          class="w-full"
        >
          <Icon
            size="16"
            class=""
            name="logos:google-icon"
          />
          {{ $t('pages.login.card.button.google_login.text') }}
        </UiButton>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script setup lang="ts">
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

const { t } = useI18n()
const { login } = useAuth()
const localePath = useLocalePath()

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

const { handleSubmit, validate } = useForm({
  validationSchema: formSchema,
})

const pending = ref(false)

const onSubmit = handleSubmit(async (data) => {
  validate()
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
