import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MARKETPLACE_COLLABORATOR_SLUGS } from '@/lib/collaborators-catalog'
import { AI_MODELS } from '@/lib/ai-models-catalog'
import { MISSIONS } from '@/lib/missions-catalog'
import { STORE_ITEMS } from '@/lib/store-catalog'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { AlmaInline } from '@/components/alma-inline'

type Door = {
  title: string
  question: string
  body: string
  href: string
  count: string
}

const profiles = STORE_ITEMS.filter(item => item.type === 'profil').length
const skills = STORE_ITEMS.filter(item => item.type === 'competence').length
const applications = STORE_ITEMS.filter(item => item.type === 'application' || item.type === 'integration').length

const COPY = {
  fr: {
    kicker: 'La Marketplace des agents autonomes open source',
    title: 'Des agents open source.',
    accent: 'Une intelligence gouvernée par votre entreprise.',
    lead: 'Unitalk transforme des moteurs agentiques comme Hermes en Collaborateurs IA capables d’accomplir vos missions avec vos méthodes, vos outils et vos règles.',
    signature: 'Own your intelligence.',
    primary: 'Explorer les missions',
    secondary: 'Décrire ma mission',
    proof: ['Première mission offerte', 'Plus de 3 200 intégrations', 'Infrastructure européenne'],
    systemKicker: 'Un système composable',
    systemTitle: 'Une mission donne le cap.',
    systemAccent: 'Chaque ressource ajoute un pouvoir d’agir.',
    systemBody: 'Vous n’avez pas besoin de tout choisir. Alma part du résultat attendu et prépare uniquement les ressources utiles, sous les règles de votre entreprise.',
    recommended: 'Point de départ recommandé',
    open: '',
    pathKicker: 'Comment les briques s’assemblent',
    pathTitle: 'Du résultat attendu',
    pathAccent: 'à l’exécution gouvernée.',
    path: [
      ['Mission', 'Le résultat à obtenir'],
      ['Collaborateur IA', 'L’identité qui en répond'],
      ['Profil et compétences', 'Le rôle et les méthodes'],
      ['Applications et modèles', 'Les outils autorisés'],
      ['Serveur IA', 'L’environnement d’exécution'],
    ],
    finalKicker: 'Vous pouvez commencer simplement',
    finalTitle: 'Décrivez votre mission.',
    finalAccent: 'Alma prépare la suite.',
    finalBody: 'Votre première mission permet de tester le Collaborateur IA avant toute activation payante.',
    finalCta: 'Préparer ma mission avec Alma',
    reassurance: 'Première mission offerte · Sans carte bancaire',
  },
  en: {
    kicker: 'The marketplace for open-source autonomous agents',
    title: 'Open agents.',
    accent: 'Intelligence governed by your organization.',
    lead: 'Unitalk turns agentic engines such as Hermes into AI Collaborators that carry out missions using your methods, tools and rules.',
    signature: 'Own your intelligence.',
    primary: 'Explore missions',
    secondary: 'Describe my mission',
    proof: ['First mission included', '3,200+ integrations', 'European infrastructure'],
    systemKicker: 'A composable system',
    systemTitle: 'A mission sets the direction.',
    systemAccent: 'Each resource adds the ability to act.',
    systemBody: 'You do not need to choose everything. Alma starts from the expected outcome and prepares only the useful resources, under your organization’s rules.',
    recommended: 'Recommended starting point',
    open: '',
    pathKicker: 'How the building blocks fit together',
    pathTitle: 'From the expected outcome',
    pathAccent: 'to governed execution.',
    path: [
      ['Mission', 'The outcome to achieve'],
      ['AI Collaborator', 'The identity accountable for it'],
      ['Profile and skills', 'The role and methods'],
      ['Applications and models', 'The authorized tools'],
      ['AI server', 'The execution environment'],
    ],
    finalKicker: 'Start simply',
    finalTitle: 'Describe the work.',
    finalAccent: 'Alma builds the rest.',
    finalBody: 'Your first mission lets you test the AI Collaborator before any paid activation.',
    finalCta: 'Prepare my mission with Alma',
    reassurance: 'First mission included · No credit card',
  },
} as const

function doors(lang: Lang): Door[] {
  return lang === 'fr' ? [
    { title: 'Missions', question: 'Quel résultat voulez-vous obtenir ?', body: 'Partez d’un travail déjà cadré ou décrivez le vôtre. Alma adapte ensuite la mission à votre entreprise.', href: '/missions', count: `${MISSIONS.length} missions` },
    { title: 'Collaborateurs IA', question: 'Qui prend cette responsabilité ?', body: 'Choisissez une identité professionnelle durable, avec son contexte, ses communications et son environnement de travail.', href: '/marketplace/collaborateurs-ia', count: `${MARKETPLACE_COLLABORATOR_SLUGS.length} identités` },
    { title: 'Profils métier', question: 'Quel rôle doit-il exercer ?', body: 'Définissez ses responsabilités, son périmètre et les limites propres au métier attendu.', href: '/marketplace/profils-metier', count: `${profiles} profils` },
    { title: 'Compétences', question: 'Quelle méthode doit-il appliquer ?', body: 'Ajoutez des savoir-faire documentés, testables et réutilisables dans plusieurs missions.', href: '/marketplace/competences', count: `${skills} compétences` },
    { title: 'Applications', question: 'À quels outils peut-il accéder ?', body: 'Connectez uniquement les applications et les actions nécessaires au travail confié.', href: '/marketplace/applications', count: `${applications} applications` },
    { title: 'Modèles IA', question: 'Quelle intelligence utiliser ?', body: 'Autorisez les fournisseurs et modèles adaptés à vos exigences de qualité, de coût et de souveraineté.', href: '/marketplace/modeles-ia', count: `${AI_MODELS.length} modèles` },
    { title: 'Serveurs IA', question: 'Où le travail est-il exécuté ?', body: 'Choisissez une infrastructure adaptée à la charge, à la confidentialité et à la localisation attendues.', href: '/marketplace/serveurs-ia', count: 'Infrastructure' },
  ] : [
    { title: 'Missions', question: 'What outcome do you want to achieve?', body: 'Start with scoped work or describe your own. Alma then adapts the mission to your organization.', href: '/en/missions', count: `${MISSIONS.length} missions` },
    { title: 'AI Collaborators', question: 'Who takes responsibility?', body: 'Choose a durable professional identity with its context, communications and work environment.', href: '/en/marketplace/ai-collaborators', count: `${MARKETPLACE_COLLABORATOR_SLUGS.length} identities` },
    { title: 'Job profiles', question: 'Which role should it perform?', body: 'Define its responsibilities, scope and boundaries for the expected role.', href: '/en/marketplace/job-profiles', count: `${profiles} profiles` },
    { title: 'Skills', question: 'Which method should it apply?', body: 'Add documented, testable know-how that can be reused across missions.', href: '/en/marketplace/skills', count: `${skills} skills` },
    { title: 'Applications', question: 'Which tools can it access?', body: 'Connect only the applications and actions required for the assigned work.', href: '/en/marketplace/applications', count: `${applications} applications` },
    { title: 'AI models', question: 'Which intelligence should it use?', body: 'Authorize providers and models suited to your quality, cost and sovereignty requirements.', href: '/en/marketplace/ai-models', count: `${AI_MODELS.length} models` },
    { title: 'AI servers', question: 'Where is the work executed?', body: 'Choose infrastructure suited to workload, privacy and location requirements.', href: '/en/marketplace/ai-servers', count: 'Infrastructure' },
  ]
}

export function MarketplaceOverview({ lang = 'fr' }: { lang?: Lang }) {
  const t = COPY[lang]
  const items = doors(lang)
  const [mission, ...resources] = items

  return (
    <main id="main-content" className="min-h-screen bg-[#F3EFE6] text-[#1C1A17]">
      <section className="relative overflow-hidden border-b border-[#D8D0C2] bg-[#EAE3D4] px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div aria-hidden className="absolute -right-32 top-10 size-[30rem] rounded-full border-[5rem] border-[#D10E63]/10"/>
        <div className="editorial-shell relative">
          <Kicker>{t.kicker}</Kicker>
          <h1 className="mt-5 max-w-[860px] text-balance text-[clamp(2.65rem,12vw,4.75rem)] font-semibold leading-[.92] tracking-[-.06em] lg:text-[clamp(3.25rem,5vw,4.75rem)]">{t.title}<span className="block text-[#D10E63]">{t.accent}</span></h1>
          <p className="mt-6 max-w-3xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p>
          <p className="mt-5 font-mono text-xs font-black uppercase tracking-[.18em] text-[#B00C54]">{t.signature}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={mission.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-sm font-bold text-white hover:bg-[#B00C54]">{t.primary}<ArrowRight className="size-4"/></Link>
            <Link href={lang === 'fr' ? '/decouvrir?source=marketplace' : '/en/get-started?source=marketplace'} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#BFB4A4] bg-[#FAF8F3] px-7 text-sm font-bold">{t.secondary}</Link>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#625B50]">{t.proof.map(item => <li key={item} className="flex items-center gap-2"><CheckDot/>{item}</li>)}</ul>
        </div>
      </section>

      <section aria-labelledby="marketplace-components-title" className="px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div>
            <Kicker>{t.systemKicker}</Kicker>
            <h2 id="marketplace-components-title" className="mt-5 max-w-6xl text-balance text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{t.systemTitle} <span className="text-[#D10E63]">{t.systemAccent}</span></h2>
            <p className="mt-6 max-w-3xl text-[16px] leading-8 text-[#625B50]">{withAlmaAvatar(t.systemBody)}</p>
          </div>

          <Link href={mission.href} className="group relative mt-10 grid overflow-hidden rounded-[28px] border border-[#292521] bg-[#181615] text-white shadow-[0_30px_75px_-52px_rgba(28,26,23,.8)] transition-transform hover:-translate-y-1 lg:grid-cols-[.72fr_1.28fr]">
            <div className="flex min-h-64 flex-col justify-between border-b border-white/10 p-7 lg:border-b-0 lg:border-r lg:p-9"><p className="font-mono text-xs font-black uppercase tracking-[.16em] text-[#F2A4C5]">{t.recommended}</p><div><p className="text-3xl font-semibold tracking-[-.045em]">{mission.title}</p><p className="mt-3 font-mono text-xs font-bold text-[#F2A4C5]">{mission.count}</p></div></div>
            <div className="flex min-h-64 flex-col p-7 sm:p-9"><h3 className="text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[.96] tracking-[-.05em]">{mission.question}</h3><p className="mt-4 max-w-2xl text-[15px] leading-7 text-[#CFC6B8]">{withAlmaAvatar(mission.body)}</p><ArrowRight className="mt-auto size-5 self-end text-[#F2A4C5] transition-transform group-hover:translate-x-1"/></div>
          </Link>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map(item => <ResourceCard key={item.title} item={item}/>) }
          </div>
        </div>
      </section>

      <section className="border-y border-[#D8D0C2] bg-[#EAE3D4] px-5 py-14 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <Kicker>{t.pathKicker}</Kicker>
          <h2 className="mt-5 max-w-4xl text-[clamp(2.35rem,4vw,3.5rem)] font-bold leading-[.98] tracking-[-.05em]">{t.pathTitle}<span className="block text-[#D10E63]">{t.pathAccent}</span></h2>
          <ol className="mt-10 grid overflow-hidden rounded-[24px] border border-[#CFC5B5] bg-[#CFC5B5] sm:grid-cols-2 lg:grid-cols-5">
            {t.path.map(([title,body]) => <li key={title} className="min-h-40 bg-[#FAF8F3] p-5"><h3 className="text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-[#625B50]">{body}</p></li>)}
          </ol>
        </div>
      </section>

      <section className="bg-[#D10E63] px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="font-mono text-xs font-black uppercase tracking-[.18em] text-white/75">{t.finalKicker}</p><h2 className="mt-5 max-w-4xl text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.finalTitle}<span className="block text-[#1C1A17]">{t.finalAccent}</span></h2><p className="mt-5 max-w-2xl text-[16px] leading-7 text-white/85">{t.finalBody}</p><p className="mt-4 text-xs font-bold text-white/80">{t.reassurance}</p></div>
          <Link href={lang === 'fr' ? '/decouvrir?source=marketplace-final' : '/en/get-started?source=marketplace-final'} className="inline-flex min-h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-sm font-bold text-white">{t.finalCta}<ArrowRight className="size-4"/></Link>
        </div>
      </section>
    </main>
  )
}

function ResourceCard({ item }: { item: Door }) {
  return <Link href={item.href} aria-label={item.title} className="group flex min-h-[300px] flex-col rounded-[24px] border border-[#D8D0C2] bg-[#FAF8F3] p-6 transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-[#D10E63]/40 hover:shadow-[0_26px_60px_-48px_rgba(28,26,23,.7)]"><p className="border-b border-[#DED6C8] pb-4 font-mono text-xs font-black uppercase tracking-[.14em] text-[#B00C54]">{item.count}</p><h3 className="mt-7 text-[28px] font-semibold leading-none tracking-[-.045em]">{item.title}</h3><p className="mt-5 text-[15px] font-semibold leading-6 text-[#322E29]">{item.question}</p><p className="mt-3 text-sm leading-6 text-[#625B50]">{item.body}</p><ArrowRight className="mt-auto size-5 self-end border-t border-[#DED6C8] pt-5 text-[#B00C54] transition-transform group-hover:translate-x-1"/></Link>
}

function CheckDot() {
  return <span aria-hidden className="size-1.5 rounded-full bg-[#D10E63]"/>
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => <span key={`${part}-${index}`}>{index > 0 && <><AlmaInline className="mr-1 align-[-.2em]"/>Alma</>}{part}</span>)
}
