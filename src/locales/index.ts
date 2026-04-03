import ne from './ne'
import en from './en'

export const translations = {
  ne,
  en,
} as const

export type Locale = keyof typeof translations
export type TranslationKeys = Record<keyof typeof ne, string>
