'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    badge: '7 JOURS D’ESSAI · SANS CARTE BANCAIRE · SANS ENGAGEMENT',
    heroTitle: 'Des Collaborateurs IA à la mesure de votre entreprise.',
    heroSubtitle:
      'Commencez avec une identité. Ajoutez-en une autre uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
    heroPrice: 'À partir de 49 € par mois.',
    billedEyebrow: 'CE QUI EST RÉELLEMENT FACTURÉ',
    billedTitle: 'Une identité peut exercer plusieurs métiers.',
    billed: [
      'Votre Collaborateur IA peut intervenir comme commercial, recruteur, analyste ou responsable support sans devenir quatre agents différents.',
      'Vous ajoutez autant de profils métier que ses missions l’exigent. Ils sont illimités et n’augmentent pas le prix du forfait.',
      'Vous ajoutez un nouveau Collaborateur IA uniquement lorsqu’une identité distincte ou des ressources dédiées sont nécessaires.',
      'Dans les autres cas, Alma fait progresser le Collaborateur existant avec les profils métier, les compétences, les applications et les droits adaptés à ses nouvelles missions.',
    ],
    partner: 'Vous déployez Unitalk chez vos clients ? Découvrir Partner',
    platform: 'Vous construisez votre propre produit ? Découvrir Platform',
  },
  en: {
    badge: '7-DAY TRIAL · NO CREDIT CARD · NO COMMITMENT',
    heroTitle: 'Collaborateurs IA tailored to your company.',
    heroSubtitle:
      'Start with one identity. Add another only when a distinct identity or dedicated resources are required.',
    heroPrice: 'From €49 per month.',
    billedEyebrow: 'WHAT IS ACTUALLY BILLED',
    billedTitle: 'One identity can hold several roles.',
    billed: [
      'Your Collaborateur IA can act as a salesperson, recruiter, analyst or support lead without becoming four different agents.',
      'You add as many job profiles as its missions require. They are unlimited and do not raise the plan price.',
      'You add a new Collaborateur IA only when a distinct identity or dedicated resources are required.',
      'Otherwise, Alma grows the existing Collaborateur with the job profiles, skills, applications and rights suited to its new missions.',
    ],
    partner: 'Deploying Unitalk for your clients? Discover Partner',
    platform: 'Building your own product? Discover Platform',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <header className="mx-auto w-full max-w-4xl px-5 pt-14 pb-4 text-center sm:px-8 sm:pt-20">
      <span className="inline-block rounded-full border border-[#E5DED0] bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.1em] text-[#6B6560]">
        {t.badge}
      </span>
      <h1 className="mt-6 text-balance font-serif text-[34px] leading-[1.1] text-[#1C1A17] sm:text-[46px]">
        {t.heroTitle}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#6B6560]">
        {t.heroSubtitle}
      </p>
      <p className="mt-4 text-[15px] font-semibold text-[#7A1E3A]">{t.heroPrice}</p>
    </header>
  )
}

export function BilledExplainer() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="billed-title" className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A8452F]">{t.billedEyebrow}</p>
      <h2 id="billed-title" className="mt-2 text-pretty font-serif text-[26px] leading-snug text-[#1C1A17] sm:text-[30px]">
        {t.billedTitle}
      </h2>
      <div className="mt-4 space-y-3">
        {t.billed.map((p) => (
          <p key={p} className="max-w-prose text-[15px] leading-relaxed text-[#6B6560]">
            {p}
          </p>
        ))}
      </div>
    </section>
  )
}

export function PartnerPlatformLinks() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8 sm:pb-20">
      <div className="flex flex-col gap-3 border-t border-[#EFEAE0] pt-8">
        <Link
          href="/partenaires"
          className="group inline-flex items-center gap-1.5 text-[14px] text-[#4A453F] underline-offset-4 outline-none hover:text-[#7A1E3A] hover:underline focus-visible:ring-2 focus-visible:ring-[#7A1E3A]/40"
        >
          {t.partner}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
        <Link
          href="/platform"
          className="group inline-flex items-center gap-1.5 text-[14px] text-[#4A453F] underline-offset-4 outline-none hover:text-[#7A1E3A] hover:underline focus-visible:ring-2 focus-visible:ring-[#7A1E3A]/40"
        >
          {t.platform}
          <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
