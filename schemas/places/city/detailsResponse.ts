import { z } from 'zod'

const cordsSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
})

export default z.object({
  viewport: z.object({
    low: cordsSchema,
    high: cordsSchema,
  }),
  displayName: z.object({
    text: z.string(),
  }),
  addressComponents: z.array(
    z.object({
      longText: z.string(),
      types: z.array(z.string()),
    }),
  ),
})
