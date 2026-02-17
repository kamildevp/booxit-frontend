<template>
  <AppNoticeCard variant="success">
    <template #title>
      {{ $t('components.verify.account_activation.SuccessNotice.title') }}
    </template>
    <template #content>
      {{ $t('components.verify.account_activation.SuccessNotice.content') }}
    </template>
    <template #footer>
      <NuxtLinkLocale
        to="/login"
      >
        <UiButton>
          {{ $t('components.verify.account_activation.SuccessNotice.footer.login_button.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </template>
  </AppNoticeCard>
</template>
