import { appendResponseHeader } from 'h3'

export default defineNuxtPlugin((nuxtApp) => {
  const { logout } = useAuth()
  const localePath = useLocalePath()
  const cookieHeader = useRequestHeader('Cookie')
  const event = useRequestEvent()

  const authFetch = $fetch.create({
    onRequest({ options }) {
      if (cookieHeader) {
        options.headers.set('Cookie', cookieHeader)
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        await logout(false)
        await nuxtApp.runWithContext(() => navigateTo(localePath('/login')))
      }
    },
    async onResponse({ response }) {
      if (import.meta.server) {
        const cookies = response.headers.getSetCookie()
        for (const cookie of cookies) {
          appendResponseHeader(event!, 'set-cookie', cookie)
        }
      }
    },
  })

  return {
    provide: {
      authFetch,
    },
  }
})
