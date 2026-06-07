<script setup lang="ts">
import type { SelectIconProps } from "reka-ui"
import type { SelectVariants } from ".";
import { ChevronDown } from "lucide-vue-next";
import { SelectIcon } from "reka-ui"
import { selectIconVariants } from ".";

const props = defineProps<SelectIconProps & {
  size?: SelectVariants['size']
}>()
</script>

<template>
  <SelectIcon
    data-slot="select-icon"
    v-bind="props"
  >
    <slot>
      <ChevronDown :class="[
        selectIconVariants({ size }),
        'opacity-50'
      ]" />
    </slot>
  </SelectIcon>
</template>
