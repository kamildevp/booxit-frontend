import { z } from 'zod'
import socialAuthStateData from './socialAuthStateData'

export default z.object({
  csrf: z.string(),
  data: socialAuthStateData,
})
