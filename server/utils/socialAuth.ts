import type { EventHandlerRequest, H3Event } from 'h3'
import { socialAuthCodeVerifierCookieName, socialAuthProviderCookieName, socialAuthStateCookieName } from '../constants'
import type { SocialAuthProvider, SocialAuthState, SocialAuthStateData } from '~~/types/socialAuth'
import pkceChallenge from 'pkce-challenge'
import { Buffer } from 'buffer'
import socialAuthState from '../schemas/auth/socialAuthState'

const providerScope: Record<SocialAuthProvider, string> = {
  google: 'openid email profile',
}

const providerTokenExchangeEndpoint: Record<SocialAuthProvider, string> = {
  google: 'auth/google-login',
}

export const setSocialAuthCookies = <R extends EventHandlerRequest = EventHandlerRequest> (
  event: H3Event<R>,
  provider: SocialAuthProvider,
  state: string,
  codeVerifier: string,
): void => {
  setCookie(
    event,
    socialAuthProviderCookieName,
    provider,
    {
      httpOnly: true,
      sameSite: 'lax',
    },
  )

  setCookie(
    event,
    socialAuthStateCookieName,
    state,
    {
      httpOnly: true,
      sameSite: 'lax',
    },
  )

  setCookie(
    event,
    socialAuthCodeVerifierCookieName,
    codeVerifier,
    {
      httpOnly: true,
      sameSite: 'lax',
    },
  )
}

export const resetSocialAuthCookies = <R extends EventHandlerRequest = EventHandlerRequest> (event: H3Event<R>): void => {
  setCookie(
    event,
    socialAuthProviderCookieName,
    '',
    {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(),
    },
  )

  setCookie(
    event,
    socialAuthStateCookieName,
    '',
    {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(),
    },
  )

  setCookie(
    event,
    socialAuthCodeVerifierCookieName,
    '',
    {
      httpOnly: true,
      sameSite: 'lax',
      expires: new Date(),
    },
  )
}

export const generateSocialAuthUrlParameters = async (provider: SocialAuthProvider, stateData: SocialAuthStateData) => {
  const config = useRuntimeConfig()
  const challenge = await pkceChallenge(128)
  const clientId = config[`${provider}AuthClientId` as const]

  return {
    response_type: 'code',
    client_id: clientId,
    scope: providerScope[provider],
    redirect_uri: config.socialAuthRedirectUri,
    state: generateState(stateData),
    code_challenge: challenge.code_challenge,
    code_challenge_method: challenge.code_challenge_method,
  }
}

export const getSocialAuthTokenExchangeEndpoint = (provider: SocialAuthProvider): string => {
  return providerTokenExchangeEndpoint[provider]
}

export const decodeState = (encoded: string): SocialAuthState => {
  const decoded = JSON.parse(
    Buffer.from(encoded, 'base64url').toString(),
  )

  return socialAuthState.parse(decoded)
}

const generateState = (data: SocialAuthStateData) => {
  const state: SocialAuthState = {
    csrf: crypto.getRandomValues(new Uint8Array(32)).toString(),
    data,
  }

  return Buffer.from(JSON.stringify(state)).toString('base64url')
}
