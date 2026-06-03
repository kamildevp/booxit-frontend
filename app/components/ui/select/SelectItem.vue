<script setup lang="ts">
import type { SelectItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { SelectVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import {
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  useForwardProps,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { selectIconVariants, selectItemVariants } from "."

const props = defineProps<SelectItemProps & { 
  class?: HTMLAttributes["class"]
  size?: SelectVariants['size']
}>()

const delegatedProps = reactiveOmit(props, "class", "size")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    data-slot="select-item"
    v-bind="forwardedProps"
    :class="
      cn(
        selectItemVariants({ size }),
        props.class,
      )
    "
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <SelectItemIndicator>
        <slot name="indicator-icon">
          <Check :class="selectIconVariants({ size })" />
        </slot>
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>
