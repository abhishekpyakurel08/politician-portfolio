import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer as FooterType } from '@/payload-types'
import { Facebook, Twitter, Youtube, Heart, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NewsletterForm } from './NewsletterForm.client'
import { Locale } from '@/locales'
import { useLocale } from '@/providers/LocaleProvider'

export async function Footer({ locale }: { locale: Locale }) {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-[#020617] dark:bg-slate-950 text-slate-400 relative overflow-hidden border-t border-white/5">
      {/* Background Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-[#B31B20]/50 to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#B31B20]/5 blur-[120px] rounded-full -mr-48 -mt-48" />

      <div className="container mx-auto max-w-[1240px] px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16">
          {/* Brand Column - High Impact */}
          <div className="space-y-8 col-span-1 md:col-span-2 lg:col-span-1 h-full flex flex-col justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-4 group w-fit">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-[18px] md:rounded-[22px] flex items-center justify-center font-black text-[#B31B20] text-3xl md:text-4xl shadow-[0_10px_30px_rgba(255,255,255,0.1)] group-hover:rotate-6 transition-all duration-500 mukta-extrabold">
                ज
              </div>
              <div className="flex flex-col">
                <span className="text-white text-2xl md:text-4xl font-black tracking-tighter leading-none mukta-extrabold text-gradient">
                  {locale === 'en' ? 'Jalsa Kshetri' : 'जलसा क्षेत्री'}
                </span>
                <span className="text-[10px] md:text-xs text-[#B31B20] font-black uppercase tracking-[0.4em] mt-1.5 mukta-bold">
                  {locale === 'en' ? 'Personal Portal' : 'व्यक्तिगत पोर्टल'}
                </span>
              </div>
            </Link>
            <p className="text-base leading-relaxed text-slate-400 font-medium">
              {locale === 'en'
                ? 'Welcome to the official portal of Jalsa Kshetri, a dedicated public servant committed to serving the people of Kalikot, Nepal. Explore our initiatives, news, and resources to stay connected and informed.'
                : 'कालीकोटको विकास, सुशासन र युवा नेतृत्वका लागि समर्पित आवाज। हाम्रो लक्ष्य—समृद्ध समाज र सुदृढ भविष्य।'}
            </p>
            <div className="flex gap-3">
              <Button
                asChild
                size="icon"
                className="bg-white/5 dark:bg-white/5 text-slate-400 hover:bg-[#1877F2] hover:text-white rounded-xl transition-all duration-300 w-11 h-11"
              >
                <Link
                  href="https://facebook.com/jasmin.xeetri"
                  target="_blank"
                  className="flex items-center justify-center text-slate-400"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="icon"
                className="bg-white/5 dark:bg-white/5 text-slate-400 hover:bg-[#E4405F] hover:text-white rounded-xl transition-all duration-300 w-11 h-11"
              >
                <Link
                  href="#"
                  target="_blank"
                  className="flex items-center justify-center text-slate-400"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                size="icon"
                className="bg-white/5 dark:bg-white/5 text-slate-400 hover:bg-red-600 hover:text-white rounded-xl transition-all duration-300 w-11 h-11"
              >
                <Link
                  href="#"
                  target="_blank"
                  className="flex items-center justify-center text-slate-400"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-8 h-full">
            <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 mukta-bold">
              <span className="w-6 h-1 bg-gradient-brand rounded-full"></span>
              {locale === 'en' ? 'Quick Links' : 'छिटो लिंकहरू'}
            </h4>
            <ul className="space-y-4 text-[15px] font-semibold text-slate-400">
              <li>
                <Link
                  href={`/${locale}/about`}
                  className="text-slate-400 hover:text-[#B31B20] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#B31B20] transition-colors"></span>{' '}
                  {locale === 'en' ? 'About' : 'परिचय'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/news`}
                  className="text-slate-400 hover:text-[#B31B20] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#B31B20] transition-colors"></span>{' '}
                  {locale === 'en' ? 'News & Views' : 'समाचार र विचार'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/activities`}
                  className="text-slate-400 hover:text-[#B31B20] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#B31B20] transition-colors"></span>{' '}
                  {locale === 'en' ? 'Activities' : 'अभियान र गतिविधि'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/gallery`}
                  className="text-slate-400 hover:text-[#B31B20] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#B31B20] transition-colors"></span>{' '}
                  {locale === 'en' ? 'Gallery' : 'फोटो ग्यालरी'}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/contact`}
                  className="text-slate-400 hover:text-[#B31B20] transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-[#B31B20] transition-colors"></span>{' '}
                  {locale === 'en' ? 'Contact' : 'सम्पर्क'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="space-y-8 h-full">
            <h4 className="text-slate-400 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-3 mukta-bold">
              <span className="w-6 h-1 bg-gradient-brand rounded-full"></span>
              {locale === 'en' ? 'Contact Information' : 'सम्पर्क जानकारी'}
            </h4>
            <ul className="space-y-5 text-[15px] font-semibold">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-[#B31B20]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">
                    {locale === 'en' ? 'Address' : 'ठेगाना'}
                  </span>
                  <span className="text-slate-400">
                    {locale === 'en' ? 'Palanta, Kalikot, Nepal' : 'पलाँता, कालिकोट, नेपाल'}
                  </span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-[#B31B20]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">
                    {locale === 'en' ? 'UML' : 'इमेल'}
                  </span>
                  <span className="text-slate-400">jalasabudha225@gmail.com</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#B31B20]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">
                    {locale === 'en' ? 'Phone' : 'फोन'}
                  </span>
                  <span className="font-bold text-slate-400 mukta-bold">
                    {locale === 'en' ? '+977 9847949547' : '+९७७ ९८४७९४९५४७'}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Connect Column / CTA */}
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-linear-to-br from-white/5 to-transparent border border-white/10 shadow-inner flex flex-col gap-3">
              <h4 className="text-slate-400 font-black">
                {locale === 'en' ? 'Join our campaign' : 'हाम्रो अभियानमा जोडिनुहोस्'}
              </h4>
              <p className="text-sm text-slate-400 font-medium leading-relaxed mb-1">
                {locale === 'en'
                  ? 'Sign up for our newsletter for the latest updates and important information.'
                  : 'ताजा अपडेट र महत्वपूर्ण जानकारीका लागि हाम्रो न्यूजलेटरमा दर्ता गर्नुहोस्।'}
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <Separator className="bg-white/5 mb-10" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs font-bold uppercase tracking-widest text-slate-400">
            <p>
              © {currentYear}{' '}
              {locale === 'en'
                ? 'Jalsa Chhetri Secretariat. All rights reserved.'
                : 'जलसा क्षेत्रीको सचिवालय । सर्वाधिकार सुरक्षित ।'}
            </p>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-800"></div>
            <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-6 py-2.5 rounded-2xl bg-white/5 text-[10px] font-black uppercase tracking-widest text-[#B31B20] border border-white/5 leading-none">
            {locale === 'en' ? (
              <>
                <span className="inline-flex items-center gap-1">
                  Crafted with <Heart className="w-3.5 h-3.5 fill-[#B31B20]" />
                </span>
                <span className="text-slate-400">for Kalikot, Nepal</span>
              </>
            ) : (
              <>
                <span className="inline-flex items-center gap-1">
                  कलिकोट, नेपालको लागि <Heart className="w-3.5 h-3.5 fill-[#B31B20]" />
                </span>
                <span>सँग बनाइएको</span>
              </>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
