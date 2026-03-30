import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { GalleryClient } from './GalleryClient'
import { SectionHeading } from '@/components/SectionHeading'

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
    const featuredUrl = photosArray.length > 0 && typeof photosArray[0].image === 'object' && photosArray[0].image?.url 
      ? photosArray[0].image.url 
      : '/website-template-OG.webp'
      
    // get rest of the images
    const mappedImages = photosArray.map((imgItem: any) => {
      if (typeof imgItem.image === 'object' && imgItem.image?.url) {
        return {
          url: imgItem.image.url as string,
          alt: imgItem.caption || imgItem.image.alt || 'Gallery photo'
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
      id: "mock1",
      title: 'पार्टी स्थापना दिवसको अवसरमा',
      date: '२०८१/०२/१०',
      imageUrl: '/website-template-OG.webp',
      images: [{ url: '/website-template-OG.webp' }, { url: '/website-template-OG.webp' }]
    })
  }

  return (
    <main className="min-h-screen bg-[#F5F7FA] pt-8 pb-16">
      {/* Page Header Area */}
      <div className="bg-[#1A365D] text-white py-12 mb-10 text-center relative overflow-hidden border-b-4 border-[#B31B20] shadow-md">
        <div className="absolute inset-0 opacity-10 blur-sm pointer-events-none bg-[url('/website-template-OG.webp')] bg-cover bg-center mix-blend-overlay" />
        <div className="container relative z-10 max-w-[1240px] px-4 xl:px-8 mx-auto flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow tracking-wide mb-2">फोटो ग्यालरी</h1>
            <p className="text-blue-100 max-w-2xl text-lg mt-2 font-medium">
               Jalsa Xettri का विविध गतिविधि, भ्रमण र कार्यक्रमका उल्लेखनीय तस्बिरहरूको सङ्गालो
            </p>
        </div>
      </div>

      {/* Main Client Grid Container */}
      <div className="container mx-auto max-w-[1240px] px-4 xl:px-8">
        <SectionHeading title="सबै एल्बमहरू" textColor="text-[#1A365D]" className="mb-8" />
        
        {/* Render interactive framer-motion grid */}
        <GalleryClient items={items} />
      </div>
    </main>
  )
}
