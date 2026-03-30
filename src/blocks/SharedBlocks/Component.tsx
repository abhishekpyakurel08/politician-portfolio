import React from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { NewsCard, type NewsCardProps } from '@/components/NewsCard'
import { cn } from '@/utilities/ui'

interface HighlightsBarProps {
  label?: string
  items?: { title: string; slug?: string }[]
  className?: string
}

export function HighlightsBar({
  label = 'ब्रेकिङ न्युज',
  items = [],
  className,
}: HighlightsBarProps) {
  return (
    <div className={cn('w-full bg-red-600 text-white py-1.5', className)}>
      <div className="max-w-[1200px] mx-auto px-3 flex items-center gap-3 overflow-hidden">
        <span className="shrink-0 bg-white text-red-600 text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
          {label}
        </span>
        <div className="overflow-hidden flex-1">
          <div className="flex gap-6 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            {[...items, ...items].map((item, i) => (
              <a
                key={i}
                href={item.slug ? `/news/${item.slug}` : '#'}
                className="text-xs hover:text-red-200 transition-colors shrink-0"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// -----------------------------------------------------------------------

interface NewsGridBlockProps {
  title?: string
  posts?: NewsCardProps[]
  viewAllHref?: string
  columns?: 2 | 3 | 4
  className?: string
}

export function NewsGridBlock({
  title,
  posts = [],
  viewAllHref,
  columns = 3,
  className,
}: NewsGridBlockProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns]

  return (
    <section className={cn('w-full bg-white py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        {title && <SectionHeading title={title} viewAllHref={viewAllHref} />}
        <div className={cn('grid gap-4', colClass)}>
          {posts.map((post, i) => (
            <NewsCard key={i} {...post} variant="featured" />
          ))}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------

interface NumberedListBlockProps {
  title?: string
  items?: NewsCardProps[]
  viewAllHref?: string
  columns?: 2 | 3 | 4
  className?: string
}

export function NumberedListBlock({
  title = 'लोकप्रिय समाचार',
  items = [],
  viewAllHref,
  columns = 4,
  className,
}: NumberedListBlockProps) {
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }[columns]

  return (
    <section className={cn('w-full bg-gray-50 py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <SectionHeading title={title} viewAllHref={viewAllHref} />
        <div className={cn('grid gap-2', colClass)}>
          {items.map((item, i) => (
            <NewsCard key={i} {...item} variant="minimal" index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// -----------------------------------------------------------------------

interface PoliticianBioBarProps {
  name?: string
  designation?: string
  party?: string
  imageUrl?: string
  stats?: { label: string; value: string }[]
  className?: string
}

export function PoliticianBioBar({
  name = 'जलसा क्षेत्री',
  designation = 'प्रदेश सभा सदस्य',
  party,
  imageUrl,
  stats = [],
  className,
}: PoliticianBioBarProps) {
  return (
    <div className={cn('w-full bg-slate-800 text-white py-3', className)}>
      <div className="max-w-[1200px] mx-auto px-3 flex items-center gap-6 flex-wrap">
        {imageUrl && (
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-red-500 shrink-0">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          </div>
        )}
        <div>
          <p className="font-bold text-sm">{name}</p>
          <p className="text-xs text-slate-300">{designation}</p>
          {party && <p className="text-[10px] text-red-400 font-semibold mt-0.5">{party}</p>}
        </div>
        {stats.length > 0 && (
          <div className="flex gap-6 ml-auto flex-wrap">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-lg font-extrabold text-red-400">{stat.value}</p>
                <p className="text-[10px] text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
