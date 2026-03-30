import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/SectionHeading'
import { cn } from '@/utilities/ui'

interface GalleryPhoto {
  id: string
  imageUrl: string
  imageAlt?: string
  slug?: string
  caption?: string
}

interface PhotoGalleryBlockProps {
  title?: string
  photos?: GalleryPhoto[]
  viewAllHref?: string
  className?: string
}

export function PhotoGalleryBlock({
  title = 'फोटो ग्यालरी',
  photos = [],
  viewAllHref = '/gallery',
  className,
}: PhotoGalleryBlockProps) {
  if (!photos.length) return null

  const [featured, ...rest] = photos

  return (
    <section className={cn('w-full bg-white py-4', className)}>
      <div className="max-w-[1200px] mx-auto px-3">
        <SectionHeading title={title} viewAllHref={viewAllHref} />
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72">
          {/* Large featured photo */}
          {featured && (
            <Link
              href={featured.slug ? `/gallery/${featured.slug}` : '#'}
              className="col-span-2 row-span-2 relative rounded overflow-hidden group bg-gray-200"
            >
              <Image
                src={featured.imageUrl}
                alt={featured.imageAlt || featured.caption || ''}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {featured.caption && (
                <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2">
                  {featured.caption}
                </p>
              )}
            </Link>
          )}

          {/* Smaller photos */}
          {rest.slice(0, 4).map((photo, i) => (
            <Link
              key={photo.id}
              href={photo.slug ? `/gallery/${photo.slug}` : '#'}
              className="relative rounded overflow-hidden group bg-gray-200"
            >
              <Image
                src={photo.imageUrl}
                alt={photo.imageAlt || photo.caption || ''}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {/* Show count overlay on last item if there are more */}
              {i === 3 && photos.length > 5 && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{photos.length - 5}</span>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
