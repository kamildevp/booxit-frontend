import message from '~~/schemas/message'
import successResponse from '~~/schemas/response/successResponse'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const response = await useAPI(event, 'users/reset-password-request', 'POST', {
    ...body,
    verification_handler: config.appId,
  })
  const responseSchema = successResponse(message)
  responseSchema.parse(response)

  return true
})
