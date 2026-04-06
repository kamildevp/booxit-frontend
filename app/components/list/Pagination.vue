<template>
  <div
    v-if="total > 0"
    class="flex flex-col items-center max-w-80 gap-2 p-4"
  >
    <div>
      {{ $t('components.list.Pagination.loaded_count_text', { totalLoaded, count: total }) }}
    </div>
    <UiProgress
      :model-value="loadedProgress"
      class="h-1"
    />
    <UiButton
      v-if="page < pagesCount"
      variant="outline"
      class="w-full mt-2 text-primary hover:text-primary border-primary dark:border-primary"
      @click="emit('update:page', page+1)"
    >
      {{ $t('components.list.Pagination.load_more_button.text') }}
    </UiButton>
    <nav class="sr-only">
      <NuxtLinkLocale
        v-if="page > 1"
        :to="{ path, query: { ...query, page: page-1 } }"
      >
        {{ $t('components.list.Pagination.prev_text') }}
      </NuxtLinkLocale>
      <NuxtLinkLocale
        v-if="page < pagesCount"
        :to="{ path, query: { ...query, page: page+1 } }"
      >
        {{ $t('components.list.Pagination.next_text') }}
      </NuxtLinkLocale>
    </nav>
  </div>
</template>

<script setup lang="ts">
interface Props {
  page: number
  pageSize: number
  pagesCount: number
  total: number
  path: string
  query: Record<string, unknown>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:page', page: number): void
}>()

const totalLoaded = computed(() => Math.min(props.page * props.pageSize, props.total))
const loadedProgress = computed(() => totalLoaded.value / props.total * 100)
</script>
