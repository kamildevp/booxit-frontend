import type { AuthState } from '~~/types/auth'
import type { SocialAuthProvider } from '~~/types/socialAuth'
import { appendResponseHeader } from 'h3'

export default function () {
  const providersUrls: Record<SocialAuthProvider, string> = {
    google: 'https://accounts.google.com/o/oauth2/v2/auth',
  }

  const authState = useState<AuthState | undefined>('authState', () => undefined)
  const event = useRequestEvent()

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
    const cookieHeader = useRequestHeader('Cookie')
    const headers = cookieHeader ? { Cookie: cookieHeader } : undefined
    const res = await $fetch.raw('/api/auth/social-login', {
      method: 'POST',
      body: {
        code,
        state,
      },
      headers,
    })

    if (import.meta.server) {
      const cookies = res.headers.getSetCookie()
      for (const cookie of cookies) {
        appendResponseHeader(event!, 'set-cookie', cookie)
      }
    }

    if (!res.ok || !res._data) {
      return false
    }

    authState.value = {
      status: res._data.status,
      userData: res._data.userData,
    }

    return res._data.state
  }

  return {
    getSocialAuthRedirectParameters,
    login,
  }
}
