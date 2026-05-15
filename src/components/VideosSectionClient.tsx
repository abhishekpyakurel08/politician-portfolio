'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { VideoPlayerModal } from './VideoPlayerModal'

interface Video {
  title: string
  url: string
  thumb: string | null | undefined | false
}

interface VideosSectionProps {
  mainVideo: Video | null
  subVideos: Video[]
  locale: 'en' | 'ne'
}

export function VideosSectionClient({ mainVideo, subVideos, locale }: VideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video)
    setIsModalOpen(true)
  }

  return (
    <>
      <section className="w-full bg-slate-950 py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-600/10 blur-[120px] -mr-40 -mt-40" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-blue-600/10 blur-[100px] -ml-20 -mb-20" />

        <div className="container relative z-10">
          <div className="flex items-center justify-between mb-8 md:mb-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mukta-bold tracking-tighter">
                {locale === 'en' ? 'In the picture' : 'दृश्यमा परिवर्तन'}
              </h2>
              <p className="text-slate-400 mt-2 text-sm md:text-base">
                {locale === 'en' ? 'Watch the latest videos' : 'ताजा भिडियो हेर्नुहोस्'}
              </p>
            </div>
            <a
              href="/videos"
              className="text-[#B31B20] hover:text-red-500 font-black text-sm md:text-base transition-colors"
            >
              {locale === 'en' ? 'View All →' : 'सबै हेर्नुहोस् →'}
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            {/* Main Video */}
            <div
              className="lg:col-span-8 group relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 premium-border cursor-pointer"
              onClick={() => handleVideoClick(mainVideo!)}
            >
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
                    {locale === 'en' ? 'Special Content' : 'विशेष सामाग्री'}
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
                  {locale === 'en' ? 'Did you know?' : 'तपाईंलाई थाहा छ?'}
                </h3>
                <p className="text-slate-400 mt-3 text-sm md:text-lg leading-relaxed font-medium">
                  {locale === 'en'
                    ? 'How are these steps of development and prosperity moving forward? Watch in detail.'
                    : 'विकास र समृद्धिका यी पाइलाहरू कसरी अगाडि बढिरहेका छन्? विस्तृतमा हेर्नुहोस्।'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {subVideos.map((vid, i) => (
                  <div
                    key={i}
                    className="group relative flex gap-3 md:gap-4 items-center bg-white/5 hover:bg-white/10 backdrop-blur-xs border border-white/10 rounded-xl p-2.5 md:p-3 transition-all duration-300 cursor-pointer"
                    onClick={() => handleVideoClick(vid)}
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
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <VideoPlayerModal
        videoUrl={selectedVideo?.url || null}
        title={selectedVideo?.title || null}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
