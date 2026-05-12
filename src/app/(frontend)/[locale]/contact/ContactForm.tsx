'use client'

import React, { useState } from 'react'
import { Send } from 'lucide-react'
import { TypedLocale } from 'payload'

import { Button } from '@/components/ui/button'

type ContactFormProps = {
  formId?: string
  locale: TypedLocale
}

export function ContactForm({ formId, locale }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const isEnglish = locale === 'en'

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formId) {
      setErrorMessage(isEnglish ? 'Contact form is not available right now.' : 'सम्पर्क फारम अहिले उपलब्ध छैन।')
      return
    }

    const formData = new FormData(event.currentTarget)
    const submissionData = Array.from(formData.entries()).map(([field, value]) => ({
      field,
      value: String(value),
    }))

    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await fetch('/api/form-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          form: formId,
          submissionData,
        }),
      })

      const result = await response.json().catch(() => ({}))

      if (!response.ok) {
        setErrorMessage(result?.errors?.[0]?.message || (isEnglish ? 'Unable to submit the form.' : 'फारम बुझाउन सकिएन।'))
        return
      }

      setIsSubmitted(true)
      event.currentTarget.reset()
    } catch {
      setErrorMessage(isEnglish ? 'Something went wrong while submitting the form.' : 'फारम बुझाउँदा समस्या भयो।')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
            {isEnglish ? 'Full Name' : 'पूरा नाम'}
          </label>
          <input
            name="full-name"
            type="text"
            required
            placeholder={isEnglish ? 'Your Name' : 'तपाईंको नाम'}
            className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-4 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
            {isEnglish ? 'Phone Number' : 'फोन नम्बर'}
          </label>
          <input
            name="phone"
            type="tel"
            placeholder={isEnglish ? 'Your Phone Number' : 'तपाईंको सम्पर्क नम्बर'}
            className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-4 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
          {isEnglish ? 'Email Address' : 'इमेल ठेगाना'}
        </label>
        <input
          name="email"
          type="email"
          required
          placeholder={isEnglish ? 'Your Email' : 'तपाईंको इमेल'}
          className="w-full h-14 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl px-4 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">
          {isEnglish ? 'Message' : 'सन्देश'}
        </label>
        <textarea
          name="message"
          required
          placeholder={isEnglish ? 'Your Message' : 'तपाईंको सन्देश'}
          rows={6}
          className="w-full p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#B31B20]/20 focus:border-[#B31B20] transition-all resize-none"
        />
      </div>

      <div className="pt-4">
        <Button
          type="submit"
          disabled={isSubmitting || !formId}
          className="w-full md:w-auto bg-[#B31B20] hover:bg-red-700 text-white font-black h-16 px-10 rounded-2xl shadow-xl shadow-red-900/20 gap-3 text-lg transition-all hover:-translate-y-1 group disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isSubmitting ? (isEnglish ? 'Sending...' : 'पठाउँदै...') : isEnglish ? 'Send Message' : 'सन्देश पठाउनुहोस्'}
          <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
        {isSubmitted && (
          <p className="mt-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {isEnglish ? 'Your message has been sent successfully.' : 'तपाईंको सन्देश सफलतापूर्वक पठाइयो।'}
          </p>
        )}
        {errorMessage && <p className="mt-4 text-sm font-bold text-red-600 dark:text-red-400">{errorMessage}</p>}
        <p className="mt-4 text-xs font-bold text-slate-400 dark:text-slate-500 max-w-sm leading-relaxed">
          {isEnglish
            ? 'Your information will be kept completely confidential. Our team will contact you as soon as possible.'
            : 'तपाईंको जानकारी पूर्ण रूपमा गोप्य राखिनेछ। हाम्रो टोलीले जति सक्दो चाँडो तपाईंलाई सम्पर्क गर्नेछ।'}
        </p>
      </div>
    </form>
  )
}