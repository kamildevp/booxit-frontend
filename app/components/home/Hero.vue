<template>
  <section class="flex flex-col gap-6 items-center p-4 md:p-10">
    <div class="hidden md:flex flex-wrap justify-center gap-4">
      <UiBadge
        v-for="benefit, indx in benefits"
        :key="indx"
        class="px-3 py-1.5 bg-primary/10 text-primary text-sm font-semibold border border-primary/20"
      >
        <Icon
          :name="benefit.icon"
          size="16"
        />
        {{ $t(benefit.text) }}
      </UiBadge>
    </div>
    <h1 class="text-center text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight bg-linear-to-r from-primary to-violet-600 bg-clip-text text-transparent">
      {{ $t('components.home.hero.title') }}
    </h1>
    <p class="text-base md:text-lg lg:text-xl max-w-xl lg:max-w-2xl text-muted-foreground leading-relaxed text-center">
      {{ $t('components.home.hero.description') }}
    </p>
    <OrganizationsSearchBar
      class="w-full max-w-xl lg:max-w-2xl"
      :filters-state="emptyFilters"
      size="xl"
      @apply="onSearchApply"
    />
  </section>
</template>

<script setup lang="ts">
import type { FiltersState } from '~~/types/list'

const localePath = useLocalePath()
const emptyFilters: FiltersState = []

type Benefit = {
  icon: string
  text: string
}

const benefits: Benefit[] = [
  {
    icon: 'ic:outline-money-off',
    text: 'components.home.hero.benefits.free',
  },
  {
    icon: 'ic:outline-person-off',
    text: 'components.home.hero.benefits.no_account',
  },
  {
    icon: 'ic:outline-flash-on',
    text: 'components.home.hero.benefits.instant',
  },
]

function onSearchApply(value?: string) {
  navigateTo(localePath({
    path: '/organizations',
    query: value ? { 'filters[name]': value } : {},
  }))
}
</script>
