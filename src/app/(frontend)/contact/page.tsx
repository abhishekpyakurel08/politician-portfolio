import React from 'react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/SectionHeading'
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'सम्पर्क | Jalsa Xettri',
  description: 'Jalsa Xettri को सचिवालयसँग सम्पर्क गर्नुहोस्।',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#B31B20] opacity-[0.03] blur-[120px] rounded-full" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-widest rounded-full mb-6 shadow-xl">
            सम्पर्क र जानकारी
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-6">
            सम्पर्कमा रहनुहोस्
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-bold leading-relaxed mb-4">
            तपाईंका सुझाव, सल्लाह र गुनासाहरू हाम्रो लागि अमूल्य छन्। हामी सधैं यहाँहरूको सेवामा तत्पर छौं।
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mt-[-40px] md:mt-[-60px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Information Cards (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-8 md:p-10 flex flex-col h-full gap-8">
                <div>
                  <SectionHeading title="सम्पर्क ठेगाना" className="border-b border-slate-100 mb-6 pb-4" />
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-[#B31B20]" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg mb-1">प्रधान कार्यालय</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                          संघीय सचिवालय, सिंहदरबार<br />
                          काठमाडौं, नेपाल
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                        <Phone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg mb-1">टेलिफोन/ह्याट्सएप</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                          +९७७ ९७४३२२३७९९<br />
                          +९७७ १-४२००XXX
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 text-lg mb-1">इमेल</h3>
                        <p className="text-slate-500 font-medium leading-relaxed max-w-xs">
                          info@politician.gov.np<br />
                          contact@leader.com.np
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1 uppercase tracking-widest">खुल्ने समय</h3>
                      <p className="text-slate-500 font-medium text-sm">
                        आइतबार - शुक्रबार: बिहान १०:०० - बेलुकी ५:००
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <a href="https://wa.me/9779743223799" target="_blank" rel="noopener noreferrer" className="group">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-green-500 overflow-hidden relative">
                <div className="absolute inset-0 bg-green-600 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                <CardContent className="p-8 flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare className="w-8 h-8 text-green-600 fill-green-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-2xl mb-1">हामीलाई व्हाट्सएप गर्नुहोस्</h3>
                    <p className="text-green-50 text-sm font-bold">तुरुन्तै जवाफ र समस्या समाधानका लागि</p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden bg-white h-full relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B31B20]/5 rounded-bl-[100px]" />
              <CardContent className="p-8 md:p-12">
                <SectionHeading title="सन्देश पठाउनुहोस्" className="border-none mb-8" />
                
                <form className="space-y-6 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest">पूरा नाम</label>
                      <input 
                        type="text" 
                        placeholder="तपाईंको नाम"
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-slate-900 uppercase tracking-widest">फोन नम्बर</label>
                      <input 
                        type="tel" 
                        placeholder="तपाईंको सम्पर्क नम्बर"
                        className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">इमेल ठेगाना</label>
                    <input 
                      type="email" 
                      placeholder="तपाईंको इमेल (वैकल्पिक)"
                      className="w-full h-14 bg-slate-50 border border-slate-200 rounded-xl px-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-black text-slate-900 uppercase tracking-widest">सन्देश</label>
                    <textarea 
                      placeholder="तपाईंको जिज्ञासा, सुझाव वा समस्या यहाँ लेख्नुहोस्..."
                      rows={6}
                      className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <Button type="button" className="w-full md:w-auto bg-[#B31B20] hover:bg-red-700 text-white font-black h-16 px-10 rounded-2xl shadow-xl shadow-red-900/20 gap-3 text-lg transition-all hover:-translate-y-1 group">
                      सन्देश पठाउनुहोस् <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                    <p className="mt-4 text-xs font-bold text-slate-400 max-w-sm leading-relaxed">
                      तपाईंको जानकारी पूर्ण रूपमा गोप्य राखिनेछ। हाम्रो टोलीले जति सक्दो चाँडो तपाईंलाई सम्पर्क गर्नेछ।
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-16 bg-slate-100 h-[400px] w-full">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14130.857353934944!2d85.31952465!3d27.6952226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19b0ce577cd9%3A0x6bbaec43b6ef94eb!2sSingha%20Durbar%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(0.2) contrast(1.1)' }} 
          allowFullScreen={false} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </section>
    </main>
  )
}
