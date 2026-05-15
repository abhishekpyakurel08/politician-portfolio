import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { SectionHeading } from '@/components/SectionHeading'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  })

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <PageClient />

      {/* Hero Section */}
      <section className="relative w-full bg-slate-950 pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden h-[40vh] md:h-[50vh] flex items-end">
        {/* BG gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#B31B20] opacity-[0.05] blur-[100px] rounded-full" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-slate-950 to-transparent" />
        </div>

        <div className="container relative z-10 pb-12 md:pb-20">
          <Badge className="bg-[#B31B20] text-white border-none mb-4 px-4 py-1.5 text-xs uppercase tracking-widest font-black rounded-full">
            लेख र विचार
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tighter mb-4 uppercase">
            सबै लेखहरू
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-bold max-w-2xl">
            Jalsa Buda Chhetri का आधिकारिक विचार, लेख र महत्त्वपूर्ण टिपोटहरू।
          </p>
        </div>
      </section>

      <div className="container py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <SectionHeading title="लेख सङ्गालो" className="mb-0 border-none" />
          <PageRange
            collection="posts"
            currentPage={posts.page}
            limit={12}
            totalDocs={posts.totalDocs}
          />
        </div>

        <CollectionArchive posts={posts.docs} />

        <div className="mt-16 flex justify-center">
          {posts.totalPages > 1 && posts.page && (
            <Pagination page={posts.page} totalPages={posts.totalPages} />
          )}
        </div>
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
