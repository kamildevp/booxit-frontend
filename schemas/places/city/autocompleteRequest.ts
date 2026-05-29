import { z } from 'zod'
import languageCode from '../languageCode'

export default z.object({
  input: z.string().min(2),
  sessionToken: z.string().min(1),
  languageCode,
})
