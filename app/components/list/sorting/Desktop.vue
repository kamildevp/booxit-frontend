<template>
  <div class="hidden xl:flex w-full p-2 justify-end">
    <UiPopover
      v-slot="{ close }"
      v-model:open="isOpen"
    >
      <UiPopoverTrigger as-child>
        <UiButton
          variant="outline"
          class="gap-1"
        >
          <Icon
            name="ic:baseline-swap-vert"
            size="24"
          />
          {{ $t('components.list.sorting.Desktop.popover_trigger_text') }}
          <UiBadge
            v-show="activeSortingCount > 0"
            class="ml-2"
            variant="destructive"
          >
            {{ activeSortingCount }}
          </UiBadge>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent
        align="end"
        class="p-0"
      >
        <ListFiltersContainer
          :active-filters-count="activeLocalSortingCount"
          @apply="() => {
            close()
            emit('apply')
          }"
          @clear="() => {
            close()
            emit('clear')
          }"
        >
          <slot />
        </ListFiltersContainer>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeSortingCount: number
  activeLocalSortingCount: number
}>()

const isOpen = ref(false)
watch(isOpen, (value) => {
  if (!value) {
    emit('close')
  }
})

const emit = defineEmits<{
  (e: 'apply' | 'clear' | 'close'): void
}>()
</script>
