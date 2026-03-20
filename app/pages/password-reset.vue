<template>
  <div class="w-full flex-1 flex flex-col">
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
