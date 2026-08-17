'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useId, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Anthropic, Gemini, Mistral, OpenAI } from '@lobehub/icons'
import { siGmail, siGooglecalendar, siHubspot } from 'simple-icons'
import { ArrowRight, Building2, Check, Mail, Server, ShieldCheck, UserRound } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import type { CollaboratorPage } from '@/lib/collaborator-pages'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { Kicker } from '@/components/home/section-kicker'

const COPY = {
  fr: {
    composerTitle: 'Quelle mission voulez-vous confier à Hugo ?',
    composerPlaceholder: 'Décrivez simplement le résultat attendu…',
    composerSubmit: 'Confier cette mission à Hugo',
    composerRole: 'Alma · Coordinatrice de votre première mission',
    composerExamples: ['Qualifier mes prospects', 'Relancer les opportunités dormantes', 'Préparer mes rendez-vous'],
    trialProofs: ['Première mission offerte', 'Sans carte bancaire', 'Sans engagement', 'Accompagnement humain si nécessaire'],
    createCommercial: 'Créer mon Collaborateur IA commercial',
    proofs: [
      ['Identité IA', 'Choisissez son prénom, son visage et sa voix.'],
      ['Place dans l’organisation', 'Personne, équipe, département ou entreprise.'],
      ['Propriété de l’entreprise', 'Identité, mémoire et savoir-faire restent chez vous.'],
      ['Profils et compétences', 'Ajoutez-en sans recréer son identité.'],
    ],
    proofKicker: 'Mission commerciale · Démonstration illustrative',
    proofTitle: 'Hugo prépare la prospection. Votre équipe garde la décision.',
    proofLead: 'Il recherche et qualifie selon vos critères, prépare le CRM et s’arrête avant le premier contact tant que votre équipe n’a pas validé.',
    decision: 'Décision requise', approve: 'Approuver', modify: 'Modifier', decline: 'Refuser',
    identityKicker: 'Identité professionnelle',
    identityTitle: 'Une identité IA. Tous ses moyens de travailler.',
    identityLead: 'Hugo conserve la même identité d’une mission à l’autre. Votre entreprise attribue ses communications, sa mémoire, ses applications et ses droits.',
    identityCta: 'En savoir plus',
    identityCard: { header: 'Identité IA de votre Collaborateur', owner: 'Entreprise propriétaire', supervisor: 'Responsable humain', communication: 'Communication', memory: 'Mémoire propre', shared: 'Savoir partagé', execution: 'Environnement de travail', governance: 'Accès gouvernés par l’entreprise' },
    appsKicker: 'Applications autorisées',
    appsTitle: 'Hugo travaille dans votre environnement commercial.',
    appsBody: 'HubSpot, Salesforce, LinkedIn, Gmail, Outlook et vos agendas sont attribués selon vos droits. Plus de 3 000 connecteurs peuvent être disponibles selon la configuration.',
    modelsKicker: 'Unitalk AI Gateway',
    modelsTitle: 'Le modèle adapté à chaque tâche. Sous vos règles.',
    modelsBody: 'Hugo utilise uniquement les modèles autorisés par votre entreprise, dans les limites du budget défini.',
    evolutionKicker: 'Mission après mission',
    evolutionTitle: 'Ses compétences évoluent. Son identité reste.',
    evolutionBody: 'Hugo commence avec un profil commercial. Ajoutez ensuite de nouvelles méthodes, applications et responsabilités selon le travail confié.',
    evolutionItems: ['Profils métier supplémentaires', 'Compétences testées par la communauté', 'Méthodes propres à votre entreprise', 'Nouvelles missions sans repartir de zéro'],
    missionsTitle: 'Missions commerciales prêtes à personnaliser',
    allMissions: 'Voir toutes les missions Ventes',
    finalTitle: 'Quelle première mission allez-vous confier à votre Collaborateur IA commercial ?',
    finalCta: 'Commencer avec Alma', pricing: 'Voir les tarifs',
  },
  en: {
    composerTitle: 'What mission would you like to assign to Hugo?',
    composerPlaceholder: 'Simply describe the expected outcome…',
    composerSubmit: 'Assign this mission to Hugo',
    composerRole: 'Alma · Coordinator of your first mission',
    composerExamples: ['Qualify my prospects', 'Follow up dormant opportunities', 'Prepare my sales meetings'],
    trialProofs: ['First mission included', 'No credit card', 'No commitment', 'Human support when needed'],
    createCommercial: 'Create my Sales AI Collaborator',
    proofs: [
      ['AI identity', 'Choose its name, face and voice.'],
      ['Place in the organization', 'Person, team, department or organization.'],
      ['Organization ownership', 'Identity, memory and know-how remain yours.'],
      ['Profiles and skills', 'Add them without recreating the identity.'],
    ],
    proofKicker: 'Sales mission · Illustrative demonstration',
    proofTitle: 'Hugo prepares prospecting. Your team makes the decision.',
    proofLead: 'He researches and qualifies from your criteria, prepares the CRM and stops before first contact until your team approves.',
    decision: 'Decision required', approve: 'Approve', modify: 'Amend', decline: 'Decline',
    identityKicker: 'Professional identity',
    identityTitle: 'One AI identity. Every means to work.',
    identityLead: 'Hugo keeps the same identity from one mission to the next. Your organization assigns communications, memory, applications and permissions.',
    identityCta: 'Learn more',
    identityCard: { header: 'Your Collaborator’s AI identity', owner: 'Owning organization', supervisor: 'Human supervisor', communication: 'Communication', memory: 'Own memory', shared: 'Shared knowledge', execution: 'Working environment', governance: 'Access governed by the organization' },
    appsKicker: 'Authorized applications',
    appsTitle: 'Hugo works in your sales environment.',
    appsBody: 'HubSpot, Salesforce, LinkedIn, Gmail, Outlook and calendars are assigned under your permissions. More than 3,000 connectors may be available depending on setup.',
    modelsKicker: 'Unitalk AI Gateway',
    modelsTitle: 'The right model for each task. Under your rules.',
    modelsBody: 'Hugo only uses models authorized by your organization, within the defined budget.',
    evolutionKicker: 'Mission after mission',
    evolutionTitle: 'His skills evolve. His identity remains.',
    evolutionBody: 'Hugo starts with a sales profile. Add new methods, applications and responsibilities as you assign new work.',
    evolutionItems: ['Additional job profiles', 'Skills tested by the community', 'Methods specific to your organization', 'New missions without starting over'],
    missionsTitle: 'Sales missions ready to customize',
    allMissions: 'View all Sales missions',
    finalTitle: 'What first mission will you assign to your Sales AI Collaborator?',
    finalCta: 'Start with Alma', pricing: 'View pricing',
  },
} as const

export function CollaborateurContent({ page }: { page: CollaboratorPage; equipmentId?: string }) {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const { detail, missions } = page
  const [missionRequest, setMissionRequest] = useState('')
  const [decision, setDecision] = useState<'approved' | 'modified' | 'declined' | null>(null)
  const outcome = decision === 'approved'
    ? (lang === 'fr' ? 'Hugo prépare les premiers contacts autorisés.' : 'Hugo prepares the authorized first contacts.')
    : decision === 'modified'
      ? (lang === 'fr' ? 'Hugo reprend la sélection avec vos nouveaux critères.' : 'Hugo revises the selection under your new criteria.')
      : decision === 'declined'
        ? (lang === 'fr' ? 'Aucun contact n’est préparé. La sélection reste disponible.' : 'No contact is prepared. The selection remains available.')
        : null

  function submitMission() {
    const clean = missionRequest.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, collaborator: detail.slug, createdAt: Date.now() })) } catch {}
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&collaborateur=${encodeURIComponent(detail.slug)}&source=profile-store`)
  }

  return <main className="overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
    <section className="relative min-h-[760px] pb-14 pt-28 sm:pt-36 lg:flex lg:items-center">
      <div aria-hidden className="absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]"/>
      <div className="editorial-shell relative w-full">
        <div className="grid gap-10 lg:grid-cols-[1.02fr_.98fr] lg:items-center lg:gap-14">
          <div>
            <div className="inline-flex items-center gap-3"><Image src={detail.avatar} alt="" width={36} height={36} priority className="size-9 rounded-full border border-[#CFC5B5] object-cover"/><span className="text-sm font-bold text-[#4E483F]">{lang === 'fr' ? 'Hugo · Collaborateur IA commercial' : 'Hugo · Sales AI Collaborator'}</span></div>
            <h1 className="mt-8 max-w-4xl font-sf text-[clamp(2.9rem,5.6vw,5.9rem)] font-semibold leading-[.9] tracking-[-.07em]">{lang === 'fr' ? 'Hugo trouve et qualifie vos prochains prospects.' : 'Hugo finds and qualifies your next prospects.'}</h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-8 text-[#4E483F]">{lang === 'fr' ? 'Donnez-lui vos critères. Il recherche les entreprises, prépare les fiches CRM et organise les relances. Votre équipe valide le premier contact.' : 'Give him your criteria. He researches companies, prepares CRM records and organizes follow-ups. Your team approves the first contact.'}</p>
            <Link href="/tarifs?profil=hugo#configurateur" className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white shadow-[0_14px_34px_-20px_rgba(28,26,23,.7)] hover:bg-[#2A2622]">{t.createCommercial}</Link>
          </div>
          <div id="hugo-alma" className="scroll-mt-24"><AlmaMissionComposer value={missionRequest} onChange={setMissionRequest} onSubmit={submitMission} title={t.composerTitle} body="" role={t.composerRole} placeholder={t.composerPlaceholder} submitLabel={t.composerSubmit} starters={t.composerExamples} listening={false} onToggleListening={() => {}} voiceSupported={false} voiceStartLabel="" voiceStopLabel="" compactMobile compactDesktop /><ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">{t.trialProofs.map(proof => <li key={proof} className="flex items-center gap-2 text-xs font-semibold text-[#625B50]"><Check className="size-3.5 text-[#D10E63]"/>{proof}</li>)}</ul></div>
        </div>
        <div className="mt-12 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-4">{t.proofs.map(([title,body]) => <HeroProof key={title} title={title} body={body}/>)}</div>
      </div>
    </section>

    <section id="mission-en-action" className="scroll-mt-24 bg-[#181615] py-20 text-white sm:py-24">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-center">
        <div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.proofKicker}</p><h2 className="mt-5 text-[clamp(2.7rem,5vw,5.2rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.proofTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#CFC6B8]">{t.proofLead}</p></div>
        <article className="overflow-hidden rounded-[26px] border border-white/10 bg-[#211E1A]"><div className="border-b border-white/10 p-5"><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#8F877A]">{lang === 'fr' ? 'Mission VTE-018 · Exemple illustratif sur 34 entreprises' : 'Mission SLS-018 · Illustrative example using 34 companies'}</p><h3 className="mt-2 text-xl font-semibold">{lang === 'fr' ? 'Qualifier les nouveaux prospects' : 'Qualify new prospects'}</h3></div><ol className="space-y-4 p-5 text-sm text-[#D8D0C2]"><Activity time="09:05">{lang === 'fr' ? '34 entreprises examinées selon les critères configurés.' : '34 companies reviewed under configured criteria.'}</Activity><Activity time="09:12">{lang === 'fr' ? '9 correspondent au segment cible.' : '9 match the target segment.'}</Activity><Activity time="09:18">{lang === 'fr' ? 'Fiches CRM et messages préparés. Aucun contact envoyé.' : 'CRM records and messages prepared. No contact sent.'}</Activity></ol><div className="m-5 mt-0 rounded-2xl border border-[#F2A4C5]/20 bg-[#2A2226] p-4"><p className="font-mono text-[10px] font-black uppercase tracking-[.12em] text-[#F2A4C5]">{t.decision}</p><p className="mt-2 text-sm font-semibold">{lang === 'fr' ? 'Autoriser la préparation du premier contact ?' : 'Authorize first-contact preparation?'}</p><div className="mt-4 flex flex-wrap gap-2"><Decision active={decision==='approved'} primary onClick={() => setDecision('approved')}>{t.approve}</Decision><Decision active={decision==='modified'} onClick={() => setDecision('modified')}>{t.modify}</Decision><Decision active={decision==='declined'} onClick={() => setDecision('declined')}>{t.decline}</Decision></div>{outcome&&<p role="status" className="mt-4 rounded-xl bg-white/[.06] p-3 text-sm font-semibold text-[#F3EFE6]">{outcome}</p>}</div></article>
      </div>
    </section>

    <section className="py-20 sm:py-24">
      <div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr] lg:items-center"><div><Kicker>{t.identityKicker}</Kicker><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.identityTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.identityLead}</p><Link href="/collaborateurs-ia" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.identityCta}<ArrowRight className="size-4"/></Link></div><IdentityCard detail={detail} lang={lang} labels={t.identityCard}/></div>
    </section>

    <section className="bg-[#EAE3D4] py-20 sm:py-24"><div className="editorial-shell"><div className="grid gap-px overflow-hidden rounded-[30px] border border-[#CFC5B5] bg-[#CFC5B5] lg:grid-cols-2"><Link href="/collaborateurs-ia/applications" className="group bg-[#FAF8F3] p-7 sm:p-9"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.appsKicker}</p><h2 className="mt-5 text-[clamp(2rem,3vw,3.5rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.appsTitle}</h2><p className="mt-5 text-sm leading-7 text-[#625B50]">{t.appsBody}</p><ApplicationLogos/><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang==='fr'?'Voir les applications':'View applications'}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link><Link href="/ai-gateway" className="group bg-[#181615] p-7 text-white sm:p-9"><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#F2A4C5]">{t.modelsKicker}</p><h2 className="mt-5 text-[clamp(2rem,3vw,3.5rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.modelsTitle}</h2><p className="mt-5 text-sm leading-7 text-[#CFC6B8]">{t.modelsBody}</p><ModelLogos/><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#F2A4C5]">Unitalk AI Gateway<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link></div></div></section>

    <section className="py-20 sm:py-24"><div className="editorial-shell grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><div><Kicker>{t.evolutionKicker}</Kicker><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.evolutionTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.evolutionBody}</p><Link href="/marketplace" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang==='fr'?'Explorer la Marketplace':'Explore the Marketplace'}<ArrowRight className="size-4"/></Link></div><article className="overflow-hidden rounded-[28px] bg-[#181615] p-7 text-white sm:p-9"><div className="flex items-center gap-4 border-b border-white/10 pb-6"><Image src={detail.avatar} alt="" width={58} height={58} className="size-[58px] rounded-full object-cover ring-2 ring-[#F2A4C5]/25"/><div><p className="text-xl font-semibold">Hugo</p><p className="mt-1 text-xs text-[#AFA397]">{lang==='fr'?'Même identité, nouvelles capacités':'Same identity, new capabilities'}</p></div></div><ul className="mt-6 grid gap-3 sm:grid-cols-2">{t.evolutionItems.map(item => <li key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-4 text-sm font-semibold"><Check className="mt-0.5 size-4 shrink-0 text-[#F2A4C5]"/>{item}</li>)}</ul></article></div></section>

    {missions.length>0&&<section id="missions" className="scroll-mt-24 bg-[#FAF8F3] py-20 sm:py-24"><div className="editorial-shell"><h2 className="max-w-3xl text-[clamp(2.4rem,5vw,4.8rem)] font-semibold leading-[.95] tracking-[-.06em]">{t.missionsTitle}</h2><div className="mt-10 grid gap-4 md:grid-cols-2">{missions.slice(0,4).map(mission => <Link key={mission.slug} href={`/missions/${mission.slug}`} className="group rounded-2xl border border-[#D8D0C2] bg-white p-6 transition hover:-translate-y-1 hover:border-[#D10E63]/40"><h3 className="text-xl font-semibold">{mission.title[lang]}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{mission.objective[lang]}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{lang==='fr'?'Personnaliser':'Customize'}<ArrowRight className="size-4 transition-transform group-hover:translate-x-1"/></span></Link>)}</div><Link href={`/missions?categorie=${encodeURIComponent(detail.department.fr.toLowerCase())}`} className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54]">{t.allMissions}<ArrowRight className="size-4"/></Link></div></section>}

    <HugoFaq lang={lang}/>
    <section className="bg-[#D10E63] py-20 text-white"><div className="editorial-shell flex flex-col justify-between gap-8 lg:flex-row lg:items-end"><h2 className="max-w-4xl text-[clamp(2.8rem,6vw,6rem)] font-semibold leading-[.9] tracking-[-.07em]">{t.finalTitle}</h2><div className="flex min-w-60 flex-col gap-3"><a href="#hugo-alma" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-7 text-sm font-bold">{t.finalCta}</a><Link href="/tarifs" className="text-center text-sm font-bold underline decoration-white/40 underline-offset-4">{t.pricing}</Link></div></div></section>
  </main>
}

function Activity({ time, children }: { time: string; children: React.ReactNode }) { return <li className="flex gap-4"><span className="font-mono text-xs text-[#8F877A]">{time}</span><span>{children}</span></li> }
function Decision({ children, primary=false, active=false, onClick }: { children: React.ReactNode; primary?: boolean; active?: boolean; onClick:()=>void }) { return <button type="button" aria-pressed={active} onClick={onClick} className={`min-h-11 rounded-full px-5 text-xs font-bold outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] ${active?'ring-2 ring-[#F2A4C5]':primary?'bg-[#D10E63] text-white':'border border-white/15 bg-white/[.04] text-white'}`}>{children}</button> }

function IdentityCard({ detail, lang, labels }: { detail: CollaboratorPage['detail']; lang:'fr'|'en'; labels: typeof COPY.fr.identityCard|typeof COPY.en.identityCard }) {
  const fr=lang==='fr'
  const rows=[[labels.owner,fr?'Votre entreprise':'Your organization'],[labels.supervisor,fr?'Directeur commercial':'Sales director'],[fr?'Mémoire':'Memory',fr?'Propre + partagée selon droits':'Own + shared by permission'],[fr?'Exécution':'Execution',fr?'Hermes · environnement privé':'Hermes · private environment'],[fr?'Modèles IA':'AI models',fr?'Un modèle pertinent par tâche':'A relevant model per task']]
  return <article className="overflow-hidden rounded-[30px] border border-[#CFC5B5] bg-[#FAF8F3] shadow-[0_30px_75px_-48px_rgba(28,26,23,.55)]"><header className="border-b border-[#DED6C8] px-6 py-5 sm:px-8"><p className="font-mono text-[11px] font-black uppercase tracking-[.16em] text-[#B00C54]">{labels.header}</p></header><div className="grid gap-6 p-6 sm:grid-cols-[150px_1fr] sm:p-8"><div><Image src={detail.avatar} alt={detail.name} width={150} height={180} className="aspect-[4/5] w-full rounded-2xl object-cover"/><p className="mt-4 text-2xl font-semibold">{detail.name}</p><p className="mt-1 font-mono text-xs text-[#B00C54]">@{detail.slug}</p><p className="mt-2 text-sm font-semibold text-[#625B50]">{fr?'Collaborateur IA commercial':'Sales AI Collaborator'}</p><span className="mt-4 inline-flex rounded-full bg-[#267A48]/10 px-3 py-1 text-[10px] font-bold text-[#267A48]">{fr?'SUPERVISÉ':'SUPERVISED'}</span></div><div className="min-w-0"><dl className="divide-y divide-[#DED6C8] border-y border-[#DED6C8]">{rows.map(([label,value]) => <div key={label} className="grid gap-1 py-3 sm:grid-cols-[130px_1fr]"><dt className="font-mono text-[10px] font-bold uppercase tracking-[.1em] text-[#857C6E]">{label}</dt><dd className="text-sm font-semibold text-[#3F3A33]">{value}</dd></div>)}</dl><div className="mt-5 grid gap-3 sm:grid-cols-2"><IdentityFeature icon={Mail} title={labels.communication} body={fr?'E-mail attribuable · Calendrier · Téléphone selon activation · Messageries autorisées':'Assignable email · Calendar · Phone when enabled · Authorized messaging'}/><IdentityFeature icon={UserRound} title={labels.memory} body={fr?'Historique, contexte utile et expérience validée de Hugo.':'Hugo’s history, useful context and approved experience.'}/><IdentityFeature icon={Building2} title={labels.shared} body={fr?'Méthodes, documents et connaissances accessibles selon ses droits.':'Methods, documents and knowledge available under permissions.'}/><IdentityFeature icon={Server} title={labels.execution} body={fr?'Agent Hermes · Fichiers · Navigateur · Code · Secrets propres':'Hermes Agent · Files · Browser · Code · Own secrets'}/></div></div></div><footer className="border-t border-[#DED6C8] bg-[#EAE3D4] px-6 py-4 sm:px-8"><div className="flex items-center gap-2 text-xs font-bold text-[#4E483F]"><ShieldCheck className="size-4 text-[#D10E63]"/>{labels.governance}</div><p className="mt-2 text-xs leading-5 text-[#625B50]">{fr?'Exemple de configuration : e-mail attribuable, téléphone selon activation, applications à autoriser et budget à définir.':'Configuration example: assignable email, phone when enabled, applications to authorize and budget to define.'}</p></footer></article>
}

function IdentityFeature({ icon:Icon,title,body }:{icon:typeof UserRound;title:string;body:string}) { return <div className="rounded-2xl border border-[#DED6C8] bg-white p-4"><Icon className="size-4 text-[#D10E63]"/><h3 className="mt-3 text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></div> }
function HeroProof({title,body}:{title:string;body:string}) { return <article className="min-h-28 border-b border-[#CFC5B5] py-5 sm:border-r sm:px-5 lg:border-b-0 lg:first:pl-0 lg:last:border-r-0"><h3 className="text-sm font-semibold">{title}</h3><p className="mt-2 text-xs leading-5 text-[#625B50]">{body}</p></article> }

function ApplicationLogos() {
  const apps=[['HubSpot',siHubspot],['Salesforce',null],['LinkedIn',null],['Gmail',siGmail],['Outlook',null],['Agenda',siGooglecalendar]] as const
  return <ul aria-label="Applications commerciales compatibles" className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#DED6C8] bg-[#DED6C8] sm:grid-cols-3">{apps.map(([name,icon]) => <li key={name} className="flex min-h-24 items-center gap-3 bg-white p-4">{icon?<svg aria-hidden viewBox="0 0 24 24" className="size-7 shrink-0" fill={`#${icon.hex}`}><path d={icon.path}/></svg>:<span aria-hidden className={`flex size-7 items-center justify-center rounded-md text-xs font-black text-white ${name==='Salesforce'?'bg-[#00A1E0]':name==='LinkedIn'?'bg-[#0A66C2]':'bg-[#0078D4]'}`}>{name==='Salesforce'?'S':name==='LinkedIn'?'in':'O'}</span>}<span><strong className="block text-xs">{name}</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.1em] text-[#857C6E]">Compatible</small></span></li>)}</ul>
}

function ModelLogos() {
  const models=[[OpenAI,'OpenAI','GPT'],[Anthropic,'Anthropic','Claude'],[Gemini,'Google','Gemini'],[Mistral,'Mistral AI','Mistral']] as const
  return <ul aria-label="Familles de modèles accessibles via Unitalk AI Gateway" className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-4">{models.map(([Icon,provider,model]) => <li key={provider} className="min-h-28 bg-[#211E1B] p-4"><span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-[#F3EFE6] text-[#181615]"><Icon size={23}/></span><strong className="mt-4 block text-xs">{provider}</strong><span className="mt-1 block text-[10px] text-[#AFA397]">{model}</span></li>)}</ul>
}

function HugoFaq({lang}:{lang:'fr'|'en'}) {
  const items=lang==='fr' ? [['Hugo appartient-il à Unitalk ou à mon entreprise ?','Hugo illustre publiquement le profil commercial. Le Collaborateur IA personnalisé et déployé pour votre organisation appartient à votre entreprise.'],['Puis-je choisir son prénom, son visage et sa voix ?','Oui. Son identité IA est personnalisable avant son déploiement.'],['Hugo peut-il utiliser mon CRM et mes applications ?','Oui, après autorisation. Votre entreprise définit séparément les comptes, données et actions accessibles.'],['Quel modèle IA utilise-t-il ?','Il utilise uniquement les modèles autorisés. Unitalk AI Gateway sélectionne une route pertinente selon la tâche, vos règles et votre budget.'],['Que se passe-t-il si son responsable quitte l’entreprise ?','La supervision peut être réattribuée. L’identité, la mémoire et les méthodes validées restent dans l’entreprise.'],['Puis-je lui ajouter de nouvelles responsabilités ?','Oui. Ajoutez des profils métier et des compétences sans recréer son identité.']] : [['Does Hugo belong to Unitalk or my organization?','Hugo publicly illustrates the sales profile. The AI Collaborator deployed for your organization belongs to your organization.'],['Can I choose the name, face and voice?','Yes. The AI identity is customizable before deployment.'],['Can it use my CRM and applications?','Yes, after authorization. Your organization defines accessible accounts, data and actions.'],['Which AI model does it use?','It only uses authorized models. Unitalk AI Gateway selects a relevant route under the task, rules and budget.'],['What happens if the supervisor leaves?','Supervision can be reassigned. Identity, memory and approved methods remain in the organization.'],['Can I add new responsibilities?','Yes. Add job profiles and skills without recreating the identity.']]
  return <section className="bg-[#F3EFE6] py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.72fr_1.28fr]"><div><Kicker>FAQ</Kicker><h2 className="mt-5 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.94] tracking-[-.06em]">{lang==='fr'?'Questions fréquentes':'Frequently asked questions'}</h2></div><div className="border-t border-[#CFC5B5]">{items.map(([question,answer]) => <FaqItem key={question} question={question} answer={answer}/>)}</div></div></section>
}

function FaqItem({question,answer}:{question:string;answer:string}) { const [open,setOpen]=useState(false); const id=useId(); return <div className="border-b border-[#CFC5B5]"><button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen(v=>!v)} className="flex min-h-20 w-full items-center justify-between gap-5 text-left text-lg font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"><span>{question}</span><span aria-hidden className="font-mono text-[#D10E63]">{open?'−':'+'}</span></button>{open&&<p id={id} className="max-w-2xl pb-7 pr-8 text-[15px] leading-7 text-[#4E483F]">{answer}</p>}</div> }
