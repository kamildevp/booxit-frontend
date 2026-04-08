import { z } from 'zod'

export default z.object({
  status: z.enum(['fail']),
  data: z.object({
    errors: z.unknown(),
  }),
})
