export type AuthStatus = 'authenticated' | 'unauthenticated' | 'expired'

export interface AuthState {
  status: AuthStatus
}
