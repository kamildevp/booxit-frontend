export default defineNuxtPlugin((nuxtApp) => {
  const { logout } = useAuth()
  const localePath = useLocalePath()
  const cookieHeader = useRequestHeader('Cookie')

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
  })

  return {
    provide: {
      authFetch,
    },
  }
})
