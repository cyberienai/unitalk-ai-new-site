'use client'

import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    heroTitleLine1: 'Un Collaborateur IA.',
    heroTitleLine2: 'Des profils métier illimités.',
    heroSubtitle: `${formatEuro(pricingConfig.baseMonthlyPrice, 'fr')} par mois, hors usages IA après l’essai.`,
    billedTitleLine1: 'Votre Collaborateur développe ses compétences',
    billedTitleLine2: 'au fil de vos missions.',
    billed: [
      'Ses profils métier et ses compétences sont illimités. Ajoutez un autre Collaborateur IA uniquement si vous avez besoin d’un autre nom, d’autres coordonnées ou de ressources séparées.',
    ],
    usageTitle: 'Les usages IA restent sous votre contrôle.',
    usageIntro: `Après l’essai, utilisez des crédits Unitalk à partir de ${formatEuro(minimumCreditBudget(), 'fr')} par mois, vos propres clés API ou les deux. Vous choisirez dans l’application.`,
  },
  en: {
    heroTitleLine1: 'One AI Collaborator.',
    heroTitleLine2: 'Unlimited job profiles.',
    heroSubtitle: `${formatEuro(pricingConfig.baseMonthlyPrice, 'en')} per month, excluding AI usage after the trial.`,
    billedTitleLine1: 'Your AI Collaborator develops its skills',
    billedTitleLine2: 'through your missions.',
    billed: [
      'Job profiles and skills are unlimited. Add another AI Collaborator only when you need another name, separate contact details or isolated resources.',
    ],
    usageTitle: 'AI usage stays under your control.',
    usageIntro: `After the trial, use Unitalk credits from ${formatEuro(minimumCreditBudget(), 'en')} per month, your own API keys, or both. You will choose in the application.`,
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <header className="mx-auto w-full max-w-4xl px-5 pb-2 pt-[4.5rem] text-center sm:px-8 sm:pt-[4.75rem]">
      <h1 className="font-sf text-[36px] font-semibold leading-[1.08] tracking-[-0.035em] text-[#1C1A17] sm:text-[clamp(40px,4vw,52px)] sm:leading-[1.05]">
        <span className="block">{t.heroTitleLine1}</span>
        <span className="block">{t.heroTitleLine2}</span>
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-pretty text-[16px] leading-relaxed text-[#4E483F] sm:text-[17px]">
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
      <h2 id="billed-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[36px]">
        <span>{t.billedTitleLine1}</span>
        <br className="hidden sm:block" />
        <span> {t.billedTitleLine2}</span>
      </h2>
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
      <p className="mt-3 max-w-4xl text-[15px] leading-relaxed text-[#4E483F]">{t.usageIntro}</p>
    </section>
  )
}
