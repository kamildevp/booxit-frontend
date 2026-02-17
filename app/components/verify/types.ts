export type VerificationType = 'account_activation'
export type VerificationParameters = {
  id: number
  type: string
  _hash: string
  token: string
  expires: number
}
