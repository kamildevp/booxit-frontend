export default defineEventHandler(async (event) => {
  const state = getAuthState(event)
  state.userData = state.status === 'authenticated' ? await event.$fetch('/api/users/me') : undefined
  return state
})
