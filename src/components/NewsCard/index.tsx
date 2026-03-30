import { cn } from '@/utilities/ui'
import { Badge } from '@/components/ui/badge'
import { Calendar, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface NewsCardProps {
  title: string
  slug?: string
  category?: string
  date?: string
  imageUrl?: string
  imageAlt?: string
  excerpt?: string
  variant?: 'featured' | 'compact' | 'horizontal' | 'minimal'
  hasVideo?: boolean
  className?: string
  index?: number
}

export function NewsCard({
  title,
  slug = '#',
  category,
  date,
  imageUrl,
  imageAlt = '',
  excerpt,
  variant = 'featured',
  hasVideo = false,
  className,
  index,
}: NewsCardProps) {
  const href = slug.startsWith('/') ? slug : `/news/${slug}`

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex gap-3 items-start py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded px-1',
          className,
        )}
      >
        {imageUrl && (
          <div className="relative shrink-0 w-20 h-14 rounded overflow-hidden bg-gray-200">
            <Image src={imageUrl} alt={imageAlt || title} fill sizes="80px" className="object-cover" />
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
            {title}
          </p>
          {date && <p className="text-xs text-gray-500 mt-1">{date}</p>}
        </div>
      </Link>
    )
  }

  if (variant === 'horizontal') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex gap-3 items-start hover:bg-gray-50 transition-colors rounded p-1',
          className,
        )}
      >
        {imageUrl && (
          <div className="relative shrink-0 w-28 h-20 rounded overflow-hidden bg-gray-200">
            <Image src={imageUrl} alt={imageAlt || title} fill sizes="112px" className="object-cover" />
            {hasVideo && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            )}
          </div>
        )}
        <div className="flex-1 min-w-0">
          {category && (
            <Badge
              variant="destructive"
              className="text-[10px] md:text-xs mb-1 px-1.5 py-0 h-4 md:h-5 bg-red-600 text-white rounded-none"
            >
              {category}
            </Badge>
          )}
          <p className="text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-red-600 transition-colors leading-snug">
            {title}
          </p>
          {date && (
            <p className="text-[10px] md:text-xs text-gray-500 mt-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {date}
            </p>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'minimal') {
    return (
      <Link
        href={href}
        className={cn(
          'group flex gap-2 items-start border-b border-gray-100 last:border-0 py-2',
          className,
        )}
      >
        {index !== undefined && (
          <span className="shrink-0 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center">
            {index + 1}
          </span>
        )}
        <p className="text-xs text-gray-700 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
          {title}
        </p>
      </Link>
    )
  }

  // featured variant (default)
  return (
    <Link href={href} className={cn('group block rounded overflow-hidden', className)}>
      <div className="relative w-full aspect-video bg-gray-200 overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {hasVideo && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-red-600 fill-red-600 ml-0.5" />
            </div>
          </div>
        )}
        {category && (
          <Badge className="absolute top-2 left-2 text-[10px] md:text-xs px-2 py-0.5 h-auto bg-red-600 hover:bg-red-600 text-white rounded-none">
            {category}
          </Badge>
        )}
      </div>
      <div className="pt-2">
        <h3 className="text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
          {title}
        </h3>
        {excerpt && <p className="text-xs text-gray-500 mt-1 line-clamp-2">{excerpt}</p>}
        {date && (
          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {date}
          </p>
        )}
      </div>
    </Link>
  )
}
