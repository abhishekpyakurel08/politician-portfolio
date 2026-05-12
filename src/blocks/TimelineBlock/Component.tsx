import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { SectionHeading } from '@/components/SectionHeading'
import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { MoveRight, History, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utilities/ui'
const defaultTimelineItems = [
  {
    year: '२०७१',
    title: 'युवा नेतृत्वको सुरुवात',
    description: 'SLC उत्तीर्ण पश्चात् युवा क्लबको अध्यक्षको रूपमा नेतृत्वदायी भूमिका निर्वाह।',
    category: 'सामाजिक',
  },
  {
    year: '२०७४/७५',
    title: 'CMA अध्ययन र सामाजिक अभियान',
    description: 'CMA (Certified Medical Assistant) अध्ययन पूरा गर्नुका साथै पलाँता युवा सञ्जालको अध्यक्ष भई राहत वितरण, सचेतना र सामाजिक कार्यमा सक्रियता।',
    category: 'सामाजिक',
  },
  {
    year: '२०७९',
    title: 'स्थानीय तह निर्वाचन उम्मेदवार',
    description: 'कालिकोटको पलाँता गाउँपालिकाबाट उपाध्यक्ष पदमा नेकपा एमालेको तर्फबाट उम्मेदवारी र १५९८ मत (७२ मतको अन्तर) सहित सशक्त उपस्थिति।',
    category: 'निर्वाचन',
  },
  {
    year: '२०७९ फागुन',
    title: 'अनेरास्ववियु केन्द्रीय सदस्य',
    description: 'केन्द्रीय महाधिवेशनबाट केन्द्रीय सदस्यमा निर्वाचित र कालिकोट जिल्ला इन्चार्जको जिम्मेवारी प्राप्त।',
    category: 'पार्टी',
  },
  {
    year: 'पछिल्लो समय',
    title: 'लेखा आयोग अध्यक्ष र महाधिवेशन प्रतिनिधि',
    description: 'नेकपा एमाले कालिकोट जिल्ला अधिवेशनबाट लेखा आयोगको अध्यक्षमा निर्वाचित। साथै, नेकपा एमालेको एघारौँ महाधिवेशन प्रतिनिधिको भूमिका।',
    category: 'पार्टी',
  }
]

export const TimelineBlock = async ({ 
  title,
  subtitle,
  limit = 10,
  locale = 'ne'
}: {
  title?: string
  subtitle?: string
  limit?: number
  locale?: string
}) => {
  const payload = await getPayload({ config: configPromise })
  const finalTitle = title || (locale === 'en' ? 'My Political and Social Journey' : 'मेरो राजनीतिक तथा सामाजिक यात्रा')
  const finalSubtitle = subtitle || (locale === 'en' ? 'A glorious history of continuous struggle and public service since 2070' : '२०७० सालदेखिको निरन्तर सङ्घर्ष र जनसेवाको गौरवमय इतिहास')
  
  const fetchedTimeline = await payload.find({
    collection: 'timeline',
    limit: limit,
    sort: 'year',
  })

  const items = fetchedTimeline.docs.length > 0 
    ? fetchedTimeline.docs.map(doc => ({
        year: doc.year,
        title: doc.title,
        description: doc.description,
        category: doc.category,
        image: doc.image,
      }))
    : defaultTimelineItems

  return (
    <section className="w-full bg-slate-50 py-16 md:py-24 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600 opacity-[0.02] rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600 opacity-[0.02] rounded-full blur-[100px] -ml-20 -mb-20" />

      <div className="container relative z-10">
        <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
          <SectionHeading title={finalTitle} className="border-none justify-center py-0 mb-4" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-6">{finalSubtitle}</p>
          <div className="w-20 h-1.5 bg-[#B31B20] mx-auto rounded-full" />
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-linear-to-b from-[#B31B20] via-slate-200 to-slate-100 -translate-x-1/2 rounded-full" />

          <div className="space-y-12 md:space-y-24">
            {items.map((item, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Content Box */}
                  <div className={cn(
                    "w-full md:w-[45%] pl-16 md:pl-0",
                    isEven ? "md:text-right md:pr-16" : "md:order-last md:pl-16 text-left"
                  )}>
                    <Card className="border-none glass hover:shadow-2xl transition-all duration-700 overflow-hidden group premium-border rounded-3xl">
                      <CardContent className="p-6 md:p-10 relative">
                        <div className={cn(
                          "absolute top-0 w-2 h-full bg-[#B31B20]",
                          isEven ? "right-0" : "left-0"
                        )} />
                        
                        <div className={cn(
                          "flex items-center gap-3 mb-4",
                          isEven ? "md:justify-end" : "justify-start"
                        )}>
                           <Badge className="bg-[#B31B20]/10 text-[#B31B20] border-none px-3 py-1 font-black text-xs uppercase tracking-wider">
                             {item.category}
                           </Badge>
                           <History className="w-4 h-4 text-slate-400" />
                        </div>

                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#B31B20] transition-colors mukta-bold tracking-tighter">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 font-medium leading-relaxed">
                          {item.description}
                        </p>
                        
                        <div className={cn(
                          "mt-6 flex items-center gap-2 font-black text-[#B31B20] text-sm uppercase tracking-tighter cursor-pointer group/link mukta-bold",
                          isEven ? "md:justify-end" : "justify-start"
                        )}>
                          {locale==='en'?'Full Details':'पूर्ण विवरण'}<MoveRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Bubble / Dot */}
                  <div className="absolute left-8 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 translate-y-0 md:-translate-y-1/2 z-20">
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white shadow-2xl border-[6px] border-[#B31B20]/20 flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-500 relative">
                        <div className="absolute inset-0 rounded-full border-2 border-[#B31B20] scale-95" />
                        <span className="text-[#B31B20] font-black leading-none text-center relative z-10 mukta-bold">
                           <div className="text-[10px] md:text-xs uppercase opacity-60">{locale==='en'?'Year':'वर्ष'}</div>
                           <div className="text-sm md:text-lg">{item.year}</div>
                        </span>
                        
                        {/* Hover glow */}
                        <div className="absolute inset-0 rounded-full bg-[#B31B20] opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
                     </div>
                  </div>

                  {/* Horizontal Connector (Desktop) */}
                  <div className={cn(
                    "hidden md:block absolute top-1/2 -translate-y-1/2 w-16 h-1 bg-slate-200",
                    isEven ? "left-[45%]" : "right-[45%]"
                  )} />

                </div>
              )
            })}
          </div>
        </div>

        {/* View All Button */}
        <div className="mt-16 md:mt-24 text-center">
           <Button size="lg" className="bg-[#B31B20] text-white border-none px-12 h-16 md:h-20 rounded-full font-black text-lg md:text-xl gap-4 hover:bg-slate-900 shadow-2xl shadow-red-900/40 transition-all hover:-translate-y-2 mukta-bold uppercase tracking-widest leading-none">
             {locale==='en'?'View All History':'पूरा इतिहास हेर्नुहोस्'} <MoveRight className="w-6 h-6" />
           </Button>
        </div>
      </div>
    </section>
  )
}


