'use client'

import Link from 'next/link'
import { startTransition, useState } from 'react'
import { ArrowRight, Check, Minus, Plus, Sparkles } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import { AlmaInline } from '@/components/alma-inline'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import { organizationMonthlyPrice, unitalkPricing, type OrganizationTierId } from '@/lib/unitalk-pricing'

const COPY = {
  fr: {
    kicker: 'Offre de lancement',
    title: 'Confiez une première mission',
    accent: 'à votre Collaborateur IA.',
    leadStart: 'Choisissez un Collaborateur IA ou partez d’une mission. ',
    leadEnd: ' vous aide à définir son rôle, ses compétences et les accès nécessaires.',
    primary: 'Choisir un Collaborateur IA',
    secondary: 'Explorer les missions',
    reassurance: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire'],
    pricingTitle: 'Votre Collaborateur IA, votre Workspace et votre prix.',
    collaboratorTitle: '1. Collaborateur IA',
    collaboratorPrice: '49 €/mois par Collaborateur',
    collaboratorBody: 'Une identité capable de prendre en charge des missions avec son environnement Hermes dédié.',
    collaboratorIncludes: ['Identité et mémoire', 'Instance Hermes dédiée', 'Profils métier et compétences illimités', 'Email, calendrier et téléphone'],
    workspaceTitle: '2. Workspace Unitalk',
    workspacePrice: 'Gratuit, 49 € ou 299 €/mois',
    workspaceBody: 'Un forfait pour toute l’entreprise. Aucun prix par siège.',
    workspaceIncludes: ['Assistants IA privés ou partagés illimités', 'Workspace Web et Desktop', '3 000+ applications via Pipedream', 'Modèles multimodaux, droits et validations'],
    tiers: [
      { id: 'solo', users: '1 utilisateur', price: 'Gratuit' },
      { id: 'team', users: '2 à 10 utilisateurs', price: '49 €/mois' },
      { id: 'business', users: '11 à 100 utilisateurs', price: '299 €/mois' },
    ],
    summaryTitle: '3. Votre total',
    workspaceCredits: 'Crédits Workspace',
    collaboratorTokens: 'Tokens Collaborateurs',
    phoneMinutes: 'Téléphone',
    noWorkspaceCredits: 'Première mission offerte',
    totalKicker: 'Votre configuration',
    today: 'Aujourd’hui',
    todayDetail: 'Première mission offerte',
    afterApproval: 'Après votre validation',
    collaboratorsLine: 'Collaborateurs IA',
    workspaceLine: 'Licence Workspace Unitalk',
    creditsLine: 'Crédits inclus',
    totalNote: 'Aucun abonnement, dépassement ou rechargement automatique.',
    continue: 'Continuer avec cette configuration',
    creditsKicker: 'Crédits inclus et consommation',
    creditsTitle: 'Des ressources incluses. Le reste à l’usage.',
    creditsBody: 'Votre Workspace apporte des crédits partagés. Chaque Collaborateur ajoute ses propres tokens et minutes de téléphone. Rechargez à partir de 25 € uniquement lorsque vous le décidez.',
    examples: [
      ['Conversation et recherche', 'Questions, synthèses et recherche documentaire consomment peu de crédits.'],
      ['Création multimodale', 'Images, vidéo, audio et transcription utilisent davantage de crédits selon le modèle.'],
      ['Mission avec outils', 'Les API externes et les minutes de téléphone sont débitées lorsqu’elles sont réellement utilisées.'],
    ],
    creditsLink: 'Voir le coût détaillé des crédits',
  },
  en: {
    kicker: 'Launch offer',
    title: 'Assign a first mission',
    accent: 'to your AI Collaborator.',
    leadStart: 'Choose an AI Collaborator or start from a mission. ',
    leadEnd: ' helps define its role, skills and required access.',
    primary: 'Choose an AI Collaborator',
    secondary: 'Explore missions',
    reassurance: ['First mission free', 'No credit card', 'No commitment', 'Human support when needed'],
    pricingTitle: 'Your AI Collaborator, your Workspace and your price.',
    collaboratorTitle: '1. AI Collaborator',
    collaboratorPrice: '€49/month per Collaborator',
    collaboratorBody: 'An identity that can own missions with its dedicated Hermes environment.',
    collaboratorIncludes: ['Identity and memory', 'Dedicated Hermes instance', 'Unlimited job profiles and skills', 'Email, calendar and phone'],
    workspaceTitle: '2. Unitalk Workspace',
    workspacePrice: 'Free, €49 or €299/month',
    workspaceBody: 'One plan for the whole organization. No per-seat pricing.',
    workspaceIncludes: ['Unlimited private or shared AI Assistants', 'Web and Desktop Workspace', '3,000+ applications via Pipedream', 'Multimodal models, permissions and approvals'],
    tiers: [
      { id: 'solo', users: '1 user', price: 'Free' },
      { id: 'team', users: '2 to 10 users', price: '€49/month' },
      { id: 'business', users: '11 to 100 users', price: '€299/month' },
    ],
    summaryTitle: '3. Your total',
    workspaceCredits: 'Workspace credits',
    collaboratorTokens: 'Collaborator tokens',
    phoneMinutes: 'Phone',
    noWorkspaceCredits: 'First mission free',
    totalKicker: 'Your configuration',
    today: 'Today',
    todayDetail: 'First mission free',
    afterApproval: 'After your approval',
    collaboratorsLine: 'AI Collaborators',
    workspaceLine: 'Unitalk Workspace license',
    creditsLine: 'Included credits',
    totalNote: 'No automatic subscription, overage or top-up.',
    continue: 'Continue with this configuration',
    creditsKicker: 'Included credits and usage',
    creditsTitle: 'Resources included. Everything else as used.',
    creditsBody: 'Your Workspace provides shared credits. Each Collaborator adds its own tokens and phone minutes. Top up from €25 only when you decide.',
    examples: [
      ['Conversation and research', 'Questions, summaries and document research use few credits.'],
      ['Multimodal creation', 'Images, video, audio and transcription use more credits depending on the model.'],
      ['Tool-based mission', 'External APIs and phone minutes are charged only when actually used.'],
    ],
    creditsLink: 'See detailed credit costs',
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return <section className="relative scroll-mt-[76px] overflow-hidden border-b border-[#D8CEBE] bg-[#EAE3D4] px-5 pb-7 pt-28 sm:px-8 sm:pb-10 sm:pt-40"><div aria-hidden className="pointer-events-none absolute -right-24 top-10 size-72 rounded-full border border-[#D10E63]/15 sm:right-[8%] sm:size-96"/><div aria-hidden className="pointer-events-none absolute -right-8 top-24 size-40 rounded-full bg-[#D10E63]/[.045] blur-2xl sm:right-[16%] sm:size-56"/><div className="relative mx-auto w-full max-w-6xl"><Kicker><span className="inline-flex items-center gap-2"><Sparkles className="size-4 fill-[#D10E63]/15"/>{t.kicker}</span></Kicker><h1 className="mt-6 max-w-6xl text-balance font-sf text-[clamp(2.35rem,5vw,5rem)] font-semibold leading-[.9] tracking-[-.064em]">{t.title}<span className="text-[#D10E63] lg:block"> {t.accent}</span></h1><div className="mt-5 grid gap-5 sm:mt-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10"><div><p className="max-w-3xl text-pretty text-[15px] font-medium leading-6 text-[#322E29] sm:text-[16px] sm:font-normal sm:leading-7 sm:text-[#4E483F]">{t.leadStart}<AlmaInline className="mx-1 align-[-.18em]"/>Alma{t.leadEnd}</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/marketplace/collaborateurs-ia" className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><Link href="/missions" className="inline-flex min-h-12 items-center rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-6 text-sm font-bold">{t.secondary}</Link></div></div><ul className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-[#322E29] sm:flex-wrap sm:pb-0 sm:text-[12px] sm:text-[#4E483F] lg:max-w-[32rem] lg:justify-end">{t.reassurance.map(item => <li key={item} className="flex min-h-9 shrink-0 items-center gap-2 rounded-full border border-[#BEB2A1] bg-[#FAF8F3] px-3 sm:min-h-8"><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{item}</li>)}</ul></div></div></section>
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
      <PricingCard title={t.collaboratorTitle} price={t.collaboratorPrice} body={t.collaboratorBody} items={t.collaboratorIncludes}><Counter value={collaborators} onChange={setCollaborators} lang={lang}/></PricingCard>
      <PricingCard title={t.workspaceTitle} price={t.workspacePrice} body={t.workspaceBody} items={t.workspaceIncludes}><label className="block"><span className="sr-only">{t.workspaceTitle}</span><select value={organizationTier} onChange={(event) => setOrganizationTier(event.target.value as OrganizationTierId)} className="h-12 w-full rounded-xl border border-[#CFC5B5] bg-white px-4 text-sm font-bold outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15">{t.tiers.map(tier => <option key={tier.id} value={tier.id}>{tier.users} · {tier.price}</option>)}</select></label></PricingCard>
      <section className="flex flex-col rounded-[24px] bg-[#181615] p-6 text-white sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{t.summaryTitle}</h3>{collaborators > 0 && <div className="mt-6 rounded-xl border border-white/10 bg-white/[.04] p-4"><p className="text-xs font-bold text-[#AFA397]">{t.today}</p><p className="mt-1 text-3xl font-semibold text-[#F2A4C5]">0 €</p><p className="mt-1 text-xs text-[#AFA397]">{t.todayDetail}</p></div>}<dl className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm">{collaborators > 0 && <Summary label={t.collaboratorsLine} value={`${collaborators} × 49 €`}/>}<Summary label={t.workspaceLine} value={`${organizationPrice} €/${lang === 'fr' ? 'mois' : 'month'}`}/></dl><div className="mt-auto pt-7"><p className="text-xs font-bold text-[#AFA397]">{t.afterApproval}</p><p className="mt-1 text-[clamp(3rem,6vw,5rem)] font-semibold leading-none tracking-[-.07em]" aria-live="polite">{subscriptionTotal} €<span className="ml-1 text-xs font-normal tracking-normal text-[#AFA397]">/{lang === 'fr' ? 'mois' : 'month'}</span></p><button type="button" onClick={submit} disabled={pending} className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold text-white disabled:opacity-60">{pending ? (lang === 'fr' ? 'Préparation…' : 'Preparing...') : t.continue}<ArrowRight className="ml-2 size-4"/></button><p className="mt-4 text-xs leading-5 text-[#CFC6B8]">{t.totalNote}</p></div></section>
    </div></div></section>

    <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-16 sm:px-8 sm:py-24"><div className="editorial-shell"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.creditsKicker}</p><div className="mt-5 grid gap-5 lg:grid-cols-[1fr_.8fr] lg:items-end"><h2 className="max-w-4xl text-balance text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.creditsTitle}</h2><div><p className="text-[15px] leading-7 text-[#625B50]">{t.creditsBody}</p><Link href="/credits" className="mt-4 inline-flex items-center text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.creditsLink}<ArrowRight className="ml-2 size-4"/></Link></div></div><dl className="mt-10 grid overflow-hidden rounded-[22px] border border-[#CFC5B5] bg-[#FAF8F3] md:grid-cols-3"><Resource label={t.workspaceCredits} value={includedCredits ? includedCredits.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US') : t.noWorkspaceCredits}/><Resource label={t.collaboratorTokens} value={includedTokens.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}/><Resource label={t.phoneMinutes} value={`${includedPhoneMinutes} min`}/></dl><div className="mt-6 grid gap-px overflow-hidden rounded-[22px] border border-[#CFC5B5] bg-[#CFC5B5] md:grid-cols-3">{t.examples.map(([title, body]) => <article key={title} className="bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p></article>)}</div></div></section>
  </div>
}

function PricingCard({ title, price, body, items, children }: { title: string; price: string; body: string; items: readonly string[]; children: React.ReactNode }) {
  return <section className="flex flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 sm:p-7"><h3 className="text-2xl font-semibold tracking-[-.04em]">{title}</h3><p className="mt-3 text-base font-bold text-[#B00C54]">{price}</p>{body && <p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p>}{items.length > 0 && <ul className="mt-6 space-y-2 text-xs font-semibold text-[#4E483F]">{items.map(item => <li key={item} className="flex gap-2"><Check className="size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul>}<div className="mt-auto pt-7">{children}</div></section>
}

function Counter({ value, onChange, lang }: { value: number; onChange: (value: number) => void; lang: 'fr' | 'en' }) {
  return <div className="inline-flex items-center rounded-full border border-[#CFC5B5] bg-white p-1"><button type="button" aria-label={lang === 'fr' ? 'Retirer un Collaborateur IA' : 'Remove an AI Collaborator'} disabled={value === 0} onClick={() => onChange(Math.max(0, value - 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6] disabled:opacity-30"><Minus className="size-4"/></button><output aria-live="polite" className="min-w-14 text-center text-sm font-black">{value}</output><button type="button" aria-label={lang === 'fr' ? 'Ajouter un Collaborateur IA' : 'Add an AI Collaborator'} onClick={() => onChange(Math.min(100, value + 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6]"><Plus className="size-4"/></button></div>
}

function Resource({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] px-4 py-3 last:border-0"><dt className="text-[#625B50]">{label}</dt><dd className="shrink-0 font-bold">{value}</dd></div>
}

function Summary({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 py-3"><dt className="text-[#AFA397]">{label}</dt><dd className="text-right font-bold">{value}</dd></div>
}
