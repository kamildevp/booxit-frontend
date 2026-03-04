import organization from '~~/server/schemas/organizations/organization'
import paginatorResponse from '~~/server/schemas/response/paginatorResponse'

export default defineEventHandler(async (event) => {
  const response = await useAPI(event, 'organizations', 'GET', undefined, getQuery(event))
  const responseSchema = paginatorResponse(organization)
  const responseData = responseSchema.parse(response).data

  return responseData
})
