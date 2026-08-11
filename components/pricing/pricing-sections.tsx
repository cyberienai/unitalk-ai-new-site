'use client'

import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    heroTitleLine1: 'Un Collaborateur IA.',
    heroTitleLine2: 'Des profils métier illimités.',
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
    <header className="mx-auto w-full max-w-[900px] px-5 pb-2 pt-[4.5rem] text-center sm:px-8 sm:pt-[4.75rem]">
      <h1 className="hero-heading text-[#1C1A17]">
        <span className="block">{t.heroTitleLine1}</span>
        <span className="block">{t.heroTitleLine2}</span>
      </h1>
    </header>
  )
}

export function PricingExplanations() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 sm:px-8 lg:grid-cols-2 lg:gap-12">
      <div aria-labelledby="billed-title">
        <h2 id="billed-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[34px]">
          <span className="block">{t.billedTitleLine1}</span>
          <span className="block">{t.billedTitleLine2}</span>
        </h2>
        <div className="mt-4 max-w-3xl">
          {t.billed.map((paragraph) => (
            <p key={paragraph} className="text-[15px] leading-relaxed text-[#4E483F]">{paragraph}</p>
          ))}
        </div>
      </div>
      <div aria-labelledby="usage-title">
        <h2 id="usage-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[34px]">{t.usageTitle}</h2>
        <p className="mt-4 max-w-4xl text-[15px] leading-relaxed text-[#4E483F]">{t.usageIntro}</p>
      </div>
    </section>
  )
}
