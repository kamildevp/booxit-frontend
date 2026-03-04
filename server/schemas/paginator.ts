import { z } from 'zod'
import type { ZodObject, ZodRawShape } from 'zod'

export default <T extends ZodRawShape>(dataSchema: ZodObject<T>) => z.object({
  items: z.array(dataSchema),
  page: z.int(),
  per_page: z.int(),
  pages_count: z.int(),
  total: z.int(),
})
