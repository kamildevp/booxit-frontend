import { refreshTokenCookieName } from '~~/server/constants'
import accessTokens from '~~/server/schemas/auth/accessTokens'
import successResponse from '~~/server/schemas/response/successResponse'

export default defineEventHandler(async (event) => {
  const response = await useAPI(event, 'auth/refresh', 'POST', {
    refresh_token: getCookie(event, refreshTokenCookieName),
  })
  const responseSchema = successResponse(accessTokens)
  const responseData = responseSchema.parse(response).data

  return responseData
})
