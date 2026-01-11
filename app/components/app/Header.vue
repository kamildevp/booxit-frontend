<template>
  <div class="flex items-center justify-between border-b p-1 flex-wrap">
    <div class="md:hidden flex-1" />
    <NuxtLinkLocale to="/">
      <AppLogo />
    </NuxtLinkLocale>
    <div class="flex flex-row gap-2 flex-1 justify-end">
      <HeaderLoginButton class="hidden md:block" />
      <div>
        <div class="hidden md:block">
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-lg"
              >
                <Icon
                  name="ic:baseline-menu"
                  size="24"
                />
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent class="max-w-fit">
              <HeaderPreferences
                :is-dark="isDark"
                :is-unknown="isUnknown"
                @change="(value) => setTheme(value)"
              />
            </UiPopoverContent>
          </UiPopover>
        </div>
        <div class="md:hidden">
          <UiDrawer>
            <UiDrawerTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon-lg"
              >
                <Icon
                  name="ic:baseline-menu"
                  size="24"
                />
              </UiButton>
            </UiDrawerTrigger>
            <UiDrawerContent>
              <UiDrawerHeader class="hidden">
                <UiDrawerTitle />
                <UiDrawerDescription />
              </UiDrawerHeader>
              <div class="space-y-2 p-4 text-center">
                <UiDrawerClose>
                  <HeaderLoginButton class="mb-4" />
                </UiDrawerClose>
                <HeaderPreferences
                  :is-dark="isDark"
                  :is-unknown="isUnknown"
                  @change="(value) => setTheme(value)"
                />
              </div>
              <UiDrawerFooter>
                <UiDrawerClose>
                  <UiButton variant="outline">
                    {{ $t('components.app.Header.close_btn.text') }}
                  </UiButton>
                </UiDrawerClose>
              </UiDrawerFooter>
            </UiDrawerContent>
          </UiDrawer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isDark, isUnknown, setTheme, setupPreferredTheme } = useDarkSSR()

onMounted(() => {
  if (isUnknown.value) {
    setupPreferredTheme()
  }
})
</script>
