import { z } from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'

export default <T extends ZodRawShape>(dataSchema: ZodObject<T>) => z.object({
  status: z.enum(['success']),
  data: dataSchema,
})
