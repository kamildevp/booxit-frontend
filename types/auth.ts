import type z from 'zod'
import type userPrivate from '~~/server/schemas/users/userPrivate'

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'expired'

export interface AuthState {
  status: AuthStatus
  userData?: z.infer<typeof userPrivate>
}
