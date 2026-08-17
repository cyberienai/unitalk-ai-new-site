'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bot, Building2, Check, Mail, Plug, Server, ShieldCheck, UserRound } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Anthropic, Gemini, Mistral, OpenAI } from '@lobehub/icons'
import type { CollaboratorPage } from '@/lib/collaborator-pages'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    publicProfile: 'Hugo · Collaborateur IA commercial',
    missionCta: (name: string) => `Confier une mission à ${name}`,
    composerTitle: 'Quelle mission voulez-vous confier à Hugo ?', composerPlaceholder: 'Décrivez simplement le résultat attendu…', composerSubmit: 'Confier cette mission à Hugo', composerRole: 'Alma · Coordinatrice de votre première mission',
    composerExamples: ['Qualifier mes prospects', 'Relancer les opportunités dormantes', 'Préparer mes rendez-vous'],
    trialProofs: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire'],
    createCommercial: 'Créer mon Collaborateur IA commercial',
    proofKicker: 'Mission commerciale · Démonstration illustrative',
    proofTitle: 'Hugo prépare la prospection. Votre équipe garde la décision.',
    proofLead: 'Il recherche et qualifie selon vos critères, prépare le CRM et s’arrête avant le premier contact tant que votre équipe n’a pas validé.',
    decision: 'Décision requise', approve: 'Approuver', modify: 'Modifier', decline: 'Refuser',
    identityKicker: 'Une identité professionnelle', identityTitle: 'Hugo travaille avec sa propre identité et ses propres accès.',
    organizationKicker: 'Une identité qui appartient à l’entreprise', organizationTitle: 'Le responsable peut changer. Le Collaborateur IA et le savoir-faire restent.',
    organizationBody: 'Le Collaborateur IA personnalisé pour votre organisation appartient à votre entreprise, pas à la plateforme Unitalk ni au compte personnel de son responsable. Si ce responsable change de rôle ou quitte l’entreprise, celle-ci peut réattribuer sa supervision sans recréer son identité, ses compétences ni les méthodes validées.',
    missionsTitle: 'Missions commerciales prêtes à personnaliser', allMissions: 'Voir toutes les missions Ventes',
    appsTitle: 'Hugo travaille dans votre environnement commercial.', appsBody: 'HubSpot, Salesforce, LinkedIn, Gmail, Outlook et vos agendas sont attribués selon vos droits. Plus de 3 000 connecteurs peuvent être disponibles selon la configuration.',
    identityCard: { header: 'Identité IA de votre Collaborateur', owner: 'Entreprise propriétaire', supervisor: 'Responsable humain', communication: 'Communication', memory: 'Mémoire propre', shared: 'Savoir partagé', execution: 'Environnement de travail', governance: 'Accès gouvernés par l’entreprise' },
    modelsTitle: 'Le modèle adapté à chaque tâche, sous vos règles.', modelsBody: 'Hugo utilise uniquement les modèles autorisés par votre entreprise, dans les limites du budget défini.',
    continuity: ['Identité appartenant à l’entreprise', 'Supervision humaine réattribuable', 'Méthodes et compétences conservées', 'Accès révocables séparément'],
    finalTitle: 'Quelle première mission allez-vous confier à votre Collaborateur IA commercial ?', finalCta: 'Commencer avec Alma', pricing: 'Voir les tarifs',
  },
  en: {
    publicProfile: 'Hugo · Sales AI Collaborator',
    missionCta: (name: string) => `Assign a mission to ${name}`,
    composerTitle: 'What mission would you like to assign to Hugo?', composerPlaceholder: 'Simply describe the expected outcome…', composerSubmit: 'Assign this mission to Hugo', composerRole: 'Alma · Coordinator of your first mission',
    composerExamples: ['Qualify my prospects', 'Follow up dormant opportunities', 'Prepare my sales meetings'],
    trialProofs: ['First mission included', 'No credit card', 'No commitment', 'Human support when needed'],
    createCommercial: 'Create my Sales AI Collaborator',
    proofKicker: 'Sales mission · Illustrative demonstration',
    proofTitle: 'Hugo prepares prospecting. Your team keeps the decision.',
    proofLead: 'He researches and qualifies under your criteria, prepares the CRM and stops before first contact until your team approves.',
    decision: 'Decision required', approve: 'Approve', modify: 'Amend', decline: 'Decline',
    identityKicker: 'A professional identity', identityTitle: 'Hugo works with his own identity and access.',
    organizationKicker: 'An identity owned by the organization', organizationTitle: 'The supervisor can change. Hugo and the know-how remain.',
    organizationBody: 'Hugo belongs to the organization that deploys him, never to Unitalk or to his supervisor’s personal account. If that supervisor changes roles or leaves, the organization can reassign supervision without recreating Hugo, his skills or approved methods.',
    missionsTitle: 'Sales missions ready to customize', allMissions: 'View all Sales missions',
    appsTitle: 'Hugo works in your sales environment.', appsBody: 'HubSpot, Salesforce, LinkedIn, Gmail, Outlook and calendars are assigned under your permissions. More than 3,000 connectors may be available depending on setup.',
    identityCard: { header: 'Your Collaborator’s AI identity', owner: 'Owning organization', supervisor: 'Human supervisor', communication: 'Communication', memory: 'Own memory', shared: 'Shared knowledge', execution: 'Working environment', governance: 'Access governed by the organization' },
    modelsTitle: 'The right model for each task, under your rules.', modelsBody: 'Hugo only uses models authorized by your organization, within the defined budget.',
    continuity: ['Identity owned by the organization', 'Human supervision can be reassigned', 'Methods and skills retained', 'Access revoked separately'],
    finalTitle: 'What first mission will you assign to your Sales AI Collaborator?', finalCta: 'Start with Alma', pricing: 'View pricing',
  },
} as const

export function CollaborateurContent({ page }: { page: CollaboratorPage; equipmentId?: string }) {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const { detail, missions } = page
  const [missionRequest, setMissionRequest] = useState('')
  const [decision, setDecision] = useState<'approved' | 'modified' | 'declined' | null>(null)
  const outcome = decision === 'approved' ? (lang === 'fr' ? 'Hugo prépare les premiers contacts autorisés.' : 'Hugo prepares the authorized first contacts.') : decision === 'modified' ? (lang === 'fr' ? 'Hugo reprend la sélection avec vos nouveaux critères.' : 'Hugo revises the selection under your new criteria.') : decision === 'declined' ? (lang === 'fr' ? 'Aucun contact n’est préparé. La sélection reste disponible.' : 'No contact is prepared. The selection remains available.') : null

  function submitMission() {
    const clean = missionRequest.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, collaborator: detail.slug, createdAt: Date.now() })) } catch {}
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&mission=${encodeURIComponent(detail.slug)}&source=collaborator-profile`)
  }

  return <main className="bg-[#F3EFE6] text-[#1C1A17]">
    <section className="relative overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36">
      <div aria-hidden className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/>
      <div className="editorial-shell relative grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-14">
        <div><div className="inline-flex items-center gap-3"><Image src={detail.avatar} alt="" width={36} height={36} priority className="size-9 rounded-full border border-[#CFC5B5] object-cover"/><span className="text-sm font-bold text-[#4E483F]">{lang === 'fr' ? 'Hugo · Collaborateur IA commercial' : 'Hugo · Sales AI Collaborator'}</span></div><h1 className="mt-8 max-w-4xl font-sf text-[clamp(2.8rem,5.5vw,5.8rem)] font-semibold leading-[.92] tracking-[-.065em] text-[#1C1A17]">{lang === 'fr' ? 'Hugo trouve et qualifie vos prochains prospects.' : 'Hugo finds and qualifies your next prospects.'}</h1><p className="mt-5 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{lang === 'fr' ? 'Donnez-lui vos critères. Il recherche les entreprises, prépare les fiches CRM et organise les relances. Votre équipe valide le premier contact.' : 'Give him your criteria. He researches companies, prepares CRM records and organizes follow-ups. Your team approves the first contact.'}</p><div className="mt-7"><Link href="/tarifs?profil=hugo#configurateur" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-center text-sm font-bold text-white shadow-[0_12px_30px_-18px_rgba(28,26,23,.7)] transition-colors hover:bg-[#2A2622]">{t.createCommercial}</Link></div></div>
        <div id="hugo-alma" className="scroll-mt-24"><AlmaMissionComposer value={missionRequest} onChange={setMissionRequest} onSubmit={submitMission} title={t.composerTitle} body="" role={t.composerRole} placeholder={t.composerPlaceholder} submitLabel={t.composerSubmit} starters={t.composerExamples} listening={false} onToggleListening={() => {}} voiceSupported={false} voiceStartLabel="" voiceStopLabel="" compactMobile compactDesktop /><ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">{t.trialProofs.map(proof => <li key={proof} className="flex items-center gap-2 text-xs font-semibold text-[#625B50]"><Check className="size-3.5 text-[#D10E63]"/>{proof}</li>)}</ul></div>
      </div><div className="editorial-shell relative mt-10 grid gap-px overflow-hidden rounded-2xl border border-[#D8D0C2] bg-[#D8D0C2] sm:grid-cols-2 lg:grid-cols-4"><HeroProof title={lang === 'fr' ? 'Identité IA' : 'AI identity'} body={lang === 'fr' ? 'Choisissez le prénom, le visage et la voix de votre Collaborateur IA commercial.' : 'Choose the name, face and voice of your Sales AI Collaborator.'}/><HeroProof title={lang === 'fr' ? 'Supervision humaine' : 'Human supervision'} body={lang === 'fr' ? 'Un responsable humain garde le contrôle.' : 'A human supervisor remains in control.'}/><HeroProof title={lang === 'fr' ? 'Propriété de l’entreprise' : 'Owned by your organization'} body={lang === 'fr' ? 'L’identité, la mémoire et le savoir-faire restent chez vous.' : 'Identity, memory and know-how remain yours.'}/><HeroProof title={lang === 'fr' ? 'Capacités illimitées' : 'Unlimited capabilities'} body={lang === 'fr' ? 'Profils métier et compétences sans limite.' : 'Unlimited job profiles and skills.'}/></div>
    </section>

    <section id="mission-en-action" className="scroll-mt-24 bg-[#FAF8F3] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.proofKicker}</p><h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.proofTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.proofLead}</p></div><article className="overflow-hidden rounded-[24px] border border-[#D8D0C2] bg-white"><div className="border-b border-[#E8E0D3] p-5"><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{lang === 'fr' ? 'Mission VTE-018 · Exemple illustratif sur 34 entreprises' : 'Mission SLS-018 · Illustrative example using 34 companies'}</p><h3 className="mt-2 text-xl font-semibold">{lang === 'fr' ? 'Qualifier les nouveaux prospects' : 'Qualify new prospects'}</h3></div><ol className="space-y-4 p-5 text-sm"><Activity time="09:05">{lang === 'fr' ? '34 entreprises examinées selon les critères configurés.' : '34 companies reviewed under configured criteria.'}</Activity><Activity time="09:12">{lang === 'fr' ? '9 correspondent au segment cible.' : '9 match the target segment.'}</Activity><Activity time="09:18">{lang === 'fr' ? 'Fiches CRM et messages préparés. Aucun contact envoyé.' : 'CRM records and messages prepared. No contact sent.'}</Activity></ol><div className="m-5 mt-0 rounded-2xl border border-[#E0CFAE] bg-[#FFF7E6] p-4"><p className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#9A6B1E]">{t.decision}</p><p className="mt-2 text-sm font-semibold">{lang === 'fr' ? 'Autoriser la préparation du premier contact ?' : 'Authorize first-contact preparation?'}</p><div className="mt-4 flex flex-wrap gap-2"><Decision primary onClick={() => setDecision('approved')}>{t.approve}</Decision><Decision onClick={() => setDecision('modified')}>{t.modify}</Decision><Decision onClick={() => setDecision('declined')}>{t.decline}</Decision></div>{outcome && <p role="status" className="mt-4 rounded-xl bg-white p-3 text-sm font-semibold text-[#4E483F]">{outcome}</p>}</div></article></div></section>

    <section className="py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><Kicker>{t.identityKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.identityTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{lang === 'fr' ? 'Son identité reste la même d’une mission à l’autre. Ses communications, sa mémoire, ses applications et ses droits sont attribués par votre entreprise.' : 'His identity remains the same from one mission to the next. His communications, memory, applications and permissions are assigned by your organization.'}</p><Link href="/collaborateurs-ia" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang === 'fr' ? 'En savoir plus' : 'Learn more'}<ArrowRight className="size-4"/></Link></div><IdentityCard detail={detail} lang={lang} labels={t.identityCard}/></div><div className="editorial-shell mt-6 grid gap-5 lg:grid-cols-2"><Link href="/collaborateurs-ia/applications" className="group rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6"><Plug className="size-5 text-[#D10E63]"/><h3 className="mt-7 text-2xl font-semibold">{t.appsTitle}</h3><p className="mt-4 text-sm leading-7 text-[#625B50]">{t.appsBody}</p><ApplicationLogos/><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang === 'fr' ? 'Voir les applications' : 'View applications'}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link><Link href="/ai-gateway" className="group rounded-3xl border border-[#D8D0C2] bg-[#181615] p-6 text-white"><Bot className="size-5 text-[#F2A4C5]"/><h3 className="mt-7 text-2xl font-semibold">{t.modelsTitle}</h3><p className="mt-4 text-sm leading-7 text-[#CFC6B8]">{t.modelsBody}</p><ModelLogos/><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">Unitalk AI Gateway<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link></div></section>

    <section className="bg-[#EAE3D4] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><Kicker>{t.organizationKicker}</Kicker><h2 className="mt-5 text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.organizationTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.organizationBody}</p></div><article className="rounded-[28px] border border-[#CFC5B5] bg-[#FAF8F3] p-6 sm:p-8"><div className="flex items-center gap-4 border-b border-[#DED6C8] pb-6"><Building2 className="size-10 rounded-full bg-[#D10E63]/10 p-2.5 text-[#B00C54]"/><div><p className="text-lg font-semibold">{lang === 'fr' ? 'Votre entreprise' : 'Your organization'}</p><p className="text-sm text-[#625B50]">{lang === 'fr' ? 'Propriétaire de l’identité IA et du savoir-faire validé' : 'Owner of the AI identity and approved know-how'}</p></div></div><ul className="mt-6 grid gap-4 sm:grid-cols-2">{t.continuity.map(item => <li key={item} className="flex gap-3 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-[#D10E63]"/>{item}</li>)}</ul></article></div></section>

    {missions.length > 0 && <section id="missions" className="scroll-mt-24 py-16 sm:py-20"><div className="editorial-shell"><h2 className="max-w-3xl text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.missionsTitle}</h2><div className="mt-8 grid gap-4 md:grid-cols-2">{missions.slice(0,4).map(mission => <Link key={mission.slug} href={`/missions/${mission.slug}`} className="group rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3] p-5"><h3 className="text-lg font-semibold">{mission.title[lang]}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{mission.objective[lang]}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang === 'fr' ? 'Personnaliser' : 'Customize'}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div><Link href={`/missions?categorie=${encodeURIComponent(detail.department.fr.toLowerCase())}`} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.allMissions}<ArrowRight className="size-4"/></Link></div></section>}
    <HugoFaq lang={lang}/>
    <section className="bg-[#D10E63] py-16 text-white sm:py-20"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-4xl text-[clamp(2.6rem,5vw,5.2rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalTitle}</h2><div className="flex min-w-60 flex-col gap-3"><a href="#hugo-alma" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold">{t.finalCta}</a><Link href="/tarifs" className="text-center text-sm font-bold underline decoration-white/40 underline-offset-4">{t.pricing}</Link></div></div></section>
  </main>
}

function Activity({ time, children }: { time: string; children: React.ReactNode }) { return <li className="flex gap-4"><span className="font-mono text-xs text-[#857C6E]">{time}</span><span>{children}</span></li> }
function Decision({ children, primary = false, onClick }: { children: React.ReactNode; primary?: boolean; onClick: () => void }) { return <button type="button" onClick={onClick} className={`min-h-11 rounded-full px-5 text-xs font-bold ${primary ? 'bg-[#D10E63] text-white' : 'border border-[#D8D0C2] bg-white'}`}>{children}</button> }
function IdentityCard({ detail, lang, labels }: { detail: CollaboratorPage['detail']; lang: 'fr' | 'en'; labels: { header: string; owner: string; supervisor: string; communication: string; memory: string; shared: string; execution: string; governance: string } }) {
  const fr = lang === 'fr'
  const rows = [
    [labels.owner, fr ? 'Votre entreprise' : 'Your organization'],
    [labels.supervisor, fr ? 'Directeur commercial' : 'Sales director'],
    [fr ? 'Mémoire' : 'Memory', fr ? 'Propre + partagée selon droits' : 'Own + shared by permission'],
    [fr ? 'Exécution' : 'Execution', fr ? 'Hermes · environnement privé' : 'Hermes · private environment'],
    [fr ? 'Modèles' : 'Models', fr ? 'Autorisés via AI Gateway' : 'Authorized through AI Gateway'],
  ]
  return <article className="overflow-hidden rounded-[30px] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_30px_75px_-48px_rgba(28,26,23,.55)]">
    <header className="border-b border-[#DED6C8] px-6 py-4 sm:px-8"><p className="font-mono text-[10px] font-black uppercase tracking-[.17em] text-[#B00C54]">{labels.header}</p></header>
    <div className="grid gap-6 p-6 sm:grid-cols-[150px_1fr] sm:p-8"><div><Image src={detail.avatar} alt={detail.name} width={150} height={180} className="aspect-[4/5] w-full rounded-2xl object-cover"/><p className="mt-4 text-2xl font-semibold">{detail.name}</p><p className="mt-1 font-mono text-xs text-[#B00C54]">@{detail.slug}</p><p className="mt-2 text-sm font-semibold text-[#625B50]">{fr ? 'Collaborateur IA commercial' : 'Sales AI Collaborator'}</p><span className="mt-4 inline-flex rounded-full bg-[#267A48]/10 px-3 py-1 text-[10px] font-bold text-[#267A48]">{fr ? 'SUPERVISÉ' : 'SUPERVISED'}</span></div><div className="min-w-0"><dl className="divide-y divide-[#DED6C8] border-y border-[#DED6C8]">{rows.map(([label,value])=><div key={label} className="grid gap-1 py-3 sm:grid-cols-[130px_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[.1em] text-[#857C6E]">{label}</dt><dd className="text-sm font-semibold text-[#3F3A33]">{value}</dd></div>)}</dl><div className="mt-5 grid gap-3 sm:grid-cols-2"><IdentityFeature icon={Mail} title={labels.communication} body={fr ? 'E-mail attribuable · Calendrier · Téléphone selon activation · Messageries autorisées' : 'Assignable email · Calendar · Phone when enabled · Authorized messaging'}/><IdentityFeature icon={UserRound} title={labels.memory} body={fr ? 'Historique, contexte utile et expérience validée de Hugo.' : 'Hugo’s history, useful context and approved experience.'}/><IdentityFeature icon={Building2} title={labels.shared} body={fr ? 'Méthodes, documents et connaissances accessibles selon ses droits.' : 'Methods, documents and knowledge available under his permissions.'}/><IdentityFeature icon={Server} title={labels.execution} body={fr ? 'Agent Hermes · Fichiers · Navigateur · Code · Secrets propres' : 'Hermes Agent · Files · Browser · Code · Own secrets'}/></div></div></div>
    <footer className="border-t border-[#DED6C8] bg-[#EAE3D4] px-6 py-4 sm:px-8"><div className="flex items-center gap-2 text-xs font-bold text-[#4E483F]"><ShieldCheck className="size-4 text-[#D10E63]"/>{labels.governance}</div><p className="mt-2 text-xs leading-5 text-[#625B50]">{fr ? 'Exemple de configuration : e-mail attribuable, téléphone selon activation, applications à autoriser et budget à définir.' : 'Configuration example: assignable email, phone when enabled, applications to authorize and budget to define.'}</p></footer>
  </article>
}

function IdentityFeature({ icon: Icon, title, body }: { icon: typeof UserRound; title: string; body: string }) { return <div className="rounded-2xl border border-[#DED6C8] bg-white p-4"><Icon className="size-4 text-[#D10E63]"/><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></div> }
function HeroProof({ title, body }: { title: string; body: string }) { return <article className="bg-[#FAF8F3] p-5"><h3 className="text-sm font-semibold text-[#1C1A17]">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></article> }

function ApplicationLogos() {
  return <ul className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6">{['HubSpot','Salesforce','LinkedIn','Gmail','Outlook','Agenda'].map(name => <li key={name} className="flex min-h-14 items-center justify-center rounded-xl border border-[#DED6C8] bg-white px-2 text-center text-[10px] font-bold text-[#4E483F]">{name}</li>)}</ul>
}

function ModelLogos() {
  return <ul className="mt-6 grid grid-cols-4 gap-3">{[[OpenAI,'OpenAI'],[Anthropic,'Anthropic'],[Gemini,'Gemini'],[Mistral,'Mistral']].map(([Icon,name]) => <li key={name as string} className="flex min-h-16 flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[.04] text-[10px] font-semibold text-[#CFC6B8]"><Icon size={24}/><span className="mt-2">{name as string}</span></li>)}</ul>
}

function HugoFaq({ lang }: { lang: 'fr' | 'en' }) {
  const items = lang === 'fr' ? [
    ['Hugo appartient-il à Unitalk ou à mon entreprise ?', 'Hugo illustre publiquement le profil commercial. Le Collaborateur IA personnalisé et déployé pour votre organisation appartient à votre entreprise.'],
    ['Puis-je choisir son prénom, son visage et sa voix ?', 'Oui. Son identité IA est personnalisable avant son déploiement.'],
    ['Peut-il utiliser mon CRM et mes applications ?', 'Oui, après autorisation. Votre entreprise définit séparément les comptes, données et actions accessibles.'],
    ['Quel modèle IA utilise-t-il ?', 'Il utilise uniquement les modèles autorisés. Unitalk AI Gateway peut sélectionner une route pertinente selon la tâche, vos règles et votre budget.'],
    ['Que se passe-t-il si son responsable quitte l’entreprise ?', 'La supervision peut être réattribuée. L’identité, la mémoire et les méthodes validées restent dans l’entreprise.'],
    ['Puis-je lui ajouter de nouvelles responsabilités ?', 'Oui. Ajoutez des profils métier et des compétences sans recréer son identité.'],
  ] : [
    ['Does Hugo belong to Unitalk or my organization?', 'Hugo publicly illustrates the sales profile. The AI Collaborator customized and deployed for your organization belongs to your organization.'],
    ['Can I choose the name, face and voice?', 'Yes. The AI identity is customizable before deployment.'],
    ['Can it use my CRM and applications?', 'Yes, after authorization. Your organization separately defines accessible accounts, data and actions.'],
    ['Which AI model does it use?', 'It only uses authorized models. Unitalk AI Gateway can select a relevant route under the task, rules and budget.'],
    ['What happens if the supervisor leaves?', 'Supervision can be reassigned. Identity, memory and approved methods remain in the organization.'],
    ['Can I add new responsibilities?', 'Yes. Add job profiles and skills without recreating the identity.'],
  ]
  return <section className="bg-[#FAF8F3] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><Kicker>FAQ</Kicker><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang === 'fr' ? 'Questions fréquentes' : 'Frequently asked questions'}</h2></div><div className="border-t border-[#CFC5B5]">{items.map(([question,answer]) => <FaqItem key={question} question={question} answer={answer}/>)}</div></div></section>
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open,setOpen] = useState(false)
  const id = useId()
  return <div className="border-b border-[#CFC5B5]"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} className="flex min-h-20 w-full items-center justify-between gap-5 text-left text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{question}</span><span aria-hidden className="font-mono text-[#D10E63]">{open?'−':'+'}</span></button>{open&&<p id={id} className="max-w-2xl pb-7 pr-8 text-[15px] leading-7 text-[#4E483F]">{answer}</p>}</div>
}
