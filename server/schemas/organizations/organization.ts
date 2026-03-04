import { z } from 'zod'
import timestampsSchema from '../timestamps'

export default z.object({
  id: z.int(),
  name: z.string(),
  description: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    region: z.string(),
    postal_code: z.string(),
    country: z.string(),
    place_id: z.string(),
    formatted_address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
  }),
  tier: z.string(),
}).extend(timestampsSchema.shape)
