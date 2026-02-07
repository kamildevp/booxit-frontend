<template>
  <form>
    <div class="flex flex-col gap-2">
      <slot
        v-for="field in fields"
        :key="field.props.name"
        :name="field.props.name"
      >
        <component
          :is="field.component"
          v-bind="field.props"
        />
      </slot>
    </div>
  </form>
</template>

<script setup lang="ts" generic="S extends ZodRawShape, T extends ZodObject<S>">
import type { ZodObject, ZodRawShape } from 'zod'
import type { DeepPartialObject, ObjectSchemaShape } from './types'
import { deepObjectOverwrite, resolveObjectSchemaFieldShapes } from './utils'

interface Props {
  schema: T
  translationPath: string
  fieldsOverride?: DeepPartialObject<ObjectSchemaShape<T>>
  translateEnums?: boolean
}

const props = defineProps<Props>()
const fields = computed(() => {
  const baseShapes = resolveObjectSchemaFieldShapes(props.schema, props.translationPath, props.translateEnums)
  const shapes = props.fieldsOverride ? deepObjectOverwrite(baseShapes, props.fieldsOverride) : baseShapes
  return Object.values(shapes).filter(el => !!el)
})
</script>
