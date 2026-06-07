import type { AcceptableValue } from 'reka-ui'

export type Entry<
  LabelKey extends string,
  ValueKey extends string,
  IconKey extends string,
> = {
  [K in LabelKey]: string
} & {
  [K in ValueKey]: NonNullable<AcceptableValue>
} & {
  [K in IconKey]?: string
}
