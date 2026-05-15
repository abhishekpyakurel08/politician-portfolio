'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { X, Images, Calendar } from 'lucide-react'

interface GalleryItemType {
  id: string
  title: string
  imageUrl: string
  date?: string
  images: { url: string; alt?: string }[]
}

export function GalleryClient({ items }: { items: GalleryItemType[] }) {
  const [selectedAlbum, setSelectedAlbum] = useState<GalleryItemType | null>(null)

  // Motion variants for staggering standard cards
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
  }

  return (
    <div className="w-full">
      {/* Main Grid View */}
      <AnimatePresence mode="wait">
        {!selectedAlbum ? (
          <motion.div
            key="grid"
            variants={container}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {items.map((album) => (
              <motion.div key={album.id} variants={item}>
                <Card
                  className="overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg ring-1 ring-gray-100 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-3xl"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <CardContent className="p-0 relative">
                    <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100 dark:bg-slate-800">
                      <Image
                        src={album.imageUrl}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent opacity-90" />

                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 py-1.5 rounded-full flex items-center gap-2 shadow-xl border border-white/20">
                        <Images className="w-4 h-4 text-[#B31B20]" />
                        <span className="text-xs font-black text-slate-800 dark:text-white uppercase tracking-widest">
                          {album.images.length + 1} Photos
                        </span>
                      </div>

                      {/* Title & Info */}
                      <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                        <h3 className="text-xl md:text-2xl font-black leading-tight mb-2 group-hover:text-red-400 transition-colors mukta-bold tracking-tight">
                          {album.title}
                        </h3>
                        {album.date && (
                          <div className="flex items-center gap-2 text-slate-300 text-sm font-bold">
                            <Calendar className="w-4 h-4 text-[#B31B20]" />
                            <span>{album.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          /* Detailed Lightbox/Album View */
          <motion.div
            key="album"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 relative z-50 transition-colors duration-300"
          >
            {/* Header */}
            <div className="bg-[#B31B20] text-white p-6 md:p-8 flex items-center justify-between sticky top-0 z-10 shadow-xl">
              <div>
                <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase">
                  {selectedAlbum.title}
                </h2>
                <div className="flex items-center gap-4 mt-2">
                  <p className="text-red-100 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> {selectedAlbum.date}
                  </p>
                  <p className="text-red-100 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <Images className="w-4 h-4" /> {selectedAlbum.images.length + 1} तस्बिरहरू
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-white/20 hover:bg-white/40 dark:bg-white/10 dark:hover:bg-white/20 rounded-2xl w-12 h-12 transition-all hover:rotate-90 duration-300 shadow-md"
                onClick={() => setSelectedAlbum(null)}
              >
                <X className="w-8 h-8" />
              </Button>
            </div>

            {/* Photos Grid */}
            <div className="p-6 md:p-10 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {/* Featured Image First */}
                <motion.div
                  className="relative aspect-square md:aspect-4/3 rounded-3xl overflow-hidden lg:col-span-2 lg:row-span-2 group cursor-zoom-in shadow-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                >
                  <Image
                    src={selectedAlbum.imageUrl}
                    fill
                    alt="Cover"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent transition-opacity opacity-0 group-hover:opacity-100" />
                </motion.div>

                {/* Sub Images */}
                {selectedAlbum.images.map((img, i) => (
                  <motion.div
                    key={i}
                    className="relative aspect-square md:aspect-4/3 rounded-2xl overflow-hidden group cursor-zoom-in shadow-md border border-gray-100 dark:border-slate-800"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.05 } }}
                  >
                    <Image
                      src={img.url}
                      fill
                      alt={img.alt || `Photo ${i + 1}`}
                      className="object-cover group-hover:scale-125 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent transition-opacity opacity-0 group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
