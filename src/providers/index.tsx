import React from 'react'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { LocaleProvider } from './LocaleProvider'
import { Locale } from '@/locales'

export const Providers: React.FC<{
  children: React.ReactNode
  locale?: Locale
}> = ({ children, locale }) => {
  return (
    <ThemeProvider>
      <LocaleProvider initialLocale={locale}>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}
