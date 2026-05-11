import React from 'react'
import configPromise from '@payload-config'
import Image from 'next/image'
import { getPayload, TypedLocale } from 'payload'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SectionHeading } from '@/components/SectionHeading'
import RichText from '@/components/RichText'
import LucideIcon from '@/components/LucideIcon'
import { Calendar, Globe, Heart, MapPin, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'परिचय | Jalsa Chhetri',
  description: 'Jalsa Chhetri को व्यक्तिगत, राजनीतिक तथा सामाजिक जीवनको विस्तृत विवरण।',
}

export const revalidate = 60

const item = [
  {
    color: 'from-orange-600 to-orange-800',
  },
  {
    color: 'from-blue-600 to-blue-800',
  },
  {
    color: 'from-slate-600 to-slate-800',
  },
  {
    color: 'from-emerald-600 to-emerald-800',
  },
]

const educationItems = [
  {
    degreeEn: 'SLC Completed',
    degreeNe: 'SLC उत्तीर्ण',
    institutionEn: 'Government of Nepal Board',
    institutionNe: 'नेपाल सरकार बोर्ड',
    year: '२०७०',
  },
  {
    degreeEn: 'Grade 11/12 Completed',
    degreeNe: 'कक्षा ११/१२ उत्तीर्ण',
    institutionEn: 'Higher Secondary Education Board',
    institutionNe: 'उच्च माध्यमिक शिक्षा परिषद्',
    year: '२०७२/७३',
  },
  {
    degreeEn: 'CMA (Certified Medical Assistant)',
    degreeNe: 'CMA (प्रमाणित मेडिकल सहायक)',
    institutionEn: 'CTEVT',
    institutionNe: 'सीटीईभीटी (CTEVT)',
    year: '२०७४/७५',
  },
]

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}

export default async function AboutPage({ params: paramsPromise }: Args) {
  const { locale = 'ne' } = await paramsPromise
  const isEnglish = locale === 'en'

  const payload = await getPayload({ config: configPromise })
  const galleryDoc = await payload.find({
    collection: 'gallery',
    locale,
    fallbackLocale: 'ne',
    where: {
      slug: { equals: 'personal' },
    },
    depth: 1,
  })

  const slider = await payload.find({
    collection: 'sliders',
    locale,
    fallbackLocale: 'ne',
    where: {
      slug: { equals: 'aboutpage' },
    },
    limit: 1,
    depth: 1,
  })
  const post = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: 'ne',
    where: {
      slug: { equals: 'aboutpage' },
    },
    depth: 1,
  })

  const morals = await payload.find({
    collection: 'sliders',
    locale,
    fallbackLocale: 'ne',
    where: {
      slug: { equals: 'morals-and-values' },
    },
    depth: 1,
  })

  const journey = await payload.find({
    collection: 'sliders',
    locale,
    fallbackLocale: 'ne',
    where: {
      slug: { equals: 'journey' },
    },
    depth: 1,
  })

  const sliderImage = slider.docs?.[0]?.slides?.[0]?.image
  const ImageURL =
    typeof sliderImage === 'object' && sliderImage?.url && (sliderImage.url as string)

  const personalsGallery = galleryDoc.docs?.[0]?.photos?.[0]?.image

  const personalsImageUrl =
    typeof personalsGallery === 'object' &&
    personalsGallery?.url &&
    (personalsGallery.url as string)
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Banner */}
      <section className="relative w-full bg-slate-950 pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden h-[60vh] md:h-[70vh] flex items-end">
        {/* BG image */}
        <div className="absolute inset-0">
          <Image
            src={ImageURL || '/placeholder-image.jpg'}
            alt={isEnglish ? 'Leader Background' : 'नेताको पृष्ठभूमि'}
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
            {isEnglish ? 'About Jalsa Chhetri' : 'जलसा क्षेत्री को परिचय'}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl leading-none tracking-tighter mb-4 text-white drop-shadow-xl">
            {slider?.docs?.[0]?.slides?.[0]?.title}
          </h1>
          <div className="text-lg md:text-xl font-bold max-w-2xl leading-relaxed text-slate-200 drop-shadow-lg">
            {slider?.docs?.[0]?.slides?.[0]?.description && (
              <RichText
                data={slider.docs[0].slides[0].description}
                enableGutter={false}
                enableProse={false}
                className="m-0 p-0"
              />
            )}
          </div>
        </div>
      </section>

      {/* Profile Card + Bio */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 md:py-24 border-b border-slate-100 dark:border-slate-800">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-start">
            {/* Left: Profile Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                  <div className="relative aspect-3/4 bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={personalsImageUrl || '/placeholder-image.jpg'}
                      alt="Leader Portrait"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                      <h2 className="text-2xl font-black leading-tight">
                        {isEnglish ? 'Jalsa Chhetri' : 'जलसा क्षेत्री'}
                      </h2>
                      <p className="text-slate-300 text-sm font-bold mt-1">
                        {isEnglish
                          ? 'CPN (UML) Kalikot District Accounts Commission Chairman'
                          : 'नेकपा (एमाले) कालिकोट जिल्ला लेखा आयोग अध्यक्ष'}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-6 bg-slate-950 text-white space-y-3">
                    {[
                      {
                        icon: MapPin,
                        text: isEnglish ? 'Kalikot, Nepal' : 'कालिकोट, नेपाल',
                      },
                      {
                        icon: Calendar,
                        text: isEnglish ? 'BOD: 1997 May 20' : 'जन्म: वि.सं. २०५४ जेठ ५',
                      },
                      {
                        icon: Star,
                        text: isEnglish ? 'Youth Leader and Activist' : 'युवा नेता तथा अभियान्ता',
                      },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-center gap-3 text-slate-300 text-sm font-medium"
                      >
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
                {post.docs?.[0]?.title && (
                  <h1 className="text-6xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-4">
                    {post.docs[0].title}
                  </h1>
                )}
                <div className="space-y-5 font-medium leading-[1.9] text-base md:text-lg">
                  {post.docs?.[0]?.content && (
                    <RichText data={post.docs[0].content} enableGutter={false} />
                  )}
                </div>
              </div>

              <Separator />

              {/* Values Grid */}
              <div>
                <SectionHeading
                  title={
                    morals.docs?.[0]?.title ||
                    (isEnglish ? 'Morals and Values' : 'मूल्य र सिद्धान्त')
                  }
                  className="mb-6"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {morals.docs?.[0]?.slides?.map((slide, index) => (
                    <Card
                      key={index}
                      className="border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl group"
                    >
                      <CardContent className="p-6 flex gap-4 items-start">
                        <div className="w-12 h-12 bg-[#B31B20]/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-[#B31B20] transition-colors duration-300">
                          {slide.icon ? (
                            <LucideIcon
                              name={slide.icon as string}
                              className="w-6 h-6 text-[#B31B20] group-hover:text-white transition-colors duration-300"
                            />
                          ) : (
                            <Heart className="w-6 h-6 text-[#B31B20] group-hover:text-white transition-colors duration-300" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-black text-slate-900 dark:text-white text-lg mb-1">
                            {slide.title}
                          </h3>
                          {slide.subTitle && (
                            <p className="text-xs font-bold text-[#B31B20] mb-2 uppercase tracking-tight">
                              {slide.subTitle}
                            </p>
                          )}
                          <div className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed">
                            {slide.description && (
                              <RichText
                                data={slide.description}
                                enableGutter={false}
                                enableProse={false}
                                className="m-0 p-0"
                              />
                            )}
                          </div>
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

      <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-125 h-125 bg-red-600/5 blur-[120px] -ml-20 -mt-20" />
        <div className="container relative z-10">
          <SectionHeading
            title={
              journey.docs?.[0].title || (locale === 'en' ? 'Political Journey' : 'राजनीतिक यात्रा')
            }
            viewAllHref="/activities"
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journey.docs?.[0]?.slides?.map((slide, index) => (
              <Card
                key={index}
                className="border-none bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden rounded-2xl group"
              >
                <CardContent className="p-0">
                  <div className={`h-2 w-full bg-linear-to-r ${item[index % item.length].color}`} />
                  <div className="p-7">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-linear-to-br ${item[index % item.length].color} flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg text-center px-2`}
                      >
                        {slide.subTitle}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-black text-slate-900 dark:text-white text-lg mb-2 group-hover:text-[#B31B20] dark:group-hover:text-[#ff4d4d] transition-colors wrap-break-word">
                          {slide.title}
                        </h3>
                        <div className="text-slate-500 dark:text-slate-300 font-medium leading-relaxed text-sm wrap-break-word">
                          {slide.description && (
                            <RichText
                              data={slide.description}
                              enableGutter={false}
                              enableProse={false}
                              className="m-0 p-0"
                            />
                          )}
                        </div>
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
      <section className="w-full py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
        <div className="container">
          <SectionHeading
            title={isEnglish ? 'Educational Qualifications' : 'शैक्षिक योग्यता'}
            className="mb-10"
          />
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-linear-to-b from-[#B31B20] to-slate-200" />
            <div className="space-y-8">
              {educationItems.map((edu, i) => (
                <div key={i} className="relative flex items-start pl-16">
                  <div className="absolute left-0 top-2 w-16 flex justify-center">
                    <div className="w-4 h-4 rounded-full bg-[#B31B20] border-4 border-white shadow-md" />
                  </div>
                  <Card className="border-none bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow rounded-2xl flex-1">
                    <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                      <div>
                        <h3 className="font-black text-slate-900 dark:text-white text-lg">
                          {isEnglish ? edu.degreeEn : edu.degreeNe}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-300 font-medium text-sm mt-1 flex items-center gap-2">
                          <Globe className="w-4 h-4 text-[#B31B20]" />
                          {isEnglish ? edu.institutionEn : edu.institutionNe}
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
              {isEnglish ? 'Stay Connected' : 'सम्पर्कमा रहनुहोस्'}
            </h2>
            <p className="text-red-100 font-bold mt-3 text-lg max-w-xl">
              {isEnglish
                ? "Stay updated with Jalsa Chhetri's activities, ideas, and social campaigns."
                : 'जल्सा क्षेत्रीका गतिविधि, विचार र सामाजिक अभियानहरूको अपडेट पाउन जोडिनुहोस्।'}
            </p>
          </div>
          <div className="flex gap-4 shrink-0">
            <Link
              href="/news"
              className="bg-white text-[#B31B20] font-black px-8 py-4 rounded-2xl hover:bg-red-50 transition-all shadow-xl hover:-translate-y-1 text-base"
            >
              {isEnglish ? 'News' : 'समाचार हेर्नुहोस्'}
            </Link>
            <Link
              href="/activities"
              className="bg-white/10 border border-white/30 text-white font-black px-8 py-4 rounded-2xl hover:bg-white/20 transition-all shadow-xl hover:-translate-y-1 text-base backdrop-blur-sm"
            >
              {isEnglish ? 'Activities' : 'गतिविधि'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
