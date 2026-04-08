<template>
  <div class="flex">
    <UiInput
      v-model="modelValue"
      :placeholder="placeholder"
      class="rounded-r-none rounded-l-full focus-visible:ring-1 focus-visible:border-primary"
    />
    <UiButton
      class="rounded-l-none px-4"
      @click="emit('apply')"
    >
      <Icon
        name="ic:round-search"
        size="24"
      />
    </UiButton>
  </div>
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string
}
defineProps<Props>()
const modelValue = defineModel<string>()
const emit = defineEmits<{
  (e: 'apply'): void
}>()
</script>
