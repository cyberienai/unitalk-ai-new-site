'use client'

import { useLanguage } from '@/lib/language-context'
import { pricingConfig } from '@/lib/pricing-config'
import { formatEuro } from './format'

const COPY = {
  fr: {
    eyebrow: 'Tarifs',
    heroTitle: (price: string) => `${price} par mois pour votre Collaborateur IA.`,
    heroTitleSecond: 'Les modèles restent votre choix.',
    heroLead: 'Vous payez l’identité professionnelle de votre Collaborateur IA : son nom, son environnement privé, sa mémoire et sa place dans votre entreprise.',
    heroDetail: 'Après l’essai, vous choisissez comment régler les modèles qu’il mobilise : crédits Unitalk, vos propres clés API ou une combinaison des deux.',
    includedEyebrow: 'Inclus gratuitement',
    includedTitle: 'Inclus avec Unitalk',
    almaBadge: 'Incluse',
    almaTitle: 'Alma · Conseillère IA · Unitalk',
    almaText: 'Alma vous aide à cadrer votre mission, préparer votre Collaborateur IA et définir les décisions qui doivent rester humaines.',
    almaProof: 'Vous ne payez pas une identité supplémentaire pour Alma.',
    desktopBadge: 'Gratuite',
    desktopTitle: 'Vos données privées peuvent rester sur votre ordinateur.',
    desktopText: 'Unitalk Desktop vous permet de travailler localement avec les fichiers et les données que vous ne souhaitez pas envoyer dans le cloud.',
    desktopProof: 'L’application Desktop est incluse gratuitement.',
    identityEyebrow: 'Ce que le prix conserve',
    identityTitle: 'Une identité professionnelle qui accumule de l’expérience.',
    identityProofs: [
      ['Un nom', 'Une identité que vos équipes reconnaissent.'],
      ['Des responsabilités', 'Des profils métier illimités.'],
      ['Des savoir-faire', 'Des compétences illimitées.'],
      ['Une expérience', 'Une mémoire attachée au même Collaborateur.'],
    ],
    identityDetail: 'Vous ajoutez un autre Collaborateur IA uniquement lorsque vous avez besoin d’un autre nom, d’autres coordonnées, d’une autre mémoire ou de ressources séparées.',
  },
  en: {
    eyebrow: 'Pricing',
    heroTitle: (price: string) => `${price} per month for your AI Collaborator.`,
    heroTitleSecond: 'The models remain your choice.',
    heroLead: 'You pay for your AI Collaborator’s professional identity: its name, private environment, memory and place in your company.',
    heroDetail: 'After the trial, choose how to pay for the models it uses: Unitalk credits, your own API keys, or a combination of both.',
    includedEyebrow: 'Included free',
    includedTitle: 'Included with Unitalk',
    almaBadge: 'Included',
    almaTitle: 'Alma · AI Advisor · Unitalk',
    almaText: 'Alma helps you frame your mission, prepare your AI Collaborator and define which decisions must remain human.',
    almaProof: 'You do not pay for an additional identity for Alma.',
    desktopBadge: 'Free',
    desktopTitle: 'Your private data can stay on your computer.',
    desktopText: 'Unitalk Desktop lets you work locally with files and data you do not want to send to the cloud.',
    desktopProof: 'The Desktop application is included free of charge.',
    identityEyebrow: 'What the identity price preserves',
    identityTitle: 'A professional identity that builds experience.',
    identityProofs: [
      ['A name', 'An identity your teams recognize.'],
      ['Responsibilities', 'Unlimited job profiles.'],
      ['Know-how', 'Unlimited skills.'],
      ['Experience', 'Memory attached to the same Collaborator.'],
    ],
    identityDetail: 'Add another AI Collaborator only when you need another name, separate contact details, a separate memory or isolated resources.',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const price = formatEuro(pricingConfig.baseMonthlyPrice, lang)

  return (
    <header className="mx-auto w-full max-w-[1040px] px-5 pb-8 pt-[4.5rem] sm:px-8 sm:pb-10 sm:pt-[5.5rem]">
      <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#B00C54]">{t.eyebrow}</p>
      <h1 className="mt-5 max-w-[980px] font-sf text-[42px] font-bold leading-[0.98] tracking-[-0.055em] text-[#1C1A17] sm:text-[64px] lg:text-[76px]">
        <span className="block">{t.heroTitle(price)}</span>
        <span className="mt-2 block text-[#6E665A]">{t.heroTitleSecond}</span>
      </h1>
      <div className="mt-8 grid max-w-[900px] gap-3 text-[16px] leading-relaxed text-[#4E483F] md:grid-cols-2 md:gap-10">
        <p>{t.heroLead}</p>
        <p>{t.heroDetail}</p>
      </div>
    </header>
  )
}

export function PricingExplanations() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return (
    <>
      <section aria-labelledby="included-title" className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.includedEyebrow}</p>
        <h2 id="included-title" className="mt-3 font-sf text-[34px] font-bold tracking-[-0.04em] sm:text-[48px]">{t.includedTitle}</h2>
        <div className="mt-10 border-y border-[#D8D0C2]">
          <article className="grid gap-5 py-8 md:grid-cols-[220px_1fr] md:py-10">
            <div>
              <span className="inline-flex rounded-full border border-[#D10E63]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">{t.almaBadge}</span>
              <h3 className="mt-4 font-sf text-xl font-bold">{t.almaTitle}</h3>
            </div>
            <div className="max-w-2xl md:pt-1">
              <p className="text-[16px] leading-relaxed text-[#4E483F]">{t.almaText}</p>
              <p className="mt-4 font-semibold">{t.almaProof}</p>
            </div>
          </article>
          <article className="grid gap-5 border-t border-[#D8D0C2] py-8 md:grid-cols-[220px_1fr] md:py-10">
            <div>
              <span className="inline-flex rounded-full border border-[#D10E63]/30 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#B00C54]">{t.desktopBadge}</span>
              <h3 className="mt-4 font-sf text-xl font-bold">Unitalk Desktop</h3>
            </div>
            <div className="max-w-2xl md:pt-1">
              <p className="font-sf text-[24px] font-bold leading-tight tracking-[-0.025em]">{t.desktopTitle}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-[#4E483F]">{t.desktopText}</p>
              <p className="mt-4 font-semibold">{t.desktopProof}</p>
            </div>
          </article>
        </div>
      </section>

      <section aria-labelledby="identity-title" className="bg-[#EAE4D9]">
        <div className="mx-auto w-full max-w-[1120px] px-5 py-16 sm:px-8 sm:py-24">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#B00C54]">{t.identityEyebrow}</p>
          <h2 id="identity-title" className="mt-3 max-w-3xl font-sf text-[34px] font-bold leading-tight tracking-[-0.04em] sm:text-[48px]">{t.identityTitle}</h2>
          <div className="mt-10 grid border-t border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">
            {t.identityProofs.map(([label, description]) => (
              <div key={label} className="border-b border-[#CFC5B5] py-6 sm:px-5 lg:border-r lg:first:pl-0 lg:last:border-r-0">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#6E665A]">{label}</p>
                <p className="mt-3 max-w-[220px] text-[15px] leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-[16px] leading-relaxed text-[#4E483F]">{t.identityDetail}</p>
        </div>
      </section>
    </>
  )
}
