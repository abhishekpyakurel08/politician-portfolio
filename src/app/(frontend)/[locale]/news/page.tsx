import React from 'react'
import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { SectionHeading } from '@/components/SectionHeading'
import { Calendar, ChevronRight, Clock, Newspaper } from 'lucide-react'

export const metadata: Metadata = {
  title: 'समाचार | Jalsa Chhetri',
  description: 'Jalsa Chhetri को ताजा समाचार, भाषण र आधिकारिक घोषणाहरू।',
}

export const revalidate = 60

const mockNews = Array.from({ length: 12 }, (_, i) => ({
  id: `mock-${i}`,
  title: `समाचार शीर्षक — पार्टी सम्मेलन र विकासका नयाँ पाइला ${i + 1}`,
  excerpt:
    'नेकपा (एमाले)का नेताहरू एकत्रित भई राष्ट्रिय विकास र जनताको सेवाका विषयमा गहन छलफल गरे।',
  imageUrl: '/website-template-OG.webp',
  date: new Date(Date.now() - i * 86400000 * 2).toLocaleDateString('ne-NP'),
  slug: '#',
  category: ['राजनीति', 'विकास', 'स्वास्थ्य', 'शिक्षा'][i % 4],
}))

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function NewsList({ params: paramsPromise }: Args) {
  const { locale = 'ne' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const { docs: newsDocs } = await payload.find({
    collection: 'news',
    limit: 24,
    sort: '-publishDate',
    draft: false,
  })

  const mapDoc = (doc: any, idx: number) => ({
    id: doc.id || `mock-${idx}`,
    title: doc.title,
    excerpt: doc.excerpt || 'विस्तृत समाचार पढ्नको लागि क्लिक गर्नुहोस्।',
    imageUrl:
      typeof doc.featuredImage === 'object' && doc.featuredImage?.url
        ? (doc.featuredImage.url as string)
        : '/website-template-OG.webp',
    date: doc.publishDate ? new Date(doc.publishDate).toLocaleDateString('ne-NP') : undefined,
    slug: (doc.slug as string) || doc.id,
    category: typeof doc.category === 'object' ? doc.category?.title : 'समाचार',
  })

  const news = newsDocs.length > 0 ? newsDocs.map(mapDoc) : mockNews
  const featured = news[0]
  const grid = news.slice(1)

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Page Hero */}
      <section className="w-full bg-slate-950 pt-32 md:pt-40 pb-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B31B20] opacity-[0.05] blur-[120px] -mr-20 -mt-20 rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Newspaper className="w-6 h-6 text-[#B31B20]" />
            <span className="text-slate-400 font-black uppercase text-sm tracking-widest leading-none">
              {locale === 'en' ? 'News Center' : 'समाचार केन्द्र'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
            {locale === 'en' ? 'Latest News' : 'ताजा समाचार'}
          </h1>
          <p className="text-slate-400 font-bold mt-6 mb-12 text-lg md:text-xl max-w-2xl leading-relaxed">
            {locale === 'en'
              ? 'Jalsa Chhetri’s official speeches, announcements and latest updates.'
              : 'जलसा क्षेत्री को आधिकारिक भाषण, घोषणा र ताजा अपडेट।'}
          </p>
        </div>

        {/* Featured Article */}
        {featured && (
          <div className="container pb-0">
            <Link href={`/news/${featured.slug}`} className="group block">
              <div className="relative rounded-t-3xl overflow-hidden h-[60vh] md:h-[65vh] shadow-2xl">
                <Image
                  src={featured.imageUrl}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000 brightness-75"
                  priority
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
                      {locale === 'en' ? 'Featured News' : 'मुख्य समाचार'}
                    </Badge>
                    {featured.category && (
                      <Badge
                        variant="outline"
                        className="text-white border-white/30 bg-white/10 backdrop-blur-sm text-xs font-bold rounded-full"
                      >
                        {featured.category}
                      </Badge>
                    )}
                  </div>
                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 group-hover:text-red-300 transition-colors max-w-4xl">
                    {featured.title}
                  </h2>
                  <p className="text-slate-300 font-medium text-base md:text-lg max-w-2xl line-clamp-2 mb-4">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-6">
                    {featured.date && (
                      <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
                        <Calendar className="w-4 h-4 text-[#B31B20]" />
                        {featured.date}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[#B31B20] font-black text-sm group-hover:gap-3 transition-all">
                      {locale === 'en' ? 'Read More' : 'थप पढ्नुहोस्'}
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}
      </section>

      {/* News Grid */}
      <section className="w-full py-16 md:py-20 bg-slate-50">
        <div className="container">
          <SectionHeading
            title={locale === 'en' ? 'All News' : 'सम्पूर्ण समाचार'}
            className="mb-10"
            textColor="text-slate-950 dark:text-white"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {grid.map((doc) => (
              <Link key={doc.id} href={`/news/${doc.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-2xl h-full flex flex-col">
                  <div className="relative overflow-hidden bg-slate-100">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={doc.imageUrl}
                        alt={doc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </AspectRatio>
                    {doc.category && (
                      <Badge className="absolute top-3 left-3 bg-[#B31B20] text-white border-none text-[10px] font-black uppercase tracking-wider rounded-full px-2.5">
                        {doc.category}
                      </Badge>
                    )}
                  </div>
                  <CardHeader className="p-5 pb-2 flex-1">
                    {doc.date && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#B31B20]" />
                        {doc.date}
                      </div>
                    )}
                    <CardTitle className="text-lg font-black text-slate-900 dark:text-white group-hover:text-[#B31B20] transition-colors leading-snug line-clamp-2">
                      {doc.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-0">
                    <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 mb-4">
                      {doc.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-[#B31B20] font-black text-sm group-hover:gap-3 transition-all">
                      थप पढ्नुहोस् <ChevronRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {news.length === 0 && (
            <div className="text-center py-24">
              <Newspaper className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-400">कुनै समाचार भेटिएन</h3>
              <p className="text-slate-400 mt-2">कृपया पछि फेरि आउनुहोस्।</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
