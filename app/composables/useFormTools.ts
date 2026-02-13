import type { ZodOptional, ZodObject } from 'zod'
import type errorList from '~/schemas/validation/errorList'
import validationError from '~/schemas/validation/validationError'

type ErrorList = typeof errorList

type ErrorShape = {
  [k: string]: ZodOptional<ZodObject<ErrorShape>> | ErrorList
}

export default function () {
  const { t, te } = useI18n()

  function parseValidationErrors<T extends ErrorShape>(error: unknown, errorsSchema: ZodObject<T>, translationPath: string): Record<string, string[]> {
    const result = validationError(errorsSchema).safeParse(error)
    if (!result.success || result.data.status != 422) {
      throw error
    }

    const flatErrors = flattenObject(result.data.data.data) as Record<string, string[] | undefined>
    return translateErrors(flatErrors, translationPath)
  }

  function translateErrors(errors: Record<string, string[] | undefined>, translationPath: string): Record<string, string[]> {
    const translatedErrors: Record<string, string[]> = {}
    for (const key of Object.keys(errors)) {
      const translated = errors[key]?.map(error => te(`${translationPath}.${error}`) ? t(`${translationPath}.${error}`) : error)
      if (translated) {
        translatedErrors[key] = translated
      }
    }

    return translatedErrors
  }

  return {
    parseValidationErrors,
  }
}
