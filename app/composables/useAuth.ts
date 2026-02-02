import type { AuthState } from '~~/types/auth'
import { FetchError } from 'ofetch'

export default function () {
  const authState = useState<AuthState | undefined>('authState', () => undefined)
  const authenticated = computed(() => authState.value?.status === 'authenticated')
  const userData = computed(() => authState.value?.userData)
  const requestFetch = useRequestFetch()

  async function refreshAuthState(): Promise<void> {
    authState.value = await requestFetch('/api/auth/state')
  }

  async function login(email: string, password: string): Promise<boolean> {
    try {
      authState.value = await $fetch('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      })
    }
    catch (error) {
      if (error instanceof FetchError && error.status === 401) {
        return false
      }
      throw error
    }

    return true
  }

  async function logout(logoutOtherSessions: boolean): Promise<void> {
    authState.value = await $fetch('/api/auth/logout', {
      method: 'POST',
      body: {
        logout_other_sessions: logoutOtherSessions,
      },
    })
  }

  return {
    userData,
    authenticated,
    login,
    refreshAuthState,
    logout,
  }
}
