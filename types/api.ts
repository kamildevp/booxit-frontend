import type { FetchResult } from '#app'
import type { AvailableRouterMethod, NitroFetchRequest } from 'nitropack/types'

export type Paginator<T = unknown> = {
  items: T[]
  page: number
  per_page: number
  pages_count: number
  total: number
}

export type PaginatorRequest<T extends NitroFetchRequest = NitroFetchRequest>
  = T extends string
    ? Extract<Lowercase<AvailableRouterMethod<T>>, 'get'> extends never
      ? never
      : Extract<FetchResult<T, AvailableRouterMethod<T>>, Paginator> extends never
        ? never
        : T
    : never

export type PaginatorItem<T extends PaginatorRequest>
  = FetchResult<T, Extract<AvailableRouterMethod<T>, 'get'>> extends { items: (infer U)[] }
    ? U
    : never

export type PaginatorResponse<T extends PaginatorRequest> = Paginator<PaginatorItem<T>>
