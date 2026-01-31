import type { AuthState } from '~~/types/auth'

export default defineEventHandler((event): AuthState => {
  return getAuthState(event)
})
