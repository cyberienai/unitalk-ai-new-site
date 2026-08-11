'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { HeroTheatre } from '@/components/home/hero-theatre'

/**
 * HERO — left column. A stable positioning headline + one static promise, then
 * a rotating "ticker" that runs through the concrete missions a Collaborator can
 * already take on. The ticker is decorative (announced once via sr-only, the
 * rotating layer is aria-hidden with a reserved, stable height so it never
 * overlaps the CTA). The right column (HeroTheatre) tells the single Iris story
 * on its own timer. Both freeze under prefers-reduced-motion.
 */

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un ?',
    headline: 'Votre entreprise peut compter sur son propre Collaborateur IA.',
    promise: 'Il répond à vos clients, travaille avec vos équipes et progresse à chaque mission.',
    missions: [
      'répondre à vos appels',
      'participer à vos réunions',
      'traiter vos emails',
      'qualifier vos prospects',
      'prendre vos rendez-vous',
      'mettre à jour votre CRM',
      'préparer vos dossiers',
      'produire vos images et vidéos',
      'analyser vos données',
      'déclencher vos automatisations',
      'développer vos applications',
    ],
    srSentence: 'Exemples de missions : répondre à vos appels, traiter vos emails, qualifier vos prospects et analyser vos données.',
    cta: 'Confier une première mission',
    proofs: ['7 jours d’essai gratuit', 'Sans carte bancaire', 'Hébergé en France'],
  },
  en: {
    eyebrow: 'Missing someone?',
    headline: 'Your company can count on its own AI Collaborator.',
    promise: 'It answers your customers, works with your teams and improves with every mission.',
    missions: [
      'answer your calls',
      'join your meetings',
      'handle your emails',
      'qualify your prospects',
      'book your meetings',
      'update your CRM',
      'prepare your files',
      'produce your images and videos',
      'analyze your data',
      'trigger your automations',
      'build your applications',
    ],
    srSentence: 'Example missions: answer your calls, handle your emails, qualify your prospects and analyze your data.',
    cta: 'Hand over a first mission',
    proofs: ['7-day free trial', 'No credit card', 'Hosted in France'],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const
const TICK_MS = 2200

export function HeroHome({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()

  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setIndex((v) => (v + 1) % t.missions.length), TICK_MS)
    return () => clearTimeout(id)
  }, [index, reduce, t.missions.length])

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-10 pt-24 sm:pt-28 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="editorial-shell relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
        {/* Copy */}
        <div className="min-w-0 max-w-xl">
          <div className="mb-5 flex justify-center sm:justify-start">
            <Kicker>{t.eyebrow}</Kicker>
          </div>

          {/* Stable positioning headline (does not rotate). */}
          <h1 className="text-balance text-center font-sf text-[clamp(2rem,4vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1C1A17] sm:text-left">
            {t.headline}
          </h1>

          {/* One static promise. */}
          <p className="mt-5 text-balance text-center text-[17px] leading-relaxed text-[#4E483F] sm:text-left md:text-[18px]">
            {t.promise}
          </p>

          {/* Rotating mission ticker — decorative, reserved stable height. */}
          <div className="mt-6">
            <span className="sr-only">{t.srSentence}</span>
            <span aria-hidden="true" className="flex flex-col items-center gap-1.5 sm:flex-row sm:items-baseline sm:gap-2.5">
              {/* Reserve two lines so a long mission wraps cleanly instead of
                  being clipped by the container; one-line items stay vertically
                  centered. text-balance keeps wrapped lines even. */}
              <span className="relative block min-h-[2.6em] w-full overflow-hidden text-center sm:text-left">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={index}
                    initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(4px)' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease }}
                    className="absolute inset-0 flex items-center justify-center text-balance font-sf text-[20px] font-semibold leading-tight tracking-[-0.02em] text-[#D10E63] sm:justify-start sm:text-[23px]"
                  >
                    {t.missions[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </div>

          <div className="mt-9 flex flex-col items-center gap-5 sm:items-start">
            <Link
              href="/decouvrir"
              className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] shadow-[0_12px_30px_-10px_rgba(209,14,99,0.55)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-10px_rgba(209,14,99,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>

            {/* Reassurance — three flex bullets, each carries its own dot so a
                wrap never strands a separator at the start of a line. */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:justify-start">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                  {proof}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Theatre — the single Iris story, self-contained */}
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
