import React from 'react'
import configPromise from '@payload-config'
import Image from 'next/image'
import { getPayload } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/SectionHeading'
import {
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle,
  Globe,
  Heart,
  MapPin,
  Star,
  Users,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'परिचय | Jalsa Xettri',
  description:
    'Jalsa Xettri को व्यक्तिगत, राजनीतिक तथा सामाजिक जीवनको विस्तृत विवरण।',
}

export const revalidate = 3600



const careerMilestones = [
  {
    year: '२०७९',
    title: 'स्थानीय तह निर्वाचन उम्मेदवार',
    detail: 'कालिकोटको पलाँता गाउँपालिकाबाट उपाध्यक्ष पदमा नेकपा एमालेको तर्फबाट उम्मेदवारी र १५९८ मत (७२ मतको अन्तर) सहित बलियो उपस्थिति।',
    color: 'from-orange-600 to-orange-800',
  },
  {
    year: '२०७९',
    title: 'जिल्ला कमिटी सदस्य',
    detail: 'पार्टीप्रति निरन्तर सक्रियता र योगदानको कदर गर्दै नेकपा एमालेद्वारा जिल्ला कमिटी सदस्यमा मनोनित।',
    color: 'from-blue-600 to-blue-800',
  },
  {
    year: '२०७९ फागुन',
    title: 'अनेरास्ववियु केन्द्रीय सदस्य',
    detail: 'केन्द्रीय महाधिवेशनबाट केन्द्रीय सदस्यमा निर्वाचित हुनुका साथै कालिकोट जिल्लाको इन्चार्जको सफलतापूर्वक जिम्मेवारी बहन।',
    color: 'from-slate-600 to-slate-800',
  },
  {
    year: 'पछिल्लो समय',
    title: 'लेखा आयोग अध्यक्ष',
    detail: 'नेकपा एमाले कालिकोट जिल्ला अधिवेशनबाट लेखा आयोगको अध्यक्षमा निर्वाचित। साथै, पार्टीको एघारौँ महाधिवेशन प्रतिनिधि।',
    color: 'from-emerald-600 to-emerald-800',
  },
]

const educationItems = [
  { degree: 'SLC उत्तीर्ण', institution: 'नेपाल सरकार बोर्ड', year: '२०७०' },
  { degree: 'कक्षा ११/१२ उत्तीर्ण', institution: 'उच्च माध्यमिक शिक्षा परिषद्', year: '२०७२/७३' },
  { degree: 'CMA (Certified Medical Assistant)', institution: 'सीटीईभीटी (CTEVT)', year: '२०७४/७५' },
]

const values = [
  { icon: Heart, title: 'जनसेवा', desc: 'जनताको सेवालाई सर्वोपरि मानी राजनीतिमा प्रवेश गर्नुभएको हो।' },
  { icon: Globe, title: 'राष्ट्रवाद', desc: 'राष्ट्रिय एकता र अखण्डताका लागि सतत् संघर्षरत।' },
  { icon: BookOpen, title: 'शिक्षा र समृद्धि', desc: 'प्रत्येक नागरिकलाई गुणस्तरीय शिक्षाको अधिकार सुनिश्चित गर्ने प्रतिबद्धता।' },
  { icon: CheckCircle, title: 'सुशासन', desc: 'पारदर्शिता, जवाबदेही र भ्रष्टाचारमुक्त प्रशासनको पक्षमा दृढ।' },
]

export default async function AboutPage() {
    const payload = await getPayload({ config: configPromise })
    const galleryDoc=await payload.find({
    collection:'gallery',
    where:{
      slug:{equals:'personal'}
    },
    depth:1,
  })
  const personalsGallery = galleryDoc.docs?.[0].photos?.[0]?.image

  const personalsImageUrl =    typeof personalsGallery === 'object' && personalsGallery?.url
      && (personalsGallery.url as string) 
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Banner */}
      <section className="relative w-full bg-slate-950 py-0 overflow-hidden h-[60vh] md:h-[70vh] flex items-end">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src={`${personalsImageUrl || '/website-template-OG.webp'}`}
            alt="Leader Background"
            fill
            className="object-cover brightness-40"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-slate-950/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="container relative z-10 pb-16 md:pb-24">
          <Badge className="bg-[#B31B20] text-white border-none mb-4 px-4 py-1.5 text-xs uppercase tracking-widest font-black rounded-full">
            Jalsa Xettri को परिचय
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-4">
            परिचय
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-bold max-w-2xl leading-relaxed">
            सामाजिक अभियान्ता, युवा नेता साथै नेकपा एमालेका एक सशक्त जुझारु युवा व्यक्तित्व।
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-6 mt-8">
            {[
              { label: 'वर्षको सक्रियता', value: '१०+' },
              { label: 'प्राप्त मत (स्थानीय तह)', value: '१५९८' },
              { label: 'सामाजिक अभियान', value: '५०+' },
            ].map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-black text-[#B31B20]">{s.value}</span>
                <span className="text-slate-400 font-bold text-sm uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Profile Card + Bio */}
      <section className="w-full bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start">

            {/* Left: Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                  <div className="relative aspect-3/4 bg-slate-100">
                    <Image
                      src={personalsImageUrl || '/placeholder-image.jpg'}
                      alt="Leader Portrait"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                      <h2 className="text-2xl font-black leading-tight">Jalsa Xettri</h2>
                      <p className="text-slate-300 text-sm font-bold mt-1">नेकपा (एमाले) कालिकोट जिल्ला लेखा आयोग अध्यक्ष</p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-slate-950 text-white space-y-3">
                    {[
                      { icon: MapPin, text: 'कालिकोट, नेपाल' },
                      { icon: Calendar, text: 'जन्म: वि.सं. २०५४ बैशाख ५' },
                      { icon: Star, text: 'युवा नेता तथा अभियान्ता' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                        <Icon className="w-4 h-4 text-[#B31B20] shrink-0" />
                        <span>{text}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right: Bio Content */}
            <div className="lg:col-span-2 space-y-10">
              <div>
                <SectionHeading title="व्यक्तिगत परिचय" className="mb-6" />
                <div className="space-y-5 text-slate-600 font-medium leading-[1.9] text-base md:text-lg">
                  <p>
                    My date of birth is BS 2054 Baishakh 5. After passing SLC in BS 2070 Baishakh, I got the opportunity to play a leadership role as the president of the youth club in BS 2071 Baishakh. Then I passed grade 11/12 in BS 2072/73 Baishakh and completed my CMA (Certified Medical Assistant) studies in BS 2074/75 Baishakh.
                  </p>
                  <p>
                    I remained active in various public interest activities as a social activist, holding the responsibility of the President of Palanta Youth Network until 2075/76 BS. During this period, I played an important role in distributing relief to flood victims, distributing relief materials on the occasion of birthdays, collecting funds for the poor and helpless, supporting the sick and disabled, programs related to women and children's rights, youth awareness campaigns, agriculture-related programs, tree plantations, agricultural fairs, and campaigns against gender-based violence.
                  </p>
                  <p>
                    2079 BS was a year that brought a new turn in my political life. In the local elections held that year, I was a candidate for the post of Vice-Chairman from Palanta Rural Municipality, Kalikot District on behalf of the CPN-UML. Even after the defeat, my political activism and service to the people have continued.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Values Grid */}
              <div>
                <SectionHeading title="मूल्य र सिद्धान्त" className="mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {values.map(({ icon: Icon, title, desc }) => (
                    <Card key={title} className="border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl group">
                      <CardContent className="p-6 flex gap-4 items-start">
                        <div className="w-12 h-12 bg-[#B31B20]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#B31B20] transition-colors duration-300">
                          <Icon className="w-6 h-6 text-[#B31B20] group-hover:text-white transition-colors duration-300" />
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 text-lg mb-1">{title}</h3>
                          <p className="text-slate-500 text-sm font-medium leading-relaxed">{desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="w-full py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 blur-[120px] -ml-20 -mt-20" />
        <div className="container relative z-10">
           <SectionHeading title="राजनीतिक यात्रा" viewAllHref="/activities" className="mb-12" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {careerMilestones.map((item, i) => (
              <Card key={i} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group">
                <CardContent className="p-0">
                  <div className={`h-2 w-full bg-linear-to-r ${item.color}`} />
                  <div className="p-7">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item.color} flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg`}>
                        {item.year}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-black text-slate-900 text-xl mb-2 group-hover:text-[#B31B20] transition-colors">{item.title}</h3>
                        <p className="text-slate-500 font-medium leading-relaxed text-sm">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="w-full py-16 md:py-24 bg-white border-t border-slate-100">
        <div className="container">
          <SectionHeading title="शैक्षिक योग्यता" className="mb-10" />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#B31B20] to-slate-200" />
            <div className="space-y-8">
              {educationItems.map((edu, i) => (
                <div key={i} className="relative flex items-start pl-16">
                  <div className="absolute left-0 top-2 w-16 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#B31B20] border-4 border-white shadow-md" />
                  </div>
                  <Card className="border-none shadow-md hover:shadow-lg transition-shadow rounded-2xl flex-1">
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <div>
                        <h3 className="font-black text-slate-900 text-lg">{edu.degree}</h3>
                        <p className="text-slate-500 font-medium text-sm mt-1 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[#B31B20]" /> {edu.institution}
                        </p>
                      </div>
                      <Badge className="bg-[#B31B20]/10 text-[#B31B20] border-none px-4 py-2 rounded-full font-black text-sm self-start sm:self-center whitespace-nowrap">
                        {edu.year}
                      </Badge>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#B31B20] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        <div className="container relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              सम्पर्कमा रहनुहोस्
            </h2>
            <p className="text-red-100 font-bold mt-3 text-lg max-w-xl">
              Jalsa Xettri का गतिविधि, विचार र सामाजिक अभियानहरूको अपडेट पाउन जोडिनुहोस्।
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/news"
              className="bg-white text-[#B31B20] font-black px-8 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-xl hover:-translate-y-1 text-base"
            >
              समाचार हेर्नुहोस्
            </Link>
            <Link
              href="/activities"
              className="bg-white/10 border border-white/30 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/20 transition-all shadow-xl hover:-translate-y-1 text-base backdrop-blur-sm"
            >
              गतिविधि
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
