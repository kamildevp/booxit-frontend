<template>
  <div class="w-full h-full">
    <PasswordResetForm
      v-if="!result"
      @on-success="result = true"
    />
    <PasswordResetNotice v-else />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  unauthorizedOnly: true,
})

const result = ref(false)
</script>
