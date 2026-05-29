import { z } from 'zod'
import languageCode from '../languageCode'

export default z.object({
  sessionToken: z.string(),
  languageCode,
})
