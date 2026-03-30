'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { translations, Locale } from '@/utilities/translations'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations['ne']
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ne')

  useEffect(() => {
    const stored = localStorage.getItem('user_locale') as Locale
    if (stored) setLocaleState(stored)
  }, [])

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
