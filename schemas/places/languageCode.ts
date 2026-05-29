import { z } from 'zod'

const languageCodes = [
  'pl',
  'en',
] as const

export default z.enum(languageCodes)
