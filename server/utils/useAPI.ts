import type { EventHandlerRequest, H3Event, HTTPMethod } from 'h3'
import type { QueryObject } from 'ufo'

export default async function<R extends EventHandlerRequest = EventHandlerRequest> (
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
  headers = cookies['access_token'] ? { Authorization: 'Bearer ' + cookies['access_token'], ...headers } : headers

  return await $fetch(url, {
    method,
    body,
    headers,
    query,
  })
}
