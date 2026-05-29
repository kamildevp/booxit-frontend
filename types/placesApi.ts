import type z from 'zod'
import type languageCode from '~~/schemas/places/languageCode'

export type LanguageCode = z.infer<typeof languageCode>

export type CityAutocompleteSuggestion = {
  placeId: string
  text: string
  secondaryText: string
}

export type CityDetails = {
  placeId: string
  slug: string
  displayName: string
  region: string | null
  viewport: {
    sw_lat: number
    sw_lng: number
    ne_lat: number
    ne_lng: number
  }
}
