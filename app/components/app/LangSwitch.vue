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

const icons: Record<typeof locale.value, string> = {
  pl: 'flag-pl-4x3',
  en: 'flag-gb-4x3',
}

const entries = computed(() => locales.value.map(locale => ({
  name: locale.name ?? '',
  value: locale.code,
  icon: icons[locale.code],
})))
</script>
