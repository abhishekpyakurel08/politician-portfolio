'use client'
import React from 'react'
import Link from 'next/link'
import { useLocale } from '@/providers/LocaleProvider'

export const NewsletterForm: React.FC = () => {
  const { locale } = useLocale()
  return (
    <Link
      href={`/${locale}/contact`}
      className="inline-flex items-center justify-center w-full bg-[#B31B20] hover:bg-red-700 text-white font-black h-12 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all"
    >
      {locale === 'en' ? 'Join Now' : 'जोडिनुहोस्'}
    </Link>
  )
}
