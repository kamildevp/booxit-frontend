import type { ZodObject, ZodType } from 'zod'
import type { DeepPartialObject, ObjectSchemaShape, Shape, ShapeTypes } from './types'
import { shapeResolvers } from './defaults'

export function resolveFieldShape<T extends ZodType>(name: string, zodType: T, translationPath: string, translateEnums?: boolean): Shape<T> {
  return (zodType.type in shapeResolvers ? shapeResolvers[zodType.type as keyof ShapeTypes](name, zodType, translationPath, translateEnums) : undefined) as Shape<T>
}

export function resolveObjectSchemaFieldShapes<S extends { [K in keyof S]: ZodType }, T extends ZodObject<S>>(schema: T, translationPath: string, translateEnums?: boolean): ObjectSchemaShape<T> {
  const fieldNames = Object.keys(schema.shape) as (keyof S & string)[]

  return fieldNames.reduce((acc, curr) => ({
    ...acc,
    [curr]: resolveFieldShape(curr, schema.shape[curr], translationPath, translateEnums),
  }), {}) as ObjectSchemaShape<T>
}

export function deepObjectOverwrite<T extends Record<string, unknown>>(baseObj: T, overwriteObj: DeepPartialObject<T>): T {
  const result = { ...baseObj }

  for (const key in overwriteObj) {
    const baseValue = result[key]
    const overwriteValue = overwriteObj[key]

    if (overwriteValue === undefined || (typeof baseValue === 'object' && typeof overwriteValue !== 'object')) {
      continue
    }

    result[key] = (typeof baseValue === 'object' && overwriteValue !== null && !Array.isArray(baseValue)
      ? deepObjectOverwrite(baseValue as Record<string, unknown>, overwriteValue as Record<string, unknown>)
      : overwriteValue) as T[typeof key]
  }

  return result
}
