import type { AuthState } from '~~/types/auth'
import type { SocialAuthProvider } from '~~/types/socialAuth'

export default function () {
  const providersUrls: Record<SocialAuthProvider, string> = {
    google: 'https://accounts.google.com/o/oauth2/v2/auth',
  }

  const authState = useState<AuthState | undefined>('authState', () => undefined)

  async function getSocialAuthRedirectParameters(provider: SocialAuthProvider, redirectUrl: string) {
    const url = getSocialAuthUrl(provider)
    const parameters = await getSocialAuthUrlParameters(provider, redirectUrl)

    return {
      url,
      parameters,
    }
  }

  function getSocialAuthUrl(provider: SocialAuthProvider): string {
    return providersUrls[provider]
  }

  async function getSocialAuthUrlParameters(provider: SocialAuthProvider, redirectUrl: string) {
    return $fetch('/api/auth/social-request', {
      method: 'GET',
      query: {
        provider: provider,
        redirect_url: redirectUrl,
      },
    })
  }

  async function login(code: string, state: string) {
    const res = await useNuxtApp().$authFetch('/api/auth/social-login', {
      method: 'POST',
      body: {
        code,
        state,
      },
    }).catch(() => undefined)

    if (!res) {
      return false
    }

    authState.value = {
      status: res.status,
      userData: res.userData,
    }

    return res.state
  }

  return {
    getSocialAuthRedirectParameters,
    login,
  }
}
