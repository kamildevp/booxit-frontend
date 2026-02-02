import { resetAuthCookies } from '~~/server/utils/auth'
import type { AuthState } from '~~/types/auth'

export default defineEventHandler(async (event): Promise<AuthState> => {
  const body = await readBody(event)
  resetAuthCookies(event)
  await useAPI(event, 'auth/logout', 'POST', body).catch(() => undefined)

  return {
    status: 'unauthenticated',
  }
})
