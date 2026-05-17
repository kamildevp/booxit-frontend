<template>
  <section class="p-4">
    <div class="flex flex-col gap-8 items-center max-w-5xl mx-auto">
      <h2 class="text-center text-2xl font-bold p-4">
        {{ $t('components.home.Categories.title') }}
      </h2>
      <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-x-4 gap-y-8">
        <NuxtLinkLocale
          v-for="category, indx in categories"
          :key="category.value"
          :class="[
            { hidden: !expanded && indx > 5 },
            { 'md:block': indx < 10 },
            { 'lg:block': indx < 16 },
          ]"
          :to="{ path: '/organizations', query: { 'filters[service_category][]': category.value } }"
        >
          <div class="flex flex-col gap-3 items-center group">
            <div
              :class="[
                'flex items-center justify-center rounded-full p-5 md:p-6 m-1 group-hover:scale-105 duration-200',
                category.bgCls,
              ]"
            >
              <Icon
                :name="category.icon"
                size="32"
                :class="category.iconCls"
              />
            </div>
            <span class="text-center text-sm text-muted-foreground group-hover:text-foreground">
              {{ $t(category.text) }}
            </span>
          </div>
        </NuxtLinkLocale>
      </div>
      <UiButton
        variant="ghost"
        :aria-expanded="expanded"
        @click="expanded = !expanded"
      >
        <span class="text-base">
          {{ expanded ? $t('components.home.Categories.show_less') : $t('components.home.Categories.show_all') }}
        </span>
        <Icon
          name="ic:baseline-keyboard-arrow-down"
          size="20"
          :class="[
            'transition-transform duration-200',
            { 'rotate-180': expanded },
          ]"
        />
      </UiButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { categories } from '~~/schemas/services/category'

const expanded = ref(false)
</script>
