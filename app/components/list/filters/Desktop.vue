<template>
  <aside
    :class="[
      'hidden xl:flex flex-col min-w-sm border-r sticky duration-300 overflow-hidden',
      scrollDir ? 'top-0 max-h-dvh' : 'top-(--header-height) max-h-(--sticky-content-max-height)',
    ]"
  >
    <ListFiltersContent
      v-model:filters-state="filtersState"
      class="flex-1"
      @apply="emit('apply')"
    >
      <template #default="slotProps">
        <slot v-bind="slotProps" />
      </template>
    </ListFiltersContent>
  </aside>
</template>

<script setup lang="ts">
import type { FiltersState } from '~~/types/list'

const { scrollDir } = useScroll()
const filtersState = defineModel<FiltersState>('filtersState', { required: true })

const emit = defineEmits<{
  (e: 'apply'): void
}>()
</script>
