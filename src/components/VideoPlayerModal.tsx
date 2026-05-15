'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface VideoPlayerModalProps {
  videoUrl: string | null
  title: string | null
  isOpen: boolean
  onClose: () => void
}

export function VideoPlayerModal({ videoUrl, title, isOpen, onClose }: VideoPlayerModalProps) {
  if (!isOpen || !videoUrl) return null

  // Extract video ID from URL (supports YouTube, Vimeo, and other formats)
  const getEmbedUrl = (url: string) => {
    // YouTube URL formats
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0]
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`
    }
    // Vimeo URL formats
    if (url.includes('vimeo.com')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0]?.split('&')[0]
      return `https://player.vimeo.com/video/${videoId}`
    }
    if (url.includes('player.vimeo.com')) {
      return url
    }
    // Direct video file or other formats
    return url
  }

  const embedUrl = getEmbedUrl(videoUrl)
  const isYouTube = embedUrl.includes('youtube.com/embed')
  const isVimeo = embedUrl.includes('player.vimeo.com')

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="aspect-video bg-black">
          {isYouTube || isVimeo ? (
            <iframe
              width="100%"
              height="100%"
              src={embedUrl}
              title={title || 'Video player'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <video width="100%" height="100%" controls autoPlay className="w-full h-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {title && (
          <div className="p-4 md:p-6 bg-slate-900">
            <h3 className="text-lg md:text-2xl font-bold text-white">{title}</h3>
          </div>
        )}
      </div>
    </div>
  )
}
