'use client'

import Link from 'next/link'
import { startTransition, useState } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import { AlmaInline } from '@/components/alma-inline'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import { organizationMonthlyPrice, unitalkPricing, type OrganizationTierId } from '@/lib/unitalk-pricing'

const COPY = {
  fr: {
    kicker: 'Première mission offerte',
    title: 'Confiez une première mission',
    accent: 'à votre Collaborateur IA.',
    lead: 'Choisissez un Collaborateur IA ou partez d’une mission. Alma vous aide à définir son rôle, ses compétences et les accès nécessaires.',
    primary: 'Choisir un Collaborateur IA',
    secondary: 'Explorer les missions',
    reassurance: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire'],
    trialKicker: 'Première mission offerte',
    trialTitle: 'Un vrai Collaborateur IA. Une vraie mission. 0 €.',
    trialBody: 'Accédez aux fonctions nécessaires pour cadrer, lancer et évaluer une première mission avant de choisir votre configuration.',
    pricingTitle: 'Un forfait pour votre entreprise, 49 € par Collaborateur IA et des crédits inclus pour les mettre au travail.',
    companyTitle: '2. Workspace Unitalk',
    companyPrice: 'Un forfait pour toute l’entreprise',
    companyBody: 'Un espace de travail partagé avec des Assistants IA privés ou partagés, les modèles autorisés, les intégrations et la gouvernance.',
    companyNote: 'Un seul forfait pour toute l’entreprise. Aucun prix par siège.',
    tiers: [
      { id: 'solo', name: 'Solo', users: '1 utilisateur', price: 'Gratuit', note: 'Pour découvrir Unitalk', credits: 'Première mission offerte' },
      { id: 'team', name: 'Équipe', users: '2 à 10 utilisateurs', price: '49 €', note: 'par entreprise / mois', credits: '2 500 crédits IA / mois inclus' },
      { id: 'business', name: 'Entreprise', users: '11 à 100 utilisateurs', price: '299 €', note: 'par entreprise / mois', credits: '20 000 crédits IA / mois inclus' },
    ],
    companyIncludes: ['Assistants IA privés ou partagés illimités', '3 000+ applications via Pipedream', 'Accès unifié aux modèles multimodaux autorisés', 'Texte, image, vidéo, audio et code', 'Workspace partagé', 'Administration, droits et validations'],
    distinction: 'Un Assistant IA vous aide dans une conversation. Un Collaborateur IA prend en charge des missions.',
    collaboratorTitle: '1. Collaborateurs IA',
    collaboratorPrice: '49 €/mois par Collaborateur',
    collaboratorBody: '49 € par mois pour chaque identité avec ses ressources et son instance Hermes dédiée.',
    totalKicker: 'Votre prix',
    totalTitle: 'Total mensuel',
    totalNote: 'Hors consommation supplémentaire. Première mission offerte.',
    continue: 'Continuer avec cette configuration',
    collaboratorIncludes: ['Identité et mémoire', 'Email, calendrier et téléphone', 'Instance Hermes dédiée', '1 million de tokens inclus', '60 minutes de téléphone incluses'],
    usageKicker: '3. Consommation',
    usageTitle: 'Tout fonctionne avec des crédits',
    usagePrice: 'Inclus avec votre licence',
    usageBody: 'Les crédits financent les modèles IA, les API externes et les minutes de téléphone supplémentaires. Vous pouvez recharger votre solde à partir de 25 €.',
    creditsLink: 'Consulter le coût détaillé des crédits',
    creditUses: ['Modèles IA et recherche', 'Images, vidéo, audio et transcription', 'API externes et téléphone'],
    subscription: 'Abonnement mensuel',
    selectedCredits: 'Crédits inclus',
    includedDetail: 'Voir le détail des ressources incluses',
    companyCredits: 'Crédits IA partagés avec la licence',
    collaboratorTokens: 'Tokens inclus avec les Collaborateurs IA',
    collaboratorMinutes: 'Minutes de téléphone incluses',
    creditNote: 'Les crédits inclus sont consommés à l’usage. Aucun dépassement ou rechargement automatique.',
  },
  en: {
    kicker: 'First mission free',
    title: 'Assign a first mission',
    accent: 'to your AI Collaborator.',
    lead: 'Choose an AI Collaborator or start from a mission. Alma helps define its role, skills and required access.',
    primary: 'Choose an AI Collaborator',
    secondary: 'Explore missions',
    reassurance: ['First mission free', 'No credit card', 'No commitment', 'Human support when needed'],
    trialKicker: 'First mission free',
    trialTitle: 'A real AI Collaborator. A real mission. €0.',
    trialBody: 'Access the features needed to scope, launch and evaluate a first mission before choosing your setup.',
    pricingTitle: 'One plan for your organization, €49 per AI Collaborator and credits included to put them to work.',
    companyTitle: '2. Unitalk Workspace',
    companyPrice: 'One plan for the whole organization',
    companyBody: 'A shared workspace with private or shared AI Assistants, authorized models, integrations and governance.',
    companyNote: 'One plan for the whole organization. No per-seat pricing.',
    tiers: [
      { id: 'solo', name: 'Solo', users: '1 user', price: '€0', note: 'To discover Unitalk', credits: 'First mission free' },
      { id: 'team', name: 'Team', users: '2 to 10 users', price: '€49', note: 'per organization / month', credits: '2,500 AI credits / month included' },
      { id: 'business', name: 'Organization', users: '11 to 100 users', price: '€299', note: 'per organization / month', credits: '20,000 AI credits / month included' },
    ],
    companyIncludes: ['Unlimited private or shared AI Assistants', '3,000+ applications via Pipedream', 'Unified access to authorized multimodal models', 'Text, image, video, audio and code', 'Shared Workspace', 'Administration, permissions and approvals'],
    distinction: 'An AI Assistant helps in a conversation. An AI Collaborator takes ownership of missions.',
    collaboratorTitle: '1. AI Collaborators',
    collaboratorPrice: '€49/month per Collaborator',
    collaboratorBody: '€49 per month for each identity with dedicated resources and its own Hermes instance.',
    totalKicker: 'Your price',
    totalTitle: 'Monthly total',
    totalNote: 'Excludes additional usage. First mission free.',
    continue: 'Continue with this configuration',
    collaboratorIncludes: ['Identity and memory', 'Email, calendar and phone', 'Dedicated Hermes instance', '1 million tokens included', '60 phone minutes included'],
    usageKicker: '3. Usage',
    usageTitle: 'Everything runs on credits',
    usagePrice: 'Included with your license',
    usageBody: 'Credits fund AI models, external APIs and additional phone minutes. Top up your balance from €25.',
    creditsLink: 'See detailed credit costs',
    creditUses: ['AI models and search', 'Images, video, audio and transcription', 'External APIs and phone'],
    subscription: 'Monthly subscription',
    selectedCredits: 'Included credits',
    includedDetail: 'View included resource details',
    companyCredits: 'Shared AI credits included with the license',
    collaboratorTokens: 'Tokens included with AI Collaborators',
    collaboratorMinutes: 'Included phone minutes',
    creditNote: 'Included credits are consumed as used. No automatic overage or top-up.',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  const [leadStart, leadEnd = ''] = t.lead.split('Alma')
  return <section className="relative scroll-mt-[76px] overflow-hidden border-b border-[#D8CEBE] bg-[#EAE3D4] px-5 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-40"><div aria-hidden className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full border border-[#D10E63]/15 sm:right-[8%] sm:size-96"/><div aria-hidden className="pointer-events-none absolute -right-8 top-24 size-40 rounded-full bg-[#D10E63]/[.045] blur-2xl sm:right-[16%] sm:size-56"/><div className="relative mx-auto w-full max-w-6xl"><Kicker>{t.kicker}</Kicker><h1 className="mt-6 max-w-6xl text-balance font-sf text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.064em]">{t.title}<span className="text-[#D10E63] lg:block"> {t.accent}</span></h1><div className="mt-5 grid gap-5 sm:mt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10"><div><p className="max-w-3xl text-pretty text-[15px] font-medium leading-6 text-[#322E29] sm:text-[16px] sm:font-normal sm:leading-7 sm:text-[#4E483F]">{leadStart}{leadEnd && <><AlmaInline className="mx-1 align-[-.18em]"/>Alma{leadEnd}</>}</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/marketplace/collaborateurs-ia" className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><Link href="/missions" className="inline-flex min-h-12 items-center rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-6 text-sm font-bold">{t.secondary}</Link></div></div><ul className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-[#322E29] sm:flex-wrap sm:pb-0 sm:text-[12px] sm:text-[#4E483F] lg:max-w-[32rem] lg:justify-end">{t.reassurance.map(item => <li key={item} className="flex min-h-9 shrink-0 items-center gap-2 rounded-full border border-[#BEB2A1] bg-[#FAF8F3] px-3 shadow-[0_1px_0_rgba(28,26,23,.04)] sm:min-h-8 sm:border-[#CFC3B2] sm:bg-[#F3EFE6]/70"><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{item}</li>)}</ul></div></div></section>
}

export function PricingCollaboration() {
  const { lang } = useLanguage()
  const t = COPY[lang]
  const [organizationTier, setOrganizationTier] = useState<OrganizationTierId>('solo')
  const [collaborators, setCollaborators] = useState(1)
  const [pending, setPending] = useState(false)
  const organizationPrice = organizationMonthlyPrice(organizationTier)
  const subscriptionTotal = organizationPrice + collaborators * unitalkPricing.aiCollaborator.monthlyPrice
  const includedCredits = unitalkPricing.organization[organizationTier].includedCredits
  const includedTokens = collaborators * unitalkPricing.aiCollaborator.includedTokens
  const includedPhoneMinutes = collaborators * unitalkPricing.aiCollaborator.includedPhoneMinutes
  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft({ organizationTier, collaborators, usageMode: 'credits', creditBudget: 0 }).catch(() => setPending(false)))
  }

  return <div id="detail-tarifs" className="scroll-mt-24">
    <section className="px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><h2 className="max-w-5xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.pricingTitle}</h2><div className="mt-10 grid gap-4 lg:grid-cols-3">
      <section className="flex flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{t.collaboratorTitle}</h3><p className="mt-3 text-base font-bold text-[#B00C54]">{t.collaboratorPrice}</p><p className="mt-3 text-sm leading-6 text-[#625B50]">{t.collaboratorBody}</p><ul className="mt-6 space-y-2 text-xs font-semibold text-[#4E483F]">{t.collaboratorIncludes.map(item => <li key={item} className="flex gap-2"><Check className="size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><div className="mt-auto pt-7"><div className="inline-flex items-center rounded-full border border-[#CFC5B5] bg-white p-1"><button type="button" aria-label={lang === 'fr' ? 'Retirer un Collaborateur IA' : 'Remove an AI Collaborator'} disabled={collaborators === 0} onClick={() => setCollaborators(count => Math.max(0, count - 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6] disabled:opacity-30"><Minus className="size-4"/></button><output aria-live="polite" className="min-w-14 text-center text-sm font-black">{collaborators}</output><button type="button" aria-label={lang === 'fr' ? 'Ajouter un Collaborateur IA' : 'Add an AI Collaborator'} onClick={() => setCollaborators(count => Math.min(100, count + 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6]"><Plus className="size-4"/></button></div></div></section>
      <section className="flex flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{t.companyTitle}</h3><p className="mt-3 text-base font-bold text-[#B00C54]">{t.companyPrice}</p><p className="mt-3 text-sm leading-6 text-[#625B50]">{t.companyBody}</p><p className="mt-3 text-xs font-bold text-[#B00C54]">{t.companyNote}</p><ul className="mt-6 space-y-2 text-xs font-semibold text-[#4E483F]">{t.companyIncludes.map(item => <li key={item} className="flex gap-2"><Check className="size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><label className="mt-auto block pt-7"><span className="sr-only">{t.companyTitle}</span><select value={organizationTier} onChange={(event) => setOrganizationTier(event.target.value as OrganizationTierId)} className="h-12 w-full rounded-xl border border-[#CFC5B5] bg-white px-4 text-sm font-bold outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15">{t.tiers.map((tier) => <option key={tier.id} value={tier.id}>{tier.users} · {tier.price}{tier.id !== 'solo' ? (lang === 'fr' ? '/mois' : '/month') : ''}</option>)}</select></label></section>
      <section className="flex flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{t.usageTitle}</h3><p className="mt-3 text-base font-bold text-[#B00C54]">{t.usagePrice}</p><p className="mt-3 text-sm leading-6 text-[#625B50]">{t.usageBody}</p><details className="group mt-6 rounded-xl border border-[#D8D0C2] bg-[#F0EBE1]"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 text-sm font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{t.tiers.find(tier => tier.id === organizationTier)?.credits}</span><span aria-hidden className="text-[#B00C54] transition-transform group-open:rotate-45">+</span></summary><dl className="border-t border-[#D8D0C2] px-4 py-3 text-xs"><div className="flex justify-between gap-4 py-2"><dt className="text-[#625B50]">{t.companyCredits}</dt><dd className="shrink-0 font-bold">{includedCredits.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}</dd></div><div className="flex justify-between gap-4 border-t border-[#D8D0C2] py-2"><dt className="text-[#625B50]">{t.collaboratorTokens}</dt><dd className="shrink-0 font-bold">{includedTokens.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}</dd></div><div className="flex justify-between gap-4 border-t border-[#D8D0C2] py-2"><dt className="text-[#625B50]">{t.collaboratorMinutes}</dt><dd className="shrink-0 font-bold">{includedPhoneMinutes} min</dd></div></dl></details><p className="mt-2 text-[10px] text-[#857C6E]">{t.includedDetail}</p><ul className="mt-5 space-y-2 text-xs font-semibold text-[#4E483F]">{t.creditUses.map(item => <li key={item} className="flex gap-2"><Check className="size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><Link href="/credits" className="mt-auto inline-flex items-center pt-6 text-xs font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.creditsLink}<ArrowRight className="ml-2 size-3.5"/></Link></section>
    </div><section className="mt-4 overflow-hidden rounded-[24px] bg-[#181615] p-6 text-white sm:p-8"><div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.totalKicker}</p><h3 className="mt-3 text-2xl font-semibold">{t.totalTitle}</h3><dl className="mt-6 grid max-w-2xl gap-3 text-sm sm:grid-cols-3"><div><dt className="text-[#AFA397]">{lang === 'fr' ? 'Collaborateurs IA' : 'AI Collaborators'}</dt><dd className="mt-1 font-bold">{collaborators} × 49 €</dd></div><div><dt className="text-[#AFA397]">{lang === 'fr' ? 'Licence Workspace Unitalk' : 'Unitalk Workspace license'}</dt><dd className="mt-1 font-bold">{t.tiers.find(tier => tier.id === organizationTier)?.users} · {organizationPrice} €/{lang === 'fr' ? 'mois' : 'month'}</dd></div><div><dt className="text-[#AFA397]">{t.selectedCredits}</dt><dd className="mt-1 font-bold">{includedCredits.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}</dd></div></dl></div><div className="lg:text-right"><p className="text-xs font-bold text-[#AFA397]">{t.subscription}</p><p className="mt-1 text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-.07em]" aria-live="polite">{subscriptionTotal} €<span className="ml-1 text-xs font-normal tracking-normal text-[#AFA397]">/{lang === 'fr' ? 'mois' : 'month'}</span></p><button type="button" onClick={submit} disabled={pending} className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white disabled:opacity-60">{pending ? (lang === 'fr' ? 'Préparation…' : 'Preparing...') : t.continue}<ArrowRight className="ml-2 size-4"/></button></div></div><p className="mt-6 border-t border-white/10 pt-4 text-xs text-[#CFC6B8]">{t.creditNote}</p></section></div></section>
  </div>
}
