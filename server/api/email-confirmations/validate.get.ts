import emailConfirmation from '~~/server/schemas/email-confirmations/emailConfirmation'
import successResponse from '~~/server/schemas/response/successResponse'

export default defineEventHandler(async (event) => {
  const response = await useAPI(event, 'email-confirmations/validate', 'GET', undefined, getQuery(event))
  const responseSchema = successResponse(emailConfirmation)
  responseSchema.parse(response)

  return true
})
