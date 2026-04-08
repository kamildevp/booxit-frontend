import { z } from 'zod'

export default z.object({
  code: z.string(),
  state: z.string(),
})
