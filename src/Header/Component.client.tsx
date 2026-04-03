'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Menu, Search, Facebook, Twitter, Youtube, ChevronDown, Globe } from 'lucide-react'
import { Header } from '@/payload-types'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { cn } from '@/utilities/ui'

interface HeaderClientProps {
  data: Header
}

import { useLocale } from '@/providers/LocaleProvider'

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { locale, setLocale, t } = useLocale()
  const router = useRouter()

  const navLinks = [
    { name: t.home, path: `/${locale}` },
    { name: t.about, path: `/${locale}/about` },
    { name: t.news, path: `/${locale}/news` },
    { name: t.activities, path: `/${locale}/activities` },
    { name: t.gallery, path: `/${locale}/gallery` },
  ]
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setHeaderTheme(null)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
  }, [headerTheme, theme])

  return (
    <header 
      className={cn(
        "w-full fixed top-0 z-50 transition-all duration-500",
        isScrolled 
          ? "py-2 glass dark:bg-slate-950/80 shadow-2xl h-16 md:h-20" 
          : "py-4 md:py-8 bg-transparent text-white h-24 md:h-32 shadow-none border-b border-transparent"
      )}
      {...(theme ? { 'data-theme': theme } : {})}
    >
      {/* Page Progress Indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 md:h-1.5 bg-gradient-brand origin-left z-[60] shadow-[0_0_15px_rgba(255,255,255,0.4)]"
        style={{ scaleX }}
      />

      <div className="container mx-auto max-w-[1240px] px-6 h-full flex items-center justify-between">
        
        {/* Brand / Logo Area */}
        <Link href={`/${locale}`} className="flex items-center gap-5 group">
          <div className="flex flex-col">
            <span className={cn(
              "font-black tracking-tighter leading-none transition-all duration-300 mukta-extrabold",
              isScrolled 
                ? "text-xl md:text-3xl text-slate-900 dark:text-white" 
                : "text-2xl md:text-5xl text-white"
            )}>
              जलसा क्षेत्री
            </span>
            <span className={cn(
              "text-[10px] md:text-sm font-black uppercase tracking-[0.4em] mt-1.5 transition-all duration-300 mukta-bold",
              isScrolled ? "text-[#B31B20]" : "text-white"
            )}>
              Personal Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          <div className="flex items-center gap-1 mr-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.path
              return (
                <Link 
                  key={link.path} 
                  href={link.path} 
                  className={cn(
                    "px-6 py-2.5 text-sm font-bold transition-all relative group rounded-full mukta-bold tracking-widest uppercase",
                    isScrolled
                      ? isActive ? "text-[#B31B20] dark:text-[#ff4d4d]" : "text-slate-600 dark:text-slate-300 hover:text-[#B31B20] dark:hover:text-[#ff4d4d]"
                      : isActive ? "text-white" : "text-white hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow-pill"
                      className={cn(
                        "absolute inset-0 rounded-full",
                        isScrolled ? "bg-[#B31B20]/5 dark:bg-[#ff4d4d]/10" : "bg-white/10"
                      )}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className={cn("h-8 w-px mx-4 transition-colors", isScrolled ? "bg-slate-200 dark:bg-slate-700" : "bg-white/20")} />
          
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={cn(
                    "h-11 px-4 rounded-xl font-bold gap-2 transition-all",
                    isScrolled 
                      ? "text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700" 
                      : "text-white hover:bg-white/20 border-white/20 bg-white/10"
                  )}
                >
                  <Globe className="w-4 h-4" />
                  {locale === 'ne' ? 'नेपाली' : 'English'}
                  <ChevronDown className="w-4 h-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-none shadow-2xl rounded-2xl p-2 min-w-[160px]">
                <DropdownMenuItem 
                  onClick={() => {
                    setLocale('ne')
                    const newPathname = pathname.replace(`/${locale}`, '/ne')
                    router.push(newPathname)
                  }} 
                  className="font-bold py-3 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  नेपाली (NP)
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => {
                    setLocale('en')
                    const newPathname = pathname.replace(`/${locale}`, '/en')
                    router.push(newPathname)
                  }} 
                  className="font-bold py-3 px-4 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  English (UK)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild variant="ghost" size="icon" className={cn(
              "h-11 w-11 rounded-xl transition-all",
              isScrolled 
                ? "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-[#B31B20] dark:hover:bg-[#ff4d4d] hover:text-white shadow-sm" 
                : "text-white hover:bg-white/20 bg-white/10 shadow-lg"
            )}>
              <Link href={`/${locale}/search`}>
                <Search className="w-5 h-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="lg:hidden flex items-center gap-3">
          <Button asChild variant="ghost" size="icon" className={cn(
              "h-10 w-10 rounded-xl transition-all",
              isScrolled ? "text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800" : "text-white bg-white/10"
            )}>
            <Link href={`/${locale}/search`}>
              <Search className="w-5 h-5" />
              <span className="sr-only">Search</span>
            </Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={isScrolled ? "text-slate-700 dark:text-slate-200" : "text-white"}>
                <Menu className="w-8 h-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-[400px] border-none glass-dark text-white p-0">
              <SheetHeader className="p-8 border-b border-white/5 text-left">
                <SheetTitle className="text-white flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#B31B20] font-black text-2xl shadow-xl">ज</div>
                  <div>
                    <div className="text-2xl font-black leading-none tracking-tighter">जलसा क्षेत्री</div>
                    <div className="text-[10px] opacity-50 mt-1 uppercase tracking-[0.3em] font-black">Personal Portal</div>
                  </div>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-6 mt-4 gap-2">
                {navLinks.map((link) => {
                   const isActive = pathname === link.path
                   return (
                    <Link 
                      key={link.path} 
                      href={link.path} 
                      className={cn(
                        "flex items-center gap-4 px-6 py-4 rounded-2xl text-xl font-bold transition-all",
                        isActive ? "bg-[#B31B20] text-white shadow-2xl glow-red" : "text-white/60 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {link.name}
                    </Link>
                   )
                })}
              </div>
              <div className="mt-auto p-10 flex flex-col gap-8">
                <div className="flex gap-4 justify-center">
                  <Button size="icon" variant="ghost" className="bg-white/5 rounded-2xl w-14 h-14 hover:bg-[#1877F2] transition-all"><Facebook className="w-6 h-6" /></Button>
                  <Button size="icon" variant="ghost" className="bg-white/5 rounded-2xl w-14 h-14 hover:bg-[#1DA1F2] transition-all"><Twitter className="w-6 h-6" /></Button>
                  <Button size="icon" variant="ghost" className="bg-white/5 rounded-2xl w-14 h-14 hover:bg-red-600 transition-all"><Youtube className="w-6 h-6" /></Button>
                </div>
                <Button 
                  onClick={() => {
                    const newLocale = locale === 'ne' ? 'en' : 'ne'
                    setLocale(newLocale)
                    const newPathname = pathname.replace(`/${locale}`, `/${newLocale}`)
                    router.push(newPathname)
                  }}
                  className="w-full bg-white text-slate-950 font-black h-16 rounded-2xl hover:bg-[#B31B20] hover:text-white transition-all text-sm uppercase tracking-widest shadow-2xl"
                >
                   Switch to {locale === 'ne' ? 'English (UK)' : 'नेपाली (NP)'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
