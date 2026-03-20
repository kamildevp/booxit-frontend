<template>
  <div class="flex-1 flex flex-row justify-center items-center">
    <div class="w-full max-w-3xl p-4">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>
            <div class="flex flex-row items-center gap-2 text-2xl justify-center flex-wrap">
              <Icon
                :name="icon.name"
                :class="icon.class"
                size="42"
              />
              <div class="text-center">
                <slot name="title" />
              </div>
            </div>
          </UiCardTitle>
          <UiCardDescription>
            <slot name="description" />
          </UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="flex flex-row justify-center items-center">
          <div class="whitespace-pre-line">
            <slot name="content" />
          </div>
        </UiCardContent>
        <UiCardFooter class="flex flex-row justify-center items-center">
          <div>
            <slot name="footer" />
          </div>
        </UiCardFooter>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
type Variant = 'success' | 'failure' | 'info'

interface Props {
  variant: Variant
}

const props = defineProps<Props>()

const icons: Record<Variant, { name: string, class: string }> = {
  success: {
    name: 'ic:baseline-check-circle',
    class: 'text-green-500',
  },
  failure: {
    name: 'ic:baseline-cancel',
    class: 'text-red-500',
  },
  info: {
    name: 'ic:baseline-info',
    class: 'text-blue-500',
  },
}

const icon = computed(() => icons[props.variant])
</script>
