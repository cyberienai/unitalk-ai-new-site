'use client'

import { Check } from 'lucide-react'
import { PricingConfigurator } from './pricing-configurator'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const T = {
  fr: {
    kicker: 'Tarifs Unitalk',
    title: 'Un prix simple pour commencer.',
    accent: 'Une configuration qui évolue avec vous.',
    lead: 'Votre prix repose sur trois éléments. Choisissez le nombre de Collaborateurs et leur volume de travail. Le total se calcule immédiatement.',
    trial: ['Première mission gratuite', 'Sans carte bancaire', 'Aucune activation payante automatique'],
    components: [
      { label: 'Votre entreprise', price: '50 €', period: '/mois', body: 'Un seul compte pour vos équipes, vos Collaborateurs IA, leurs accès et leur facturation.' },
      { label: 'Chaque Collaborateur IA', price: '49 €', period: '/mois', body: 'Son identité, sa mémoire, ses communications, ses applications et son serveur privé.' },
      { label: 'Utilisation des modèles IA', price: '0 à 100 €', period: '/mois', body: 'Vos propres clés API ou une capacité adaptée au volume de travail confié.' },
    ],
    promo: 'Les remises de lancement applicables sont calculées automatiquement dans votre estimation.',
    includedKicker: 'Inclus sans coût supplémentaire',
    includedTitle: 'Hermes, Workspace et Desktop sont inclus.',
    includedBody: 'Hermes reste gratuit sous licence MIT. Workspace et Desktop accompagnent chaque configuration Unitalk.',
    included: ['Hermes open source', 'Workspace collaboratif', 'Application Desktop', 'Membres humains illimités'],
  },
  en: {
    kicker: 'Unitalk pricing',
    title: 'A simple price to get started.',
    accent: 'A setup that evolves with you.',
    lead: 'Your price has three components. Choose the number of Collaborators and their workload. The total updates instantly.',
    trial: ['First mission free', 'No credit card', 'No automatic paid activation'],
    components: [
      { label: 'Your organization', price: '€50', period: '/month', body: 'One account for your teams, AI Collaborators, access and billing.' },
      { label: 'Each AI Collaborator', price: '€49', period: '/month', body: 'Identity, memory, communications, applications and private server.' },
      { label: 'AI model usage', price: '€0 to €100', period: '/month', body: 'Your own API keys or capacity suited to the assigned workload.' },
    ],
    promo: 'Applicable launch discounts are calculated automatically in your estimate.',
    includedKicker: 'Included at no extra cost',
    includedTitle: 'Hermes, Workspace and Desktop are included.',
    includedBody: 'Hermes remains free under the MIT License. Workspace and Desktop accompany every Unitalk setup.',
    included: ['Open-source Hermes', 'Collaborative Workspace', 'Desktop application', 'Unlimited human members'],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = T[lang]

  return (
    <section className="relative overflow-hidden border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="editorial-shell relative">
        <Kicker>{t.kicker}</Kicker>
        <div className="mt-6 grid gap-7 lg:grid-cols-[1.08fr_.92fr] lg:items-end">
          <h1 className="max-w-4xl text-balance font-sf text-[clamp(2.5rem,5.2vw,5.2rem)] font-semibold leading-[.92] tracking-[-.06em]">{t.title}<span className="mt-2 block text-[#D10E63]">{t.accent}</span></h1>
          <p className="max-w-xl text-[16px] leading-8 text-[#4E483F] lg:pb-2">{t.lead}</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] md:grid-cols-3">
          {t.components.map((item, index) => <article key={item.label} className={`bg-[#FAF8F3] p-6 sm:p-7 ${index > 0 ? 'border-t border-[#CFC5B5] md:border-l md:border-t-0' : ''}`}><p className="font-mono text-[9px] font-black uppercase tracking-[.16em] text-[#B00C54]">{item.label}</p><p className="mt-4 text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-.06em]">{item.price}<span className="ml-1 text-xs font-semibold tracking-normal text-[#766D61]">{item.period}</span></p><p className="mt-4 text-sm leading-6 text-[#625B50]">{item.body}</p></article>)}
        </div>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#625B50]">{t.trial.map(item=><span key={item} className="inline-flex items-center gap-1.5"><Check className="size-3.5 text-[#D10E63]"/>{item}</span>)}</div>
        <p className="mt-3 text-xs text-[#857C6E]">{t.promo}</p>

        <div className="mt-10 scroll-mt-24"><PricingConfigurator /></div>
      </div>
    </section>
  )
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = T[lang]
  return <section className="border-y border-[#DED6C8] bg-[#EAE3D4] px-5 py-14 sm:px-8 sm:py-18"><div className="editorial-shell grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><Kicker>{t.includedKicker}</Kicker><h2 className="mt-5 max-w-3xl text-balance text-[clamp(2rem,4vw,3.7rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.includedTitle}</h2><p className="mt-5 max-w-xl text-sm leading-7 text-[#4E483F]">{t.includedBody}</p></div><ul className="grid gap-px overflow-hidden rounded-[20px] border border-[#CFC5B5] bg-[#CFC5B5] sm:grid-cols-2">{t.included.map(item=><li key={item} className="flex min-h-20 items-center gap-3 bg-[#FAF8F3] p-5 text-sm font-bold"><Check className="size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></div></section>
}
