<template>
  <AppNoticeCard variant="failure">
    <template #title>
      {{ $t('components.verify.FailedNotice.title') }}
    </template>
    <template #content>
      {{ $t('components.verify.FailedNotice.content') }}
    </template>
    <template #footer>
      <NuxtLinkLocale
        to="/"
      >
        <UiButton>
          {{ $t('components.verify.FailedNotice.footer.home_button.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </template>
  </AppNoticeCard>
</template>
