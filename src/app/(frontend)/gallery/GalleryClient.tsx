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
  date?: string
  imageUrl: string
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
                  className="overflow-hidden cursor-pointer group hover:shadow-lg transition-shadow border-0 shadow-md ring-1 ring-gray-200"
                  onClick={() => setSelectedAlbum(album)}
                >
                  <CardContent className="p-0 relative">
                    <div className="relative w-full aspect-4/3 overflow-hidden bg-gray-100">
                      <Image
                        src={album.imageUrl}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2 shadow-sm">
                        <Images className="w-4 h-4 text-[#B31B20]" />
                        <span className="text-xs font-bold text-gray-800">
                          {album.images.length + 1} Photos
                        </span>
                      </div>

                      {/* Title & Info */}
                      <div className="absolute bottom-0 left-0 p-5 text-white w-full">
                        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-red-300 transition-colors">
                          {album.title}
                        </h3>
                        {album.date && (
                          <div className="flex items-center gap-1.5 text-gray-300 text-sm font-medium">
                            <Calendar className="w-4 h-4" />
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
            className="w-full bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#B31B20] text-white p-6 flex items-center justify-between sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">{selectedAlbum.title}</h2>
                <p className="text-red-100 text-sm mt-1 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {selectedAlbum.date}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-white hover:bg-white/20 rounded-full"
                onClick={() => setSelectedAlbum(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Photos Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {/* Featured Image First */}
                <motion.div 
                  className="relative aspect-square md:aspect-4/3 rounded-lg overflow-hidden lg:col-span-2 lg:row-span-2 group cursor-zoom-in"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                >
                  <Image src={selectedAlbum.imageUrl} fill alt="Cover" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                </motion.div>

                {/* Sub Images */}
                {selectedAlbum.images.map((img, i) => (
                  <motion.div 
                    key={i}
                    className="relative aspect-square md:aspect-4/3 rounded-lg overflow-hidden group cursor-zoom-in shadow-sm border border-gray-100"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.1 + (i * 0.05) } }}
                  >
                    <Image src={img.url} fill alt={img.alt || `Photo ${i+1}`} className="object-cover group-hover:scale-110 transition-transform duration-500" />
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
