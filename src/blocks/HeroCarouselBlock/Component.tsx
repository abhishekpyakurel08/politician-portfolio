'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight, Play, ChevronLeft, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/utilities/ui'

import { useLocale } from '@/providers/LocaleProvider'

export type HeroSlide = {
  title?: string
  description?: string
  media?: any
  mediaUrl?: string
  badge?: string
  accent?: string
}

export function BlueHeroSlider({
  initialSlide,
  slides: backendSlides,
}: {
  initialSlide?: { title?: string; description?: string; media?: any }
  slides?: HeroSlide[]
}) {
  const { t } = useLocale()

  const defaultSlides = [
    {
      title: t.visionTitle,
      description: t.visionDesc,
      mediaUrl: undefined,
      badge: t.specialAddress,
      accent: 'bg-[#B31B20]',
    },
    {
      title: t.eduTitle,
      description: t.eduDesc,
      mediaUrl: undefined,
      badge: t.newVision,
      accent: 'bg-blue-600',
    },
    {
      title: t.infraTitle,
      description: t.infraDesc,
      mediaUrl: undefined,
      badge: t.progressReport,
      accent: 'bg-slate-700',
    },
  ]

  const resolveMediaUrl = (media: any, fallback?: string) => {
    if (typeof media === 'string') return media
    if (media && typeof media === 'object' && media.url) return media.url
    return fallback // Return fallback only if provided, otherwise undefined
  }

  const cmsSlides =
    Array.isArray(backendSlides) && backendSlides.length > 0
      ? backendSlides.map((slide, idx) => ({
          title: slide.title || defaultSlides[idx]?.title || '',
          description: slide.description || defaultSlides[idx]?.description || '',
          mediaUrl: resolveMediaUrl(slide.media, slide.mediaUrl),
          badge: slide.badge || (idx === 0 ? t.specialNotice : undefined),
          accent:
            slide.accent ||
            (idx === 0 ? 'bg-[#B31B20]' : idx === 1 ? 'bg-blue-600' : 'bg-slate-700'),
        }))
      : undefined

  const slides = cmsSlides
    ? cmsSlides
    : initialSlide
      ? [
          {
            title: initialSlide.title || defaultSlides[0].title,
            description: initialSlide.description || defaultSlides[0].description,
            mediaUrl: resolveMediaUrl(initialSlide.media),
            badge: t.specialNotice,
            accent: 'bg-[#B31B20]',
          },
          ...defaultSlides.slice(1),
        ]
      : defaultSlides

  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const SLIDE_DURATION = 8000 // 8 seconds per slide

  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100)
      setProgress(newProgress)

      if (elapsed >= SLIDE_DURATION) {
        setIndex((prev) => (prev + 1) % slides.length)
        setProgress(0)
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [index, slides.length])

  const next = () => {
    setIndex((prev) => (prev + 1) % slides.length)
    setProgress(0)
  }
  const prev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length)
    setProgress(0)
  }

  return (
    <section className="relative w-full h-[75vh] md:h-[90vh] bg-slate-950 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image with Cinematic Zoom */}
          <motion.div
            initial={{ scale: 1.2, filter: 'blur(8px) brightness(0.5)' }}
            animate={{ scale: 1, filter: 'blur(0px) brightness(0.7)' }}
            transition={{ duration: 2.5, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            {slides[index].mediaUrl ? (
              <Image
                src={slides[index].mediaUrl}
                alt={slides[index].title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white/50">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p className="text-lg">No image available</p>
                </div>
              </div>
            )}
            {/* Slide Tints for variety */}
            <div
              className={cn(
                'absolute inset-0 opacity-20',
                index === 1 ? 'bg-blue-900' : index === 2 ? 'bg-slate-900' : 'bg-red-900',
              )}
            />
          </motion.div>

          {/* Creative Depth Overlays */}
          <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-transparent to-slate-950/90 pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 opacity-30 mix-blend-soft-light bg-[url('/noise.png')] pointer-events-none" />

          {/* Content Container */}
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto max-w-[1240px] px-4 xl:px-8">
              <div className="max-w-4xl space-y-8">
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Badge
                    className={cn(
                      'text-white px-5 py-2 text-sm border-none rounded-full shadow-2xl',
                      slides[index].accent,
                    )}
                  >
                    {slides[index].badge}
                  </Badge>
                </motion.div>

                <motion.h1
                  initial={{ y: 80, opacity: 0, filter: 'blur(10px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 0.7, duration: 1, ease: 'circOut' }}
                  className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tighter drop-shadow-2xl italic uppercase"
                >
                  {slides[index].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="text-lg md:text-xl text-slate-100 font-bold max-w-2xl leading-relaxed drop-shadow-lg"
                >
                  {slides[index].description}
                </motion.p>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.8 }}
                  className="flex flex-wrap items-center gap-6 pt-6"
                >
                  <Button
                    size="lg"
                    className="bg-[#B31B20] hover:bg-red-700 text-white font-black h-14 px-8 rounded-2xl shadow-2xl shadow-red-900/40 gap-3 group/btn text-base"
                  >
                    थप जानकारी{' '}
                    <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </Button>

                  <button className="flex items-center gap-5 group/play outline-hidden">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 flex items-center justify-center group-hover/play:bg-[#B31B20] group-hover/play:scale-110 group-hover/play:rotate-12 transition-all duration-500">
                      <Play className="w-6 h-6 text-white fill-white" />
                    </div>
                    <span className="text-white text-base font-black tracking-wider group-hover/play:text-red-400 transition-colors uppercase">
                      {t.videoMessage}
                    </span>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation & Progress Controls */}
      <div className="absolute bottom-12 right-8 md:right-16 z-30 flex flex-col items-end gap-10">
        {/* Modern Dot Indicators with Progress Rings */}
        <div className="flex items-center gap-5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setIndex(i)
                setProgress(0)
              }}
              className="relative group p-2"
            >
              <div
                className={cn(
                  'w-2.5 h-2.5 rounded-full transition-all duration-500',
                  i === index ? 'bg-[#B31B20] scale-150' : 'bg-white/40 group-hover:bg-white/70',
                )}
              />
              {i === index && (
                <svg className="absolute inset-0 w-6.5 h-6.5 -rotate-90">
                  <circle
                    className="text-white/20"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="transparent"
                    r="9"
                    cx="13"
                    cy="13"
                  />
                  <circle
                    className="text-[#B31B20]"
                    strokeWidth="2"
                    strokeDasharray={56}
                    strokeDashoffset={56 - (56 * progress) / 100}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="9"
                    cx="13"
                    cy="13"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Nav Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center text-white hover:bg-[#B31B20] hover:scale-110 transition-all active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="w-14 h-14 rounded-2xl bg-[#B31B20] border border-white/10 flex items-center justify-center text-white hover:bg-red-700 hover:scale-110 transition-all active:scale-95 shadow-2xl shadow-red-900/50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Slide Index Display */}
      <div className="absolute bottom-12 left-8 md:left-16 z-30">
        <div className="flex items-baseline gap-4 font-black">
          <span className="text-4xl md:text-6xl text-white/10">0{index + 1}</span>
          <span className="text-xs text-white/40 tracking-[0.5em] uppercase">Slide Series</span>
        </div>
      </div>

      {/* Premium Static Decoration */}
      <div className="absolute inset-x-0 bottom-0 px-8 py-4 z-40 bg-linear-to-t from-slate-950/80 to-transparent flex justify-between items-end pointer-events-none">
        <div
          className="h-1 bg-[#B31B20] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="absolute bottom-0 w-full h-1 bg-white/10 z-40" />
    </section>
  )
}
