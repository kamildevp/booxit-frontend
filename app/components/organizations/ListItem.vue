<template>
  <div class="flex flex-col md:flex-row md:h-50 bg-card rounded-xl border overflow-hidden">
    <div class="w-full h-50 md:h-full md:w-65">
      <NuxtImg
        :src="bannerUrl"
        alt="Banner"
        class="w-full h-full object-cover"
        format="webp"
        sizes="400px md:260px"
      />
    </div>
    <div class="flex-1 flex flex-col gap-2 p-4">
      <h1 class="font-bold text-2xl">
        {{ name }}
      </h1>
      <div class="flex items-center gap-1 text-muted-foreground">
        <Icon
          name="ic:baseline-location-on"
          size="20"
          class="text-green-600"
        />
        {{ address }}
      </div>
      <div class="text-muted-foreground">
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="flex flex-col justify-center items-center p-4">
      <UiButton>
        <Icon
          name="ic:baseline-calendar-month"
          size="24"
        />
        {{ $t('components.organizations.ListItem.book_button.text') }}
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  id: number
  name: string
  address: string
  description: string
  bannerUrl: string
}
defineProps<Props>()
</script>
