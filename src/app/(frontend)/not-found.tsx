import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Home, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-slate-50 py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#B31B20] opacity-[0.03] rounded-full blur-[100px]" />
      <div className="container relative z-10 flex flex-col items-center text-center max-w-2xl px-4">
        <div className="w-24 h-24 bg-white rounded-full shadow-2xl flex items-center justify-center mb-8 border-4 border-slate-50">
          <AlertCircle className="w-12 h-12 text-[#B31B20]" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter mb-4 drop-shadow-sm">404</h1>
        
        <div className="space-y-4 mb-10 text-slate-600">
          <h2 className="text-2xl md:text-3xl font-black text-slate-800">पृष्ठ भेटिएन</h2>
          <p className="font-medium text-lg leading-relaxed">
            तपाईंले खोज्नुभएको पृष्ठ उपलब्ध छैन वा यसको ठेगाना परिवर्तन भएको हुनसक्छ।
            कृपया गृहपृष्ठमा फर्कनुहोस् वा मेनु प्रयोग गरी अगाडि बढ्नुहोस्।
          </p>
        </div>
        
        <Button asChild className="bg-[#B31B20] hover:bg-red-700 text-white font-black h-14 px-8 rounded-full shadow-xl shadow-red-900/20 gap-3 transition-all hover:-translate-y-1 text-base">
          <Link href="/">
            <Home className="w-5 h-5" /> गृहपृष्ठमा फर्कनुहोस्
          </Link>
        </Button>
      </div>
    </div>
  )
}
