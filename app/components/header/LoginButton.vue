<template>
  <div>
    <NuxtLinkLocale
      v-if="!authenticated"
      to="/login"
    >
      <UiButton>
        <div class="flex flex-row items-center gap-1">
          <Icon
            size="24"
            name="ic:baseline-account-circle"
          />
          {{ $t('components.header.LoginButton.text') }}
        </div>
      </UiButton>
    </NuxtLinkLocale>
    <UiButton
      v-else
      @click="onLogout"
    >
      <div class="flex flex-row items-center gap-1">
        <Icon
          size="24"
          name="ic:baseline-logout"
        />
        {{ $t('components.header.LogoutButton.text') }}
      </div>
    </UiButton>
  </div>
</template>

<script setup lang="ts">
const { authenticated, logout } = useAuth()
const localePath = useLocalePath()

async function onLogout() {
  await logout(false)
  navigateTo(localePath('/login'))
}
</script>
