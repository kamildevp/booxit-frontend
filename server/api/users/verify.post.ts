import message from '~~/server/schemas/message'
import successResponse from '~~/server/schemas/response/successResponse'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const response = await useAPI(event, 'users/verify', 'POST', body)
  const responseSchema = successResponse(message)
  responseSchema.parse(response)

  return true
})
