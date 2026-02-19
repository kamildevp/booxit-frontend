<template>
  <AppNoticeCard variant="success">
    <template #title>
      {{ $t('components.password_reset.Notice.title') }}
    </template>
    <template #content>
      {{ $t('components.password_reset.Notice.content') }}
    </template>
    <template #footer>
      <NuxtLinkLocale
        to="/"
      >
        <UiButton>
          {{ $t('components.password_reset.Notice.footer.home_button.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </template>
  </AppNoticeCard>
</template>
