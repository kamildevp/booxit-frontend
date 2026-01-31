<template>
  <div class="flex flex-col h-screen">
    <div>
      <AppHeader />
    </div>
    <div class="flex-1 relative">
      <slot />
      <UiToaster
        position="top-center"
        rich-colors
        class="absolute!"
        :theme="isDark ? 'dark' : 'light'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'

const { isDark } = useDarkSSR()
</script>
