import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

import { MobileNav } from '@/components/MobileNav'

import { TypedLocale } from 'payload'

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { isEnabled } = await draftMode()
  const { locale: localeString } = await params
  const locale = localeString as TypedLocale

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
      style={{ colorScheme: 'light dark' }}
    >
      <head suppressHydrationWarning>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <InitTheme />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers locale={locale}>
          <Header locale={locale} />
          <div className="grow">{children}</div>
          <Footer locale={locale} />
          <MobileNav locale={locale} />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Jalsa Chhetri | युवा नेता तथा सामाजिक अभियान्ता',
    template: '%s | Jalsa Chhetri',
  },
  description: 'Jalsa Chhetri को आधिकारिक पोर्टल — ताजा समाचार, गतिविधि र युवा नेतृत्वका अपडेट।',
  keywords: ['Jalsa Chhetri', 'कालिकोट', 'युवा नेता', 'नेकपा एमाले', 'पलाँता', 'सामाजिक अभियान्ता'],
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
