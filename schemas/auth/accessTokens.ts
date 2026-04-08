import { z } from 'zod'

export default z.object({
  access_token: z.string(),
  refresh_token: z.string(),
})
