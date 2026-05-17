<template>
  <div class="flex-1">
    <HomeHero />
    <HomeCategories />
    <HomeCTA />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useHead({
  title: t('pages.index.title'),
  meta: [{ name: 'description', content: t('pages.index.description') }],
})
</script>
