<script setup lang="ts">
import type { ListboxItemProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import type { ListboxVariants } from "."
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import {
  ListboxItem,
  ListboxItemIndicator,
  useForwardProps,
} from "reka-ui"
import { cn } from "@/lib/utils"
import { listboxIconVariants } from "."

const props = defineProps<ListboxItemProps & { 
  class?: HTMLAttributes["class"]
  size?: ListboxVariants['size']
}>()

const delegatedProps = reactiveOmit(props, "class")

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <ListboxItem
    data-slot="listbox-item"
    v-bind="forwardedProps"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground [&_svg:not([class*=\'text-\'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*=\'size-\'])]:size-4',
        props.class,
      )
    "
  >
    <span class="absolute right-2 flex size-3.5 items-center justify-center">
      <ListboxItemIndicator>
        <slot name="indicator-icon">
          <Check :class="listboxIconVariants({ size })" />
        </slot>
      </ListboxItemIndicator>
    </span>

    <div>
      <slot />
    </div>
  </ListboxItem>
</template>
