import { cn } from '@/utilities/ui'
import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface SectionHeadingProps {
  title: string
  className?: string
  textColor?: string
  viewAllHref?: string
}

export function SectionHeading({
  title,
  className,
  textColor = 'text-slate-900 dark:text-white',
  viewAllHref,
}: SectionHeadingProps) {
  return (
    <div className={cn('flex items-center justify-between w-full py-6 mb-10 border-b border-slate-200/40 relative group/section', className)}>
      <div className="flex items-center gap-5">
        <div className="w-1.5 md:w-2.5 h-10 md:h-14 bg-gradient-brand rounded-full shadow-[0_4px_20px_rgba(179,27,32,0.4)] relative overflow-hidden shrink-0">
           <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </div>
        <h2 className={cn('text-2xl md:text-6xl font-black tracking-tighter leading-none mukta-bold', textColor)}>
          {title}
        </h2>
      </div>
      
      {viewAllHref && (
        <Link 
          href={viewAllHref} 
          className="flex items-center gap-3 group/btn font-black text-[10px] md:text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-[#B31B20] transition-all duration-500 bg-slate-100/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 px-5 py-3 rounded-full border border-transparent hover:border-[#B31B20]/20 hover:shadow-xl mukta-bold"
        >
          <span>सबै हेर्नुहोस्</span>
          <div className="flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-lg bg-[#B31B20] text-white shadow-lg group-hover/btn:rotate-90 transition-all duration-500">
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      )}
    </div>
  )
}
