import { jwtDecode } from 'jwt-decode'
import type { EventHandlerRequest, H3Event } from 'h3'
import { accessTokenCookieName, refreshTokenCookieName } from '../constants'
import type { AuthState } from '~~/types/auth'

export const getJwtExpiryDate = (token: string): Date | undefined => {
  const decoded = jwtDecode(token)
  return decoded.exp ? new Date(decoded.exp * 1000) : undefined
}

export const setAuthCookies = <R extends EventHandlerRequest = EventHandlerRequest> (
  event: H3Event<R>,
  accessToken: string,
  refreshToken: string,
): void => {
  setCookie(
    event,
    accessTokenCookieName,
    accessToken,
    {
      httpOnly: true,
      sameSite: 'lax',
      expires: getJwtExpiryDate(accessToken),
    },
  )

  setCookie(
    event,
    refreshTokenCookieName,
    refreshToken,
    {
      httpOnly: true,
      sameSite: 'lax',
      expires: getJwtExpiryDate(refreshToken),
    },
  )
}

export const getAuthState = <R extends EventHandlerRequest = EventHandlerRequest> (event: H3Event<R>): AuthState => {
  const accessToken = getCookie(event, accessTokenCookieName)
  const refreshToken = getCookie(event, refreshTokenCookieName)

  if (accessToken) {
    return {
      status: 'authenticated',
    }
  }

  return {
    status: refreshToken ? 'expired' : 'unauthenticated',
  }
}
