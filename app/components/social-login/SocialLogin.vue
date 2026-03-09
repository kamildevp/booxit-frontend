<template>
  <SocialLoginMethods redirect-path="/" />
</template>

<script setup lang="ts">
import { toast } from 'vue-sonner'
import socialAuthLoginParameters from '~~/server/schemas/auth/socialAuthLoginParameters'

const route = useRoute()
const query = route.query
const { login } = useSocialAuth()
const { t } = useI18n()
const socialAuthFailed = useState('socialAuthFailed', () => false)
const redirectTo = ref<string | undefined>(undefined)

await callOnce(async () => {
  const result = socialAuthLoginParameters.safeParse(query)
  if (result.success) {
    await handleSocialLogin(result.data.code, result.data.state)
  }
})

async function handleSocialLogin(code: string, state: string) {
  const loginResult = await login(code, state)
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
    toast.error(t('components.social_login.SocialLogin.error.login_failed'))
  }
})

if (redirectTo.value) {
  await navigateTo(redirectTo.value)
}
</script>
