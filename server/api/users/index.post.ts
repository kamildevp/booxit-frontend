import successResponse from '~~/server/schemas/response/successResponse'
import userPrivate from '~~/server/schemas/users/userPrivate'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await useAPI(event, 'users', 'POST', body)
  const responseSchema = successResponse(userPrivate)
  responseSchema.parse(response)

  return true
})
