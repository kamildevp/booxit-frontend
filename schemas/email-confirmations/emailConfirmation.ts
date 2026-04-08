import { z } from 'zod'

export default z.object({
  id: z.int(),
  type: z.enum([
    'account_activation',
    'email_verification',
    'password_reset',
    'reservation_verification',
    'reservation_cancellation',
  ]),
  _hash: z.string().min(1),
  token: z.string().min(1),
  expires: z.int(),
})
