import type { EventHandlerRequest, H3Event } from 'h3'
import { socialAuthCodeVerifierCookieName, socialAuthProviderCookieName, socialAuthStateCookieName } from '../constants'
import type { SocialAuthProvider, SocialAuthState, SocialAuthStateData } from '~~/types/socialAuth'
import { socialAuthProviders } from '~~/types/socialAuth'
import pkceChallenge from 'pkce-challenge'
import { Buffer } from 'buffer'
import socialAuthState from '../schemas/auth/socialAuthState'
import z from 'zod'

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

export const generateSocialAuthUrlParameters = async <R extends EventHandlerRequest = EventHandlerRequest> (
  event: H3Event<R>,
  provider: SocialAuthProvider,
  stateData: SocialAuthStateData,
) => {
  const config = useRuntimeConfig()
  const challenge = await pkceChallenge(128)
  const clientId = config[`${provider}AuthClientId` as const]
  const state = generateState(stateData)
  setSocialAuthCookies(event, provider, state, challenge.code_verifier)

  return {
    response_type: 'code',
    client_id: clientId,
    scope: providerScope[provider],
    redirect_uri: config.socialAuthRedirectUri,
    state,
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

export const resolveSocialAuthTokenExchangeParameters = <R extends EventHandlerRequest = EventHandlerRequest> (event: H3Event<R>, state: string) => {
  const cookiesParseResult = z.object({
    state: z.string().min(1),
    codeVerifier: z.string().min(1),
    provider: z.enum(socialAuthProviders),
  }).safeParse({
    state: getCookie(event, socialAuthStateCookieName),
    codeVerifier: getCookie(event, socialAuthCodeVerifierCookieName),
    provider: getCookie(event, socialAuthProviderCookieName),
  })

  if (!cookiesParseResult.success || cookiesParseResult.data.state != state) {
    throw createError({
      statusMessage: 'Unauthorized',
      status: 401,
    })
  }

  return {
    url: getSocialAuthTokenExchangeEndpoint(cookiesParseResult.data.provider),
    codeVerifier: cookiesParseResult.data.codeVerifier,
    state: decodeState(cookiesParseResult.data.state),
  }
}

const generateState = (data: SocialAuthStateData) => {
  const state: SocialAuthState = {
    csrf: crypto.getRandomValues(new Uint8Array(32)).toString(),
    data,
  }

  return Buffer.from(JSON.stringify(state)).toString('base64url')
}
