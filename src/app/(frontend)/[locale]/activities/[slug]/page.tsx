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
import { Calendar, ChevronLeft, MapPin, Tag, Users } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const activities = await payload.find({
    collection: 'activities',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return activities.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function ActivityPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = '/activities/' + decodedSlug
  const activity = await queryActivityBySlug({ slug: decodedSlug })

  if (!activity) {
    // If it's a mock slug for UI demo, show dummy content
    if (decodedSlug.startsWith('mock-')) {
      return <MockActivityPost slug={decodedSlug} />
    }
    return <PayloadRedirects url={url} />
  }

  const imageUrl =
    typeof activity.featuredImage === 'object' && activity.featuredImage?.url
      ? (activity.featuredImage.url as string)
      : '/website-template-OG.webp'

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}

      {/* Hero Section */}
      <section className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24 bg-slate-950 overflow-hidden min-h-[50vh] md:min-h-[65vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src={imageUrl}
            alt={activity.title}
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-all mb-8 font-black text-xs uppercase tracking-widest group/back"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{' '}
            गतिविधिमा फर्कनुहोस्
          </Link>

          <div className="flex flex-wrap gap-4 mb-6">
            {activity.category && typeof activity.category === 'object' && (
              <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl">
                {activity.category.title}
              </Badge>
            )}
            {activity.publishDate && (
              <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                <Calendar className="w-4 h-4 text-[#B31B20]" />
                {new Date(activity.publishDate).toLocaleDateString('ne-NP')}
              </div>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6 max-w-5xl tracking-tighter uppercase">
            {activity.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="container max-w-4xl -mt-8 relative z-20">
        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 dark:border-slate-600">
          <div className="max-w-none text-slate-900 dark:text-slate-100">
            {activity.excerpt && (
              <>
                <p className="text-xl text-slate-900 dark:text-slate-100 font-medium leading-relaxed mb-8">
                  {activity.excerpt}
                </p>
                <hr className="border-slate-200 dark:border-slate-600 mb-8" />
              </>
            )}
            {activity.content ? (
              <RichText
                className="prose prose-lg prose-slate dark:prose-invert text-slate-900 dark:text-slate-100"
                data={activity.content}
                enableGutter={false}
              />
            ) : (
              <p className="text-slate-700 dark:text-slate-300">थप विवरण उपलब्ध छैन।</p>
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
  const activity = await queryActivityBySlug({ slug: decodedSlug })

  return generateMeta({ doc: activity })
}

const queryActivityBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'activities',
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
function MockActivityPost({ slug }: { slug: string }) {
  const mockIndex = parseInt(slug.replace('mock-', '')) || 0
  const mockTitles = [
    'काठमाडौंमा जनसभाको आयोजना',
    'पार्टी जिल्ला अधिवेशन सम्पन्न',
    'स्वास्थ्य शिविरमा सहभागिता',
    'विद्यालय निर्माण उद्घाटन',
    'किसान भेलामा सम्बोधन',
    'युवा सम्मेलन आयोजना',
    'महिला अधिकार कार्यक्रम',
    'सडक निर्माण शिलान्यास',
    'पार्टी प्रशिक्षण कार्यक्रम',
  ]

  return (
    <article className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20">
      <section className="relative w-full pt-32 md:pt-48 pb-16 md:pb-24 bg-slate-950 overflow-hidden min-h-[50vh] md:min-h-[65vh] flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/website-template-OG.webp"
            alt="Mock Activity"
            fill
            className="object-cover brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-all mb-8 font-black text-xs uppercase tracking-widest group/back"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />{' '}
            गतिविधिमा फर्कनुहोस्
          </Link>

          <div className="flex flex-wrap gap-4 mb-6">
            <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-xl">
              जनसभा
            </Badge>
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              <Calendar className="w-4 h-4 text-[#B31B20]" />
              {new Date().toLocaleDateString('ne-NP')}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.9] mb-6 max-w-5xl tracking-tighter uppercase">
            {mockTitles[mockIndex % mockTitles.length]}
          </h1>
        </div>
      </section>

      <section className="container max-w-4xl -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
          <div className="prose prose-lg max-w-none prose-slate dark:prose-invert">
            <p className="text-xl text-slate-900 dark:text-slate-100 font-medium leading-relaxed mb-8">
              जनताको समस्या समाधान गर्न र राष्ट्रको विकासमा योगदान पुर्‍याउन समर्पित यस कार्यक्रममा
              हजारौं जनता सहभागी भए।
            </p>
            <hr className="border-slate-200 dark:border-slate-600 mb-8" />
            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none">
              <p className="text-slate-700 dark:text-slate-300">
                यस कार्यक्रममा विभिन्न क्षेत्रका प्रतिनिधिहरूको उपस्थिति थियो। कार्यक्रमले स्थानीय
                समस्याहरूको बारेमा बहस गरेको थियो र समाधानका लागि ठोस कदमहरू चाल्ने प्रतिबद्धता
                व्यक्त गरेको थियो।
              </p>
              <p className="text-slate-700 dark:text-slate-300">
                कार्यक्रमका सहभागीहरूले यस किसिमका कार्यक्रमहरू निरन्तर रूपमा सञ्चालन गर्नुपर्नेमा
                जोड दिएका थिए। यसले जनता र सरकारबीचको सम्बन्धलाई अझ सुदृढ बनाउने विश्वास व्यक्त गरे।
              </p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
