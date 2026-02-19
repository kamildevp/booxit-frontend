<template>
  <AppNoticeCard variant="success">
    <template #title>
      {{ $t('components.verify.password_reset.SuccessNotice.title') }}
    </template>
    <template #content>
      {{ $t('components.verify.password_reset.SuccessNotice.content') }}
    </template>
    <template #footer>
      <NuxtLinkLocale
        to="/login"
      >
        <UiButton>
          {{ $t('components.verify.password_reset.SuccessNotice.footer.login_button.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </template>
  </AppNoticeCard>
</template>
