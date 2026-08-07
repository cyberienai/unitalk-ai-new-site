'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { HeroTheatre } from '@/components/home/hero-theatre'
import { useAlma } from '@/components/home/alma-panel-context'

/**
 * HERO — one H1 with a rotating magenta action, a single strong CTA that opens
 * the Alma panel, and the product theatre alongside it. The rotating line is
 * aria-hidden; the full sentence is announced once via sr-only, and freezes on
 * the first action under prefers-reduced-motion.
 */

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    lead: 'Votre Collaborateur IA est prêt à',
    actions: [
      'relancer vos factures impayées',
      'répondre à vos clients',
      'préparer vos comités de direction',
      'suivre vos réclamations',
      'trouver vos prospects',
    ],
    sub: 'Décrivez une mission à Alma. Elle comprend votre entreprise et confie le travail au bon Collaborateur IA — qui grandit à chaque mission.',
    cta: 'Parler à Alma',
    secondary: 'Découvrir les Collaborateurs IA',
    proofs: ['Essai 7 jours', 'Sans carte bancaire', 'Hébergé en France'],
    openSource: 'Open source au cœur',
  },
  en: {
    eyebrow: 'Someone is missing',
    lead: 'Your AI Collaborator is ready to',
    actions: [
      'chase your unpaid invoices',
      'answer your customers',
      'prepare your executive committees',
      'track your complaints',
      'find your prospects',
    ],
    sub: 'Describe a mission to Alma. She understands your company and hands the work to the right AI Collaborator — one that grows with every mission.',
    cta: 'Talk to Alma',
    secondary: 'Discover AI Collaborators',
    proofs: ['7-day trial', 'No credit card', 'Hosted in France'],
    openSource: 'Open source at the core',
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const

export function HeroHome({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const { openAlma } = useAlma()
  const [i, setI] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % t.actions.length), 3200)
    return () => clearInterval(id)
  }, [reduce, t.actions.length])

  const current = reduce ? t.actions[0] : t.actions[i]

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="editorial-shell relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        {/* Copy */}
        <div className="max-w-2xl">
          <div className="mb-5 flex justify-center sm:justify-start">
            <Kicker>{t.eyebrow}</Kicker>
          </div>

          <h1 className="font-sf text-[clamp(2.35rem,5.4vw,4.25rem)] font-semibold leading-[1.03] tracking-[-0.045em] text-[#1C1A17]">
            <span className="sr-only">
              {t.lead} {current}.
            </span>
            <span aria-hidden className="block text-center sm:text-left">
              <span className="block text-balance">{t.lead}</span>
              <span className="relative mt-1 block min-h-[2.2em]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={current}
                    initial={reduce ? false : { opacity: 0, y: '0.35em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: '-0.35em' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease }}
                    className="absolute inset-x-0 top-0 block text-balance text-[#D10E63]"
                  >
                    {current}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-balance text-center text-[17px] leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-[19px]">
            {t.sub}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:items-start">
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={openAlma}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/collaborateurs-ia"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 text-[15px] font-semibold text-[#4E483F] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:text-[#1C1A17] hover:decoration-[#D10E63]"
              >
                {t.secondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:justify-start">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <Check className="h-3.5 w-3.5 text-[#D10E63]" strokeWidth={2.5} />
                  {proof}
                </span>
              ))}
              <span className="flex items-center gap-1.5 whitespace-nowrap text-[#857C6E]">
                <span className="h-1 w-1 rounded-full bg-[#D10E63]" />
                {t.openSource}
              </span>
            </div>
          </div>
        </div>

        {/* Theatre */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: reduce ? 0 : 0.2 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroTheatre lang={lang} />
        </motion.div>
      </div>
    </section>
  )
}
