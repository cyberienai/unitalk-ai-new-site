'use client'

import Link from 'next/link'
import { ArrowUp, Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { localizedHref } from '@/lib/i18n-routing'

const COPY = {
  fr: {
    kicker: 'Votre première mission',
    title: 'Quel travail voulez-vous confier en premier ?',
    body: 'Décrivez le résultat attendu. Alma prépare la mission, recommande le Collaborateur adapté et identifie les accès ou validations nécessaires.',
    proofs: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement'],
    pricing: 'Puis à partir de 49 €/mois selon la configuration.',
    pricingCta: 'Voir les tarifs',
    cta: 'Décrire ma mission à Alma',
  },
  en: {
    kicker: 'Your first mission',
    title: 'What work would you like to assign first?',
    body: 'Describe the expected outcome. Alma prepares the mission, recommends the right Collaborator and identifies the required access or approvals.',
    proofs: ['First mission included', 'No credit card', 'No commitment'],
    pricing: 'Then from €49/month depending on configuration.',
    pricingCta: 'See pricing',
    cta: 'Describe my mission to Alma',
  },
} as const

export function HomeFinalCtaValidated({ lang }: { lang: Lang }) {
  const copy = COPY[lang]
  function returnToAlma(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    window.dispatchEvent(new Event('open-home-alma'))
  }

  return (
    <section className="bg-[#D10E63] py-14 text-white sm:py-20">
      <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="font-mono text-xs font-black uppercase tracking-[.18em] text-white">{copy.kicker}</p>
          <h2 className="mt-5 max-w-4xl text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{copy.title}</h2>
          <p className="mt-5 max-w-xl text-[16px] leading-7 text-white">{copy.body}</p>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white">
            {copy.proofs.map(proof => <li key={proof} className="flex items-center gap-2"><Check className="size-3.5"/>{proof}</li>)}
          </ul>
          <p className="mt-4 text-xs text-white">{copy.pricing} <Link href={localizedHref('pricing', lang)} className="font-bold text-white underline decoration-white/60 underline-offset-4">{copy.pricingCta}</Link></p>
        </div>
        <a href="#alma-hero" onClick={returnToAlma} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-3 rounded-full bg-[#1C1A17] px-7 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">
          {copy.cta}<ArrowUp className="size-4"/>
        </a>
      </div>
    </section>
  )
}
