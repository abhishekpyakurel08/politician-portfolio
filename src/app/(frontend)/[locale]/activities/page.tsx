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
import { Activity, Calendar, ChevronRight, MapPin, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ताजा गतिविधि | Jalsa Buda Chhetri',
  description: 'Jalsa Buda Chhetri का ताजा गतिविधि, कार्यक्रम र सामाजिक संलग्नताहरू।',
}

export const revalidate = 60

const mockActivities = Array.from({ length: 9 }, (_, i) => ({
  id: `mock-${i}`,
  title: [
    'काठमाडौंमा जनसभाको आयोजना',
    'पार्टी जिल्ला अधिवेशन सम्पन्न',
    'स्वास्थ्य शिविरमा सहभागिता',
    'विद्यालय निर्माण उद्घाटन',
    'किसान भेलामा सम्बोधन',
    'युवा सम्मेलन आयोजना',
    'महिला अधिकार कार्यक्रम',
    'सडक निर्माण शिलान्यास',
    'पार्टी प्रशिक्षण कार्यक्रम',
  ][i],
  excerpt:
    'जनताको समस्या समाधान गर्न र राष्ट्रको विकासमा योगदान पुर्‍याउन समर्पित यस कार्यक्रममा हजारौं जनता सहभागी भए।',
  imageUrl: '/website-template-OG.webp',
  date: new Date(Date.now() - i * 86400000 * 3).toLocaleDateString('ne-NP'),
  slug: '#',
  location: ['काठमाडौं', 'ललितपुर', 'भक्तपुर', 'मकवानपुर', 'चितवन'][i % 5],
  participants: `${(i + 1) * 500}+`,
  category: ['जनसभा', 'विकास', 'स्वास्थ्य', 'शिक्षा', 'युवा'][i % 5],
}))

const categoryColors: Record<string, string> = {
  जनसभा: 'bg-red-100 text-red-700',
  विकास: 'bg-blue-100 text-blue-700',
  स्वास्थ्य: 'bg-green-100 text-green-700',
  शिक्षा: 'bg-purple-100 text-purple-700',
  युवा: 'bg-orange-100 text-orange-700',
}

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}
export default async function ActivitiesList({ params: paramsPromise }: Args) {
  const { locale = 'ne' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const { docs: activityDocs } = await payload.find({
    collection: 'activities',
    limit: 24,
    sort: '-publishDate',
    draft: false,
    locale,
    fallbackLocale: 'ne',
  })

  const mapDoc = (doc: any, idx: number) => ({
    id: doc.id || `mock-${idx}`,
    title: doc.title,
    excerpt: doc.excerpt || 'विस्तृत गतिविधि पढ्नको लागि क्लिक गर्नुहोस्।',
    imageUrl:
      typeof doc.featuredImage === 'object' && doc.featuredImage?.url
        ? (doc.featuredImage.url as string)
        : '/website-template-OG.webp',
    date: doc.publishDate
      ? new Date(doc.publishDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'ne-NP')
      : undefined,
    slug: (doc.slug as string) || doc.id,
    category: typeof doc.category === 'object' ? doc.category?.title : 'गतिविधि',
    location: 'नेपाल',
    participants: '१०००+',
  })

  const activities = activityDocs.length > 0 ? activityDocs.map(mapDoc) : mockActivities
  const featured = activities.slice(0, 2)
  const rest = activities.slice(2)

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Hero */}
      <section className="w-full bg-slate-950 pt-32 md:pt-48 pb-16 md:pb-24 relative overflow-hidden h-[50vh] md:h-[70vh] flex items-end">
        {/* BG pattern/gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#B31B20] opacity-[0.05] blur-[120px] rounded-full" />
          <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-red-600/10 blur-[100px] -mr-20 -mt-20 rounded-full" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
        </div>

        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#B31B20]" />
            <span className="text-slate-400 font-black uppercase text-sm tracking-widest">
              {locale === 'en' ? 'Activity Center' : 'गतिविधि केन्द्र'}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4 uppercase">
            {locale === 'en' ? 'Latest Activities' : 'ताजा गतिविधि'}
          </h1>
          <p className="text-slate-300 font-bold text-lg max-w-2xl leading-relaxed">
            {locale === 'en'
              ? 'Jalsa Buda Chhetri’s programs, public meetings and social engagement updates.'
              : 'जलसा बुढा क्षेत्री का कार्यक्रम, जनसभा र सामाजिक संलग्नताका ताजा अपडेट।'}
          </p>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-3 mt-10">
            {[
              locale === 'en' ? 'All' : 'सबै',
              locale === 'en' ? 'Public Meeting' : 'जनसभा',
              locale === 'en' ? 'Development' : 'विकास',
              locale === 'en' ? 'Health' : 'स्वास्थ्य',
              locale === 'en' ? 'Education' : 'शिक्षा',
              locale === 'en' ? 'Youth' : 'युवा',
            ].map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full font-black text-sm cursor-pointer transition-all ${
                  cat === (locale === 'en' ? 'All' : 'सबै')
                    ? 'bg-[#B31B20] text-white shadow-lg shadow-red-900/40'
                    : 'bg-white/5 dark:bg-slate-800/50 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activities - 2 column */}
      <section className="w-full py-16 md:py-20 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container">
          <SectionHeading
            title={locale === 'en' ? 'Special Activities' : 'विशेष गतिविधि'}
            className="mb-10"
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {featured.map((act) => (
              <Link key={act.id} href={`/activities/${act.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-2xl hover:shadow-red-900/10 transition-all duration-500 hover:-translate-y-2 rounded-[32px] md:rounded-[48px] h-full bg-slate-100 dark:bg-slate-800">
                  <div className="relative overflow-hidden aspect-video">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={act.imageUrl}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    </AspectRatio>
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-10">
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-[#B31B20] text-white border-none text-[10px] md:text-xs font-black uppercase tracking-widest rounded-full px-3 py-1">
                          {act.category}
                        </Badge>
                        {act.location && (
                          <Badge className="bg-white/10 text-white border-none backdrop-blur-md text-[10px] md:text-xs font-bold rounded-full flex gap-1.5 items-center px-3 py-1">
                            <MapPin className="w-3.5 h-3.5 text-[#B31B20]" /> {act.location}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-xl md:text-3xl font-black text-white leading-tight group-hover:text-red-400 transition-colors tracking-tight">
                        {act.title}
                      </h2>
                      <div className="flex items-center gap-6 mt-4">
                        {act.date && (
                          <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm font-bold">
                            <Calendar className="w-4 h-4 text-[#B31B20]" />
                            {act.date}
                          </div>
                        )}
                        {act.participants && (
                          <div className="flex items-center gap-2 text-slate-300 text-xs md:text-sm font-bold">
                            <Users className="w-4 h-4 text-blue-400" />
                            {act.participants} {locale === 'en' ? 'Participants' : 'सहभागी'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Activities Grid */}
      <section className="w-full py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="container">
          <SectionHeading
            title={locale === 'en' ? 'All Activities' : 'सम्पूर्ण गतिविधिहरू'}
            className="mb-12"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((act) => (
              <Link key={act.id} href={`/activities/${act.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl h-full flex flex-col bg-white dark:bg-slate-900 premium-border">
                  <div className="relative overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <AspectRatio ratio={16 / 10}>
                      <Image
                        src={act.imageUrl}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </AspectRatio>
                    <Badge
                      className={`absolute top-4 left-4 border-none text-[10px] font-black uppercase tracking-wider rounded-full px-3 py-1 shadow-lg ${
                        categoryColors[act.category] || 'bg-[#B31B20] text-white'
                      }`}
                    >
                      {act.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-6 pb-2 flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      {act.date && (
                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                          <Calendar className="w-3.5 h-3.5 text-[#B31B20]" />
                          {act.date}
                        </div>
                      )}
                      {act.location && (
                        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                          <MapPin className="w-3.5 h-3.5 text-blue-500" />
                          {act.location}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-xl font-black text-slate-900 dark:text-white group-hover:text-[#B31B20] transition-colors leading-tight line-clamp-2 mukta-bold">
                      {act.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-6 pb-6 pt-0">
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm leading-relaxed line-clamp-2 mb-6">
                      {act.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                      {act.participants && (
                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-bold">
                          <Users className="w-4 h-4 text-blue-500" />
                          {act.participants} सहभागी
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[#B31B20] font-black text-sm group-hover:gap-2 transition-all">
                        थप पढ्नुहोस् <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Empty state */}
          {activities.length === 0 && (
            <div className="text-center py-32">
              <div className="w-24 h-24 bg-slate-100 dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-8">
                <Activity className="w-12 h-12 text-slate-300 dark:text-slate-700" />
              </div>
              <h3 className="text-3xl font-black text-slate-400 dark:text-slate-700">
                कुनै गतिविधि भेटिएन
              </h3>
              <p className="text-slate-400 dark:text-slate-600 mt-2 font-bold uppercase tracking-widest text-xs">
                कृपया पछि फेरि आउनुहोस्
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
