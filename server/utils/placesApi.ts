import autocompleteCityResponse from '~~/schemas/places/city/autocompleteResponse'
import detailsCityResponse from '~~/schemas/places/city/detailsResponse'
import type { CityAutocompleteSuggestion, CityDetails, LanguageCode } from '~~/types/placesApi'
import type { ZodObject } from 'zod'
import slugify from 'slugify'

const DETAILS_TTL = 60 * 60 * 24 * 120
const AUTOCOMPLETE_TTL = 60 * 60 * 24 * 90

const cachePrefixes = {
  cityAutocomplete: 'places:city:autocomplete',
  cityDetails: 'places:city:details',
  citySlug: 'places:city:slug',
  cityPlaceSlug: 'places:city:place-slug',
}

export const getCityAutocompleteSuggestions = async (
  input: string,
  sessionToken: string,
  languageCode: LanguageCode,
) => {
  const sanitizedInput = input.toLowerCase().trim()
  const storage = useStorage('redis')
  const cache = await storage.getItem<CityAutocompleteSuggestion[]>(`${cachePrefixes.cityAutocomplete}:${sanitizedInput}:${languageCode}`)
  if (cache) {
    return cache
  }

  const responseData = await fetchPlaceAutocompleteSuggestions(
    sanitizedInput,
    'suggestions.placePrediction.placeId,suggestions.placePrediction.text,suggestions.placePrediction.structuredFormat',
    autocompleteCityResponse,
    sessionToken,
    languageCode,
    ['locality'],
  )
  const suggestions = (responseData.suggestions ?? []).map(suggestion => ({
    placeId: suggestion.placePrediction.placeId,
    text: suggestion.placePrediction.structuredFormat.mainText.text,
    secondaryText: suggestion.placePrediction.structuredFormat.secondaryText?.text ?? '',
  }))

  await storage.setItem<CityAutocompleteSuggestion[]>(`${cachePrefixes.cityAutocomplete}:${sanitizedInput}:${languageCode}`, suggestions, { ttl: AUTOCOMPLETE_TTL })
  return suggestions
}

export const getCityDetailsByPlaceId = async (
  placeId: string,
  sessionToken: string,
  languageCode: LanguageCode,
) => {
  const storage = useStorage('redis')
  const cache = await storage.getItem<CityDetails>(`${cachePrefixes.cityDetails}:${placeId}:${languageCode}`)
  if (cache) {
    return cache
  }

  const responseData = await fetchPlaceDetails(placeId, 'viewport,displayName,addressComponents', detailsCityResponse, sessionToken, languageCode)
  const region = responseData.addressComponents
    ?.find(c => c.types.includes('administrative_area_level_1'))
    ?.longText ?? null

  const slug = await generateCitySlug(responseData.displayName.text, placeId)
  const cityDetails: CityDetails = {
    placeId,
    slug,
    region,
    displayName: responseData.displayName.text,
    viewport: {
      sw_lat: responseData.viewport.low.latitude,
      sw_lng: responseData.viewport.low.longitude,
      ne_lat: responseData.viewport.high.latitude,
      ne_lng: responseData.viewport.high.longitude,
    },
  }
  await storage.setItem(`${cachePrefixes.cityDetails}:${placeId}:${languageCode}`, cityDetails, { ttl: DETAILS_TTL })

  return cityDetails
}

export const getCityDetailsBySlug = async (
  slug: string,
  sessionToken: string,
  languageCode: LanguageCode,
) => {
  const storage = useStorage('redis')
  const placeId = await storage.getItem<string>(`${cachePrefixes.citySlug}:${slug}`)
  return placeId ? getCityDetailsByPlaceId(placeId, sessionToken, languageCode) : null
}

const fetchPlaceAutocompleteSuggestions = async<S extends ZodObject>(
  input: string,
  fieldMask: string,
  responseSchema: S,
  sessionToken: string,
  languageCode?: LanguageCode,
  includedPrimaryTypes?: string[],
) => {
  const { googleMapsApiKey } = useRuntimeConfig()
  const response = await $fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': googleMapsApiKey,
        'X-Goog-FieldMask': fieldMask,
      },
      body: {
        input,
        sessionToken,
        includedPrimaryTypes,
        languageCode,
      },
    },
  ).catch((err) => {
    throw createError({
      status: err.status ?? 500,
      message: 'Google Places autocomplete fetch failed',
    })
  })

  const parsedResponse = responseSchema.safeParse(response)
  if (!parsedResponse.success) {
    throw createError({
      status: 500,
      message: 'Parsing Google Places autocomplete response failed',
    })
  }

  return parsedResponse.data
}

const fetchPlaceDetails = async<S extends ZodObject> (
  placeId: string,
  fieldMask: string,
  responseSchema: S,
  sessionToken: string,
  languageCode?: LanguageCode,
) => {
  const { googleMapsApiKey } = useRuntimeConfig()
  const response = await $fetch(
    `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
    {
      query: {
        languageCode,
      },
      headers: {
        'X-Goog-Api-Key': googleMapsApiKey,
        'X-Goog-FieldMask': fieldMask,
        'X-Goog-Session-Token': sessionToken,
      },
    },
  ).catch((err) => {
    throw createError({
      status: err.status ?? 500,
      message: 'Google Places details fetch failed',
    })
  })

  const parsedResponse = responseSchema.safeParse(response)
  if (!parsedResponse.success) {
    throw createError({
      status: 500,
      message: 'Parsing Google Places details response failed',
    })
  }

  return parsedResponse.data
}

const generateCitySlug = async (displayName: string, placeId: string) => {
  const storage = useStorage('redis')
  const placeSlug = await storage.getItem<string>(`${cachePrefixes.cityPlaceSlug}:${placeId}`)
  if (placeSlug) {
    return placeSlug
  }

  const slug = `${slugify(displayName, { lower: true })}-${placeId.slice(placeId.length - 4, placeId.length)}`

  await Promise.all([
    storage.setItem(`${cachePrefixes.citySlug}:${slug}`, placeId),
    storage.setItem(`${cachePrefixes.cityPlaceSlug}:${placeId}`, slug),
  ])
  return slug
}
