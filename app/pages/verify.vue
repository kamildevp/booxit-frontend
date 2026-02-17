<template>
  <div class="h-full">
    <component
      :is="typeComponent"
      v-bind="result.data"
      v-if="result.success"
    />
    <VerifyFailedNotice v-else />
  </div>
</template>

<script setup lang="ts">
import z from 'zod'
import AccountActivation from '~/components/verify/account-activation/AccountActivation.vue'
import type { VerificationType } from '~/components/verify/types'

const route = useRoute()

const typeComponentMap: Record<VerificationType, Component> = {
  account_activation: AccountActivation,
}

const verificationParametersSchema = z.object({
  id: z.coerce.number(),
  type: z.enum(Object.keys(typeComponentMap) as VerificationType[]),
  _hash: z.string().min(1),
  token: z.string().min(1),
  expires: z.coerce.number(),
})

const result = verificationParametersSchema.safeParse(route.query)
const typeComponent = result.success ? typeComponentMap[result.data.type] : undefined
</script>
