import { z } from 'zod'
import type { ZodObject } from 'zod'

export default <T extends ZodObject>(dataSchema: T) => z.object({
  status: z.enum(['success']),
  data: dataSchema,
})
