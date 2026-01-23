import type z from 'zod'
import { ZodDefault, ZodEmail, ZodURL, type ZodType } from 'zod'
import type { FieldShape, InnerType, ShapeResolver } from './types'
import Input from './field/Input.vue'
import type { Props as InputProps } from './field/Input.vue'
import { resolveFieldShape } from './utils'

export const shapeResolvers = {
  string: <T extends ZodType>(name: string, type: T, translationPath: string): FieldShape<InputProps> => {
    let inputType
    if (type instanceof ZodEmail || type instanceof ZodURL) {
      const inputTypes = ['text', 'email', 'url']
      inputType = !!type.format && inputTypes.includes(type.format) ? type.format : undefined
    }

    return {
      component: Input,
      props: {
        name,
        translationPath: `${translationPath}.${name}`,
        type: inputType,
      },
    }
  },
  default: <T extends ZodType>(name: string, type: T, translationPath: string): FieldShape | undefined => {
    if (!(type instanceof ZodDefault)) {
      return undefined
    }
    const innerType = type.unwrap() as InnerType<T>

    const shape = resolveFieldShape(name, innerType, translationPath)
    if (!shape) {
      return undefined
    }

    shape.props.defaultValue = type.def.defaultValue as z.infer<T>
    return shape
  },
} satisfies Record<string, ShapeResolver>
