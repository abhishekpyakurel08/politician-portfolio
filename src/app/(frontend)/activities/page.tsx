import React from 'react'
import { getPayload } from 'payload'
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
  title: 'ताजा गतिविधि | Jalsa Xettri',
  description: 'Jalsa Xettri का ताजा गतिविधि, कार्यक्रम र सामाजिक संलग्नताहरू।',
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

export default async function ActivitiesList() {
  const payload = await getPayload({ config: configPromise })

  const { docs: activityDocs } = await payload.find({
    collection: 'news',
    limit: 24,
    sort: '-publishDate',
    draft: false,
  })

  const mapDoc = (doc: any, idx: number) => ({
    id: doc.id || `mock-${idx}`,
    title: doc.title,
    excerpt: doc.excerpt || 'विस्तृत गतिविधि पढ्नको लागि क्लिक गर्नुहोस्।',
    imageUrl:
      typeof doc.featuredImage === 'object' && doc.featuredImage?.url
        ? (doc.featuredImage.url as string)
        : '/website-template-OG.webp',
    date: doc.publishDate ? new Date(doc.publishDate).toLocaleDateString('ne-NP') : undefined,
    slug: (doc.slug as string) || doc.id,
    category: typeof doc.category === 'object' ? doc.category?.title : 'गतिविधि',
    location: 'नेपाल',
    participants: '१०००+',
  })

  const activities = activityDocs.length > 0 ? activityDocs.map(mapDoc) : mockActivities
  const featured = activities.slice(0, 2)
  const rest = activities.slice(2)

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Hero */}
      <section className="w-full bg-[#1A365D] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
        <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-[#B31B20] opacity-10 blur-[100px] -mr-20 -mt-20 rounded-full" />
        <div className="container relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#B31B20]" />
            <span className="text-blue-200/60 font-black uppercase text-sm tracking-widest">गतिविधि केन्द्र</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-4">
            ताजा गतिविधि
          </h1>
          <p className="text-blue-200 font-bold text-lg max-w-2xl leading-relaxed">
            Jalsa Xettri का कार्यक्रम, जनसभा र सामाजिक संलग्नताका ताजा अपडेट।
          </p>

          {/* Quick filters */}
          <div className="flex flex-wrap gap-3 mt-10">
            {['सबै', 'जनसभा', 'विकास', 'स्वास्थ्य', 'शिक्षा', 'युवा'].map((cat) => (
              <span
                key={cat}
                className={`px-5 py-2 rounded-full font-black text-sm cursor-pointer transition-all ${
                  cat === 'सबै'
                    ? 'bg-[#B31B20] text-white shadow-lg shadow-red-900/30'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Activities - 2 column */}
      <section className="w-full py-16 md:py-20 bg-white border-b border-slate-100">
        <div className="container">
          <SectionHeading title="विशेष गतिविधि" className="mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {featured.map((act) => (
              <Link key={act.id} href={`/news/${act.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 rounded-3xl h-full">
                  <div className="relative overflow-hidden">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={act.imageUrl}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-80"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                    </AspectRatio>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge className="bg-[#B31B20] text-white border-none text-[10px] font-black uppercase tracking-widest rounded-full">
                          {act.category}
                        </Badge>
                        {act.location && (
                          <Badge className="bg-white/10 text-white border-none backdrop-blur-sm text-[10px] font-bold rounded-full flex gap-1 items-center">
                            <MapPin className="w-3 h-3" /> {act.location}
                          </Badge>
                        )}
                      </div>
                      <h2 className="text-xl md:text-2xl font-black text-white leading-tight group-hover:text-red-300 transition-colors">
                        {act.title}
                      </h2>
                      <div className="flex items-center gap-4 mt-3">
                        {act.date && (
                          <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold">
                            <Calendar className="w-3.5 h-3.5 text-[#B31B20]" />
                            {act.date}
                          </div>
                        )}
                        {act.participants && (
                          <div className="flex items-center gap-1.5 text-slate-300 text-xs font-bold">
                            <Users className="w-3.5 h-3.5 text-blue-400" />
                            {act.participants} सहभागी
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
      <section className="w-full py-16 md:py-20 bg-slate-50">
        <div className="container">
          <SectionHeading title="सम्पूर्ण गतिविधिहरू" className="mb-10" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((act) => (
              <Link key={act.id} href={`/news/${act.slug}`} className="group">
                <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-500 hover:-translate-y-1 rounded-2xl h-full flex flex-col">
                  <div className="relative overflow-hidden bg-slate-100">
                    <AspectRatio ratio={4 / 3}>
                      <Image
                        src={act.imageUrl}
                        alt={act.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </AspectRatio>
                    <Badge
                      className={`absolute top-3 left-3 border-none text-[10px] font-black uppercase tracking-wider rounded-full px-2.5 ${
                        categoryColors[act.category] || 'bg-[#B31B20] text-white'
                      }`}
                    >
                      {act.category}
                    </Badge>
                  </div>
                  <CardHeader className="p-5 pb-2 flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      {act.date && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                          <Calendar className="w-3 h-3 text-[#B31B20]" />
                          {act.date}
                        </div>
                      )}
                      {act.location && (
                        <div className="flex items-center gap-1 text-slate-400 text-xs font-bold">
                          <MapPin className="w-3 h-3 text-blue-500" />
                          {act.location}
                        </div>
                      )}
                    </div>
                    <CardTitle className="text-lg font-black text-slate-900 group-hover:text-[#B31B20] transition-colors leading-snug line-clamp-2">
                      {act.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 pt-0">
                    <p className="text-slate-500 font-medium text-sm leading-relaxed line-clamp-2 mb-4">
                      {act.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      {act.participants && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                          <Users className="w-3.5 h-3.5 text-blue-500" />
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
            <div className="text-center py-24">
              <Activity className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <h3 className="text-2xl font-black text-slate-400">कुनै गतिविधि भेटिएन</h3>
              <p className="text-slate-400 mt-2">कृपया पछि फेरि आउनुहोस्।</p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
