import { accessTokenCookieName } from '~~/server/constants'
import accessTokens from '~~/server/schemas/auth/accessTokens'
import socialAuthLoginParameters from '~~/server/schemas/auth/socialAuthLoginParameters'
import successResponse from '~~/server/schemas/response/successResponse'
import { resolveSocialAuthTokenExchangeParameters } from '~~/server/utils/socialAuth'
import type { AuthStatus } from '~~/types/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const parsedBody = socialAuthLoginParameters.parse(body)
  const parameters = resolveSocialAuthTokenExchangeParameters(event, parsedBody.state)
  const config = useRuntimeConfig()
  const response = await useAPI(event, parameters.url, 'POST', {
    code_verifier: parameters.codeVerifier,
    code: parsedBody.code,
    auth_handler: config.appId,
  })
  const responseSchema = successResponse(accessTokens)
  const responseData = responseSchema.parse(response).data
  resetSocialAuthCookies(event)
  setAuthCookies(event, responseData.access_token, responseData.refresh_token)
  const userData = await event.$fetch('/api/users/me', {
    headers: {
      Cookie: `${accessTokenCookieName}=${responseData.access_token};`,
    },
  })

  return {
    status: 'authenticated' as AuthStatus,
    userData,
    state: parameters.state.data,
  }
})
