'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, type Locale, type TranslationKeys } from '@/locales'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationKeys
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: React.ReactNode; initialLocale?: Locale }> = ({ children, initialLocale }) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'ne')

  useEffect(() => {
    if (initialLocale) {
      setLocaleState(initialLocale)
      return
    }
    const stored = localStorage.getItem('user_locale') as Locale
    if (stored) setLocaleState(stored)
  }, [initialLocale])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('user_locale', newLocale)
  }

  const t = translations[locale]

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => {
  const context = useContext(LocaleContext)
  if (!context) throw new Error('useLocale must be used within a LocaleProvider')
  return context
}
