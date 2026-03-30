import React from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { NewsCard } from '@/components/NewsCard'
import type { NewsCardProps } from '@/components/NewsCard'
import { cn } from '@/utilities/ui'

interface VideoNewsBlockProps {
  title?: string
  posts?: NewsCardProps[]
  viewAllHref?: string
  className?: string
}

export function VideoNewsBlock({
  title = 'भिडियो समाचार',
  posts = [],
  viewAllHref = '/videos',
  className,
}: VideoNewsBlockProps) {
  return (
    <section className={cn('w-full bg-gray-50 py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <SectionHeading title={title} viewAllHref={viewAllHref} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {posts.map((post, i) => (
            <NewsCard key={i} {...post} variant="featured" hasVideo />
          ))}
        </div>
      </div>
    </section>
  )
}
