<template>
  <div class="relative">
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-popover p-2 rounded-full border shadow-sm w-73">
      <UiPagination
        :page="page"
        :items-per-page="pageSize"
        :total="total"
        :sibling-count="0"
        show-edges
        class="text-muted-foreground"
        @update:page="(newPage) => emit('update:page', newPage)"
      >
        <UiPaginationContent v-slot="{ items }">
          <UiPaginationPrevious>
            <Icon name="ic:round-arrow-back-ios" />
          </UiPaginationPrevious>
          <template
            v-for="(item, index) in items"
            :key="index"
          >
            <UiPaginationItem
              v-if="item.type === 'page'"
              :value="item.value"
              :is-active="item.value === page"
            >
              {{ item.value }}
            </UiPaginationItem>
            <UiPaginationEllipsis
              v-else
              :key="item.type"
              :index="index"
            />
          </template>
          <UiPaginationNext>
            <Icon name="ic:round-arrow-forward-ios" />
          </UiPaginationNext>
        </UiPaginationContent>
      </UiPagination>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page: number
  pageSize: number
  total: number
}

defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()
</script>
