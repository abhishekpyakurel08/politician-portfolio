import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'


import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import Script from 'next/script'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

import { MobileNav } from '@/components/MobileNav'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="ne" suppressHydrationWarning>
      <head>
        <Script src="/scripts/theme.js" strategy="beforeInteractive" id="theme-script" />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Mukta:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <Providers>
          <Header />
          <div className="grow">
            {children}
          </div>
          <Footer />
          <MobileNav />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    default: 'Jalsa Xettri | युवा नेता तथा सामाजिक अभियान्ता',
    template: '%s | Jalsa Xettri',
  },
  description:
    'Jalsa Xettri को आधिकारिक पोर्टल — ताजा समाचार, गतिविधि र युवा नेतृत्वका अपडेट।',
  keywords: ['Jalsa Xettri', 'कालिकोट', 'युवा नेता', 'नेकपा एमाले', 'पलाँता', 'सामाजिक अभियान्ता'],
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
