'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'
import { ChevronRight } from 'lucide-react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <article
      className={cn(
        'group relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative w-full aspect-16/10 overflow-hidden bg-slate-100 dark:bg-slate-800">
        {!metaImage && (
          <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-600">
            No image
          </div>
        )}
        {metaImage && typeof metaImage !== 'string' && (
          <Media 
            resource={metaImage} 
            size="33vw" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        )}
        
        {/* Category Badge on Image */}
        {showCategories && hasCategories && (
          <div className="absolute top-4 left-4 z-10 flex flex-wrap gap-2">
            {categories?.map((category, index) => {
              if (typeof category === 'object') {
                const { title: titleFromCategory } = category
                return (
                  <span 
                    key={index}
                    className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[#B31B20] text-[10px] md:text-xs font-black px-3 py-1.5 rounded-full shadow-sm"
                  >
                    {titleFromCategory}
                  </span>
                )
              }
              return null
            })}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col h-full">
        {titleToUse && (
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#B31B20] transition-colors duration-200 leading-tight">
            <Link className="not-prose outline-none" href={href} ref={link.ref}>
              {titleToUse}
            </Link>
          </h3>
        )}
        
        {description && (
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base line-clamp-3 mb-6 leading-relaxed">
            {sanitizedDescription}
          </p>
        )}

        <div className="mt-auto flex items-center text-[#B31B20] text-sm md:text-base font-bold group/btn">
          <span>Read More</span>
          <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </div>
      </div>
    </article>
  )
}
