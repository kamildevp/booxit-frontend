<template>
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
      <PreferencesContent />
    </UiPopoverContent>
  </UiPopover>
</template>
