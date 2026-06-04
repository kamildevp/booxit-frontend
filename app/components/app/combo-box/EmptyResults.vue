<template>
  <div class="flex flex-col gap-1 items-center text-muted-foreground p-2">
    <Icon
      name="ic:round-search-off"
      size="48"
    />
    {{ $t('components.app.combo_box.EmptyResults.empty_text') }}
  </div>
</template>
