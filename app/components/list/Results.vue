<template>
  <div class="flex flex-col gap-4 p-4 overflow-auto">
    <div class="text-muted-foreground p-1">
      {{ $t('components.list.Results.count_text', { count: resultsCount }) }}
    </div>
    <div
      v-for="item, indx in items"
      :key="indx"
    >
      <slot :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
interface Props {
  items: T[]
  resultsCount: number
}
defineProps<Props>()
</script>
