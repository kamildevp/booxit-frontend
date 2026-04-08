import successResponse from '~~/schemas/response/successResponse'
import userPrivate from '~~/schemas/users/userPrivate'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const response = await useAPI(event, 'users', 'POST', {
    ...body,
    verification_handler: config.appId,
  })
  const responseSchema = successResponse(userPrivate)
  responseSchema.parse(response)

  return true
})
