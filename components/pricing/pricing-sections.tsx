'use client'

import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    heroTitle: 'Un Collaborateur IA. Des profils métier illimités.',
    heroSubtitle: `${formatEuro(pricingConfig.baseMonthlyPrice, 'fr')} par mois, hors usages IA après l’essai. Sept jours avec 1 million de tokens inclus, sans carte bancaire.`,
    billedTitle: 'Un même Collaborateur IA peut exercer plusieurs métiers.',
    billed: [
      'Ses profils métier sont illimités. Ajoutez un autre Collaborateur IA uniquement si vous avez besoin d’un autre nom, d’autres coordonnées ou de ressources séparées.',
    ],
    usageTitle: 'Les usages IA restent sous votre contrôle.',
    usageIntro: 'Après l’essai, utilisez des crédits Unitalk, vos propres clés API ou les deux. Vous choisirez dans l’application.',
    usage: [
      { title: 'Crédits Unitalk', body: `À partir de ${formatEuro(minimumCreditBudget(), 'fr')} par mois.` },
      { title: 'Vos propres clés API', body: 'Facturation directe par vos fournisseurs.' },
      { title: 'Hybride', body: 'Vos clés API complétées par un budget Unitalk.' },
    ],
  },
  en: {
    heroTitle: 'One AI Collaborator. Unlimited job profiles.',
    heroSubtitle: `${formatEuro(pricingConfig.baseMonthlyPrice, 'en')} per month, excluding AI usage after the trial. Seven days with 1 million tokens included, no credit card required.`,
    billedTitle: 'One AI Collaborator can perform several roles.',
    billed: [
      'Job profiles are unlimited. Add another AI Collaborator only when you need another name, separate contact details or isolated resources.',
    ],
    usageTitle: 'AI usage stays under your control.',
    usageIntro: 'After the trial, use Unitalk credits, your own API keys, or both. You will choose in the application.',
    usage: [
      { title: 'Unitalk credits', body: `From ${formatEuro(minimumCreditBudget(), 'en')} per month.` },
      { title: 'Your own API keys', body: 'Direct billing from your providers.' },
      { title: 'Hybrid', body: 'Your API keys supplemented by a Unitalk budget.' },
    ],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <header className="mx-auto w-full max-w-4xl px-5 pb-4 pt-20 text-center sm:px-8 sm:pt-24">
      <h1 className="hero-heading text-[#1C1A17]">
        {t.heroTitle}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#4E483F] sm:text-[17px]">
        {t.heroSubtitle}
      </p>
    </header>
  )
}

export function BilledExplainer() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="billed-title" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <h2 id="billed-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[36px]">{t.billedTitle}</h2>
      <div className="mt-4 max-w-3xl">
        {t.billed.map((paragraph) => (
          <p key={paragraph} className="text-[15px] leading-relaxed text-[#4E483F]">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export function UsageModesInfo() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="usage-title" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <h2 id="usage-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[36px]">{t.usageTitle}</h2>
      <p className="mt-2 text-[15px] text-[#4E483F]">{t.usageIntro}</p>
      <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-[#4E483F]">
        {t.usage.map((mode) => `${mode.title} — ${mode.body}`).join(' · ')}
      </p>
    </section>
  )
}
