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
    <header className="relative mx-auto w-full max-w-4xl px-5 pt-16 pb-6 text-center sm:px-8 sm:pt-24">
      {/* Soft brand halo behind the title — the one signature flourish. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-10 mx-auto h-56 max-w-2xl rounded-full bg-[#D10E63]/[0.07] blur-3xl"
      />
      <span className="relative inline-flex items-center rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.08] px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">
        {t.badge}
      </span>
      <h1 className="relative mt-6 text-balance font-sf text-[38px] font-bold leading-[1.05] tracking-[-0.02em] text-[#1C1A17] sm:text-[54px]">
        {t.heroTitle}
      </h1>
      <p className="relative mx-auto mt-5 max-w-2xl text-pretty text-[17px] leading-relaxed text-[#5A544A]">
        {t.heroSubtitle}
      </p>
      <p className="relative mt-6 inline-flex items-baseline gap-1.5 text-[15px] font-semibold text-[#1C1A17]">
        <span className="font-sf text-[22px] font-bold tracking-[-0.01em] text-[#B00C54]">{t.heroPrice}</span>
      </p>
    </header>
  )
}

export function BilledExplainer() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="billed-title" className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-16">
      <div className="rounded-3xl border border-[#EAE3D5] bg-[#FBF9F3] p-7 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_28px_50px_-34px_rgba(28,26,23,0.35)] sm:p-10">
        <span className="inline-flex items-center rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.08] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#B00C54]">
          {t.billedEyebrow}
        </span>
        <h2
          id="billed-title"
          className="mt-4 text-pretty font-sf text-[26px] font-bold leading-snug tracking-[-0.01em] text-[#1C1A17] sm:text-[32px]"
        >
          {t.billedTitle}
        </h2>
        <div className="mt-5 space-y-4 border-t border-[#EEE7D9] pt-5">
          {t.billed.map((p, i) => (
            <p key={p} className="flex gap-3 text-[15px] leading-relaxed text-[#5A544A]">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D10E63]"
                style={{ opacity: 1 - i * 0.12 }}
              />
              <span className="max-w-prose">{p}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PartnerPlatformLinks() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8 sm:pb-20">
      <div className="grid gap-3 border-t border-[#EAE3D5] pt-8 sm:grid-cols-2">
        <Link
          href="/partenaires"
          className="group flex items-center justify-between gap-3 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] px-5 py-4 text-[14px] font-medium text-[#3B362F] outline-none transition-colors hover:border-[#D10E63]/40 hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          {t.partner}
          <span
            aria-hidden="true"
            className="text-[#D10E63] transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
        <Link
          href="/platform"
          className="group flex items-center justify-between gap-3 rounded-2xl border border-[#EAE3D5] bg-[#FBF9F3] px-5 py-4 text-[14px] font-medium text-[#3B362F] outline-none transition-colors hover:border-[#D10E63]/40 hover:bg-[#FBF3F7] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
        >
          {t.platform}
          <span
            aria-hidden="true"
            className="text-[#D10E63] transition-transform duration-200 group-hover:translate-x-0.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}
