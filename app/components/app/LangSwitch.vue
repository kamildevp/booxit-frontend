<template>
  <div>
    <AppSelect
      :entries="entries"
      label-key="name"
      value-key="value"
      icon-key="icon"
      :default-value="locale"
      @value-changed="(value) => setLocale(value)"
    />
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const entries = computed(() => locales.value.map(locale => ({
  name: locale.name ?? '',
  value: locale.code,
  icon: `flag-${locale.code}-4x3`,
})))
</script>
