import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'

import { Locale } from '@/locales'

export async function Header({ locale }: { locale: Locale }) {
  const headerData: Header = await getCachedGlobal('header', 1)()

  return <HeaderClient data={headerData} />
}
