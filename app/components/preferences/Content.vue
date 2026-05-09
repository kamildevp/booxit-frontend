<template>
  <div class="space-y-4">
    <div class="flex flex-row justify-between items-center gap-2">
      <UiLabel>{{ $t('components.preferences.Content.lang_switch.label') }}</UiLabel>
      <AppLangSwitch />
    </div>
    <div class="flex flex-row justify-between items-center gap-2">
      <UiLabel>{{ $t('components.preferences.Content.theme_switch.label') }}</UiLabel>
      <AppThemeSwitch />
    </div>
  </div>
</template>
