<template>
  <div class="flex-1 flex flex-col">
    <VerifyFailedNotice v-if="error" />
    <SuccessNotice v-else />
  </div>
</template>

<script setup lang="ts">
import type { VerificationParameters } from '../types'
import SuccessNotice from './SuccessNotice.vue'

const props = defineProps<VerificationParameters>()

const { error } = await useFetch('/api/users/verify', {
  method: 'POST',
  body: props,
})
</script>
