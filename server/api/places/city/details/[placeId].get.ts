import detailsRequest from '~~/schemas/places/city/detailsRequest'

export default defineEventHandler(async (event) => {
  const placeId = getRouterParam(event, 'placeId')
  const query = getQuery(event)
  const queryParsingResult = detailsRequest.safeParse(query)
  if (!placeId || !queryParsingResult.success) {
    throw createError({
      statusMessage: 'Bad Request',
      status: 400,
    })
  }

  const parsedQuery = queryParsingResult.data
  return getCityDetailsByPlaceId(
    placeId,
    parsedQuery.sessionToken,
    parsedQuery.languageCode,
  )
})
