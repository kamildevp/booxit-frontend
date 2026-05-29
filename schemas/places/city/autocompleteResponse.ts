import { z } from 'zod'

const suggestionSchema = z.object({
  placePrediction: z.object({
    placeId: z.string(),
    text: z.object({
      text: z.string(),
    }),
    structuredFormat: z.object({
      mainText: z.object({
        text: z.string(),
      }),
      secondaryText: z.object({
        text: z.string(),
      }).optional(),
    }),
  }),
})

export default z.object({
  suggestions: z.array(suggestionSchema).optional(),
})
