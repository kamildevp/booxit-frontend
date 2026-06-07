<script setup lang="ts">
import type { ListboxContentProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ListboxContent, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxContentProps & { class?: HTMLAttributes["class"] }>()

const delegatedProps = reactiveOmit(props, "class")

const forwarded = useForwardPropsEmits(delegatedProps)
</script>

<template>
  <ListboxContent
    data-slot="listbox-content"
    v-bind="{ ...$attrs, ...forwarded }"
    :class="cn(
      'flex flex-col gap-1 p-4 px-8 items-center overflow-auto',
      props.class,
    )"
  >
    <slot />
  </ListboxContent>
</template>
