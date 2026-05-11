<template>
  <nav
    :class="[
      'flex md:hidden border-t justify-around p-2 fixed w-full bottom-0 bg-background z-10 duration-300',
      { 'translate-y-full': scrollDir },
    ]"
    aria-label="Main navigation"
  >
    <div
      v-for="item in items"
      :key="item.id"
      class="flex-1"
    >
      <NuxtLinkLocale
        :to="item.path"
        :aria-current="selectedItem?.id === item.id ? 'page' : undefined"
        class="block w-full"
      >
        <div
          :class="[
            'flex flex-col items-center text-sm font-bold',
            selectedItem?.id === item.id ? 'text-primary' : 'text-muted-foreground',
          ]"
        >
          <Icon
            :name="item.icon"
            size="24"
          />
          <div>{{ $t(item.label) }}</div>
        </div>
      </NuxtLinkLocale>
    </div>
  </nav>
</template>

<script setup lang="ts">
const { scrollDir } = useScroll()
const { authenticated } = useAuth()

type NavItem = {
  id: string
  label: string
  icon: string
  path: string
}
const items = computed<NavItem[]>(() => [
  {
    id: 'start',
    label: 'components.app.BottomNav.start',
    icon: 'ic:round-home',
    path: '/',
  },
  {
    id: 'login',
    label: 'components.app.BottomNav.log_in',
    icon: 'ic:baseline-account-circle',
    path: '/login',
  },
  {
    id: 'account',
    label: 'components.app.BottomNav.account',
    icon: 'ic:baseline-account-circle',
    path: '/account',
  },
].filter(item => item.id !== (authenticated.value ? 'login' : 'account')))

const route = useRoute()
const localePath = useLocalePath()
const selectedItem = computed(() => items.value.find(item => localePath(item.path) === route.path))
</script>
