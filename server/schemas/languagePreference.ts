import { z } from 'zod'

export const languages = [
  'en',
  'pl',
] as const

export default z.enum(languages)
