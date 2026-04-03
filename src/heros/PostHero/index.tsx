import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0

  return (
    <section className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24 bg-slate-950 overflow-hidden min-h-[60vh] md:min-h-[75vh] flex items-end">
      {/* Background Media & Overlay */}
      <div className="absolute inset-0">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="object-cover brightness-50" resource={heroImage} />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
      </div>

      <div className="container relative z-10">
        <Link href="/posts" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-all mb-8 font-black text-xs uppercase tracking-widest group/back">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> विचार सङ्गालोमा फर्कनुहोस्
        </Link>
        
        <div className="flex flex-wrap gap-4 mb-6">
          {categories?.map((category, index) => {
            if (typeof category === 'object' && category !== null) {
              return (
                <Badge key={index} className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl">
                  {category.title}
                </Badge>
              )
            }
            return null
          })}
          
          {publishedAt && (
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-xl">
              <Calendar className="w-4 h-4 text-[#B31B20]" />
              {formatDateTime(publishedAt)}
            </div>
          )}
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-[0.9] mb-8 max-w-5xl tracking-tighter uppercase mukta-bold italic">
          {title}
        </h1>

        <div className="flex flex-wrap items-center gap-8 pt-4 border-t border-white/10">
          {hasAuthors && (
            <div className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#B31B20] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px] uppercase tracking-widest font-black leading-none mb-1">लेखक</span>
                <span className="text-white font-bold text-sm leading-none">
                  {populatedAuthors?.map((author, index) => {
                    if (typeof author === 'object' && author !== null) {
                      return author.name
                    }
                    return null
                  }).filter(Boolean).join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
