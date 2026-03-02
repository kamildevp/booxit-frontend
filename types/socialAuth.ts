import type z from 'zod'
import type socialAuthStateData from '~~/server/schemas/auth/socialAuthStateData'

export type SocialAuthProvider = 'google'

export type SocialAuthStateData = z.infer<typeof socialAuthStateData>

export type SocialAuthState = {
  csrf: string
  data: SocialAuthStateData
}
