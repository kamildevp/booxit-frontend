<template>
  <UiButton
    :class="selectTriggerVariants({ size })"
    :size
  >
    <div
      v-if="label"
      class="flex items-center gap-1"
    >
      <Icon
        v-if="icon"
        class="border bg-cover"
        size="16"
        :name="icon"
      />
      {{ $te(label) ? $t(label) : label }}
    </div>
    <span
      v-else
      class="text-muted-foreground"
    >
      {{ placeholder }}
    </span>
    <UiSelectIcon />
  </UiButton>
</template>

<script setup lang="ts">
import type { SelectVariants } from '~/components/ui/select'
import { selectTriggerVariants } from '~/components/ui/select'

interface Props {
  label?: string
  icon?: string
  placeholder?: string
  size?: SelectVariants['size']
}
defineProps<Props>()
</script>
