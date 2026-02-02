import successResponse from '~~/server/schemas/response/successResponse'
import userPrivate from '~~/server/schemas/users/userPrivate'

export default defineEventHandler(async (event) => {
  const response = await useAPI(event, 'users/me', 'GET')
  const responseSchema = successResponse(userPrivate)
  const responseData = responseSchema.parse(response).data

  return responseData
})
