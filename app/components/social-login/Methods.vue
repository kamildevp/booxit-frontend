<template>
  <div class="w-full flex flex-col gap-2">
    <div
      v-for="provider in providers"
      :key="provider.providerName"
    >
      <UiButton
        variant="outline"
        class="w-full"
        @click="async () => await handleSocialLoginRequest(provider.providerName)"
      >
        <Icon
          size="16"
          class=""
          :name="provider.iconName"
        />
        {{ $t(provider.textTranslationPath) }}
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SocialAuthProvider } from '~~/types/socialAuth'

const { getSocialAuthRedirectParameters } = useSocialAuth()
const localePath = useLocalePath()

interface Props {
  redirectPath: string
}

const props = defineProps<Props>()

type SocialLoginButtonConfig = {
  providerName: SocialAuthProvider
  iconName: string
  textTranslationPath: string
}

const providers: SocialLoginButtonConfig[] = [
  {
    providerName: 'google',
    iconName: 'logos:google-icon',
    textTranslationPath: 'components.social_login.Methods.button.google_login.text',
  },
]

async function handleSocialLoginRequest(provider: SocialAuthProvider) {
  const redirectParameters = await getSocialAuthRedirectParameters(provider, localePath(props.redirectPath))
  await navigateTo({
    path: redirectParameters.url,
    query: redirectParameters.parameters,
  }, { external: true })
}
</script>
