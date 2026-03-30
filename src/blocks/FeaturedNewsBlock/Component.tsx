import React from 'react'
import { SectionHeading } from '@/components/SectionHeading'
import { NewsCard } from '@/components/NewsCard'
import type { NewsCardProps } from '@/components/NewsCard'
import { cn } from '@/utilities/ui'

interface FeaturedNewsBlockProps {
  title?: string
  featuredPost?: NewsCardProps
  sidebarPosts?: NewsCardProps[]
  viewAllHref?: string
  className?: string
}

export function FeaturedNewsBlock({
  title = 'ताजा समाचार',
  featuredPost,
  sidebarPosts = [],
  viewAllHref = '/news',
  className,
}: FeaturedNewsBlockProps) {
  return (
    <section className={cn('w-full bg-white py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <SectionHeading title={title} viewAllHref={viewAllHref} />
        <div className="flex gap-4">
          {/* Featured large card */}
          {featuredPost && (
            <div className="flex-1 min-w-0">
              <NewsCard {...featuredPost} variant="featured" />
            </div>
          )}

          {/* Sidebar compact list */}
          {sidebarPosts.length > 0 && (
            <div className="w-64 shrink-0 flex flex-col divide-y divide-gray-100">
              {sidebarPosts.map((post, i) => (
                <NewsCard key={i} {...post} variant="compact" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
