export default defineNuxtRouteMiddleware(async (to) => {
  const { authenticated, refreshAuthState } = useAuth()
  const localePath = useLocalePath()

  await callOnce(refreshAuthState)

  if (to.path === localePath('/login') && authenticated.value) {
    return navigateTo(localePath('/'))
  }

  if (to.meta.authorizedOnly === true && !authenticated.value) {
    return navigateTo(localePath('/login'))
  }
})
