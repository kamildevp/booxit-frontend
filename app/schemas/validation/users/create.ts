import { z } from 'zod'
import errorList from '../errorList'

export default z.object({
  name: errorList,
  email: errorList,
  username: errorList,
  language_preference: errorList,
  password: errorList,
  verification_handler: errorList,
  test: z.object({
    a: errorList,
  }).optional(),
})
