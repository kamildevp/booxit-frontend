<template>
  <UiCardHeader class="flex flex-row justify-between items-center">
    <UiCardTitle class="text-2xl flex flex-row items-center gap-2">
      <Icon
        size="36"
        name="ic:baseline-account-circle"
      />
      {{ $t('components.login.FormHeader.title') }}
    </UiCardTitle>
    <UiCardAction>
      <NuxtLinkLocale
        to="/signup"
      >
        <UiButton
          variant="outline"
          class="rounded-full text-primary hover:text-primary"
        >
          {{ $t('components.login.FormHeader.button.sign_up.text') }}
        </UiButton>
      </NuxtLinkLocale>
    </UiCardAction>
  </UiCardHeader>
</template>
