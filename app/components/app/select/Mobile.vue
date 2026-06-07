<template>
  <UiDrawer>
    <UiDrawerTrigger
      v-bind="$attrs"
      as-child
    >
      <slot name="trigger" />
    </UiDrawerTrigger>
    <UiDrawerContent>
      <UiDrawerHeader class="p-0">
        <VisuallyHidden>
          <UiDrawerTitle>{{ $t('components.app.select.Mobile.drawer.title') }}</UiDrawerTitle>
          <UiDrawerDescription>{{ $t('components.app.select.Mobile.drawer.description') }}</UiDrawerDescription>
        </VisuallyHidden>
      </UiDrawerHeader>
      <UiListbox
        v-model="model"
        selection-behavior="replace"
      >
        <UiListboxContent class="p-8">
          <UiDrawerClose
            as="div"
            class="w-full"
          >
            <UiListboxItem
              v-for="entry in entries"
              :key="entry[valueKey].toString()"
              :value="entry[valueKey]"
              :size
              class="text-lg p-4 justify-center"
            >
              <slot
                name="item"
                v-bind="{ item: entry }"
              />
            </UiListboxItem>
          </UiDrawerClose>
        </UiListboxContent>
      </UiListbox>
      <UiDrawerFooter />
    </UiDrawerContent>
  </UiDrawer>
</template>

<script setup lang="ts"
  generic="
    VK extends string,
    ET extends Record<VK, NonNullable<AcceptableValue>>
  "
>
import type { AcceptableValue } from 'reka-ui'
import type { ListboxVariants } from '~/components/ui/listbox'
import { VisuallyHidden } from 'reka-ui'

interface Props<
  ValueKey extends string,
  EntryType extends Record<ValueKey, NonNullable<AcceptableValue>>,
> {
  valueKey: ValueKey
  entries: EntryType[]
  size?: ListboxVariants['size']
}

defineOptions({
  inheritAttrs: false,
})

defineProps<Props<VK, ET>>()
const model = defineModel<ET[VK]>()
</script>
