'use client'

import Link from 'next/link'
import { startTransition, useState, type ReactNode } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { persistPricingDraft } from '@/app/actions/pricing'
import { AlmaInline } from '@/components/alma-inline'
import { Kicker } from '@/components/home/section-kicker'
import { useLanguage } from '@/lib/language-context'
import { organizationMonthlyPrice, unitalkPricing, type OrganizationTierId } from '@/lib/unitalk-pricing'

const COPY = {
  fr: {
    kicker: 'Tarifs simples · Un forfait par entreprise',
    title: 'Confiez une première mission',
    accent: 'à votre Collaborateur IA.',
    leadStart: 'Choisissez un Collaborateur IA ou partez du travail à accomplir. ',
    leadEnd: ' prépare son rôle, ses compétences et ses accès pour produire un premier résultat.',
    primary: 'Choisir un Collaborateur IA',
    secondary: 'Explorer les missions',
    reassurance: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement'],
    humanSupport: 'Accompagnement humain si nécessaire',
    pricingTitle: ['Vos Collaborateurs IA.', 'Vos données. Votre savoir-faire.'],
    collaboratorTitle: 'Par Collaborateur IA',
    collaboratorPrice: '49 €/mois',
    collaboratorBody: 'Une identité numérique permanente rattachée à une personne, une équipe ou toute votre entreprise.',
    collaboratorIncludes: ['Prise en charge des missions', 'Profils métier et compétences illimités', 'Mémoire privée et partagée', 'Email, calendrier et téléphone', 'Disponible dans Slack, Teams, WhatsApp, Telegram…', 'Instance Hermes dédiée'],
    workspaceTitle: 'Pour toute votre entreprise',
    workspaceBody: 'L’espace de travail où humains et Collaborateurs IA collaborent.',
    workspaceIncludes: ['Assistants d’équipe illimités', 'Workspace Web et Desktop', 'Serveur d’IA et d’automatisation (n8n)', 'Fonctionne avec plus de 3 000 applications', 'Accès aux dernières versions des modèles multimodaux', 'Interface unique de gestion des collaborateurs humains et IA : droits, validations et missions'],
    tiers: [
      { id: 'solo', users: '1 utilisateur', price: 'Gratuit' },
      { id: 'team', users: '2 à 10 utilisateurs', price: '49 €/mois' },
      { id: 'business', users: '11 à 100 utilisateurs', price: '299 €/mois' },
    ],
    resourcesTitle: 'Crédits inclus et consommation',
    resourcesBody: 'Les crédits Workspace et les ressources propres à chaque Collaborateur sont deux enveloppes distinctes.',
    workspaceCredits: 'Crédits Workspace',
    collaboratorTokens: 'Tokens Collaborateurs',
    phoneMinutes: 'Minutes de téléphone',
    topUp: 'Recharge dès 25 €',
    creditsLink: 'Voir le coût des crédits',
    summaryTitle: 'Votre total',
    afterApproval: 'Après votre première mission offerte',
    collaboratorsLine: 'Collaborateurs IA',
    workspaceLine: 'Licence Workspace',
    includedLine: 'Crédits Workspace inclus',
    collaboratorCreditsLine: 'Crédits IA inclus',
    collaboratorCreditsValue: '1 M de tokens',
    totalNote: 'Ajoutez ensuite des Crédits IA prépayés ou vos propres clés API selon vos besoins.',
    continueWithTeam: 'Commencer avec cette équipe',
    createWorkspace: 'Créer mon Workspace',
    creditsKicker: 'Consommation à l’usage',
    creditsTitle: 'Vous ne payez que ce que vous consommez.',
    creditsBody: 'Les crédits financent les modèles et les outils externes. Le coût dépend du modèle, du service et de la complexité de la mission.',
    examples: [
      ['Conversation et recherche', 'Faible consommation'],
      ['Images, audio et vidéo', 'Consommation variable'],
      ['API et téléphone', 'Facturation à l’usage'],
    ],
  },
  en: {
    kicker: 'Simple pricing · One plan per organization',
    title: 'Assign a first mission',
    accent: 'to your AI Collaborator.',
    leadStart: 'Choose an AI Collaborator or start from the work to be done. ',
    leadEnd: ' prepares its role, skills and access to deliver a first result.',
    primary: 'Choose an AI Collaborator',
    secondary: 'Explore missions',
    reassurance: ['First mission free', 'No credit card', 'No commitment'],
    humanSupport: 'Human support when needed',
    pricingTitle: ['Your AI Collaborators.', 'Your data. Your know-how.'],
    collaboratorTitle: 'Per AI Collaborator',
    collaboratorPrice: '€49/month',
    collaboratorBody: 'A permanent digital identity assigned to a person, a team or your entire organization.',
    collaboratorIncludes: ['Takes ownership of missions', 'Unlimited job profiles and skills', 'Private and shared memory', 'Email, calendar and phone', 'Messaging apps (Slack, Teams, WhatsApp, Telegram…)', 'Dedicated Hermes instance'],
    workspaceTitle: 'For your entire organization',
    workspaceBody: 'The workspace where people and AI Collaborators work together.',
    workspaceIncludes: ['Unlimited team assistants', 'Web and Desktop Workspace', 'AI and automation server (n8n)', 'Connections to more than 3,000 applications', 'Access to the latest multimodal model versions', 'One interface to manage human and AI collaborators: permissions, approvals and missions'],
    tiers: [
      { id: 'solo', users: '1 user', price: 'Free' },
      { id: 'team', users: '2 to 10 users', price: '€49/month' },
      { id: 'business', users: '11 to 100 users', price: '€299/month' },
    ],
    resourcesTitle: 'Included credits and usage',
    resourcesBody: 'Workspace credits and each Collaborator’s included resources are two separate allowances.',
    workspaceCredits: 'Workspace credits',
    collaboratorTokens: 'Collaborator tokens',
    phoneMinutes: 'Phone minutes',
    topUp: 'Top up from €25',
    creditsLink: 'See credit costs',
    summaryTitle: 'Your total',
    afterApproval: 'After your free first mission',
    collaboratorsLine: 'AI Collaborators',
    workspaceLine: 'Workspace license',
    includedLine: 'Included Workspace credits',
    collaboratorCreditsLine: 'Included AI credits',
    collaboratorCreditsValue: '1M tokens',
    totalNote: 'Add prepaid AI Credits or your own API keys.',
    continueWithTeam: 'Start with this team',
    createWorkspace: 'Create my Workspace',
    creditsKicker: 'Usage-based consumption',
    creditsTitle: 'Pay only for services actually used.',
    creditsBody: 'Credits fund models and external tools. Cost depends on the model, service and mission complexity.',
    examples: [
      ['Conversation and research', 'Low consumption'],
      ['Images, audio and video', 'Variable consumption'],
      ['APIs and phone', 'Usage-based billing'],
    ],
  },
} as const

export function PricingHero() {
  const { lang } = useLanguage()
  const t = COPY[lang]

  return <section className="relative overflow-hidden border-b border-[#D8CEBE] bg-[#EAE3D4] px-5 pb-8 pt-28 sm:px-8 sm:pb-9 sm:pt-32"><div aria-hidden className="pointer-events-none absolute -right-24 top-8 size-72 rounded-full border border-[#D10E63]/15 sm:right-[8%] sm:size-80"/><div aria-hidden className="pointer-events-none absolute -right-8 top-20 size-40 rounded-full bg-[#D10E63]/[.045] blur-2xl sm:right-[16%] sm:size-52"/><div className="relative mx-auto w-full max-w-6xl"><Kicker>{t.kicker}</Kicker><h1 className="mt-5 max-w-5xl text-balance font-sf text-[clamp(2.35rem,5vw,4.8rem)] font-semibold leading-[.91] tracking-[-.064em]"><span className="block">{t.title}</span><span className="block text-[#D10E63]">{t.accent}</span></h1><div className="mt-5 grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10"><div><p className="max-w-3xl text-pretty text-[15px] leading-7 text-[#4E483F] sm:text-[16px]">{t.leadStart}<span className="whitespace-nowrap"><AlmaInline className="mx-1 size-4 align-[-.15em]"/>Alma</span>{t.leadEnd}</p><div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3"><Link href="/marketplace/collaborateurs-ia" className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white outline-none transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.primary}<ArrowRight className="ml-2 size-4"/></Link><Link href="/missions" className="inline-flex min-h-11 items-center border-b border-[#857C6E] text-sm font-bold text-[#4E483F] outline-none hover:border-[#D10E63] hover:text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.secondary}<ArrowRight className="ml-2 size-4"/></Link></div><p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-[#625B50]"><Check className="size-3.5 text-[#D10E63]"/>{t.humanSupport}</p></div><ul className="flex gap-2 overflow-x-auto pb-1 text-[11px] font-bold text-[#4E483F] sm:flex-wrap sm:text-[12px] lg:max-w-[24rem] lg:justify-end">{t.reassurance.map((item, index) => <li key={item} className={`flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3 ${index === 0 ? 'border-[#D10E63]/30 bg-[#FCE6EF] text-[#B00C54]' : 'border-[#CFC3B2] bg-[#F3EFE6]/70'}`}><span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>{item}</li>)}</ul></div></div></section>
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
  const includedCreditsLabel = `${includedCredits.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')} ${lang === 'fr' ? 'crédits' : 'credits'}`
  const includedTokens = collaborators * unitalkPricing.aiCollaborator.includedTokens
  const includedPhoneMinutes = collaborators * unitalkPricing.aiCollaborator.includedPhoneMinutes
  const selectedTier = t.tiers.find(tier => tier.id === organizationTier)!

  function submit() {
    setPending(true)
    startTransition(() => persistPricingDraft({ organizationTier, collaborators, usageMode: 'credits', creditBudget: 0 }).catch(() => setPending(false)))
  }

  return <div id="detail-tarifs" className="scroll-mt-24">
    <section className="px-5 py-14 sm:px-8 sm:py-20"><div className="editorial-shell"><h2 className="max-w-5xl text-[clamp(2.3rem,4.6vw,4.4rem)] font-semibold leading-[.95] tracking-[-.055em]"><span className="block">{t.pricingTitle[0]}</span><span className="block text-[#D10E63]">{t.pricingTitle[1]}</span></h2><div className="mt-9 grid items-stretch gap-4 lg:auto-rows-[500px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_320px]">
      <PricingCard title={t.collaboratorTitle} price={t.collaboratorPrice} body={t.collaboratorBody} items={t.collaboratorIncludes}><Counter value={collaborators} onChange={setCollaborators} lang={lang}/></PricingCard>
      <PricingCard title={t.workspaceTitle} price={selectedTier.price} body={t.workspaceBody} items={t.workspaceIncludes}><label className="block"><span className="sr-only">{t.workspaceTitle}</span><select value={organizationTier} onChange={(event) => setOrganizationTier(event.target.value as OrganizationTierId)} className="h-12 w-full rounded-xl border border-[#CFC5B5] bg-white px-4 text-sm font-bold outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15">{t.tiers.map(tier => <option key={tier.id} value={tier.id}>{tier.users} · {tier.price}</option>)}</select></label></PricingCard>
      <section className="flex h-full flex-col rounded-[24px] bg-[#181615] p-5 text-white sm:p-6"><h3 className="text-2xl font-semibold tracking-[-.04em]">{t.summaryTitle}</h3><dl className="mt-5 divide-y divide-white/10 border-y border-white/10 text-sm">{collaborators > 0 && <Summary label={t.collaboratorsLine} value={`${collaborators} × 49 €`}/>}<Summary label={<><span className="block">{t.workspaceLine}</span><span className="mt-1 block text-[11px] text-[#AFA397]">{selectedTier.users}</span></>} value={organizationPrice === 0 ? (lang === 'fr' ? 'Gratuite' : 'Free') : `${organizationPrice} €/${lang === 'fr' ? 'mois' : 'month'}`}/><Summary label={collaborators > 0 ? t.collaboratorCreditsLine : t.includedLine} value={collaborators > 0 ? t.collaboratorCreditsValue : includedCreditsLabel}/></dl><div className="mt-auto pt-5"><p className="text-xs font-bold text-[#AFA397]">{t.afterApproval}</p><p className="mt-1 text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-none tracking-[-.07em]" aria-live="polite">{subscriptionTotal} €<span className="ml-1 text-xs font-normal tracking-normal text-[#AFA397]">/{lang === 'fr' ? 'mois' : 'month'}</span></p><button type="button" onClick={submit} disabled={pending} className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white disabled:opacity-60">{pending ? (lang === 'fr' ? 'Préparation…' : 'Preparing...') : collaborators > 0 ? t.continueWithTeam : t.createWorkspace}<ArrowRight className="ml-2 size-4"/></button><p className="mt-3 text-[11px] leading-5 text-[#CFC6B8]">{t.totalNote}</p></div></section>
    </div></div></section>

    <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-14 sm:px-8 sm:py-20"><div className="editorial-shell"><div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr] lg:items-end"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.creditsKicker}</p><h2 className="mt-5 max-w-3xl text-balance text-[clamp(2.3rem,4.5vw,4.3rem)] font-semibold leading-[.95] tracking-[-.055em]">{t.creditsTitle}</h2></div><div><p className="text-[15px] leading-7 text-[#625B50]">{t.creditsBody}</p><Link href="/credits" className="mt-4 inline-flex items-center text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.creditsLink}<ArrowRight className="ml-2 size-4"/></Link></div></div><dl className="mt-9 grid overflow-hidden rounded-[20px] border border-[#CFC5B5] bg-[#FAF8F3] md:grid-cols-3"><Resource label={t.workspaceCredits} value={includedCreditsLabel}/><Resource label={t.collaboratorTokens} value={includedTokens.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US')}/><Resource label={t.phoneMinutes} value={`${includedPhoneMinutes} min`}/></dl><div className="mt-4 grid gap-px overflow-hidden rounded-[20px] border border-[#CFC5B5] bg-[#CFC5B5] md:grid-cols-3">{t.examples.map(([title, body]) => <article key={title} className="bg-[#FAF8F3] p-5"><h3 className="text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></article>)}</div></div></section>
  </div>
}

function PricingCard({ title, price, body, items, children }: { title: string; price: string; body: string; items: readonly string[]; children: ReactNode }) {
  return <section className="flex h-full flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-5 sm:p-6"><h3 className="min-h-14 text-2xl font-semibold leading-7 tracking-[-.04em]">{title}</h3><p className="mt-4 text-[2rem] font-semibold leading-none tracking-[-.05em] text-[#D10E63]">{price}</p><p className="mt-3 min-h-12 text-sm leading-6 text-[#625B50]">{body}</p><ul className="mt-4 space-y-1.5 text-xs font-semibold text-[#4E483F]">{items.map(item => <li key={item} className="flex gap-2"><Check className="size-3.5 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul><div className="mt-auto pt-5">{children}</div></section>
}

function Counter({ value, onChange, lang }: { value: number; onChange: (value: number) => void; lang: 'fr' | 'en' }) {
  return <div className="inline-flex items-center rounded-full border border-[#CFC5B5] bg-white p-1"><button type="button" aria-label={lang === 'fr' ? 'Retirer un Collaborateur IA' : 'Remove an AI Collaborator'} disabled={value === 0} onClick={() => onChange(Math.max(0, value - 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6] disabled:opacity-30"><Minus className="size-4"/></button><output aria-live="polite" className="min-w-14 text-center text-sm font-black">{value}</output><button type="button" aria-label={lang === 'fr' ? 'Ajouter un Collaborateur IA' : 'Add an AI Collaborator'} onClick={() => onChange(Math.min(100, value + 1))} className="flex size-10 items-center justify-center rounded-full hover:bg-[#F3EFE6]"><Plus className="size-4"/></button></div>
}

function Resource({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] px-5 py-4 last:border-0 md:border-b-0 md:border-r md:last:border-r-0"><dt className="text-xs text-[#625B50]">{label}</dt><dd className="shrink-0 text-sm font-bold">{value}</dd></div>
}

function Summary({ label, value }: { label: ReactNode; value: string }) {
  return <div className="flex items-center justify-between gap-4 py-3"><dt className="text-[#AFA397]">{label}</dt><dd className="text-right font-bold">{value}</dd></div>
}
