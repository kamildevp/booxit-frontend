import type { AuthState } from '~~/types/auth'
import type { SocialAuthProvider, SocialAuthStateData } from '~~/types/socialAuth'

export default function () {
  const providersUrls: Record<SocialAuthProvider, string> = {
    google: 'https://accounts.google.com/o/oauth2/v2/auth',
  }

  const authState = useState<AuthState | undefined>('authState', () => undefined)

  async function getSocialAuthRedirectParameters(provider: SocialAuthProvider, stateData: SocialAuthStateData) {
    const url = getSocialAuthUrl(provider)
    const parameters = await getSocialAuthUrlParameters(provider, stateData)

    return {
      url,
      parameters,
    }
  }

  function getSocialAuthUrl(provider: SocialAuthProvider): string {
    return providersUrls[provider]
  }

  async function getSocialAuthUrlParameters(provider: SocialAuthProvider, stateData: SocialAuthStateData) {
    return $fetch('/api/auth/social-request', {
      method: 'GET',
      query: {
        provider: provider,
        state: stateData,
      },
    })
  }

  async function login(code: string, state: string) {
    const { data, error } = await useFetch('/api/auth/social-login', {
      method: 'POST',
      body: {
        code,
        state,
      },
    })

    if (!!error.value || !data.value) {
      return false
    }

    authState.value = {
      status: data.value.status,
      userData: data.value.userData,
    }

    return data.value.state
  }

  return {
    getSocialAuthRedirectParameters,
    login,
  }
}
