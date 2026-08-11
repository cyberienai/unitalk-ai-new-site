'use client'

import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    heroTitle: 'Un Collaborateur IA. Tous les profils métier dont il a besoin.',
    heroSubtitle: `À partir de ${formatEuro(pricingConfig.baseMonthlyPrice, 'fr')} par mois. Essayez-le pendant ${pricingConfig.trialDays} jours avec 1 million de tokens inclus, sans carte bancaire.`,
    billedTitle: 'Vous payez les identités, pas les métiers.',
    billed: [
      'Ses profils métier sont illimités. Le même Collaborateur IA peut intervenir en vente, recrutement, analyse ou support sans devenir quatre agents différents.',
      'Ajoutez une autre identité uniquement lorsqu’un autre nom, d’autres coordonnées ou des ressources isolées sont nécessaires.',
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
    heroTitle: 'One AI Collaborator. Every job profile it needs.',
    heroSubtitle: `From ${formatEuro(pricingConfig.baseMonthlyPrice, 'en')} per month. Try it for ${pricingConfig.trialDays} days with 1 million tokens included, no credit card required.`,
    billedTitle: 'You pay for identities, not roles.',
    billed: [
      'Job profiles are unlimited. The same AI Collaborator can work in sales, recruiting, analysis or support without becoming four different agents.',
      'Add another identity only when another name, separate contact details or isolated resources are required.',
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
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {t.billed.map((paragraph) => (
          <p key={paragraph} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 text-[14px] leading-relaxed text-[#4E483F]">
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
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {t.usage.map((mode) => (
          <article key={mode.title} className="rounded-2xl border border-[#E4DDCE] bg-white p-5">
            <h3 className="font-sf text-[17px] font-bold">{mode.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{mode.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
