import type { Component } from 'vue'
import type { ZodDefault, ZodObject, ZodType } from 'zod'
import type { shapeResolvers } from './defaults'

export interface BaseFieldProps<T = unknown> {
  name: string
  translationPath: string
  defaultValue?: T
}
export interface FieldShape<T extends BaseFieldProps = BaseFieldProps> {
  component: Component
  props: T
}
export type ShapeResolver = <T extends ZodType>(name: string, type: T, translationPath: string) => FieldShape | undefined
export type ShapeTypes = typeof shapeResolvers
export type Shape<T extends ZodType> = InnerType<T>['type'] extends keyof ShapeTypes ? ReturnType<ShapeTypes[InnerType<T>['type']]> : undefined
export type InnerType<T extends ZodType> = T extends ZodDefault<infer U extends ZodType> ? U : T
export type ObjectSchemaShape<T extends ZodObject> = {
  [P in keyof T['shape']]: Shape<T['shape'][P]>
}

export type DeepPartialObject<T>
  = T extends (infer U)[]
    ? U[]
    : T extends object
      ? { [K in keyof T]?: DeepPartialObject<T[K]> }
      : T
