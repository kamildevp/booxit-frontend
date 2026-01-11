<template>
  <NuxtLinkLocale to="/login">
    <UiButton>
      <div class="flex flex-row items-center gap-1">
        <Icon
          size="24"
          name="ic:baseline-account-circle"
        />
        {{ $t('components.header.LoginButton.text') }}
      </div>
    </UiButton>
  </NuxtLinkLocale>
</template>
