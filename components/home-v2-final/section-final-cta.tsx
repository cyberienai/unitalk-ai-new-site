'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Globe } from 'lucide-react'
import { normalizeDomain } from '@/lib/discover-profiles'

const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un.',
    title: 'Votre Collaborateur IA est prêt à vous rejoindre.',
    almaNote: 'Alma analyse votre site Web et prépare sa première mission.',
    domainAria: 'Votre site web',
    domainPlaceholder: 'votreentreprise.com',
    cta: 'Découvrir mon Collaborateur IA',
    proofs: ['Essai gratuit 7 jours', 'Hébergé en France', 'Conforme au RGPD'],
  },
  en: {
    eyebrow: 'Someone is missing.',
    title: 'Your AI Collaborator is ready to join you.',
    almaNote: 'Alma analyzes your website and prepares its first mission.',
    domainAria: 'Your website',
    domainPlaceholder: 'yourcompany.com',
    cta: 'Discover my AI Collaborator',
    proofs: ['7-day free trial', 'Hosted in France', 'GDPR compliant'],
  },
} as const

export function SectionFinalCta({ lang = 'fr' }: { lang?: 'fr' | 'en' }) {
  const t = T[lang]
  const reduceMotion = useReducedMotion()
  const [domain, setDomain] = useState('')

  const submitDomain = (e: React.FormEvent) => {
    e.preventDefault()
    const preview = normalizeDomain(domain)
    window.location.href = preview ? `/decouvrir?domain=${encodeURIComponent(preview)}` : '/decouvrir'
  }

  return (
    <section className="relative overflow-hidden bg-[#1C1A17] py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 top-0 h-[32rem] w-[32rem] rounded-full bg-[#D10E63]/20 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(#FBF9F3_1px,transparent_1px),linear-gradient(90deg,#FBF9F3_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8, ease }}
        className="editorial-shell relative text-center"
      >
        <p className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6A9CE]">
          {t.eyebrow}
        </p>
        <h2 className="mx-auto max-w-3xl text-balance font-sf text-[clamp(1.9rem,4.5vw,3.4rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-[#FBF9F3]">
          {t.title}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-sm leading-relaxed text-[#C9BFAF]">
          {t.almaNote}
        </p>

        <form onSubmit={submitDomain} className="mx-auto mt-8 flex w-full max-w-md flex-col gap-3">
          <div className="flex items-center overflow-hidden rounded-full border border-[#3A362F] bg-[#26231F] focus-within:border-[#D10E63] focus-within:ring-2 focus-within:ring-[#D10E63]/30">
            <span className="pl-4 pr-1 text-[#8A8175]" aria-hidden="true">
              <Globe className="h-4 w-4" />
            </span>
            <input
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t.domainPlaceholder}
              aria-label={t.domainAria}
              className="min-w-0 flex-1 bg-transparent py-3.5 pr-4 text-sm text-[#FBF9F3] outline-none placeholder:text-[#8A8175]"
            />
          </div>
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1C1A17]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#A8A093]">
          {t.proofs.map((proof) => (
            <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
              <Check className="h-3.5 w-3.5 text-[#F6A9CE]" strokeWidth={2.5} />
              {proof}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
