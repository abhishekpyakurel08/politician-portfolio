import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, CheckCircle, Globe, Trophy, Heart, Building2, TrendingUp } from 'lucide-react'
import { cn } from '@/utilities/ui'

const iconMap = {
  users: Users,
  check: CheckCircle,
  globe: Globe,
  trophy: Trophy,
  heart: Heart,
  building: Building2,
}

const defaultStats = [
  { label: 'लाखौं जनताको भरोसा', value: '१०', subValue: 'लाख+', icon: 'users' },
  { label: 'सफल परियोजनाहरू', value: '५००', subValue: '+', icon: 'check' },
  { label: 'सेवा गरेको वर्ष', value: '३०', subValue: '+', icon: 'trophy' },
  { label: 'निर्माण भएका संरचना', value: '१२०', subValue: '+', icon: 'building' },
]

export const StatsBlock = ({ 
  title = 'गर्विला उपलब्धिहरू (Impact & Achievements)', 
  stats = defaultStats 
}) => {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-900 overflow-hidden relative">
      {/* Background visual flair */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#B31B20] to-transparent opacity-30" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-blue-600 to-transparent opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#B31B20]/5 blur-[120px] rounded-full" />

      <div className="container relative z-10">
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-red-500 text-xs font-black uppercase tracking-widest mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              Our Progress
           </div>
           <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
             {title}
           </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => {
            const IconComp = iconMap[stat.icon as keyof typeof iconMap] || Users
            return (
              <Card key={i} className="bg-white/5 backdrop-blur-md border-white/10 overflow-hidden group hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                <CardContent className="p-8 md:p-10 flex flex-col items-center text-center relative">
                   {/* Background icon flair */}
                   <IconComp className="absolute -right-4 -bottom-4 w-24 h-24 text-white opacity-[0.03] group-hover:opacity-[0.08] transition-opacity" />
                   
                   <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-[#B31B20] to-red-600 flex items-center justify-center text-white mb-6 shadow-xl shadow-red-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <IconComp className="w-8 h-8" />
                   </div>

                   <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter tabular-nums drop-shadow-md">
                        {stat.value}
                      </span>
                      <span className="text-[#B31B20] text-xl md:text-2xl font-black">
                        {stat.subValue}
                      </span>
                   </div>

                   <p className="text-slate-400 font-bold uppercase tracking-widest text-xs md:text-sm">
                     {stat.label}
                   </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
