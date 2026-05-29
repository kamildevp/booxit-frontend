import autocompleteRequest from '~~/schemas/places/city/autocompleteRequest'
import { getCityAutocompleteSuggestions } from '~~/server/utils/placesApi'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const bodyParsingResult = autocompleteRequest.safeParse(body)
  if (!bodyParsingResult.success) {
    throw createError({
      statusMessage: 'Bad Request',
      status: 400,
    })
  }

  const parsedBody = bodyParsingResult.data
  const suggestions = await getCityAutocompleteSuggestions(
    parsedBody.input,
    parsedBody.sessionToken,
    parsedBody.languageCode,
  )

  return { suggestions }
})
