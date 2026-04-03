import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const locales = ['ne', 'en']
const defaultLocale = 'ne'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Skip if it's an internal Next.js path or static file
  if (
    pathname.includes('.') || // Static files
    pathname.startsWith('/_next') || // Next.js internals
    pathname.startsWith('/api') || // API routes
    pathname.startsWith('/admin') // Payload Admin
  ) {
    return
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Check if it's the root path, redirect to default locale
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
    }

    // For other paths, prefix with default locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
}
