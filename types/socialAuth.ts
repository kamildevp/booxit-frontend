import type z from 'zod'
import type socialAuthStateData from '~~/server/schemas/auth/socialAuthStateData'

export const socialAuthProviders = [
  'google',
] as const

export type SocialAuthProvider = (typeof socialAuthProviders)[number]

export type SocialAuthStateData = z.infer<typeof socialAuthStateData>

export type SocialAuthState = {
  csrf: string
  data: SocialAuthStateData
}
