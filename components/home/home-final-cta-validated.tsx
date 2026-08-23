'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUp, Check } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { localizedHref } from '@/lib/i18n-routing'

const COPY = {
  fr: {
    kicker: 'Votre première mission',
    title: 'Le Collaborateur IA qui prend en charge le travail…',
    rotatingTitles: ['que vous remettez toujours à demain.', 'qui mobilise inutilement votre équipe.', 'qui détourne votre équipe de l’essentiel.'],
    body: 'Décrivez votre mission. Alma prépare votre Collaborateur IA.',
    proofs: ['Première mission offerte', 'Sans carte bancaire'],
    pricing: 'Puis à partir de 49 €/mois.',
    pricingCta: 'Voir les tarifs',
    cta: 'Décrire ma mission à Alma',
  },
  en: {
    kicker: 'Your first mission',
    title: 'The AI Collaborator that takes care of the work…',
    rotatingTitles: ['you keep putting off until tomorrow.', 'that unnecessarily occupies your team.', 'that distracts your team from what matters.'],
    body: 'Describe your mission. Alma prepares your AI Collaborator.',
    proofs: ['First mission included', 'No credit card'],
    pricing: 'Then from €49/month.',
    pricingCta: 'See pricing',
    cta: 'Describe my mission to Alma',
  },
} as const

export function HomeFinalCtaValidated({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  const reduceMotion = useReducedMotion()
  const [titleIndex, setTitleIndex] = useState(0)

  useEffect(() => {
    if (reduceMotion) return
    const interval = window.setInterval(() => setTitleIndex(index => (index + 1) % copy.rotatingTitles.length), 5000)
    return () => window.clearInterval(interval)
  }, [copy.rotatingTitles.length, reduceMotion])

  function returnToAlma(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    window.dispatchEvent(new Event('open-home-alma'))
  }

  return (
    <section className="bg-[#D10E63] py-14 text-white sm:py-20">
      <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-[11px] font-black uppercase tracking-[.18em] text-white/85">{copy.kicker}</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">
            <span className="block">{copy.title}</span>
            <span className="relative mt-2 block min-h-[3.05em] overflow-hidden text-[#1C1A17] sm:min-h-[2.15em]" aria-hidden="true">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={titleIndex} className="absolute inset-x-0 top-0 block" initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -18 }} transition={{ duration: 0.35 }}>
                  {copy.rotatingTitles[titleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="sr-only">{copy.rotatingTitles.join(' ')}</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/90">{copy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/90">
            {copy.proofs.map(proof => <li key={proof} className="flex items-center gap-2"><Check className="size-3.5"/>{proof}</li>)}
          </ul>
          <p className="mt-4 text-xs text-white/85">{copy.pricing} <Link href={localizedHref('pricing', lang)} className="font-bold text-white underline decoration-white/50 underline-offset-4">{copy.pricingCta}</Link></p>
        </div>
        <a href="#alma-hero" onClick={returnToAlma} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#1C1A17] px-7 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">
          {copy.cta}<ArrowUp className="size-4"/>
        </a>
      </div>
    </section>
  )
}
