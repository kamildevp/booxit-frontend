import isPlainObject from 'lodash.isplainobject'

type DotPrefix<P extends string, K extends string> = P extends '' ? K : `${P}.${K}`
type ExtRecord<T> = Extract<T, Record<string, unknown>>
type ExcRecord<T> = Exclude<T, Record<string, unknown>>
type UnionToIntersection<U> = (U extends unknown ? (x: U) => void : never) extends (x: infer I) => void ? I : never
type Simplify<T> = {
  [K in keyof T]: T[K]
}

type FlattenProperty<T, Prefix extends string = '', AppendType = never>
  = Extract<T, Record<string, unknown>> extends never
    ? { [P in Prefix]: T | AppendType }
    : ExcRecord<T> extends never
      ? FlattenObjectUnion<ExtRecord<T>, Prefix, AppendType>
      : ExcRecord<T> extends undefined
        ? FlattenObjectUnion<ExtRecord<T>, Prefix, undefined>
        : FlattenObjectUnion<ExtRecord<T>, Prefix, undefined> & ({ [P in Prefix]: ExcRecord<T> | undefined })

type FlattenObjectUnion<T extends Record<string, unknown>, Prefix extends string = '', AppendType = never> = {
  [K in keyof T & string]: FlattenProperty<T[K], DotPrefix<Prefix, K>, AppendType>
}[keyof T & string]

type FlattenObject<T extends Record<string, unknown>, Prefix extends string = ''> = Simplify<UnionToIntersection<FlattenObjectUnion<T, Prefix>>>

export default function flattenObject<T extends Record<string, unknown>, P extends string = ''>(obj: T, prefix: P = '' as P): FlattenObject<T, P> {
  const result: Record<string, unknown> = {}

  for (const key of Object.keys(obj)) {
    const value = obj[key]
    const path = prefix + key

    if (!isPlainObject(value)) {
      result[path] = value as (typeof result)[string]
    }
    else {
      const flatObj = flattenObject(value as Record<string, unknown>, `${path}.`)
      Object.assign(result, flatObj)
    }
  }

  return result as FlattenObject<T, P>
}
