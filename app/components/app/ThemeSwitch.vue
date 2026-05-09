<template>
  <div v-if="!isUnknown">
    <div class="flex flex-row border rounded-md overflow-hidden">
      <UiButton
        v-for="themeBtn in themeBtns"
        :key="themeBtn.name"
        variant="default"
        :class="[
          'rounded-none w-12',
          themeBtn.value === isDark ? '' : 'bg-transparent text-foreground hover:bg-accent',
        ]"
        size="icon-sm"
        @click="setTheme(themeBtn.name)"
      >
        <Icon
          :name="themeBtn.icon"
          size="20"
        />
      </UiButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const themeBtns: {
  name: Theme
  value: boolean
  icon: string
}[] = [
  {
    name: 'light',
    value: false,
    icon: 'ic:baseline-light-mode',
  },
  {
    name: 'dark',
    value: true,
    icon: 'ic:baseline-dark-mode',
  },
]
const { isUnknown, isDark, setTheme } = useDarkSSR()
</script>
