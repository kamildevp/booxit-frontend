import { z } from 'zod'
import { socialAuthProviders } from '~~/types/socialAuth'

export default z.object({
  provider: z.enum(socialAuthProviders),
  redirect_url: z.string(),
})
