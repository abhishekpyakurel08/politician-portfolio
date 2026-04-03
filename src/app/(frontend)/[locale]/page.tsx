import React from 'react'
import { getPayload, TypedLocale } from 'payload'
import configPromise from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { SectionHeading } from '@/components/SectionHeading'
import { BlueHeroSlider } from '@/blocks/HeroCarouselBlock/Component'
import { Play, Facebook, Twitter, FileText, ChevronRight, Calendar, Video } from 'lucide-react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'

import { TimelineBlock } from '@/blocks/TimelineBlock/Component'

import { Metadata } from 'next'
import { generateMeta } from '@/utilities/generateMeta'
import { Locale } from 'node_modules/next/dist/compiled/@vercel/og/satori'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise })
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
  })

  return generateMeta({ doc: page.docs[0] })
}
type Args = {
  params: Promise<{
    locale: TypedLocale  
  }>
}
export default async function HomePage({params: paramsPromise}:Args) {


  const payload = await getPayload({ config: configPromise })
  const {locale='ne'}= await paramsPromise  




  // Sequential fetch to avoid MongoDB session expiration when parallelizing across the same Payload instance
  const newsResult = await payload.find({
    collection: 'news',
    limit: 20,
    sort: '-publishDate',
    draft: false,
  })

  const videosResult = await payload.find({
    collection: 'videos',
    limit: 4,
    sort: '-date',
  })

  const galleryResult = await payload.find({
    collection: 'gallery',
    limit: 2,
    sort: '-date',
  })


  const homePageResult = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    limit: 1,
  })

  const silderImageResult=await payload.find({
    collection:'sliders',
    where:{
      slug:{equals:'homepage'}
    },
    limit:1,
    depth:1
  })

  const newsDocs = newsResult.docs
  const videosDocs = videosResult.docs
  const galleryDocs = galleryResult.docs
  const homePageDocs = homePageResult.docs
  const homePage = homePageDocs[0]
  const heroData = homePage?.hero
  const sliderImage=silderImageResult.docs

  const sliderImageArray = sliderImage.flatMap((doc: any) => {
    const photosArray = doc.slides || []
    return photosArray.map((slides: any) => ({
      title: doc.title,
      description: doc.meta?.description || '',
      mediaUrl: typeof slides.image === 'object' && slides.image?.url ? slides.image.url as string : undefined,
    }))
  }).slice(0, 3)

  // Format fetched news docs to match our block props if available
  const mapDocToCard = (doc: any) => ({
    title: doc.title,
    excerpt: doc.excerpt || undefined,
    slug: doc.slug as string,
    imageUrl:
      typeof doc.featuredImage === 'object' &&
      doc.featuredImage?.url &&
      doc.featuredImage.url.trim() !== ''
        ? (doc.featuredImage.url as string)
        : undefined,
    hasVideo: doc.hasVideo || false,
    date: doc.publishDate ? new Date(doc.publishDate).toLocaleDateString('ne-NP') : undefined,
    category: typeof doc.category === 'object' ? doc.category?.title : 'अपडेट',
  })

  const dynamicNews = newsDocs.map(mapDocToCard)

  const getDoc = (index: number) => dynamicNews?.[index]

  const firstNews = getDoc(0)
  const sideNews = [getDoc(1), getDoc(2), getDoc(3)]

  // Gallery mapping
  const galleryItems = galleryDocs.map((doc) => {
    const photosArray = doc.photos || []
    return {
      title: doc.title,
      slug: doc.slug,
      coverImg:
        photosArray.length > 0 &&
        typeof photosArray[0].image === 'object' &&
        (photosArray[0].image.url as string),
      subImg1:
        photosArray.length > 1 &&
        typeof photosArray[1].image === 'object' &&
        (photosArray[1].image.url as string),
      subImg2:
        photosArray.length > 2 &&
        typeof photosArray[2].image === 'object' &&
        (photosArray[2].image.url as string),
      count: photosArray.length,
    }
  })

  // Video Mapping
  const videoItems = videosDocs.map((doc) => ({
    title: doc.title,
    url: doc.videoUrl as string,
    thumb: typeof doc.thumbnail === 'object' && doc.thumbnail?.url && (doc.thumbnail.url as string),
  }))
  const mainVideo = videoItems?.[0] ?? null
  const subVideos = videoItems?.slice(1, 4) ?? []

  return (
    <div className="relative overflow-hidden w-full">
      {/* Background Aesthetic Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[35%] h-[35%] bg-red-600/5 rounded-full blur-[100px]" />
      </div>

      {/* 1. Hero */}
      <BlueHeroSlider
        slides={sliderImageArray}
        initialSlide={{
          title: homePage?.title || undefined,
          description: homePage?.meta?.description || undefined,
          media: heroData?.media,
        }}
      />

      <section className="w-full py-16 md:py-32 bg-transparent relative z-10">
        <div className="container">
          <SectionHeading title="ताजा गतिविधि" viewAllHref="/activities" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Left - Hero Card */}
            <Link
              href={firstNews?.slug ? `/news/${firstNews.slug}` : '/not-found'}
              className="group block h-full"
            >
              <Card className="overflow-hidden border-none glass hover:shadow-red-900/20 transition-all duration-700 h-full flex flex-col rounded-3xl md:rounded-[40px] premium-border hover:-translate-y-2">
                <div className="relative aspect-video overflow-hidden">
                  <AspectRatio ratio={16 / 9}>
                    { firstNews?.imageUrl ? (
                    <Image
                        src={(firstNews?.imageUrl) as string}
                        alt={firstNews?.title || 'News article image'}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-500 text-sm">No image available</span>
                      </div>
                    )}
                  </AspectRatio>
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent" />
                  <Badge className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#B31B20] hover:bg-red-700 text-white border-none px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs">
                    आजको मुख्य समाचार
                  </Badge>
                </div>
                <CardHeader className="p-5 md:p-8 flex-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs md:text-sm font-medium mb-2 md:mb-3">
                    <Calendar className="w-4 h-4 text-[#B31B20]" />
                    <span className="mukta-semibold">{firstNews?.date}</span>
                  </div>
                  <CardTitle className="text-2xl md:text-5xl font-black text-slate-900 leading-[1.1] group-hover:text-red-600 transition-colors mukta-bold tracking-tighter">
                    {firstNews?.title}
                  </CardTitle>
                  <p className="mt-3 md:mt-4 text-slate-600 line-clamp-2 md:line-clamp-3 text-sm md:text-base leading-relaxed">
                    {firstNews?.excerpt}
                  </p>
                </CardHeader>
                <CardFooter className="px-5 pb-8 md:px-10 md:pb-12 pt-0">
                  <Button
                    variant="ghost"
                    className="p-0 h-auto text-[#B31B20] font-black hover:bg-transparent hover:text-red-700 gap-3 text-base md:text-lg group/more"
                  >
                    थप पढ्नुहोस्{' '}
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 group-hover/more:translate-x-2 transition-transform duration-300" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>

            {/* Right - List of Cards */}
            <div className="flex flex-col gap-4 md:gap-6">
              {sideNews.map((item, idx) => (
                <Link
                  key={idx}
                  href={item?.slug ? `/news/${item.slug}` : '/not-found'}
                  className="group"
                >
                  <Card className="overflow-hidden border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 rounded-xl md:rounded-2xl">
                    <div className="flex flex-row h-full">
                      <div className="relative w-25 sm:w-50 shrink-0">
                        <AspectRatio ratio={4 / 3}>
                          {item?.imageUrl ? (
                            <Image
                              src={item.imageUrl}
                              alt={item?.title || 'News article image'}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                              sizes="(max-width: 768px) 100px, 200px"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                              <span className="text-slate-500 text-xs">No image</span>
                            </div>
                          )}
                        </AspectRatio>
                      </div>
                      <CardHeader className="p-3 md:p-4 flex flex-col justify-center flex-1">
                        <Badge
                          variant="outline"
                          className="w-fit mb-1 md:mb-2 text-[#B31B20] border-red-100 bg-red-50/50 text-[10px] md:text-xs px-2 py-0.5"
                        >
                          {getDoc(idx)?.category || 'अपडेट'}
                        </Badge>
                        <CardTitle className="text-sm md:text-xl font-bold text-slate-800 line-clamp-2 leading-tight group-hover:text-[#B31B20] transition-colors">
                          {getDoc(idx)?.title}
                        </CardTitle>
                        <div className="flex items-center gap-1.5 mt-2 md:mt-3 text-slate-400 text-[10px] md:text-xs font-semibold uppercase tracking-wider">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{getDoc(idx)?.date}</span>
                        </div>
                      </CardHeader>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2.5. उपलब्धिहरू (Stats Removed) */}

      <section className="w-full bg-slate-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-600/10 blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-600/10 blur-[100px] -ml-20 -mb-20" />

        <div className="container relative z-10">
          <SectionHeading
            title="दृश्यमा परिवर्तन"
            viewAllHref="/videos"
            textColor="text-white"
            className="border-slate-800"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            {/* Main Video */}
            <div className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 premium-border">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={mainVideo?.thumb || '/placeholder-image.jpg'}
                  alt={mainVideo?.title || 'Video thumbnail'}
                  fill
                  className="object-cover brightness-[0.6] group-hover:brightness-75 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 group-hover:bg-[#B31B20] transition-all duration-500">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white group-hover:scale-110 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 bg-linear-to-t from-black text-white">
                  <Badge className="bg-[#B31B20] mb-3 text-[10px] md:text-sm border-none px-3 py-1 font-black mukta-bold">
                    विशेष सामाग्री
                  </Badge>
                  <h3 className="text-2xl md:text-5xl font-black leading-tight drop-shadow-md group-hover:text-red-400 transition-colors mukta-bold tracking-tighter uppercase">
                    {mainVideo?.title}
                  </h3>
                </div>
              </AspectRatio>
            </div>

            {/* Secondary Videos List */}
            <div className="lg:col-span-4 flex flex-col gap-4 md:gap-5">
              <div className="glass-dark border-white/10 p-6 md:p-8 rounded-3xl hidden md:block premium-border">
                <h3 className="font-black text-xl md:text-2xl text-white leading-tight mukta-bold text-gradient-hero">
                  तपाईंलाई थाहा छ?
                </h3>
                <p className="text-slate-400 mt-3 text-sm md:text-lg leading-relaxed font-medium">
                  विकास र समृद्धिका यी पाइलाहरू कसरी अगाडि बढिरहेका छन्? विस्तृतमा हेर्नुहोस्।
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {subVideos.map((vid, i) => (
                  <div
                    key={i}
                    className="group relative flex gap-3 md:gap-4 items-center bg-white/5 hover:bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-2.5 md:p-3 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative w-24 md:w-32 shrink-0 rounded-lg overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                        <Image
                          src={vid.thumb || '/placeholder-image.jpg'}
                          alt={vid.title || 'Video thumbnail'}
                          fill
                          className="object-cover scale-105 group-hover:scale-125 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                      </AspectRatio>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm md:text-base text-slate-100 line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
                        {vid.title}
                      </h4>
                      <div className="flex gap-2 mt-2 md:mt-3">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all"
                        >
                          <Facebook className="w-3 md:w-3.5 h-3 md:h-3.5" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-sky-500/20 hover:bg-sky-500 text-sky-400 hover:text-white transition-all"
                        >
                          <Twitter className="w-3 md:w-3.5 h-3 md:h-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. पलहरू र भावनाहरू (Photo Gallery) */}
      <section className="w-full bg-slate-50 py-16 md:py-24">
        <div className="container">
          <SectionHeading title="पलहरू र भावनाहरू" viewAllHref="/gallery" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-16">
            {galleryItems.map((album, i) => (
              <Link
                key={i}
                href={`/gallery`}
                className="group flex flex-col gap-4 md:gap-6 bg-white p-4 md:p-6 rounded-4xl md:rounded-[48px] shadow-sm hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-700 ring-1 ring-slate-100 hover:-translate-y-3"
              >
                <div className="grid grid-cols-2 gap-2 md:gap-3 h-60 md:h-100">
                  <div className="relative col-span-1 h-full rounded-xl md:rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                    {album.coverImg ? (
                      <Image
                        src={album.coverImg}
                        alt="Gallery cover"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-400 text-sm">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="grid grid-rows-2 gap-2 md:gap-3 h-full">
                    <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                      {album.subImg1 ? (
                        <Image
                          src={album.subImg1}
                          alt="sub image 1"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400 text-xs">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-inner bg-slate-100">
                      {album.subImg2 ? (
                        <Image
                          src={album.subImg2}
                          alt="sub image 2"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-400 text-xs">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex flex-col items-center justify-center text-white">
                        <span className="text-xl md:text-3xl font-black">{album.count}+</span>
                        <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">
                          Photos
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-2 md:px-4 py-2">
                  <h3 className="text-xl md:text-3xl font-black text-slate-900 line-clamp-1 group-hover:text-[#B31B20] transition-colors mukta-bold tracking-tighter">
                    {album.title}
                  </h3>
                  <p className="text-slate-500 font-black text-[10px] md:text-xs mt-1 md:mt-2 uppercase tracking-[0.2em]">
                    ग्यालरी अपडेट
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. भारी समाचार (Decisions & Press) */}
      <section className="w-full bg-white py-16 md:py-24 border-t border-slate-100/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
            {/* Decisions Side */}
            <div className="lg:col-span-2">
              <SectionHeading title="महत्वपूर्ण निर्णय" viewAllHref="/decisions" />
              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Highlight */}
                <div className="md:w-1/2 group">
                  <Card className="overflow-hidden border-none shadow-xl h-full rounded-2xl md:rounded-3xl">
                    <div className="relative aspect-4/5 overflow-hidden">
                      {getDoc(14)?.imageUrl ? (
                        <Image
                          src={getDoc(14)!.imageUrl as string}
                          alt={getDoc(14)?.title || 'Decision document image'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000"
                        />
                      ) : (
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                          <span className="text-slate-500 text-sm">No image</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 md:p-8">
                        <Badge className="bg-red-600 mb-3 md:mb-4 px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs border-none">
                          विशेष निर्णय
                        </Badge>
                        <h3 className="text-white font-black text-xl md:text-3xl leading-tight group-hover:text-red-400 transition-colors">
                          {getDoc(14)?.title}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* List */}
                <div className="md:w-1/2 flex flex-col gap-4 md:gap-6">
                  {[16, 17, 15].map((idx) => (
                    <Link key={idx} href={`/news/${getDoc(idx)?.slug}`} className="group">
                      <Card className="p-1 border-slate-100 hover:border-red-100 bg-slate-50/30 hover:bg-white shadow-sm hover:shadow-lg transition-all duration-300 rounded-xl md:rounded-2xl">
                        <div className="relative aspect-video overflow-hidden rounded-lg mb-3 md:mb-4">
                          {getDoc(idx)?.imageUrl ? (
                            <Image
                              src={getDoc(idx)!.imageUrl as string}
                              alt={getDoc(idx)?.title || 'Decision document image'}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                              <span className="text-slate-500 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                        <div className="px-3 pb-3 md:px-4 md:pb-4">
                          <h3 className="font-bold text-slate-800 group-hover:text-[#B31B20] leading-snug line-clamp-2 text-sm md:text-xl">
                            "{getDoc(idx)?.title}"
                          </h3>
                          <p className="text-slate-500 text-[10px] md:text-xs font-bold mt-1.5 md:mt-2 flex items-center gap-1.5 uppercase tracking-tighter">
                            <Calendar className="w-3.5 h-3.5" /> {getDoc(idx)?.date}
                          </p>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Press & Social Side */}
            <div className="lg:col-span-1 flex flex-col gap-8 md:gap-10">
              {/* Press Releases */}
              <Card className="border-none glass shadow-inner overflow-hidden rounded-4xl premium-border">
                <CardHeader className="bg-slate-900 py-6 px-8 md:py-8 md:px-10">
                  <div className="flex justify-between items-center">
                    <SectionHeading
                      title="प्रेस विज्ञप्ति"
                      textColor="text-white"
                      className="border-none py-0 mb-0 scale-90 -ml-4"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="flex flex-col">
                    {[18, 19, 11, 12, 13].map((idx, i) => (
                      <Link
                        key={idx}
                        href="#"
                        className="flex items-center gap-4 md:gap-6 p-4 md:p-6 border-b border-slate-200/50 bg-white hover:bg-slate-50 group transition-all"
                      >
                        <span className="text-slate-200 font-black text-4xl md:text-6xl shrink-0 tabular-nums group-hover:text-red-100 transition-colors mukta-bold">
                          0{i + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-black text-base md:text-xl text-slate-800 line-clamp-2 leading-tight group-hover:text-[#B31B20] transition-colors mukta-bold tracking-tight">
                            {getDoc(idx)?.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge
                              variant="secondary"
                              className="bg-slate-100 text-slate-500 text-[10px] md:text-xs font-black uppercase flex items-center gap-1.5 group-hover:bg-red-50 group-hover:text-red-600 transition-colors px-2 py-0.5"
                            >
                              <FileText className="w-3.5 h-3.5" /> PDF DOWNLOAD
                            </Badge>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Facebook Plugin */}
              <Card className="border-slate-100 shadow-xl overflow-hidden p-1 rounded-2xl">
                <div className="p-3 md:p-4 bg-slate-900 flex justify-between items-center rounded-t-xl">
                  <h3 className="text-white font-black text-sm md:text-base flex items-center gap-2">
                    <Facebook className="w-4 h-4 md:w-5 md:h-5 fill-white text-[#1877F2]" />
                    फेसबुक पेज
                  </h3>
                  <Link
                    href="#"
                    className="text-white/60 hover:text-white text-[10px] md:text-xs font-bold"
                  >
                    FOLLOW UP
                  </Link>
                </div>
                <div className="w-full h-100 md:h-125 bg-slate-50/50 flex justify-center">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fjasmin.xeetri&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    width="100%"
                    height="100%"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 5. इतिहासको पदचाप (Timeline) */}
      <TimelineBlock />

      {/* 6. Quote Full Width Banner */}
      <section className="w-full bg-[#1A365D] text-white py-24 md:py-32 relative overflow-hidden flex items-center justify-center border-t-4 md:border-t-8 border-[#B31B20]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="relative z-10 container flex flex-col items-center justify-center text-center max-w-5xl">
          <div className="relative group mb-6 md:mb-10">
            <div className="absolute -inset-4 bg-linear-to-r from-red-600 to-blue-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
            <div className="w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 md:ring-4 ring-white shadow-2xl relative z-10"></div>
          </div>
          <p className="text-xl md:text-4xl lg:text-5xl font-black leading-tight drop-shadow-2xl tracking-tight max-w-4xl italic">
            "हाम्रो यात्रा सुखद हुँदैन, तर परिणाम अवश्य पनि सुखद र शान्तिपूर्ण हुनेछ। जनताको न्याय र
            अधिकारको लागि निरन्तर सङ्घर्ष जारी छ।"
          </p>
          <div className="mt-6 md:mt-8 flex flex-col items-center">
            <div className="h-1 w-16 md:w-20 bg-red-600 rounded-full mb-3 md:mb-4" />
            <h4 className="text-lg md:text-xl font-bold tracking-[0.2em] text-red-500 uppercase">
              पार्टी अध्यक्ष
            </h4>
          </div>
        </div>
      </section>
    </div>
  )
}
