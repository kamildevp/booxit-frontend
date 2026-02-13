<template>
  <AppNoticeCard variant="success">
    <template #title>
      {{ $t('components.signup.Notice.title') }}
    </template>
    <template #content>
      {{ $t('components.signup.Notice.content') }}
    </template>
    <template #footer>
      <NuxtLinkLocale
        to="/"
      >
        <UiButton>
          {{ $t('components.signup.Notice.footer.home_button.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </template>
  </AppNoticeCard>
</template>
