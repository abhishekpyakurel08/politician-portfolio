import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/SectionHeading'
import { NewsCard } from '@/components/NewsCard'
import type { NewsCardProps } from '@/components/NewsCard'
import { cn } from '@/utilities/ui'

interface ActivitiesBlockProps {
  title?: string
  featuredActivity?: NewsCardProps & { description?: string }
  recentActivities?: NewsCardProps[]
  viewAllHref?: string
  className?: string
}

export function ActivitiesBlock({
  title = 'गतिविधि',
  featuredActivity,
  recentActivities = [],
  viewAllHref = '/activities',
  className,
}: ActivitiesBlockProps) {
  return (
    <section className={cn('w-full bg-gray-50 py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <SectionHeading title={title} viewAllHref={viewAllHref} />
        <div className="flex gap-4">
          {/* Large featured activity */}
          {featuredActivity && (
            <div className="flex-1 min-w-0">
              <Link
                href={featuredActivity.slug ? `/activities/${featuredActivity.slug}` : '#'}
                className="group block rounded overflow-hidden"
              >
                <div className="relative aspect-video bg-gray-200 overflow-hidden rounded">
                  {featuredActivity.imageUrl && (
                    <Image
                      src={featuredActivity.imageUrl}
                      alt={featuredActivity.imageAlt || featuredActivity.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <h3 className="mt-2 text-sm font-bold text-gray-800 group-hover:text-red-600 transition-colors line-clamp-2">
                  {featuredActivity.title}
                </h3>
                {featuredActivity.description && (
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2">{featuredActivity.description}</p>
                )}
              </Link>
            </div>
          )}

          {/* Grid of 4 recent activities */}
          {recentActivities.length > 0 && (
            <div className="w-64 xl:w-96 shrink-0 grid grid-cols-2 gap-2 content-start">
              {recentActivities.slice(0, 4).map((item, i) => (
                <NewsCard key={i} {...item} variant="featured" className="rounded! overflow-hidden" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
