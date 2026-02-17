<template>
  <div class="w-full h-full">
    <SignupForm
      v-if="!signupResult"
      @on-success="signupResult = true"
    />
    <SignupNotice v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  unauthorizedOnly: true,
})

const signupResult = ref(false)
</script>
