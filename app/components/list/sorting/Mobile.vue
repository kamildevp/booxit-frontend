<template>
  <div class="flex justify-center xl:hidden">
    <UiDrawer v-model:open="open">
      <UiDrawerTrigger as-child>
        <UiButton
          class="gap-1 text-lg max-w-36 w-full"
          variant="outline"
        >
          <Icon
            name="ic:baseline-swap-vert"
            size="24"
          />
          {{ $t('components.list.sorting.Mobile.drawer_trigger_text') }}
          <UiBadge
            v-show="activeSortingCount > 0"
            class="ml-2"
            variant="destructive"
          >
            {{ activeSortingCount }}
          </UiBadge>
        </UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <UiDrawerHeader>
          <UiDrawerTitle class="text-center">
            {{ $t('components.list.sorting.Mobile.drawer_title') }}
          </UiDrawerTitle>
          <UiDrawerDescription />
        </UiDrawerHeader>
        <ListFiltersContainer
          :active-filters-count="activeSortingCount"
          @apply="() => {
            open = false
            emit('apply')
          }"
          @clear="() => {
            open = false
            emit('clear')
          }"
        >
          <slot />
        </ListFiltersContainer>
        <UiDrawerFooter class="hidden" />
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeSortingCount: number
}>()

const open = ref(false)
watch(open, (value) => {
  if (!value) {
    emit('close')
  }
})
const emit = defineEmits<{
  (e: 'apply' | 'clear' | 'close'): void
}>()
</script>
