<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const { isUnknown, setupPreferredTheme } = useDarkSSR()

onMounted(() => {
  if (isUnknown.value) {
    setupPreferredTheme()
  }
})
</script>
