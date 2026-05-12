import React from 'react'
import type { Metadata } from 'next'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { SectionHeading } from '@/components/SectionHeading'
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react'
import { TypedLocale } from 'payload'
import type { Form as FormBuilderForm } from '@payloadcms/plugin-form-builder/types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { FormBlock } from '@/blocks/Form/Component'
import { contactForm as contactFormSeed } from '@/endpoints/seed/contact-form'

export const metadata: Metadata = {
  title: 'सम्पर्क | Jalsa Chhetri',
  description: 'Jalsa Chhetri को सचिवालयसँग सम्पर्क गर्नुहोस्।',
}

type Args = {
  params: Promise<{
    locale: TypedLocale
  }>
}
export default async function ContactPage({ params: paramsPromise }: Args) {
  const { locale = 'ne' } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const contactFormResult = await payload.find({
    collection: 'forms',
    where: {
      title: {
        equals: 'Contact Form',
      },
    },
    limit: 1,
  })

  let contactForm = contactFormResult.docs[0]

  if (!contactForm) {
    contactForm = await payload.create({
      collection: 'forms',
      data: contactFormSeed,
    })
  }

  const contactFormForBuilder = contactForm
    ? ({
        ...contactForm,
        confirmationType: contactForm.confirmationType ?? 'message',
      } as unknown as FormBuilderForm)
    : null

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-950 pt-32 md:pt-48 pb-16 md:pb-24 overflow-hidden h-[50vh] md:h-[60vh] flex items-end">
        {/* BG image/pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#B31B20] opacity-[0.05] blur-[120px] rounded-full" />
          <div className="absolute top-0 right-0 w-150 h-150 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/60 to-transparent" />
        </div>

        <div className="container relative z-10 pb-12 md:pb-20 text-center max-w-3xl mx-auto">
          <Badge className="bg-[#B31B20] text-white border-none px-4 py-1.5 font-black text-xs uppercase tracking-widest rounded-full mb-6 shadow-xl">
            {locale === 'en' ? 'Contact and Information' : 'सम्पर्क र जानकारी'}
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-6 uppercase">
            {locale === 'en' ? 'Get in Touch' : 'सम्पर्कमा रहनुहोस्'}
          </h1>
          <p className="text-slate-300 text-lg md:text-xl font-bold leading-relaxed mb-4">
            {locale === 'en'
              ? 'Your suggestions, advice and complaints are invaluable to us. We are always ready to serve you.'
              : 'तपाईंका सुझाव, सल्लाह र गुनासाहरू हाम्रो लागि अमूल्य छन्। हामी सधैं यहाँहरूको सेवामा तत्पर छौं।'}
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container -mt-10 md:-mt-15 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Information Cards (Left) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
              <CardContent className="p-8 md:p-10 flex flex-col h-full gap-8">
                <div>
                  <SectionHeading
                    title={locale === 'en' ? 'Contact Address' : 'सम्पर्क ठेगाना'}
                    className="border-b border-slate-100 dark:border-slate-800 mb-6 pb-4"
                  />

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <MapPin className="w-6 h-6 text-[#B31B20]" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 dark:text-white text-lg mb-1">
                          {locale === 'en' ? 'Federal Secretariat' : 'संघीय सचिवालय'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                          {locale === 'en'
                            ? 'Federal Secretariat, Singha Durbar'
                            : 'संघीय सचिवालय, सिंहदरबार'}
                          <br />
                          {locale === 'en' ? 'Kathmandu, Nepal' : 'काठमाडौं, नेपाल'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 dark:text-white text-lg mb-1">
                          {locale === 'en' ? 'Telephone/Whatsapp' : 'टेलिफोन/ह्याट्सएप'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                          {locale === 'en' ? '+977 9847949547' : '+९७७ ९८४७९४९५४७'}
                          <br />
                          {locale === 'en' ? '+977 985158049547' : '+९७७ ९८५१५८०४९५४७'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 transition-colors duration-300">
                        <Mail className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-black text-slate-900 dark:text-white text-lg mb-1">
                          {locale === 'en' ? 'Email' : 'इमेल'}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-xs">
                          jalasabudha225@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1 uppercase tracking-widest">
                        {locale === 'en' ? 'Opening Hours' : 'खुल्ने समय'}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        {locale === 'en'
                          ? 'Sunday - Friday: 10:00 AM - 5:00 PM'
                          : 'आइतबार - शुक्रबार: बिहान १०:०० - बेलुकी ५:००'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <a
              href="https://wa.me/9779743223799"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 rounded-3xl bg-green-600 overflow-hidden relative">
                <div className="absolute inset-0 bg-green-700 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                <CardContent className="p-8 flex items-center gap-6 relative z-10">
                  <div className="w-16 h-16 bg-white flex items-center justify-center rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-500">
                    <MessageSquare className="w-8 h-8 text-green-600 fill-green-600" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-2xl mb-1">
                      {locale === 'en' ? 'Whatsapp Us' : 'हामीलाई व्हाट्सएप गर्नुहोस्'}
                    </h3>
                    <p className="text-green-50 text-sm font-bold">
                      {locale === 'en'
                        ? 'For quick response and problem solving'
                        : 'तुरुन्तै जवाफ र समस्या समाधानका लागि'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </a>
          </div>

          {/* Contact Form (Right) */}
          <div className="lg:col-span-7">
            <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white dark:bg-slate-900 h-full relative transition-colors duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B31B20]/5 dark:bg-[#B31B20]/10 rounded-bl-[100px]" />
              <CardContent className="p-8 md:p-12 relative z-10">
                <SectionHeading
                  title={locale === 'en' ? 'Send a Message' : 'सन्देश पठाउनुहोस्'}
                  className="border-none mb-8"
                />
                {contactFormForBuilder ? (
                  <FormBlock enableIntro={false} form={contactFormForBuilder} />
                ) : (
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {locale === 'en'
                      ? 'Contact form is not available right now.'
                      : 'सम्पर्क फारम अहिले उपलब्ध छैन।'}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="mt-16 bg-slate-100 dark:bg-slate-950 h-100 w-full border-t border-slate-200 dark:border-slate-800 relative z-20">
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
