'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, Info, MessageSquare, Phone, Sun, Moon, Globe } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useLocale } from '@/providers/LocaleProvider'
import { Locale } from '@/locales'
import { useTheme } from '@/providers/Theme'
import { useRouter } from 'next/navigation'

export const MobileNav = ({ locale: propLocale }: { locale?: Locale }) => {
  const pathname = usePathname()
  const { locale: contextLocale, t, setLocale } = useLocale()
  const locale = propLocale || contextLocale

  const navItems = [
    { name: t.home, path: `/${locale}`, icon: Home },
    { name: t.news, path: `/${locale}/news`, icon: Newspaper },
    { name: t.about, path: `/${locale}/about`, icon: Info },
    { name: t.contact, path: `/${locale}/contact`, icon: MessageSquare },
  ]
  const [isVisible, setIsVisible] = useState(true)
  const { theme: appTheme, setTheme: setAppTheme } = useTheme()
  const router = useRouter()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme =
    appTheme ??
    (mounted
      ? ((document.documentElement.getAttribute('data-theme') as string) ?? 'light')
      : 'light')
  const activeTheme = currentTheme || 'light'

  return (
    <div
      className={cn(
        'lg:hidden fixed bottom-4 inset-x-4 z-50',
        isVisible ? 'opacity-100' : 'opacity-100',
      )}
    >
      <nav
        className={cn(
          'backdrop-blur-xl border rounded-[28px] shadow-2xl p-2 flex items-center gap-3 justify-center',
          activeTheme === 'light'
            ? 'bg-white/95 border-slate-200/60 text-slate-900'
            : 'bg-slate-950/95 border-white/10 text-white',
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                'flex items-center justify-center w-12 h-12 rounded-xl transition-all relative',
                isActive
                  ? activeTheme === 'light'
                    ? 'bg-[#B31B20]/10 text-[#B31B20] shadow-lg ring-1 ring-[#B31B20]/15'
                    : 'bg-white text-slate-950 shadow-lg ring-1 ring-white/25'
                  : activeTheme === 'light'
                    ? 'bg-white/0 text-slate-700/90 hover:bg-slate-100/90 hover:text-slate-900'
                    : 'bg-white/6 text-white/80 hover:bg-white/10 hover:text-white',
              )}
            >
              <item.icon className={cn('w-5 h-5', isActive ? 'scale-110' : '')} />
              <span className="sr-only">{item.name}</span>
            </Link>
          )
        })}

        {/* WhatsApp */}
        <a
          href="https://wa.me/9779743223799"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl transition-all',
            activeTheme === 'light'
              ? 'bg-white/0 text-green-600 hover:bg-slate-100/90'
              : 'bg-white/6 text-green-400 hover:bg-white/10',
          )}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Theme toggle */}
        <button
          onClick={() => {
            setAppTheme(currentTheme === 'dark' ? 'light' : 'dark')
          }}
          aria-label="Toggle theme"
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl transition-all',
            activeTheme === 'light'
              ? 'bg-white/0 text-slate-900 hover:bg-slate-100/90'
              : 'bg-white/6 text-white/80 hover:bg-white/10',
          )}
        >
          {currentTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Locale toggle */}
        <button
          onClick={() => {
            const newLocale = (locale === 'ne' ? 'en' : 'ne') as Locale
            try {
              setLocale(newLocale)
              localStorage.setItem('user_locale', newLocale)
            } catch (e) {}
            const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
            router.push(newPath)
          }}
          aria-label="Switch language"
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-xl transition-all',
            activeTheme === 'light'
              ? 'bg-white/0 text-slate-900 hover:bg-slate-100/90'
              : 'bg-white/6 text-white/80 hover:bg-white/10',
          )}
        >
          <Globe className="w-5 h-5" />
        </button>
      </nav>
    </div>
  )
}
