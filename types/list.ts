import type { z, ZodObject } from 'zod'

export type ColumnFilter = {
  id: string
  value: unknown
}
export type FiltersState = ColumnFilter[]

export type ColumnSort = {
  desc: boolean
  id: string
}
export type SortingState = ColumnSort[]

export type FilterKey<S extends ZodObject> = keyof FiltersType<S> & string
export type FiltersType<S extends ZodObject> = z.infer<S>
export type FilterValueType<S extends ZodObject, K extends FilterKey<S>> = FiltersType<S>[K] | undefined
