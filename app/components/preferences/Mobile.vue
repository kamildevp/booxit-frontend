<template>
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
          <PreferencesContent />
        </div>
        <UiDrawerFooter>
          <UiDrawerClose>
            <UiButton variant="outline">
              {{ $t('components.preferences.Mobile.close_btn.text') }}
            </UiButton>
          </UiDrawerClose>
        </UiDrawerFooter>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>
