import { z } from 'zod'

export const languages = [
  {
    name: 'Polski',
    value: 'pl',
    icon: 'flag-pl-4x3',
  },
  {
    name: 'English',
    value: 'en',
    icon: 'flag-gb-4x3',
  },
] as const

export const values = languages.map(entry => entry.value)

export default z.enum(values)
