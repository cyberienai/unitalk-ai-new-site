'use client'

import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const COPY = {
  fr: {
    kicker: 'Tarifs Unitalk',
    title: 'Simple pour commencer.',
    accent: 'Prévisible pour grandir.',
    lead: 'Une licence pour toute l’entreprise, des Collaborateurs IA à la demande et une consommation maîtrisée. Aucun prix par siège.',
    primary: 'Commencer gratuitement',
    secondary: 'Voir le détail',
    reassurance: ['1 utilisateur gratuit', 'Sans engagement', 'Aucun paiement automatique'],
    companyKicker: '1. Licence entreprise',
    companyTitle: 'Une seule licence. Toute votre entreprise.',
    companyBody: 'Vous payez un forfait selon la taille de votre équipe, jamais un prix multiplié par le nombre de sièges.',
    tiers: [
      { name: 'Solo', users: '1 utilisateur', price: '0 €', note: 'Pour découvrir Unitalk', featured: false },
      { name: 'Équipe', users: 'Jusqu’à 10 utilisateurs', price: '49 €', note: 'par entreprise / mois', featured: true },
      { name: 'Entreprise', users: 'Jusqu’à 100 utilisateurs', price: '299 €', note: 'par entreprise / mois', featured: false },
    ],
    companyIncludes: ['Workspace partagé', 'Accès aux modèles autorisés', 'Administration et droits', 'Applications et validations'],
    collaboratorKicker: '2. Collaborateur IA',
    collaboratorTitle: '49 € par mois, par Collaborateur IA.',
    collaboratorBody: 'Chaque Collaborateur dispose de ses propres ressources et d’une instance dédiée de l’agent Hermes.',
    collaboratorIncludes: ['Identité et mémoire', 'Email, calendrier et téléphone', 'Instance Hermes dédiée', '1 million de tokens inclus', '60 minutes de téléphone incluses'],
    usageKicker: '3. Consommation',
    usageTitle: 'Choisissez comment financer les usages.',
    usageBody: 'Les crédits couvrent les modèles IA, les API externes et les minutes de téléphone supplémentaires.',
    usageOptions: [
      { name: 'Crédits Unitalk', price: 'Dès 25 €', body: 'Prépayés, sans dépassement imprévu.' },
      { name: 'BYOK', price: '0 € chez Unitalk', body: 'Utilisez vos propres clés API et payez directement vos fournisseurs.' },
      { name: 'Hybride', price: 'À la carte', body: 'Combinez vos clés API et des crédits Unitalk.' },
    ],
  },
  en: {
    kicker: 'Unitalk pricing',
    title: 'Simple to start.',
    accent: 'Predictable as you grow.',
    lead: 'One license for your whole organization, AI Collaborators on demand and controlled usage. No per-seat pricing.',
    primary: 'Start for free',
    secondary: 'See the details',
    reassurance: ['1 user free', 'No commitment', 'No automatic payment'],
    companyKicker: '1. Organization license',
    companyTitle: 'One license. Your whole organization.',
    companyBody: 'You pay a flat fee based on team size, never a price multiplied by the number of seats.',
    tiers: [
      { name: 'Solo', users: '1 user', price: '€0', note: 'To discover Unitalk', featured: false },
      { name: 'Team', users: 'Up to 10 users', price: '€49', note: 'per organization / month', featured: true },
      { name: 'Organization', users: 'Up to 100 users', price: '€299', note: 'per organization / month', featured: false },
    ],
    companyIncludes: ['Shared Workspace', 'Access to authorized models', 'Administration and permissions', 'Applications and approvals'],
    collaboratorKicker: '2. AI Collaborator',
    collaboratorTitle: '€49 per month, per AI Collaborator.',
    collaboratorBody: 'Each Collaborator has dedicated resources and its own Hermes agent instance.',
    collaboratorIncludes: ['Identity and memory', 'Email, calendar and phone', 'Dedicated Hermes instance', '1 million tokens included', '60 phone minutes included'],
    usageKicker: '3. Usage',
    usageTitle: 'Choose how to fund usage.',
    usageBody: 'Credits cover AI models, external APIs and additional phone minutes.',
    usageOptions: [
      { name: 'Unitalk credits', price: 'From €25', body: 'Prepaid, with no unexpected overage.' },
      { name: 'BYOK', price: '€0 from Unitalk', body: 'Use your own API keys and pay providers directly.' },
      { name: 'Hybrid', price: 'Flexible', body: 'Combine your API keys with Unitalk credits.' },
    ],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return <section className="border-b border-[#D8D0C2] px-5 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-36"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.kicker}</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end"><div><h1 className="max-w-4xl text-balance font-sf text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[.9] tracking-[-.07em]">{t.title}<span className="block text-[#D10E63]">{t.accent}</span></h1></div><div className="lg:pb-2"><p className="max-w-xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p><div className="mt-7 flex flex-wrap gap-3"><Link href="/decouvrir?source=tarifs" className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><a href="#detail-tarifs" className="inline-flex min-h-12 items-center rounded-full border border-[#CFC5B5] px-6 text-sm font-bold">{t.secondary}</a></div></div></div><div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#D8D0C2] pt-5 text-xs font-semibold text-[#625B50]">{t.reassurance.map(item => <span key={item} className="inline-flex items-center gap-2"><Check className="size-3.5 text-[#D10E63]"/>{item}</span>)}</div></div></section>
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return <div id="detail-tarifs" className="scroll-mt-24">
    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.companyKicker}</p><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="max-w-4xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.companyTitle}</h2><p className="text-[15px] leading-7 text-[#625B50]">{t.companyBody}</p></div><div className="mt-10 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] md:grid-cols-3">{t.tiers.map((tier, index) => <article key={tier.name} className={`relative bg-[#FAF8F3] p-6 sm:p-8 ${index > 0 ? 'border-t border-[#CFC5B5] md:border-l md:border-t-0' : ''}`}>{tier.featured && <span className="absolute right-5 top-5 rounded-full bg-[#FCE6EF] px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[.12em] text-[#B00C54]">{lang === 'fr' ? 'Le plus choisi' : 'Most popular'}</span>}<p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#766D61]">{tier.name}</p><p className="mt-8 text-[clamp(2.7rem,5vw,4.5rem)] font-semibold leading-none tracking-[-.07em]">{tier.price}</p><p className="mt-3 text-sm font-bold text-[#1C1A17]">{tier.users}</p><p className="mt-1 text-xs text-[#766D61]">{tier.note}</p></article>)}</div><ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{t.companyIncludes.map(item => <li key={item} className="flex items-center gap-2 text-sm font-semibold text-[#4E483F]"><Check className="size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></div></section>

    <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.collaboratorKicker}</p><h2 className="mt-5 max-w-3xl text-balance text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.93] tracking-[-.06em]">{t.collaboratorTitle}</h2><p className="mt-5 max-w-xl text-[15px] leading-7 text-[#625B50]">{t.collaboratorBody}</p></div><ul className="overflow-hidden rounded-[22px] border border-[#CFC5B5] bg-[#FAF8F3]">{t.collaboratorIncludes.map((item, index) => <li key={item} className={`flex min-h-16 items-center gap-3 px-6 text-sm font-bold ${index > 0 ? 'border-t border-[#DED6C8]' : ''}`}><Check className="size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></div></section>

    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.usageKicker}</p><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="max-w-4xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.usageTitle}</h2><p className="text-[15px] leading-7 text-[#625B50]">{t.usageBody}</p></div><div className="mt-10 grid gap-4 md:grid-cols-3">{t.usageOptions.map(option => <article key={option.name} className="rounded-[22px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#B00C54]">{option.name}</p><p className="mt-6 text-3xl font-semibold tracking-[-.05em]">{option.price}</p><p className="mt-4 text-sm leading-6 text-[#625B50]">{option.body}</p></article>)}</div></div></section>
  </div>
}
