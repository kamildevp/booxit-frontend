<script setup lang="ts">
import type { ListboxRootEmits, ListboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { ListboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "~/lib/utils";

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<ListboxRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<ListboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <ListboxRoot
    v-slot="slotProps"
    data-slot="listbox"
    v-bind="{ ...$attrs, ...forwarded }"
    :class="cn(
      'flex flex-col overflow-hidden',
      props.class
    )"
  >
    <slot v-bind="slotProps" />
  </ListboxRoot>
</template>
