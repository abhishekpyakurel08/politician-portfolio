import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import { generateMeta } from '@/utilities/generateMeta'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import Image from 'next/image'
import { Calendar, ChevronLeft, MapPin, Tag } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const news = await payload.find({
    collection: 'news',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return news.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function NewsPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/news/' + decodedSlug
  const post = await queryNewsBySlug({ slug: decodedSlug })

  if (!post) {
    // If it's a mock slug for UI demo, show dummy content
    if (decodedSlug.startsWith('mock-')) {
      return <MockNewsPost slug={decodedSlug} />
    }
    return <PayloadRedirects url={url} />
  }

  const imageUrl =
    typeof post.featuredImage === 'object' && post.featuredImage?.url
      ? (post.featuredImage.url as string)
      : '/website-template-OG.webp'

  return (
    <article className="min-h-screen bg-slate-50 pb-20">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-slate-900">
        <Image src={imageUrl} alt={post.title} fill className="object-cover brightness-50" priority />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
        
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 font-bold text-sm w-fit">
            <ChevronLeft className="w-4 h-4" /> समाचारमा फर्कनुहोस्
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            {post.category && typeof post.category === 'object' && (
              <Badge className="bg-[#B31B20] text-white border-none px-3 py-1 font-black text-xs uppercase tracking-widest">
                {post.category.title}
              </Badge>
            )}
            {post.publishDate && (
              <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm px-3 py-1 font-bold text-xs">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {new Date(post.publishDate).toLocaleDateString('ne-NP')}
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 max-w-5xl">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="prose prose-lg prose-slate max-w-none">
            {post.excerpt && (
              <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}
            {post.content ? (
              <RichText data={post.content} enableGutter={false} />
            ) : (
              <p>थप विवरण उपलब्ध छैन।</p>
            )}
          </div>
        </div>
      </section>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryNewsBySlug({ slug: decodedSlug })

  return generateMeta({ doc: post })
}

const queryNewsBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'news',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})

// Mock fallback for UI demo links
function MockNewsPost({ slug }: { slug: string }) {
  return (
    <article className="min-h-screen bg-slate-50 pb-20">
      <section className="relative w-full h-[50vh] min-h-[400px] md:h-[60vh] bg-slate-900">
        <Image src="/website-template-OG.webp" alt="Mock News" fill className="object-cover brightness-50" priority />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="container relative z-10 h-full flex flex-col justify-end pb-12 md:pb-16">
          <Link href="/news" className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors mb-6 font-bold text-sm w-fit">
            <ChevronLeft className="w-4 h-4" /> फर्कनुहोस्
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-[#B31B20] text-white border-none px-3 py-1 font-black text-xs uppercase tracking-widest">
              विशेष अपडेट
            </Badge>
            <Badge variant="outline" className="border-white/30 bg-white/10 text-white backdrop-blur-sm px-3 py-1 font-bold text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1.5" /> आज
            </Badge>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 max-w-5xl">
            पार्टीको सम्मेलन र विकासका नयाँ पाइला - विस्तृत विवरण ({slug})
          </h1>
        </div>
      </section>
      <section className="container max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="prose prose-lg prose-slate max-w-none">
            <p className="text-xl text-slate-600 font-medium leading-relaxed mb-8">
              नेकपा (एमाले)का नेताहरू एकत्रित भई राष्ट्रिय विकास र जनताको सेवाका विषयमा गहन छलफल गरे। यस कार्यक्रममा समग्र विकास लक्ष्य र भावी रणनीतिबारे चर्चा गरियो।
            </p>
            <p>
              देशको विकास र समृद्धिको लागि हामीले नयाँ शिराबाट काम गर्नुपर्ने आवश्यकता छ। जनताको विश्वास नै हाम्रो सबैभन्दा ठूलो शक्ति हो। शिक्षा, स्वास्थ्य र पूर्वाधारको विकास विना समृद्धिको गन्तव्य तय गर्न सम्भव छैन। 
            </p>
            <p>
              आजको यस भेलाले सम्पूर्ण कार्यकर्ता पङ्क्तिलाई एकताबद्ध भई जनताका समस्या समाधानमा केन्द्रित हुन निर्देशन दिएको छ। हामीले गरेका प्रतिबद्धता पूरा गर्न कुनै कसर बाँकी राख्ने छैनौं।
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
