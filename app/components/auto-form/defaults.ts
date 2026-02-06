import type z from 'zod'
import { ZodDefault, ZodEmail, ZodEnum, ZodURL } from 'zod'
import type { ZodType } from 'zod'
import type { FieldShape, InnerType, ShapeResolver } from './types'
import Input from './field/Input.vue'
import type { Props as InputProps } from './field/Input.vue'
import type { Props as SelectProps } from './field/Select.vue'
import { resolveFieldShape } from './utils'
import Select from './field/Select.vue'

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
  enum: <T extends ZodType>(name: string, type: T, translationPath: string, translateEnums?: boolean): FieldShape<SelectProps<'name', 'value', 'icon'>> | undefined => {
    if (!(type instanceof ZodEnum)) {
      return undefined
    }

    const entries = type.options.map(option => ({
      name: translateEnums ? `${translationPath}.${name}.value.${option}.label` : option.toString(),
      value: option,
    }))

    return {
      component: Select,
      props: {
        name,
        translationPath: `${translationPath}.${name}`,
        labelKey: 'name',
        valueKey: 'value',
        iconKey: 'icon',
        entries: entries,
        defaultValue: type.options[0],
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
