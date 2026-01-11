<template>
  <div class="space-y-4">
    <div class="flex flex-row justify-between items-center gap-2">
      <UiLabel>{{ $t('components.header.Preferences.lang_switch.label') }}</UiLabel>
      <AppLangSwitch />
    </div>
    <div class="flex flex-row justify-between items-center gap-2">
      <UiLabel>{{ $t('components.header.Preferences.theme_switch.label') }}</UiLabel>
      <AppThemeSwitch
        :is-dark="isDark"
        :is-unknown="isUnknown"
        @change="(value) => emit('change', value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ThemeSwitchEmits, ThemeSwitchProps } from '../app/ThemeSwitch.vue'

defineProps<ThemeSwitchProps>()
const emit = defineEmits<ThemeSwitchEmits>()
</script>
