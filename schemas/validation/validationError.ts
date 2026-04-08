import { z } from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'

export default <T extends ZodRawShape>(errorsSchema: ZodObject<T>) => z.object({
  status: z.number(),
  data: z.object({
    data: errorsSchema,
  }),
})
