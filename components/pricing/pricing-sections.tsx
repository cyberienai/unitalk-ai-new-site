'use client'

import { useLanguage } from '@/lib/language-context'
import { minimumCreditBudget, pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'
import { ProfessionalPresence } from './professional-presence'
import { MultimodalAccess } from './multimodal-access'

const COPY = {
  fr: {
    heroTitle: 'Un Collaborateur IA. Tous les profils métier dont il a besoin.',
    heroSubtitle: `À partir de ${formatEuro(pricingConfig.baseMonthlyPrice, 'fr')} par mois. Essayez-le pendant ${pricingConfig.trialDays} jours avec 1 million de tokens inclus, sans carte bancaire.`,
    billedTitle: 'Vous payez les identités, pas les métiers.',
    billed: [
      'Chaque Collaborateur IA possède une identité professionnelle propre. C’est cette identité qui est facturée.',
      'Ses profils métier sont illimités. Le même Collaborateur IA peut intervenir en vente, recrutement, analyse ou support sans devenir quatre agents différents.',
      'Ajoutez une autre identité uniquement lorsqu’un autre nom, d’autres coordonnées ou des ressources isolées sont nécessaires.',
    ],
    includedTitle: 'Tout ce qui est inclus',
    included: [
      { title: 'Identité professionnelle', body: 'Profil public, adresse email, agenda et téléphone.' },
      { title: 'Continuité', body: 'Mémoire persistante, missions et contexte conservés.' },
      { title: 'Profils métier illimités', body: 'Compétences, applications et droits adaptés à ses missions.' },
      { title: 'Contrôle de l’entreprise', body: 'Workspace privé, accès maîtrisés et validations humaines.' },
    ],
    usageTitle: 'Après l’essai, choisissez comment régler les usages IA.',
    usageIntro: 'Vous choisirez et pourrez modifier ce mode depuis l’application.',
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
      'Each AI Collaborator has its own professional identity. That identity is what you pay for.',
      'Job profiles are unlimited. The same AI Collaborator can work in sales, recruiting, analysis or support without becoming four different agents.',
      'Add another identity only when another name, separate contact details or isolated resources are required.',
    ],
    includedTitle: 'Everything included',
    included: [
      { title: 'Professional identity', body: 'Public profile, email address, calendar and phone.' },
      { title: 'Continuity', body: 'Persistent memory, missions and context are retained.' },
      { title: 'Unlimited job profiles', body: 'Skills, applications and rights adapted to its missions.' },
      { title: 'Company control', body: 'Private Workspace, controlled access and human approvals.' },
    ],
    usageTitle: 'After the trial, choose how to pay for AI usage.',
    usageIntro: 'You will choose and can change this mode from the application.',
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
      <h1 className="text-balance font-sf text-[36px] font-bold leading-[1.06] tracking-[-0.035em] sm:text-[52px]">
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
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {t.billed.map((paragraph) => (
          <p key={paragraph} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5 text-[14px] leading-relaxed text-[#4E483F]">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  )
}

export function PricingIncluded() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  return (
    <section aria-labelledby="included-title" className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <h2 id="included-title" className="font-sf text-[28px] font-bold tracking-[-0.025em] sm:text-[36px]">{t.includedTitle}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {t.included.map((item) => (
          <article key={item.title} className="rounded-2xl border border-[#E4DDCE] bg-[#FBF9F3] p-5">
            <h3 className="font-sf text-[16px] font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4E483F]">{item.body}</p>
          </article>
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ProfessionalPresence lang={lang} />
        <MultimodalAccess lang={lang} />
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
