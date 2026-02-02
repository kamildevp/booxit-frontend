import { accessTokenCookieName } from '~~/server/constants'
import accessTokens from '~~/server/schemas/auth/accessTokens'
import successResponse from '~~/server/schemas/response/successResponse'
import type { AuthState } from '~~/types/auth'

export default defineEventHandler(async (event): Promise<AuthState> => {
  const body = await readBody(event)
  const response = await useAPI(event, 'auth/login', 'POST', body)
  const responseSchema = successResponse(accessTokens)
  const responseData = responseSchema.parse(response).data
  setAuthCookies(event, responseData.access_token, responseData.refresh_token)
  const userData = await event.$fetch('/api/users/me', {
    headers: {
      Cookie: `${accessTokenCookieName}=${responseData.access_token};`
    }
  })

  return {
    status: 'authenticated',
    userData,
  }
})
