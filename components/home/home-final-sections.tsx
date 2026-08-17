'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Blocks, BriefcaseBusiness, Building2, CalendarDays, Mail, MonitorCheck, ScanSearch, Server } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from './section-kicker'

const COPY = {
  fr: {
    doors: [
      ['J’ai un travail à confier', 'Décrire un résultat ou choisir une mission déjà cadrée.', 'Explorer les missions', '/missions'],
      ['Je veux comprendre le produit', 'Découvrir son identité, sa place et ses ressources.', 'En savoir plus', '/collaborateurs-ia'],
      ['Je veux voir comment travaille un Collaborateur IA', 'Suivre son activité et garder la main sur les décisions.', 'Découvrir le Workspace', '/workspace'],
      ['Je veux voir comment il évolue', 'Ajouter des capacités sans recréer son identité.', 'Explorer la Marketplace', '/marketplace'],
    ],
    anatomyKicker: 'Plus qu’un assistant IA',
    anatomyTitle: 'Votre Collaborateur IA a sa propre identité.',
    anatomyLead: 'Un Collaborateur IA est supervisé par un humain et appartient à votre entreprise. Il possède sa propre identité, ses moyens de communication, son environnement de travail et une place définie dans votre organisation.',
    anatomy: [['Identité IA', 'Prénom, visage et voix'], ['Communication', 'E-mail, calendrier et téléphone'], ['Exécution', 'Agent Hermes et serveur privé'], ['Organisation', 'Responsable, rattachement et droits']],
    anatomyCta: 'Découvrir le Collaborateur IA',
    anatomyLabel: 'Exemple de Collaboratrice IA',
    anatomyRole: 'Assistante de direction',
    evolutionKicker: 'Mission après mission',
    evolutionTitle: 'Votre Collaborateur IA évolue avec vos besoins.',
    evolutionLead: 'Il démarre avec une première mission. Pour les suivantes, ajoutez des profils métier et des compétences testées par la communauté, ou créez automatiquement vos propres compétences.',
    memoryTitle: 'Une mémoire propre, un savoir partagé.',
    memoryBody: 'Chaque Collaborateur IA conserve le contexte utile à son travail. Il accède aussi à la mémoire et aux connaissances partagées par l’entreprise, uniquement selon ses droits.',
    exampleKicker: 'Exemple',
    exampleTitle: 'Emma évolue sans être recréée.',
    exampleBody: 'Une mémoire propre, un savoir partagé. Chaque Collaborateur IA conserve le contexte utile à son travail. Il accède aussi à la mémoire et aux connaissances partagées par l’entreprise, uniquement selon ses droits.',
    governanceTitle: 'L’expérience reste gouvernée par votre entreprise.',
    governanceBody: 'Vos méthodes deviennent des compétences réutilisables. Vous choisissez qui peut les utiliser.',
    marketplaceCta: 'Explorer la Marketplace',
    finalKicker: 'Votre première mission',
    finalTitle: 'Quelle première mission allez-vous confier à votre Collaborateur IA ?',
    finalBody: 'Décrivez une mission réelle. Alma prépare le Collaborateur IA, les capacités nécessaires et les points à confirmer avec vous.',
    finalCta: 'Commencer gratuitement',
    finalProofs: ['Première mission offerte', 'Sans carte bancaire', 'Accompagnement humain si nécessaire', 'Sans engagement'],
  },
  en: {
    doors: [
      ['I have work to assign', 'Describe an outcome or choose an already scoped mission.', 'Explore missions', '/missions'],
      ['I want to understand the product', 'Discover its identity, place and resources.', 'Understand AI Collaborators', '/collaborateurs-ia'],
      ['I want to see how it works', 'Follow its activity and retain control of decisions.', 'Discover Workspace', '/workspace'],
      ['I want to see how it evolves', 'Add capabilities without recreating its identity.', 'Explore the Marketplace', '/marketplace'],
    ],
    anatomyKicker: 'More than an AI assistant',
    anatomyTitle: 'Your AI Collaborator has its own identity.',
    anatomyLead: 'An AI Collaborator is supervised by a human and belongs to your organization. It has its own identity, communications, working environment and a defined place in your organization.',
    anatomy: [['Identity', 'Name, face and voice'], ['Communication', 'Email, calendar and phone'], ['Execution', 'Hermes Agent and private server'], ['Organization', 'Owner, assignment and permissions']],
    anatomyCta: 'Discover the AI Collaborator',
    anatomyLabel: 'AI Collaborator example',
    anatomyRole: 'Executive Assistant',
    evolutionKicker: 'Mission after mission',
    evolutionTitle: 'Your AI Collaborator evolves with your needs.',
    evolutionLead: 'It starts with a first mission. For the next ones, add job profiles and skills tested by the community, or automatically create your own skills.',
    memoryTitle: 'Its own memory, shared knowledge.',
    memoryBody: 'Each AI Collaborator retains the context useful to its work. It also accesses the memory and knowledge shared by the organization, strictly according to its permissions.',
    exampleKicker: 'Example',
    exampleTitle: 'Emma evolves without being recreated.',
    exampleBody: 'Its own memory, shared knowledge. Each AI Collaborator retains the context useful to its work. It also accesses the memory and knowledge shared by the organization, strictly according to its permissions.',
    governanceTitle: 'Experience remains governed by your organization.',
    governanceBody: 'Your methods become reusable skills. You choose who can use them.',
    marketplaceCta: 'Explore the Marketplace',
    finalKicker: 'Your first mission',
    finalTitle: 'What first mission will you assign to your AI Collaborator?',
    finalBody: 'Describe a real mission. Alma prepares the AI Collaborator, the required capabilities and the points to confirm with you.',
    finalCta: 'Start for free',
    finalProofs: ['First mission included', 'No credit card', 'Human support when needed', 'No commitment'],
  },
} as const

export function HomeIntentDoors({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const icons = [BriefcaseBusiness, ScanSearch, MonitorCheck, Blocks]
  return <section aria-labelledby="home-paths-title" className="bg-[#F3EFE6] py-10 sm:py-12"><div className="editorial-shell"><h2 id="home-paths-title" className="sr-only">{lang === 'fr' ? 'Choisir un parcours' : 'Choose a path'}</h2><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{t.doors.map(([title, body, cta, href], index) => { const Icon = icons[index]; return <Link key={href} href={href} className={`group relative flex min-h-48 flex-col overflow-hidden rounded-2xl border p-5 outline-none transition-[transform,border-color,background-color,box-shadow] duration-300 hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${index === 0 ? 'border-[#211E1A] bg-[#211E1A] text-white shadow-[0_20px_45px_-32px_rgba(28,26,23,.8)]' : 'border-[#D8D0C2] bg-[#FAF8F3] text-[#1C1A17] hover:border-[#D10E63]/35 hover:bg-white hover:shadow-[0_18px_38px_-30px_rgba(28,26,23,.45)]'}`}><span aria-hidden className={`absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${index === 0 ? 'bg-[#F2A4C5]' : 'bg-[#D10E63]'}`} /><span className={`flex size-9 items-center justify-center rounded-full ${index === 0 ? 'bg-white/10 text-[#F2A4C5]' : 'bg-[#D10E63]/10 text-[#B00C54]'}`}><Icon className="size-[17px]" /></span><h3 className="mt-5 text-[17px] font-semibold leading-5 tracking-[-.025em]">{title}</h3><p className={`mt-2 text-xs leading-5 ${index === 0 ? 'text-white/70' : 'text-[#625B50]'}`}>{body}</p><span className={`mt-auto inline-flex items-center justify-between gap-2 pt-5 text-xs font-bold ${index === 0 ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{cta}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span></Link> })}</div></div></section>
}

export function HomeCollaboratorAnatomy({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div><Kicker>{t.anatomyKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[clamp(2.25rem,4.5vw,4.25rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.anatomyTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.anatomyLead}</p><Link href="/collaborateurs-ia" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.anatomyCta}<ArrowRight className="size-4" /></Link></div><article className="overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_28px_65px_-48px_rgba(28,26,23,.55)]"><div className="flex items-center gap-5 border-b border-[#DED6C8] p-6 sm:p-8"><Image src="/images/emma-avatar.png" alt="Emma" width={80} height={80} className="size-20 rounded-full object-cover ring-2 ring-[#D10E63]/20"/><div><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#B00C54]">{t.anatomyLabel}</p><h3 className="mt-2 text-3xl font-semibold">Emma</h3><p className="mt-1 text-sm font-semibold text-[#625B50]">{t.anatomyRole}</p></div></div><dl className="grid sm:grid-cols-2">{t.anatomy.map(([title, body], index) => { const Icon = index === 0 ? CalendarDays : index === 1 ? Mail : index === 2 ? Server : Building2; return <div key={title} className="border-b border-[#DED6C8] p-5 sm:border-r sm:p-6 sm:[&:nth-child(even)]:border-r-0"><dt className="flex items-center gap-2 text-xs font-bold text-[#B00C54]"><Icon className="size-4"/>{title}</dt><dd className="mt-2 text-sm leading-6 text-[#4E483F]">{body}</dd></div> })}</dl></article></div></section>
}

export function HomeEvolution({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  const capabilitySets = lang === 'fr' ? [
    { tab: 'Direction', profile: 'Assistante de direction', skills: ['Préparer une réunion', 'Organiser les rendez-vous', 'Résumer un dossier'], application: 'E-mail et calendrier', result: 'Réunions et décisions mieux préparées' },
    { tab: 'Finance', profile: 'Finance', skills: ['Relancer une facture', 'Contrôler les éléments de facturation', 'Signaler les litiges'], application: 'Outil de facturation', result: 'Suivi financier renforcé' },
    { tab: 'Ventes', profile: 'Commercial', skills: ['Rechercher des prospects', 'Qualifier les opportunités', 'Préparer les relances'], application: 'CRM commercial', result: 'Prospection mieux suivie' },
    { tab: 'Clients', profile: 'Relation client', skills: ['Classer les demandes', 'Préparer les réponses', 'Détecter les cas sensibles'], application: 'Support et CRM', result: 'Demandes mieux traitées' },
    { tab: 'Marketing', profile: 'Marketing', skills: ['Construire un calendrier éditorial', 'Préparer les briefs', 'Analyser les résultats'], application: 'Outils de contenu', result: 'Campagnes mieux coordonnées' },
  ] : [
    { tab: 'Leadership', profile: 'Executive Assistant', skills: ['Prepare a meeting', 'Organize appointments', 'Summarize a file'], application: 'Email and calendar', result: 'Better-prepared leadership' },
    { tab: 'Finance', profile: 'Finance', skills: ['Follow up an invoice', 'Review billing inputs', 'Flag disputes'], application: 'Billing tool', result: 'Stronger financial follow-up' },
    { tab: 'Sales', profile: 'Sales', skills: ['Research prospects', 'Qualify opportunities', 'Prepare follow-ups'], application: 'Sales CRM', result: 'Better-tracked prospecting' },
    { tab: 'Customers', profile: 'Customer relations', skills: ['Classify requests', 'Prepare replies', 'Detect sensitive cases'], application: 'Support and CRM', result: 'Better-handled requests' },
    { tab: 'Marketing', profile: 'Marketing', skills: ['Build an editorial calendar', 'Prepare briefs', 'Analyze results'], application: 'Content tools', result: 'Better-coordinated campaigns' },
  ]
  const [profileIndex, setProfileIndex] = useState(0)
  const selected = capabilitySets[profileIndex]
  const identity = lang === 'fr' ? 'Collaboratrice IA' : 'AI Collaborator'
  return <section className="bg-[#F3EFE6] py-16 sm:py-20"><div className="editorial-shell"><div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><Kicker>{t.evolutionKicker}</Kicker><h2 className="mt-5 text-[clamp(2.25rem,4.5vw,4.25rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.evolutionTitle}</h2><p className="mt-6 max-w-xl text-[17px] leading-8 text-[#4E483F]">{t.evolutionLead}</p><Link href="/marketplace" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">{t.marketplaceCta}<ArrowRight className="size-4" /></Link></div><div><div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label={lang === 'fr' ? 'Profils métier d’Emma' : 'Emma job profiles'}>{capabilitySets.map((item, index) => <button key={item.tab} type="button" role="tab" aria-selected={profileIndex === index} onClick={() => setProfileIndex(index)} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${profileIndex === index ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FAF8F3] text-[#625B50]'}`}>{item.tab}</button>)}</div><article className="relative overflow-hidden rounded-[2rem] bg-[#181615] p-6 text-white sm:p-8"><div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-[#D10E63]/20 blur-3xl"/><div className="relative flex items-center gap-4 border-b border-white/10 pb-6"><Image src="/images/emma-avatar.png" alt="Emma" width={72} height={72} className="size-[72px] rounded-full object-cover ring-2 ring-[#F2A4C5]/35"/><div><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#F2A4C5]">{identity}</p><h3 className="mt-2 text-2xl font-semibold">Emma</h3><p className="mt-1 text-xs font-semibold text-[#7DDBA1]">{selected.profile}</p></div></div><div className="relative mt-6"><div aria-hidden className="absolute bottom-8 left-[17px] top-8 w-px bg-gradient-to-b from-[#F2A4C5] via-[#D10E63] to-[#D10E63]/20"/><ol className="space-y-3"><Capability label={lang === 'fr' ? 'Profil métier' : 'Job profile'} value={selected.profile}/><Capability label={lang === 'fr' ? 'Compétences' : 'Skills'} value={selected.skills.join(' · ')}/><Capability label={lang === 'fr' ? 'Application' : 'Application'} value={selected.application}/></ol><div className="ml-12 mt-4 flex items-center justify-between gap-4 rounded-2xl bg-[#D10E63] px-5 py-4"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-white/70">{lang === 'fr' ? 'Résultat' : 'Result'}</p><p className="mt-1 text-sm font-bold">{selected.result}</p></div><ArrowRight className="size-5 shrink-0" /></div></div><div className="relative mt-6 border-t border-white/10 pt-5"><p className="text-sm leading-7 text-[#CFC6B8]">{t.exampleBody}</p><p className="mt-4 text-xs font-semibold leading-6 text-[#F2A4C5]">{t.governanceBody}</p></div></article></div></div></div></section>
}

function Capability({ label, value }: { label: string; value: string }) {
  return <li className="relative grid grid-cols-[36px_1fr] items-center gap-3"><span className="z-10 flex size-9 items-center justify-center rounded-full border border-[#F2A4C5]/25 bg-[#2A2226] font-mono text-[10px] font-black text-[#F2A4C5]">+</span><div className="rounded-2xl border border-white/10 bg-white/[.045] px-4 py-3"><span className="block font-mono text-[10px] font-bold uppercase tracking-[.12em] text-[#AFA397]">{label}</span><strong className="mt-1 block text-sm leading-6 text-white">{value}</strong></div></li>
}

export function HomeFinalCta({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <section className="bg-[#D10E63] py-20 text-white sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[11px] font-black uppercase tracking-[.18em] text-white/85">{t.finalKicker}</p><h2 className="mt-6 max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalTitle}</h2><p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/90">{t.finalBody}</p><ul className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold text-white/90">{t.finalProofs.map((proof) => <li key={proof}>{proof}</li>)}</ul></div><a href="#alma-hero" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-sm font-bold text-white outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D10E63]">{t.finalCta}<ArrowRight className="size-4" /></a></div></section>
}
