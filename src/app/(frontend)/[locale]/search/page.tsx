import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { Suspense } from 'react'
import { Search as SearchComponent } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { Search as SearchIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  // Next.js Payload Pagination workaround for total count when pagination is false
  const totalCount = posts.totalDocs ?? (posts.docs ? posts.docs.length : 0)

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <PageClient />
      
      {/* Search Hero Section */}
      <section className="relative w-full bg-slate-950 pt-48 pb-20 md:pt-64 md:pb-24 overflow-hidden border-b border-white/5">
        {/* Decorative background elements */}
        <div className="absolute inset-x-1/2 -translate-x-1/2 top-0 w-250 h-100 opacity-10 bg-red-600 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center justify-center p-6 bg-white rounded-[32px] mb-2 shadow-2xl group hover:scale-105 transition-transform duration-500">
              <SearchIcon className="w-12 h-12 text-[#B31B20]" />
            </div>
            
            <div className="space-y-6">
              <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-[0.3em] rounded-full mx-auto">
                खोज परिणाम
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter leading-none uppercase">
                Search Results
              </h1>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-bold leading-relaxed">
                Find exactly what you're looking for across our news, activities, and updates.
              </p>
            </div>
            
            <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-4 md:p-5 rounded-[32px] border border-white/10 transition-all hover:border-[#B31B20]/50 group shadow-2xl">
              <Suspense fallback={<div className="h-16 w-full animate-pulse bg-white/5 rounded-2xl" />}>
                <SearchComponent />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <div className="container px-4 mt-12 md:mt-16 sm:mt-24">
        <div className="mb-10 md:mb-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-3xl md:text-4xl font-black flex items-center justify-center sm:justify-start gap-4 text-slate-900 dark:text-white">
              <span className="w-2 h-10 bg-[#B31B20] rounded-full hidden sm:inline-block shadow-[0_0_15px_rgba(179,27,32,0.3)]"></span>
              {query ? (
                <span className="flex items-center flex-wrap gap-2">
                  Results for <span className="text-[#B31B20]">"{query}"</span>
                </span>
              ) : (
                'All Content'
              )}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Explore the latest updates and information</p>
          </div>
          <div className="bg-white dark:bg-slate-800 text-[#B31B20] text-base py-2 px-6 rounded-2xl font-bold border border-red-50 dark:border-slate-700 shadow-[0_4px_10px_rgba(0,0,0,0.03)] dark:shadow-none self-center sm:self-auto">
            {totalCount} {totalCount === 1 ? 'match' : 'matches'}
          </div>
        </div>

        {totalCount > 0 ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
            <CollectionArchive posts={posts.docs as CardPostData[]} />
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-16 md:p-24 text-center border border-slate-100 dark:border-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.02)] mt-8 animate-in fade-in duration-500">
            <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100 dark:border-slate-700">
              <SearchIcon className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4">No results found</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-xl leading-relaxed mb-10">
              We couldn't find anything matching your search for <strong className="text-slate-700 dark:text-slate-300">"{query}"</strong>.
            </p>
            <Button asChild variant="outline" size="lg" className="rounded-2xl px-10 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold h-14">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Search Results | Jalsa Xettri`,
  }
}
