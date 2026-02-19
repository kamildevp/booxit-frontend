export type VerificationType = 'account_activation' | 'password_reset'
export type VerificationParameters = {
  id: number
  type: string
  _hash: string
  token: string
  expires: number
}
