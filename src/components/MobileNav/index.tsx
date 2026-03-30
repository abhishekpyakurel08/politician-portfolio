'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, Info, MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/utilities/ui'
import { useLocale } from '@/providers/LocaleProvider'

export const MobileNav = () => {
  const pathname = usePathname()
  const { locale, t } = useLocale()

  const navItems = [
    { name: t.home, path: '/', icon: Home },
    { name: t.news, path: '/news', icon: Newspaper },
    { name: t.about, path: '/about', icon: Info },
    { name: t.contact, path: '/contact', icon: MessageSquare },
  ]
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Hide on scroll down, show on scroll up for a cleaner mobile experience
  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  return (
    <div className={cn(
      "lg:hidden fixed bottom-6 inset-x-4 z-50 transition-all duration-500 transform",
      isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
    )}>
      <nav className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-2 flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={cn(
                "flex flex-col items-center justify-center py-2 px-1 flex-1 transition-all rounded-2xl relative",
                isActive ? "text-white" : "text-white/40 hover:text-white/60"
              )}
            >
              {isActive && (
                <div className="absolute inset-0 bg-[#B31B20] rounded-2xl shadow-[0_0_15px_rgba(179,27,32,0.4)] animate-in fade-in zoom-in duration-300" />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10", isActive ? "scale-110" : "")} />
              <span className={cn("text-[10px] font-black mt-1 relative z-10", isActive ? "opacity-100" : "opacity-0")}>
                {item.name}
              </span>
            </Link>
          )
        })}
        
        {/* Special WhatsApp action button inside bottom nav? Or just a regular link? */}
        <a 
          href="https://wa.me/9779743223799" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 flex-1 text-green-400 hover:text-green-300 transition-all rounded-2xl"
        >
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse ring-4 ring-green-500/20">
            <Phone className="w-5 h-5 fill-white" />
          </div>
        </a>
      </nav>
    </div>
  )
}
