'use client'
import React from 'react'
import { Button } from '@/components/ui/button'

export const NewsletterForm: React.FC = () => {
  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <input 
        type="email" 
        placeholder="तपाईंको इमेल..." 
        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#B31B20]/50 transition-all font-bold" 
      />
      <Button className="w-full bg-[#B31B20] hover:bg-red-700 text-white font-black h-12 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-red-900/20 active:scale-[0.98] transition-all">
        जोडिनुहोस्
      </Button>
    </form>
  )
}
