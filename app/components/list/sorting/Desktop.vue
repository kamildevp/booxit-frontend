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
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent
        align="end"
        class="p-0"
      >
        <ListFiltersContainer
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
