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
