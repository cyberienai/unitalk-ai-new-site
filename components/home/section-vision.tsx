'use client'

import { useLanguage } from '@/lib/language-context'
import { useAlma } from '@/components/home/alma-panel-context'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

const COPY = {
  fr: {
    kicker: 'Mission après mission',
    title: 'Votre intelligence vous appartient.',
    lead: 'Les méthodes que vous validez deviennent un actif que votre entreprise conserve, fait évoluer et partage selon ses droits.',
    closing: 'Prêt à confier une première mission ?',
    cta: 'Confier une mission',
    ctaNote: 'Alma comprend votre besoin et prépare la mission.',
    proof: ['7 jours d’essai gratuit', 'Sans carte bancaire', 'Hébergé en France'],
  },
  en: {
    kicker: 'Mission after mission',
    title: 'Your intelligence belongs to you.',
    lead: 'The methods you validate become an asset your company keeps, evolves and shares according to its rights.',
    closing: 'Ready to hand over a first mission?',
    cta: 'Hand over a mission',
    ctaNote: 'Alma understands your need and prepares the mission.',
    proof: ['7-day free trial', 'No credit card', 'Hosted in France'],
  },
}

export function SectionVision() {
  const { lang } = useLanguage()
  const { openAlma } = useAlma()
  const t = COPY[lang]

  return (
    <section className="relative overflow-hidden border-t border-[#2A2723] bg-[#181615] px-6 py-16 sm:py-24">
      {/* single quiet magenta thread anchoring the dark scene — the Unitalk
          signature, kept as a graphic accent only (not a reading color) */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-24 w-px -translate-x-1/2 bg-gradient-to-b from-[#C22E60] to-transparent"
      />

      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#D9A6B7]">{t.kicker}</p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className="mt-6 text-balance font-sf text-4xl font-semibold leading-[1.08] tracking-[-0.02em] text-[#F4F0EA] sm:text-5xl md:text-6xl"
          >
            {t.title}
          </motion.h2>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[15px] leading-relaxed text-[#B9B2AA] sm:text-base">
            {t.lead}
          </p>
        </div>

        {/* Closing affirmation + the page's final conversion moment */}
        <div className="mt-16 text-center">
          <h3 className="mx-auto max-w-2xl text-balance text-2xl font-semibold leading-[1.15] tracking-[-0.02em] text-[#F4F0EA] sm:text-3xl">
            {t.closing}
          </h3>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={() => openAlma()}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#D10E63] px-8 py-4 text-base font-bold text-[#FBF9F3] transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#181615]"
            >
              {t.cta}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </button>
            <p className="text-[13px] text-[#B9B2AA]">{t.ctaNote}</p>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {t.proof.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[#8E877D]"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#22A06B]" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
