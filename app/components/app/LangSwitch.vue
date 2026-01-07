<template>
  <div>
    <UiSelect
      :default-value="locale"
      @update:model-value="(value) => setLocale(value as typeof locale)"
    >
      <UiSelectTrigger>
        <UiSelectValue placeholder="Select language">
          <div class="flex items-center gap-1 min-w-20">
            <Icon
              class="border bg-cover"
              size="16"
              :name="`flag-${selectedLocale?.code}-4x3`"
            />
            {{ selectedLocale?.name }}
          </div>
        </UiSelectValue>
      </UiSelectTrigger>
      <UiSelectContent>
        <UiSelectItem
          v-for="lang in locales"
          :key="lang.code"
          :value="lang.code"
        >
          <div class="flex items-center gap-1">
            <Icon
              class="border bg-cover"
              size="16"
              :name="`flag-${lang.code}-4x3`"
            />
            {{ lang.name }}
          </div>
        </UiSelectItem>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const selectedLocale = computed(() => locales.value.find(el => el.code === locale.value))
</script>
