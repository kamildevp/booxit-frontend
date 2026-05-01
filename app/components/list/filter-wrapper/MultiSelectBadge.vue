<template>
  <UiBadge
    v-show="count > 0"
    variant="destructive"
  >
    {{ $t('components.list.filter-wrapper.MultiSelectBadge.count_text', { count }) }}
    <UiButton
      variant="ghost"
      class="w-5 h-5"
      size="icon-sm"
      as-child
      @click.stop="emit('remove')"
    >
      <Icon name="ic:baseline-close" />
    </UiButton>
  </UiBadge>
</template>

<script setup lang="ts">
defineProps<{
  count: number
}>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()
</script>
