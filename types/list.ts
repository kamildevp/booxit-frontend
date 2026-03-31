export interface ColumnFilter {
  id: string
  value: unknown
}
export type FiltersState = ColumnFilter[]

export interface ColumnSort {
  desc: boolean
  id: string
}
export type SortingState = ColumnSort[]
