<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import type { InputVariants } from "."
import { useVModel } from "@vueuse/core"
import { cn } from "@/lib/utils"
import { inputVariants } from "."

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes["class"]
  size?: InputVariants["size"]
}>()

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void
}>()

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
})

const inputRef = useTemplateRef('input')
const focus = () => inputRef.value?.focus()

defineExpose({ focus })
</script>

<template>
  <input
    ref="input"
    v-model="modelValue"
    data-slot="input"
    :class="cn(inputVariants({ size }), props.class)"
  >
</template>
