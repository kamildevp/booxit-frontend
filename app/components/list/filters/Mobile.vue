<template>
  <div class="xl:hidden flex flex-1 justify-center">
    <UiDrawer v-model:open="open">
      <UiDrawerTrigger as-child>
        <UiButton
          class="gap-1 text-lg max-w-36 w-full"
          variant="outline"
        >
          <Icon
            name="ic:round-tune"
            size="24"
          />
          {{ $t('components.list.filters.Mobile.drawer_trigger_text') }}
          <UiBadge
            v-show="activeFiltersCount > 0"
            class="ml-2"
            variant="destructive"
          >
            {{ activeFiltersCount }}
          </UiBadge>
        </UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <UiDrawerHeader>
          <UiDrawerTitle class="text-center text-lg">
            {{ $t('components.list.filters.Mobile.drawer_title') }}
          </UiDrawerTitle>
          <UiDrawerDescription />
        </UiDrawerHeader>
        <ListFiltersContent
          ref="filtersContent"
          v-model:filters-state="filtersState"
          @apply="onApply"
        >
          <template #default="slotProps">
            <slot v-bind="slotProps" />
          </template>
        </ListFiltersContent>
        <UiDrawerFooter class="hidden" />
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script setup lang="ts">
import type { FiltersState } from '~~/types/list'

const filtersState = defineModel<FiltersState>('filtersState', { required: true })
const emit = defineEmits<{
  (e: 'apply'): void
}>()
const activeFiltersCount = computed(() => filtersState.value.filter(el => !Array.isArray(el.value) || el.value.length > 0).length)
const open = ref(false)
const filtersContentRef = useTemplateRef('filtersContent')

watch(open, () => {
  filtersContentRef.value?.resetLocalFiltersState()
})

function onApply() {
  open.value = false
  emit('apply')
}
</script>
