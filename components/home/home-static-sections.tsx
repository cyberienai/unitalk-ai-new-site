import Image from 'next/image'
import { LocalizedLink as Link } from '@/components/localized-link'
import { ArrowRight, Building2, CalendarDays, Check, Mail, Server } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { MISSIONS } from '@/lib/missions-catalog'
import { getPreparedMissionPreview } from '@/lib/mission-preview'
import { HomeMissionCard } from '@/components/missions/store-card'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { AlmaInline } from '@/components/alma-inline'
import { localizedHref } from '@/lib/i18n-routing'
import { Kicker } from './section-kicker'

const POPULAR_MISSION_SLUGS = [
  'trouver-de-nouveaux-clients',
  'repondre-aux-appels-clients',
  'relancer-les-factures-impayees',
] as const

const COPY = {
  fr: {
    doors: [
      ['J’ai un travail à confier', 'Décrire un résultat ou choisir une mission déjà cadrée.', 'Explorer les missions', '/missions'],
      ['Je veux comprendre le produit', 'Découvrir son identité, sa place et ses ressources.', 'En savoir plus', '/collaborateurs-ia'],
      ['Je veux voir comment il travaille', 'Suivre son activité et garder la main sur les décisions.', 'Découvrir le Workspace', '/workspace'],
      ['Je veux voir comment il évolue', 'Ajouter des capacités sans recréer son identité.', 'Explorer la Marketplace', '/marketplace'],
    ],
    anatomyKicker: 'Plus qu’un assistant IA',
    anatomyTitle: <>Votre&nbsp;Collaborateur&nbsp;IA<br className="hidden lg:block" /> a sa propre identité.</>,
    anatomyLead: 'Un Collaborateur IA est supervisé par un humain et appartient à votre entreprise. Il possède sa propre identité, ses moyens de communication, son environnement de travail et une place définie dans votre entreprise.',
    anatomy: [['Identité IA', 'Prénom, visage et voix'], ['Communication', 'E-mail, calendrier et téléphone'], ['Exécution', 'Agent Hermes et serveur privé'], ['Entreprise', 'Responsable, rattachement et droits']],
    anatomyCta: 'Découvrir le Collaborateur IA', anatomyLabel: 'Exemple de Collaboratrice IA', anatomyRole: 'Assistante de direction',
    finalKicker: 'Votre première mission', finalTitle: 'Quelle première mission allez-vous confier à votre Collaborateur IA ?',
    finalBody: 'Décrivez votre besoin en quelques phrases. Alma prépare la mission, recommande le Collaborateur IA adapté et vous indique les accès ou validations nécessaires avant tout démarrage.', finalCta: 'Commencer gratuitement',
    finalProofs: ['Première mission offerte', 'Sans carte bancaire', 'Accompagnement humain si nécessaire', 'Sans engagement'],
    pricing: 'Après la mission offerte : Collaborateur IA dès 49 €/mois, consommation des modèles selon votre configuration.', pricingCta: 'Voir le détail des tarifs',
    proofKicker: 'Cas concret illustratif', proofTitle: '12 factures détectées. 10 relances préparées. 2 litiges protégés.',
    proofBody: 'Emma analyse les échéances, exclut automatiquement les dossiers en litige et prépare les relances. Le responsable financier valide avant toute action sensible.',
    proofFacts: ['12 factures analysées', '10 relances prêtes', '2 dossiers bloqués', '1 validation humaine'], proofNote: 'Exemple de démonstration, sans données client réelles.',
  },
  en: {
    doors: [
      ['I have work to assign', 'Describe an outcome or choose an already scoped mission.', 'Explore missions', '/missions'],
      ['I want to understand the product', 'Discover its identity, place and resources.', 'Learn more', '/collaborateurs-ia'],
      ['I want to see how it works', 'Follow its activity and retain control of decisions.', 'Discover Workspace', '/workspace'],
      ['I want to see how it evolves', 'Add capabilities without recreating its identity.', 'Explore the Marketplace', '/marketplace'],
    ],
    anatomyKicker: 'More than an AI assistant', anatomyTitle: 'Your AI Collaborator has its own identity.',
    anatomyLead: 'An AI Collaborator is supervised by a human and belongs to your organization. It has its own identity, communications, working environment and a defined place in your organization.',
    anatomy: [['Identity', 'Name, face and voice'], ['Communication', 'Email, calendar and phone'], ['Execution', 'Hermes Agent and private server'], ['Organization', 'Owner, assignment and permissions']],
    anatomyCta: 'Discover the AI Collaborator', anatomyLabel: 'AI Collaborator example', anatomyRole: 'Executive Assistant',
    finalKicker: 'Your first mission', finalTitle: 'What first mission will you assign to your AI Collaborator?',
    finalBody: 'Describe your need in a few sentences. Alma prepares the mission, recommends the right AI Collaborator and identifies the access or approvals required before work begins.', finalCta: 'Start for free',
    finalProofs: ['First mission included', 'No credit card', 'Human support when needed', 'No commitment'],
    pricing: 'After the included mission: AI Collaborator from €49/month, plus model usage based on your setup.', pricingCta: 'See detailed pricing',
    proofKicker: 'Illustrative use case', proofTitle: '12 invoices detected. 10 reminders prepared. 2 disputes protected.',
    proofBody: 'Emma reviews due dates, automatically excludes disputed cases and prepares reminders. The finance manager approves every sensitive action.',
    proofFacts: ['12 invoices reviewed', '10 reminders ready', '2 cases blocked', '1 human approval'], proofNote: 'Illustrative demonstration using no real customer data.',
  },
} as const

export function HomeIntentDoors({ lang }: { lang: Lang }) {
  const missions = POPULAR_MISSION_SLUGS.map(slug => MISSIONS.find(mission => mission.slug === slug)).filter((mission): mission is (typeof MISSIONS)[number] => Boolean(mission))
  return <section aria-labelledby="popular-missions-title" className="border-b border-[#D8D0C2] bg-[#F3EFE6] py-14 sm:py-20"><div className="editorial-shell"><div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"><div><Kicker>Missions</Kicker><h2 id="popular-missions-title" className="mt-5 max-w-4xl text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{lang === 'fr' ? 'Commencez par une mission déjà cadrée.' : 'Start with an already scoped mission.'}</h2><p className="mt-5 max-w-2xl text-[16px] leading-7 text-[#4E483F]">{lang === 'fr' ? <>Prospection, relation client, finance ou direction : choisissez un résultat à obtenir. <span className="whitespace-nowrap"><AlmaInline className="mr-1 align-[-.2em]"/>Alma</span> adapte ensuite la mission à vos méthodes, vos outils et vos règles.</> : <>Sales, customer relations, finance or leadership: choose an outcome. <span className="whitespace-nowrap"><AlmaInline className="mr-1 align-[-.2em]"/>Alma</span> then adapts the mission to your methods, tools and rules.</>}</p></div><Link href={localizedHref('missions', lang)} className="inline-flex w-fit shrink-0 items-center gap-2 text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{lang === 'fr' ? 'Explorer toutes les missions' : 'Explore all missions'}<ArrowRight className="size-4"/></Link></div><div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">{missions.map(mission => <HomeMissionCard key={mission.slug} mission={mission} lang={lang}/>)}</div></div></section>
}

export function HomeProofCase({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <section className="border-y border-[#D8D0C2] bg-[#FAF8F3] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-center"><div><Kicker>{t.proofKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[clamp(2.35rem,4.2vw,4rem)] font-bold leading-[.98] tracking-[-.05em]">{t.proofTitle}</h2><p className="mt-6 max-w-2xl text-[17px] font-medium leading-[1.85] text-[#4E483F]">{t.proofBody}</p><p className="mt-5 text-xs text-[#766D61]">{t.proofNote}</p></div><ul className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-[#D8D0C2] bg-[#EAE3D4]">{t.proofFacts.map(fact => <li key={fact} className="flex min-h-32 flex-col justify-between border-b border-r border-[#D8D0C2] p-5 odd:last:border-b-0 even:border-r-0 even:last:border-b-0"><Check aria-hidden className="size-5 text-[#D10E63]"/><strong className="text-lg leading-6">{fact}</strong></li>)}</ul></div></section>
}

export function HomeCollaboratorAnatomy({ lang }: { lang: Lang }) {
  const t = COPY[lang]
  return <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] py-16 sm:py-20"><div className="editorial-shell grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center"><div><Kicker>{t.anatomyKicker}</Kicker><h2 className="mt-5 max-w-3xl text-[clamp(2.25rem,4.5vw,4.25rem)] font-semibold leading-[.96] tracking-[-.055em]">{t.anatomyTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-[#4E483F]">{t.anatomyLead}</p><Link href="/collaborateurs-ia" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.anatomyCta}<ArrowRight className="size-4" /></Link></div><article className="overflow-hidden rounded-[2rem] border border-[#CFC5B5] bg-[#FAF8F3]"><div className="flex items-center gap-5 border-b border-[#DED6C8] p-6 sm:p-8"><Image src="/images/emma-avatar.png" alt="Emma" width={80} height={80} className="size-20 rounded-full object-cover"/><div><p className="font-mono text-[10px] font-black uppercase tracking-[.14em] text-[#B00C54]">{t.anatomyLabel}</p><h3 className="mt-2 text-3xl font-semibold">Emma</h3><p className="mt-1 text-sm font-semibold text-[#625B50]">{t.anatomyRole}</p></div></div><dl className="grid sm:grid-cols-2">{t.anatomy.map(([title, body], index) => { const Icon = index === 0 ? CalendarDays : index === 1 ? Mail : index === 2 ? Server : Building2; return <div key={title} className="border-b border-[#DED6C8] p-5 sm:border-r sm:p-6 sm:[&:nth-child(even)]:border-r-0"><dt className="flex items-center gap-2 text-xs font-bold text-[#B00C54]"><Icon className="size-4"/>{title}</dt><dd className="mt-2 text-sm leading-6 text-[#4E483F]">{body}</dd></div> })}</dl></article></div></section>
}

export function HomeFinalCta({ lang, value, onChange, listening, onToggleListening, voiceSupported }: { lang: Lang; value: string; onChange: (value: string) => void; listening: boolean; onToggleListening: () => void; voiceSupported: boolean }) {
  const t = COPY[lang]
  const preview = value.trim().length >= 20 ? getPreparedMissionPreview(value.trim(), lang) : null
  const submit = () => {
    const clean = value.trim()
    if (!clean) return
    const draftId = `draft_${typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`}`
    let stored = false
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })); stored = true } catch {}
    const params = new URLSearchParams({ source: 'home-final' })
    if (stored) params.set('draft', draftId)
    else params.set('q', clean.slice(0, 1500))
    window.location.assign(`${localizedHref('discover', lang)}?${params}`)
  }
  const title = lang === 'fr' ? 'Quel résultat voulez-vous obtenir ?' : 'What outcome do you want to achieve?'
  const proofs = lang === 'fr' ? ['Première mission offerte', 'Sans carte bancaire', 'Aucun abonnement activé automatiquement'] : ['First mission included', 'No credit card', 'No subscription activated automatically']
  return <section className="bg-[#D10E63] py-14 text-white sm:py-20"><div className="editorial-shell grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center"><div><p className="font-mono text-[11px] font-black uppercase tracking-[.18em] text-white/85">{t.finalKicker}</p><h2 className="mt-5 max-w-3xl text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-[.92] tracking-[-.06em]">{title}</h2><p className="mt-5 max-w-xl text-[16px] leading-7 text-white/90">{lang === 'fr' ? <>Décrivez le résultat attendu. <span className="whitespace-nowrap"><AlmaInline className="mr-1 align-[-.2em]"/>Alma</span> prépare la mission, recommande le Collaborateur IA et identifie les validations nécessaires.</> : <>Describe the expected outcome. <span className="whitespace-nowrap"><AlmaInline className="mr-1 align-[-.2em]"/>Alma</span> prepares the mission, recommends the AI Collaborator and identifies the required approvals.</>}</p><ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-white/90">{proofs.map(proof => <li key={proof} className="flex items-center gap-2"><Check className="size-3.5"/>{proof}</li>)}</ul></div><AlmaMissionComposer value={value} onChange={onChange} onSubmit={submit} title={lang === 'fr' ? 'Quel travail voulez-vous confier ?' : 'What work would you like to assign?'} role={lang === 'fr' ? 'Coordinatrice de missions IA' : 'AI mission coordinator'} placeholder={lang === 'fr' ? 'Ex. Relancer les factures impayées sans contacter les clients en litige…' : 'E.g. Follow up unpaid invoices without contacting customers in dispute…'} submitLabel={lang === 'fr' ? 'Préparer ma mission avec Alma' : 'Prepare my mission with Alma'} starters={[]} onStarterSelect={onChange} listening={listening} onToggleListening={onToggleListening} voiceSupported={voiceSupported} voiceStartLabel={lang === 'fr' ? 'Commencer à parler' : 'Start talking'} voiceStopLabel={lang === 'fr' ? 'Terminer' : 'Finish'} listeningLabel={lang === 'fr' ? 'Alma vous écoute…' : 'Alma is listening…'} previewVisible={Boolean(preview)} compactMobile compactDesktop titleInField source="home-final" preview={preview && <div className="rounded-2xl border border-white/10 bg-[#211E1A] p-4"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{lang === 'fr' ? 'Mission préparée' : 'Prepared mission'}</p><p className="mt-2 text-[15px] font-semibold text-white">{preview.title}</p></div>}/></div></section>
}
