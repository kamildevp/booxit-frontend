<template>
  <div class="w-full">
    <UiButton
      variant="outline"
      class="w-full"
      @click="async () => await handleSocialLoginRequest('google')"
    >
      <Icon
        size="16"
        class=""
        name="logos:google-icon"
      />
      {{ $t('components.login.Methods.button.google_login.text') }}
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import socialAuthLoginParameters from '~~/server/schemas/auth/socialAuthLoginParameters'
import type { SocialAuthProvider } from '~~/types/socialAuth'

const route = useRoute()
const query = route.query
const { login, getSocialAuthRedirectParameters } = useSocialAuth()
const { t } = useI18n()
const localePath = useLocalePath()
const socialAuthFailed = useState('socialAuthFailed', () => false)
const redirectTo = ref<string | undefined>(undefined)

await callOnce(async () => {
  const result = socialAuthLoginParameters.safeParse(query)
  if (result.success) {
    await handleSocialLogin(result.data.code, result.data.state)
  }
})

async function handleSocialLoginRequest(provider: SocialAuthProvider) {
  const redirectParameters = await getSocialAuthRedirectParameters(provider, localePath('/'))
  await navigateTo({
    path: redirectParameters.url,
    query: redirectParameters.parameters,
  }, { external: true })
}

async function handleSocialLogin(code: string, state: string) {
  const loginResult = await login(code, state).catch(() => false as const)
  if (loginResult) {
    redirectTo.value = loginResult.redirect_url
  }
  else {
    socialAuthFailed.value = true
  }
}

onMounted(() => {
  if (socialAuthFailed.value) {
    socialAuthFailed.value = false
    toast.error(t('components.login.Methods.error.login_failed'))
  }
})

if (redirectTo.value) {
  await navigateTo(redirectTo.value)
}
</script>
