<template>
  <div class="flex items-center justify-between border-b flex-wrap h-(--header-height)">
    <div class="md:hidden flex-1" />
    <NuxtLinkLocale to="/">
      <AppLogo />
    </NuxtLinkLocale>
    <div class="flex flex-row gap-2 flex-1 justify-end">
      <HeaderLoginButton class="hidden md:block" />
      <Preferences />
    </div>
  </div>
</template>
