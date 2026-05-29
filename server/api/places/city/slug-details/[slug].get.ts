import slugDetailsRequest from '~~/schemas/places/city/slugDetailsRequest'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  const query = getQuery(event)
  const queryParsingResult = slugDetailsRequest.safeParse(query)
  if (!slug || !queryParsingResult.success) {
    throw createError({
      statusMessage: 'Bad Request',
      status: 400,
    })
  }

  const parsedQuery = queryParsingResult.data
  const result = await getCityDetailsBySlug(
    slug,
    parsedQuery.sessionToken,
    parsedQuery.languageCode,
  )
  if (!result) {
    throw createError({ status: 404, statusMessage: 'Not Found' })
  }
  return result
})
