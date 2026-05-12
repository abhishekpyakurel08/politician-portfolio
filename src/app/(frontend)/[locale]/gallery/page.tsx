import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GalleryClient } from './GalleryClient'
import { SectionHeading } from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'

export const revalidate = 60

export default async function GalleryPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch Gallery from payload
  const { docs: galleryDocs } = await payload.find({
    collection: 'gallery',
    limit: 50,
    sort: '-date', // sorting by date field
  })

  // Format fetched docs
  const mapDocToItem = (doc: any) => {
    // get photos array from db
    const photosArray = doc.photos || []

    // get featured image (first photo)
    const featuredUrl =
      photosArray.length > 0 &&
      typeof photosArray[0].image === 'object' &&
      photosArray[0].image?.url
        ? photosArray[0].image.url
        : '/website-template-OG.webp'

    // get rest of the images
    const mappedImages = photosArray.map((imgItem: any) => {
      if (typeof imgItem.image === 'object' && imgItem.image?.url) {
        return {
          url: imgItem.image.url as string,
          alt: imgItem.caption || imgItem.image.alt || 'Gallery photo',
        }
      }
      return { url: '/website-template-OG.webp' }
    })

    return {
      id: doc.id,
      title: doc.title,
      date: doc.date ? new Date(doc.date).toLocaleDateString('ne-NP') : undefined,
      imageUrl: featuredUrl,
      images: mappedImages,
    }
  }

  const items = galleryDocs.map(mapDocToItem)

  // Fallback if empty (shouldn't be, since seed is run)
  if (!items.length) {
    items.push({
      id: 'mock1',
      title: 'पार्टी स्थापना दिवसको अवसरमा',
      date: '२०८१/०२/१०',
      imageUrl: '/website-template-OG.webp',
      images: [{ url: '/website-template-OG.webp' }, { url: '/website-template-OG.webp' }],
    })
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Page Header Area */}
      <section className="relative w-full bg-slate-950 pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden h-[50vh] md:h-[70vh] flex items-end">
        {/* BG pattern/gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#B31B20] opacity-[0.05] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-slate-950 to-transparent" />
        </div>

        <div className="container relative z-10 pb-16 md:pb-24 text-center">
          <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-widest rounded-full mb-6 shadow-xl">
            स्मृति र सङ्गालो
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-6 uppercase">
            फोटो ग्यालरी
          </h1>
          <p className="text-slate-300 max-w-2xl text-lg md:text-xl font-bold mx-auto leading-relaxed">
            Jalsa Chhetri का विविध गतिविधि, भ्रमण र कार्यक्रमका उल्लेखनीय तस्बिरहरूको सङ्गालो
          </p>
        </div>
      </section>

      {/* Main Client Grid Container */}
      <div className="container mx-auto max-w-[1240px] px-4 xl:px-8 py-16 md:py-24">
        <SectionHeading title="सबै एल्बमहरू" className="mb-12" />

        {/* Render interactive framer-motion grid */}
        <GalleryClient items={items} />
      </div>
    </main>
  )
}
