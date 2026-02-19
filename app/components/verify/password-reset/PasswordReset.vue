<template>
  <div class="h-full">
    <VerifyPasswordResetForm
      v-if="!error && result === undefined"
      v-bind="props"
      @on-success="result = true"
      @on-failure="result = false"
    />
    <VerifyPasswordResetSuccessNotice v-if="!error && result === true" />
    <VerifyFailedNotice v-if="error || result === false" />
  </div>
</template>

<script setup lang="ts">
import type { VerificationParameters } from '../types'

const result = ref<boolean | undefined>(undefined)
const props = defineProps<VerificationParameters>()
const { error } = await useFetch('/api/email-confirmations/validate', {
  method: 'GET',
  query: props,
})
</script>
