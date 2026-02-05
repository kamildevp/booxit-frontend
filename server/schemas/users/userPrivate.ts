import { z } from 'zod'
import timestampsSchema from '../timestamps'
import languagePreferenceSchema from '../languagePreference'

export default z.object({
  id: z.int(),
  email: z.string(),
  username: z.string(),
  name: z.string(),
  roles: z.array(z.string()),
  language_preference: languagePreferenceSchema,
}).extend(timestampsSchema.shape)
