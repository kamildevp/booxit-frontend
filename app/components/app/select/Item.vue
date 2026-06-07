<template>
  <div class="flex items-center gap-1 justify-center">
    <Icon
      v-if="icon"
      class="border bg-cover"
      size="16"
      :name="icon"
    />
    {{ $te(label) ? $t(label) : label }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string
  icon?: string
}
defineProps<Props>()
</script>
