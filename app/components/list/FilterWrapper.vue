<template>
  <UiAccordion
    collapsible
    default-value="item"
  >
    <UiAccordionItem value="item">
      <UiAccordionTrigger class="cursor-pointer bg-accent text-accent-foreground hover:no-underline p-2 px-4 text-sm xl:text-lg items-center">
        <div class="flex items-center gap-2">
          <Icon
            v-if="icon"
            :name="icon"
            size="24"
          />
          {{ $te(title) ? $t(title) : title }}
        </div>
      </UiAccordionTrigger>
      <UiAccordionContent class="p-2">
        <slot />
      </UiAccordionContent>
    </UiAccordionItem>
  </UiAccordion>
</template>

<script setup lang="ts">
interface Props {
  title: string
  icon?: string
}
defineProps<Props>()
</script>
