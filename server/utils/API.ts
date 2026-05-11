import type { EventHandlerRequest, H3Event, HTTPMethod } from 'h3'
import type { QueryObject } from 'ufo'
import { accessTokenCookieName } from '../constants'
import type { FetchError } from 'ofetch'
import validationErrorResponseSchema from '~~/schemas/response/validationErrorResponse'

export const useAPI = async function<R extends EventHandlerRequest = EventHandlerRequest> (
  event: H3Event<R>,
  path: string,
  method: HTTPMethod,
  body: Record<string, unknown> | BodyInit | null | undefined = undefined,
  query: QueryObject = {},
  headers: Record<string, string> = {},
) {
  const { baseApiUrl } = useRuntimeConfig()
  const url = `${baseApiUrl}/${path}`
  const cookies = parseCookies(event)
  headers = accessTokenCookieName in cookies ? { Authorization: `Bearer ${cookies[accessTokenCookieName]}`, ...headers } : headers

  return $fetch(url, {
    method,
    body,
    headers,
    query,
  }).catch((error: FetchError) => {
    let errorsData: unknown
    if (error.status === 422) {
      const result = validationErrorResponseSchema.safeParse(error.data)
      errorsData = result.success ? result.data.data.errors : {}
    }
    else {
      errorsData = error.data
    }

    throw createError({
      statusMessage: error.statusMessage,
      status: error.status,
      data: errorsData,
    })
  })
}
