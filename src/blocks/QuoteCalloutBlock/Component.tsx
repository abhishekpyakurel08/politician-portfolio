import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/utilities/ui'

interface QuoteCalloutBlockProps {
  quote?: string
  imageUrl?: string
  imageAlt?: string
  name?: string
  designation?: string
  ctaLabel?: string
  ctaHref?: string
  sideImageUrl?: string
  sideImageAlt?: string
  className?: string
}

export function QuoteCalloutBlock({
  quote = 'नेतृत्वको यात्रा जनताको सेवामा समर्पित छ।',
  imageUrl,
  imageAlt = '',
  name,
  designation,
  ctaLabel = 'थप जान्नुहोस्',
  ctaHref = '/about',
  sideImageUrl,
  sideImageAlt = '',
  className,
}: QuoteCalloutBlockProps) {
  return (
    <section className={cn('w-full bg-red-600 py-6', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex items-center gap-6">
          {/* Quote content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-4">
              {imageUrl && (
                <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white shadow-lg">
                  <Image src={imageUrl} alt={imageAlt} fill sizes="64px" className="object-cover" />
                </div>
              )}
              <div>
                <p className="text-white font-bold text-base md:text-lg leading-relaxed">
                  &ldquo;{quote}&rdquo;
                </p>
                {name && (
                  <p className="mt-2 text-red-200 text-sm font-semibold">
                    — {name}
                    {designation && <span className="text-red-300 font-normal">, {designation}</span>}
                  </p>
                )}
                {ctaHref && (
                  <Link
                    href={ctaHref}
                    className="mt-3 inline-block bg-white text-red-600 font-bold text-xs px-4 py-1.5 rounded hover:bg-red-50 transition-colors"
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Side image */}
          {sideImageUrl && (
            <div className="hidden md:block relative w-48 h-36 shrink-0 rounded overflow-hidden shadow-lg">
              <Image src={sideImageUrl} alt={sideImageAlt} fill sizes="192px" className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
