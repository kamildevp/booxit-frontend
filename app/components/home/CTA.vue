<template>
  <section class="px-8 md:px-16 py-8 bg-muted/50 flex gap-10 items-center justify-between">
    <div class="flex flex-col gap-6">
      <UiBadge class="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold border border-primary/20">
        {{ $t('components.home.CTA.badge_text') }}
      </UiBadge>
      <h2 class="text-3xl md:text-4xl font-bold">
        {{ $t('components.home.CTA.title') }}
      </h2>
      <p class="text-muted-foreground text-lg">
        {{ $t('components.home.CTA.description') }}
      </p>
      <ul class="flex flex-col gap-4">
        <li
          v-for="benefit in benefits"
          :key="benefit"
          class="flex items-center gap-3"
        >
          <div class="p-2 rounded-full bg-emerald-500/15 flex items-center justify-center">
            <Icon
              name="ic:baseline-check"
              size="14"
              class="text-emerald-600 dark:text-emerald-400"
            />
          </div>
          <span class="">{{ $t(benefit) }}</span>
        </li>
      </ul>
      <div class="text-center md:text-left">
        <NuxtLinkLocale to="/signup">
          <UiButton size="lg">
            {{ $t('components.home.CTA.register_button.text') }}
          </UiButton>
        </NuxtLinkLocale>
      </div>
    </div>
    <HomeCTAImg class="hidden md:flex" />
  </section>
</template>

<script setup lang="ts">
const benefits = [
  'components.home.CTA.benefit.free',
  'components.home.CTA.benefit.management',
  'components.home.CTA.benefit.tasks_delegation',
  'components.home.CTA.benefit.easy_booking',
]
</script>
