'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Network, Check, Globe } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { normalizeDomain } from '@/lib/discover-profiles'

const T = {
  fr: {
    kicker: 'Découvrir mon entreprise',
    title: 'Voyez votre entreprise de Collaborateurs IA',
    subtitle:
      'Indiquez le site de votre entreprise. Unitalk vous propose, en quelques secondes, une entreprise type et les Collaborateurs IA adaptés à votre activité.',
    placeholder: 'votre-entreprise.com',
    cta: 'Commencer l’analyse',
    recognized: 'Domaine reconnu',
    note: 'Aperçu de démonstration, à confirmer. Sans inscription.',
  },
  en: {
    kicker: 'Discover my organization',
    title: 'See your organization of AI Collaborators',
    subtitle:
      'Enter your company website. In seconds, Unitalk proposes a typical organization and the AI Collaborators tailored to your activity.',
    placeholder: 'your-company.com',
    cta: 'Start the analysis',
    recognized: 'Domain recognized',
    note: 'Demo preview, to confirm. No sign-up required.',
  },
}

export function DiscoverSection({ lang }: { lang: Lang }) {
  const t = T[lang]
  const [value, setValue] = useState('')
  const preview = normalizeDomain(value)

  const go = (e: React.FormEvent) => {
    e.preventDefault()
    const target = preview ? `/decouvrir?domain=${encodeURIComponent(preview)}` : '/decouvrir'
    window.location.href = target
  }

  return (
    <section id="decouvrir" className="px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
        className="premium-shadow mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#1C1A17] text-[#FBF9F3]"
      >
        <div className="flex flex-col items-center px-6 py-12 text-center sm:px-12 sm:py-16">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#FBF9F3]/15 bg-[#FBF9F3]/[0.06] px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4A9C9]">
            <Network className="h-3 w-3" />
            {t.kicker}
          </span>
          <h2 className="mt-5 max-w-2xl text-balance font-sf text-[clamp(1.7rem,3.4vw,2.6rem)] font-semibold leading-[1.08] tracking-[-0.03em]">
            {t.title}
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-6 text-[#FBF9F3]/70 sm:text-base">
            {t.subtitle}
          </p>

          <form onSubmit={go} className="mt-8 flex w-full max-w-md flex-col gap-3">
            <div className="flex items-center overflow-hidden rounded-full border border-[#FBF9F3]/20 bg-[#FBF9F3]/[0.08] focus-within:border-[#F4A9C9] focus-within:ring-2 focus-within:ring-[#D10E63]/30">
              <span className="pl-5 pr-1 text-sm text-[#FBF9F3]/45">https://</span>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t.placeholder}
                aria-label={t.placeholder}
                className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#FBF9F3] outline-none placeholder:text-[#FBF9F3]/40"
              />
            </div>

            {preview && (
              <div className="flex items-center gap-2.5 rounded-2xl border border-[#FBF9F3]/12 bg-[#FBF9F3]/[0.05] px-4 py-2.5 text-left">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FBF9F3]/10 text-[#FBF9F3]/70">
                  <Globe className="h-3.5 w-3.5" />
                </span>
                <span className="truncate text-sm font-semibold text-[#FBF9F3]">{preview}</span>
                <span className="ml-auto inline-flex items-center gap-1 text-[11px] font-medium text-[#7BE3B5]">
                  <Check className="h-3 w-3" />
                  {t.recognized}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4A9C9] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-5 text-[11px] leading-5 text-[#FBF9F3]/45">{t.note}</p>
        </div>
      </motion.div>
    </section>
  )
}
