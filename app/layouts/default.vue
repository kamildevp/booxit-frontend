<template>
  <div class="flex flex-col min-h-dvh">
    <header
      :class="[
        'sticky top-0 bg-background z-10 transition-transform duration-300',
        { '-translate-y-full': scrollDir },
      ]"
    >
      <AppHeader />
    </header>
    <main class="flex flex-col flex-1 relative">
      <slot />
      <UiToaster
        position="top-center"
        rich-colors
        class="absolute!"
        :theme="isDark ? 'dark' : 'light'"
      />
    </main>
    <AppBottomNav />
  </div>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'

const { isDark } = useDarkSSR()
const { scrollDir } = useScroll()
</script>
