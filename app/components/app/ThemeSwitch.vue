<template>
  <div>
    <UiButton
      v-if="!isUnknown"
      variant="ghost"
      size="icon"
      class="hover:bg-transparent dark:hover:bg-transparent"
      @click="switchTheme"
    >
      <Icon
        class="text-black dark:text-white hover:text-primary dark:hover:text-primary"
        :name="iconName"
        size="30"
      />
    </UiButton>
  </div>
</template>

<script setup lang="ts">
import { usePreferredDark } from '@vueuse/core'

const isPreferredDark = usePreferredDark()
const icons = {
  light: 'ic:baseline-light-mode',
  dark: 'ic:baseline-dark-mode',
}

const themeCookie = useCookie<'light' | 'dark' | 'auto'>('theme', {
  default: () => 'auto',
  expires: new Date(new Date().setFullYear(new Date().getFullYear() + 10)),
})

onMounted(() => {
  if (themeCookie.value == 'auto') {
    themeCookie.value = isPreferredDark.value ? 'dark' : 'light'
  }
})

const isDark = computed(() => themeCookie.value === 'dark')
const isUnknown = computed(() => themeCookie.value === 'auto')
const iconName = computed(() => isDark.value ? icons.light : icons.dark)

function switchTheme() {
  themeCookie.value = themeCookie.value === 'dark' ? 'light' : 'dark'
}

useHead({
  htmlAttrs: {
    class: { dark: isDark },
  },
})
</script>
