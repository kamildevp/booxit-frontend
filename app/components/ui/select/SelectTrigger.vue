<script setup lang="ts">
import type { SelectTriggerProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { SelectVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { ChevronDown } from "lucide-vue-next"
import { SelectIcon, SelectTrigger, useForwardProps } from "reka-ui"
import { cn } from "@/lib/utils"
import { selectIconVariants, selectTriggerVariants } from "."

const props = defineProps<SelectTriggerProps & { 
    class?: HTMLAttributes["class"], 
    size?: SelectVariants['size']
}>()

const delegatedProps = reactiveOmit(props, "class", "size")
const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    data-slot="select-trigger"
    v-bind="forwardedProps"
    :class="cn(
      selectTriggerVariants({ size }),
      props.class,
    )"
  >
    <slot />
    <SelectIcon v-if="!asChild" as-child>
      <ChevronDown :class="[
        selectIconVariants({ size }),
        'opacity-50'
      ]" />
    </SelectIcon>
  </SelectTrigger>
</template>
