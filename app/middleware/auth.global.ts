export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, refreshAuthState } = useAuth()
  const localePath = useLocalePath()

  await callOnce(refreshAuthState)

  if (to.meta.unauthorizedOnly === true && authenticated.value) {
    return navigateTo(localePath('/'))
  }

  if (to.meta.authorizedOnly === true && !authenticated.value) {
    return navigateTo(localePath('/login'))
  }
})
