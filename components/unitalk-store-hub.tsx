'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowRight,
  ArrowUpRight,
  Blocks,
  BookOpenCheck,
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  Handshake,
  LibraryBig,
  Search,
  Server,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { ROLE_DETAILS, collaboratorHref } from '@/lib/collaborators-catalog'
import { MISSIONS } from '@/lib/missions-catalog'
import { STORE_ITEMS, storeItemHref } from '@/lib/store-catalog'
import { PATHS } from '@/lib/academy-catalog'
import { EXPERT_DOMAINS } from '@/lib/experts'

type Lang = 'fr' | 'en'
type Bi = { fr: string; en: string }
type Category = {
  id: string
  title: Bi
  short: Bi
  description: Bi
  statement: Bi
  href: string
  icon: LucideIcon
  store?: boolean
}

type MarketplaceItem = {
  key: string
  title: string
  description: string
  href?: string
  meta: string
  image?: string
  origin?: string
  pending?: boolean
  status?: Bi
}

const PAGE_SIZE = 12

const MODEL_ITEMS = [
  { key: 'gpt', title: 'GPT', maker: 'OpenAI', meta: 'Texte · Vision · Code' },
  { key: 'claude', title: 'Claude', maker: 'Anthropic', meta: 'Texte · Analyse · Code' },
  { key: 'gemini', title: 'Gemini', maker: 'Google', meta: 'Texte · Vision · Multimodal' },
  { key: 'mistral', title: 'Mistral', maker: 'Mistral AI', meta: 'Texte · Code · Europe' },
  { key: 'deepseek', title: 'DeepSeek', maker: 'DeepSeek', meta: 'Raisonnement · Code' },
  { key: 'llama', title: 'Llama', maker: 'Meta', meta: 'Open weights · Texte' },
] as const

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

const GROUPS: { title: Bi; description: Bi; categories: Category[] }[] = [
  {
    title: { fr: 'Trouver un Collaborateur', en: 'Find an AI Collaborator' },
    description: {
      fr: 'Partez d’une identité, d’un travail à accomplir ou d’un métier de la connaissance.',
      en: 'Start with an identity, a job to be done or a knowledge-work profession.',
    },
    categories: [
      {
        id: 'collaborateurs-ia',
        title: { fr: 'Collaborateurs IA', en: 'AI Collaborators' },
        short: { fr: 'Identités', en: 'Identities' },
        description: {
          fr: 'Des identités professionnelles complètes, prêtes à rejoindre votre organisation.',
          en: 'Complete professional identities ready to join your organization.',
        },
        statement: { fr: 'Une présence professionnelle, pas un compte logiciel.', en: 'A professional presence, not a software account.' },
        href: '/collaborateurs-ia',
        icon: UserRound,
      },
      {
        id: 'missions',
        title: { fr: 'Missions', en: 'Missions' },
        short: { fr: 'Travail', en: 'Work' },
        description: {
          fr: 'Le travail concret à confier, avec son résultat attendu et ses validations.',
          en: 'Concrete work to delegate, with its expected result and approvals.',
        },
        statement: { fr: 'Le résultat avant la technologie.', en: 'Outcomes before technology.' },
        href: '/missions',
        icon: BookOpenCheck,
      },
      {
        id: 'profils-metier',
        title: { fr: 'Profils métier', en: 'Job profiles' },
        short: { fr: 'Responsabilité', en: 'Accountability' },
        description: {
          fr: 'Un profil métier de référence pour chaque métier de la connaissance.',
          en: 'One reference job profile for every knowledge-work profession.',
        },
        statement: { fr: 'Donnez-lui un métier. Donc des limites.', en: 'Give it a profession. Therefore, limits.' },
        href: '/collaborateurs-ia/profils-metier',
        icon: BriefcaseBusiness,
        store: true,
      },
    ],
  },
  {
    title: { fr: 'Enrichir ses capacités', en: 'Expand capabilities' },
    description: {
      fr: 'Ajoutez les méthodes, le contexte et les outils nécessaires à son travail.',
      en: 'Add the methods, context and tools required for the work.',
    },
    categories: [
      {
        id: 'competences',
        title: { fr: 'Compétences', en: 'Skills' },
        short: { fr: 'Savoir-faire', en: 'Know-how' },
        description: {
          fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.',
          en: 'Precise, tested, versioned and reusable know-how.',
        },
        statement: { fr: 'Installez des méthodes, pas des tours de magie.', en: 'Install methods, not magic tricks.' },
        href: '/collaborateurs-ia/competences',
        icon: Sparkles,
        store: true,
      },
      {
        id: 'connaissances',
        title: { fr: 'Connaissances', en: 'Knowledge' },
        short: { fr: 'Sources', en: 'Sources' },
        description: {
          fr: 'Corpus, référentiels et procédures qu’un Collaborateur IA peut consulter.',
          en: 'Corpora, reference materials and procedures an AI Collaborator can consult.',
        },
        statement: { fr: 'Ce qu’il peut savoir doit rester traçable.', en: 'What it can know must remain traceable.' },
        href: '/architecture#connaissance-entreprise',
        icon: LibraryBig,
      },
      {
        id: 'memoire-contexte',
        title: { fr: 'Mémoire et contexte', en: 'Memory and context' },
        short: { fr: 'Mémoire', en: 'Memory' },
        description: {
          fr: 'Structures de mémoire, règles de conservation et contexte gouverné.',
          en: 'Memory structures, retention rules and governed context.',
        },
        statement: { fr: 'Se souvenir est un droit administré.', en: 'Remembering is an administered right.' },
        href: '/architecture#memoire-et-contexte',
        icon: BrainCircuit,
      },
      {
        id: 'applications',
        title: { fr: 'Applications', en: 'Applications' },
        short: { fr: 'Pouvoir d’agir', en: 'Agency' },
        description: {
          fr: 'Les outils, connecteurs et applications métier autorisés.',
          en: 'Approved tools, connectors and business applications.',
        },
        statement: { fr: 'Ouvrez des portes. Jamais toutes les portes.', en: 'Open doors. Never every door.' },
        href: '/collaborateurs-ia/applications',
        icon: Blocks,
        store: true,
      },
      {
        id: 'modeles-ia',
        title: { fr: 'Modèles IA', en: 'AI models' },
        short: { fr: 'Intelligence', en: 'Intelligence' },
        description: {
          fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.',
          en: 'Approved engines for reasoning, analysis, creation and action.',
        },
        statement: { fr: 'Changez de moteur sans perdre votre agent.', en: 'Change engines without losing your agent.' },
        href: '/modeles-ia',
        icon: BrainCircuit,
        store: true,
      },
      {
        id: 'serveurs-ia',
        title: { fr: 'Serveurs IA', en: 'AI servers' },
        short: { fr: 'Souveraineté', en: 'Sovereignty' },
        description: {
          fr: 'Des environnements privés dimensionnés pour vos Collaborateurs IA et leurs applications.',
          en: 'Private environments sized for your AI Collaborators and their applications.',
        },
        statement: { fr: 'Son lieu de travail ne devrait appartenir à personne d’autre.', en: 'Its workplace should belong to no one else.' },
        href: '/collaborateurs-ia/serveurs',
        icon: Server,
        store: true,
      },
    ],
  },
  {
    title: { fr: 'Se faire accompagner', en: 'Get support' },
    description: {
      fr: 'Apprenez à adopter les Collaborateurs IA ou faites-vous accompagner par un expert.',
      en: 'Learn to adopt AI Collaborators or get support from an expert.',
    },
    categories: [
      {
        id: 'formations',
        title: { fr: 'Formations', en: 'Training' },
        short: { fr: 'Transmission', en: 'Transmission' },
        description: {
          fr: 'Des parcours pour utiliser, créer et gouverner les Collaborateurs IA.',
          en: 'Learning paths to use, create and govern AI Collaborators.',
        },
        statement: { fr: 'L’autonomie commence par la compréhension.', en: 'Autonomy begins with understanding.' },
        href: '/academy',
        icon: GraduationCap,
      },
      {
        id: 'services',
        title: { fr: 'Services', en: 'Services' },
        short: { fr: 'Accompagnement', en: 'Support' },
        description: {
          fr: 'Cadrage, intégration, création, migration et expertise spécialisée.',
          en: 'Scoping, integration, creation, migration and specialist expertise.',
        },
        statement: { fr: 'L’expertise humaine reste dans la boucle.', en: 'Human expertise stays in the loop.' },
        href: '/experts',
        icon: Handshake,
      },
    ],
  },
]

const CATEGORIES = GROUPS.flatMap((group) => group.categories)
const STORE_CATEGORIES = CATEGORIES.filter((category) => category.store)

const CATEGORY_NUMBERS: Record<string, string> = {
  'profils-metier': '01',
  competences: '02',
  applications: '03',
  'modeles-ia': '04',
  'serveurs-ia': '05',
}

function itemsForCategory(categoryId: string, lang: Lang): MarketplaceItem[] {
  if (categoryId === 'collaborateurs-ia') {
    return Object.values(ROLE_DETAILS).map((item) => ({
      key: item.slug,
      title: item.name,
      description: item.description[lang],
      href: collaboratorHref(item.slug),
      meta: item.role[lang],
      image: item.avatar,
      origin: item.company,
    }))
  }

  if (categoryId === 'missions') {
    return MISSIONS.map((item) => ({
      key: item.slug,
      title: item.title[lang],
      description: item.description[lang],
      href: `/missions/${item.slug}`,
      meta: item.result[lang],
      origin: item.origin === 'native' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
    }))
  }

  const storeType = categoryId === 'profils-metier' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    return STORE_ITEMS.filter((item) => item.type === storeType).map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: item.roleInOrg?.[lang] ?? item.facet,
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      status: item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Prêt à installer', en: 'Ready to install' },
    }))
  }

  if (categoryId === 'applications') {
    return STORE_ITEMS.filter((item) => item.type === 'application' || item.type === 'integration').map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: item.editor ?? (item.type === 'integration' ? (lang === 'fr' ? 'Intégration' : 'Integration') : item.facet),
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
      pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Bientôt disponible', en: 'Coming soon' } : item.commercialStatus === 'paid' ? { fr: 'Licence requise', en: 'License required' } : { fr: 'Connectable', en: 'Connectable' },
    }))
  }

  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key,
      title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      meta: item.meta,
      origin: item.maker,
      status: { fr: 'Selon votre fournisseur', en: 'Via your provider' },
    }))
  }

  if (categoryId === 'serveurs-ia') {
    return STORE_ITEMS.filter((item) => item.type === 'server').map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: lang === 'fr' ? 'Infrastructure privée' : 'Private infrastructure',
      origin: 'Unitalk',
      pending: item.commercialStatus === 'draft',
      status: item.commercialStatus === 'draft' ? { fr: 'Sur demande', en: 'On request' } : { fr: 'Provisionnable', en: 'Provisionable' },
    }))
  }

  if (categoryId === 'formations') {
    return PATHS.map((item) => ({
      key: item.slug,
      title: item.title,
      description: item.promise,
      href: `/academy/parcours/${item.slug}`,
      meta: item.format,
      origin: 'Unitalk Academy',
    }))
  }

  if (categoryId === 'services') {
    return EXPERT_DOMAINS.map((item) => ({
      key: item.key,
      title: item.title[lang],
      description: item.desc[lang],
      href: `/experts?domaine=${item.key}`,
      meta: item.cta[lang],
      origin: 'Unitalk Experts',
    }))
  }

  return []
}

const COPY = {
  fr: {
    kicker: 'Registre ouvert · Édition 01',
    title: 'L’autonomie se compose.',
    lead: 'Choisissez les cinq pièces de votre Collaborateur IA : sa responsabilité, ses méthodes, ses outils, son intelligence et son environnement privé. Chaque pièce reste remplaçable. L’agent reste à vous.',
    placeholder: 'Décrivez votre besoin…',
    ask: 'Demander à Alma',
    explore: 'Voir les composants',
    almaKicker: 'Recherche assistée',
    almaTitle: 'Ne cherchez pas par catégorie. Décrivez le résultat.',
    almaBody: 'Alma traduit votre besoin en une combinaison de métier, mission, compétences, connaissances et outils.',
    almaCta: 'Parler à Alma',
    almaRole: 'Coordinatrice de missions IA',
    composerTitle: 'Décrivez votre besoin.',
    talk: 'Commencer à parler',
    stop: 'Terminer',
    continue: 'Continuer avec cette mission',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    starters: ['Répondre à mes appels', 'Qualifier mes prospects', 'Traiter mes e-mails entrants'],
    handoff: 'Alma prépare une sélection. Vous gardez la décision finale.',
    categoriesKicker: 'Anatomie d’un agent autonome',
    categoriesTitle: 'Cinq pièces. Un agent qui reste à vous.',
    categoriesLead: 'Chaque pièce reste identifiable, remplaçable et gouvernée par votre entreprise. Le Collaborateur IA demeure le vôtre, même lorsque son équipement change.',
    unitalkOrigin: 'Univers Unitalk',
    understand: 'Comprendre cette catégorie',
    search: 'Rechercher dans cette catégorie',
    noResults: 'Aucune création ne correspond à cette recherche.',
    showMore: 'Voir tout le catalogue',
    showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation',
    emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    items: 'disponibles',
    contribute: 'Votre méthode peut devenir un actif IA.',
    contributeBody: 'Une méthode éprouvée n’a pas à disparaître dans un prompt privé. Structurez-la, testez-la, versionnez-la et publiez-la pour des Collaborateurs IA qui sauront l’appliquer.',
    contributeCta: 'Publier un savoir-faire',
  },
  en: {
    kicker: 'Open registry · Edition 01',
    title: 'Autonomy is composed.',
    lead: 'Choose the five parts of your AI Collaborator: accountability, methods, tools, intelligence and private environment. Every part remains replaceable. The agent remains yours.',
    placeholder: 'Describe your need…',
    ask: 'Ask Alma',
    explore: 'View components',
    almaKicker: 'Assisted search',
    almaTitle: 'Do not search by category. Describe the outcome.',
    almaBody: 'Alma translates your need into a combination of profession, mission, skills, knowledge and tools.',
    almaCta: 'Talk to Alma',
    almaRole: 'AI mission coordinator',
    composerTitle: 'Describe your need.',
    talk: 'Start talking',
    stop: 'Finish',
    continue: 'Continue with this mission',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    starters: ['Answer my calls', 'Qualify my prospects', 'Handle my incoming emails'],
    handoff: 'Alma prepares a selection. You retain the final decision.',
    categoriesKicker: 'Anatomy of an autonomous agent',
    categoriesTitle: 'Five parts. One agent that remains yours.',
    categoriesLead: 'Every piece remains identifiable, replaceable and governed by your organization. The AI Collaborator remains yours, even as its equipment changes.',
    unitalkOrigin: 'Unitalk universe',
    understand: 'Understand this category',
    search: 'Search this category',
    noResults: 'No item matches this search.',
    showMore: 'View the full catalog',
    showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation',
    emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    items: 'available',
    contribute: 'Your method can become an AI asset.',
    contributeBody: 'A proven method should not disappear into a private prompt. Structure, test, version and publish it for AI Collaborators that can apply it.',
    contributeCta: 'Publish know-how',
  },
} as const

export function UnitalkStoreHub() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState(STORE_CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const activeCategory = STORE_CATEGORIES.find((category) => category.id === activeCategoryId) ?? STORE_CATEGORIES[0]
  const categoryItems = useMemo(() => itemsForCategory(activeCategory.id, lang), [activeCategory.id, lang])
  const filteredItems = useMemo(() => {
    const query = catalogQuery.trim().toLocaleLowerCase(lang)
    if (!query) return categoryItems
    return categoryItems.filter((item) => `${item.title} ${item.description} ${item.meta} ${item.origin ?? ''}`.toLocaleLowerCase(lang).includes(query))
  }, [catalogQuery, categoryItems, lang])
  const visibleItems = filteredItems.slice(0, visibleCount)

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed(transcript.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => {
      setListening(false)
      setVoiceError(t.voiceDenied)
    }
    recognitionRef.current = recognition
    return () => recognition.abort()
  }, [lang, t.voiceDenied])

  useEffect(() => {
    const selectFromHash = () => {
      const categoryId = window.location.hash.slice(1)
      if (STORE_CATEGORIES.some((category) => category.id === categoryId)) {
        setActiveCategoryId(categoryId)
        setVisibleCount(PAGE_SIZE)
      }
    }
    selectFromHash()
    window.addEventListener('hashchange', selectFromHash)
    return () => window.removeEventListener('hashchange', selectFromHash)
  }, [])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) {
      setVoiceError(t.voiceUnavailable)
      return
    }
    setVoiceError('')
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try { recognition.start() } catch { setListening(false) }
  }

  function handNeedToAlma() {
    const clean = need.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&source=marketplace`)
  }

  function selectCategory(categoryId: string) {
    setActiveCategoryId(categoryId)
    setVisibleCount(PAGE_SIZE)
    setCatalogQuery('')
    window.history.replaceState(null, '', `${window.location.pathname}#${categoryId}`)
    requestAnimationFrame(() => document.getElementById('marketplace-results')?.scrollIntoView({ block: 'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }))
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#F0EBDD] font-sf text-[#151311]">
      <section className="relative overflow-hidden border-b border-[#151311] bg-[#D10E63] px-5 pb-10 pt-24 text-[#FFF8ED] sm:px-8 sm:pb-12 sm:pt-28 lg:pb-14 lg:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.12] [background-image:linear-gradient(rgba(255,248,237,.5)_1px,transparent_1px),linear-gradient(90deg,rgba(255,248,237,.5)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div aria-hidden className="pointer-events-none absolute -right-[4vw] -top-[8vw] font-mono text-[clamp(18rem,38vw,36rem)] font-black leading-none text-[#B40A53]">01</div>
        <div className="editorial-shell relative w-full">
          <div className="mb-8 flex items-center justify-between border-b border-[#FFF8ED]/50 pb-3 font-mono text-[9px] font-black uppercase tracking-[.2em] sm:text-[10px]">
            <span>{t.kicker}</span><span>Unitalk / Autonomous supply</span>
          </div>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(360px,.7fr)] lg:items-end lg:gap-14">
            <header>
              <h1 className="max-w-[880px] text-[clamp(3.8rem,10vw,8.4rem)] font-semibold leading-[.79] tracking-[-.08em]">{t.title}</h1>
              <div className="mt-8 grid gap-6 border-t border-[#FFF8ED]/50 pt-5 sm:grid-cols-[1fr_auto] sm:items-end lg:max-w-4xl">
                <p className="max-w-2xl text-[16px] font-medium leading-7 text-[#FFF8ED] sm:text-[19px] sm:leading-8">{t.lead}</p>
                <a href="#categories" className="group inline-flex min-h-12 w-fit items-center gap-3 border border-[#FFF8ED] bg-[#FFF8ED] px-5 text-xs font-black uppercase tracking-[.12em] text-[#151311] transition-transform hover:-translate-y-1">{t.explore}<ArrowRight className="size-4 rotate-90" /></a>
              </div>
            </header>

            <div className="border border-[#FFF8ED]/55 bg-[#151311] p-1 shadow-[12px_12px_0_#FFF8ED]">
              <AlmaMissionComposer value={need} onChange={setNeed} onSubmit={handNeedToAlma} title={lang === 'fr' ? 'Ne cherchez rien.' : 'Search for nothing.'} body={lang === 'fr' ? 'Décrivez le travail. Alma compose l’agent.' : 'Describe the work. Alma composes the agent.'} role={t.almaRole} placeholder={t.placeholder} submitLabel={t.continue} starters={t.starters} listening={listening} onToggleListening={toggleListening} voiceStartLabel={t.talk} voiceStopLabel={t.stop} error={voiceError} textareaRef={composerRef} />
            </div>
          </div>
          <div className="mt-10 grid border-l border-t border-[#FFF8ED]/55 sm:grid-cols-5">
            {STORE_CATEGORIES.map((category) => <a key={category.id} href={`#${category.id}`} onClick={(event) => { event.preventDefault(); selectCategory(category.id) }} className="group flex min-h-[88px] items-center gap-3 border-b border-r border-[#FFF8ED]/55 px-4 transition-colors hover:bg-[#FFF8ED] hover:text-[#151311]"><span className="font-mono text-[9px] font-black">{CATEGORY_NUMBERS[category.id]}</span><span><strong className="block text-sm">{category.title[lang]}</strong><span className="mt-1 block font-mono text-[8px] font-black uppercase tracking-[.12em] opacity-65">{category.short[lang]}</span></span></a>)}
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
        <div className="editorial-shell">
          <div className="mb-12 grid gap-6 border-y border-[#151311] py-6 lg:grid-cols-[1fr_1fr] lg:items-end lg:gap-16">
            <div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.categoriesKicker}</p><h2 className="mt-4 text-[clamp(3rem,6.5vw,6rem)] font-semibold leading-[.84] tracking-[-.07em]">{t.categoriesTitle}</h2></div>
            <p className="max-w-2xl text-[16px] font-medium leading-8 text-[#4E483F] lg:pb-2">{t.categoriesLead}</p>
          </div>
          <div className="grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-start xl:grid-cols-[340px_minmax(0,1fr)] xl:gap-16">
            <aside className="min-w-0 lg:sticky lg:top-24">
              <div className="border border-[#151311] bg-[#E9E2D3]">
                <div className="flex items-center justify-between border-b border-[#151311] bg-[#151311] px-4 py-3 font-mono text-[9px] font-black uppercase tracking-[.2em] text-[#FFF8ED]"><span>{lang === 'fr' ? 'Inventaire' : 'Inventory'}</span><span>01—05</span></div>
                <nav aria-label={lang === 'fr' ? 'Catégories du Store' : 'Store categories'} className="flex overflow-x-auto lg:block">
                  {STORE_CATEGORIES.map((category, index) => {
                    const Icon = category.icon
                    return <button key={category.id} type="button" aria-pressed={activeCategory.id === category.id} onClick={() => selectCategory(category.id)} className={`group relative flex min-h-[94px] min-w-[230px] shrink-0 items-center gap-4 border-r border-[#151311] px-4 text-left transition-colors lg:w-full lg:border-b lg:border-r-0 lg:last:border-b-0 ${activeCategory.id === category.id ? 'bg-[#D10E63] text-white' : 'text-[#151311] hover:bg-[#FFF8ED]'}`}>
                      <span className="font-mono text-[10px] font-black">{String(index + 1).padStart(2, '0')}</span>
                      <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
                      <span><strong className="block text-base tracking-[-.025em]">{category.title[lang]}</strong><span className={`mt-1 block font-mono text-[8px] font-black uppercase tracking-[.15em] ${activeCategory.id === category.id ? 'text-white/65' : 'text-[#766D61]'}`}>{category.short[lang]}</span></span>
                    </button>
                  })}
                </nav>
              </div>
            </aside>
            <div id="marketplace-results" className="min-w-0 scroll-mt-24">
              <div className="border-b-4 border-[#151311] pb-8">
                <div className="flex items-start justify-between gap-5"><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{activeCategory.short[lang]} / {String(STORE_CATEGORIES.findIndex((category) => category.id === activeCategory.id) + 1).padStart(2, '0')}</p><p className="font-mono text-[9px] font-black uppercase tracking-[.15em] text-[#766D61]">{filteredItems.length} {t.items}</p></div>
                <h2 className="mt-5 max-w-4xl text-[clamp(3.4rem,7vw,6.8rem)] font-semibold leading-[.8] tracking-[-.075em]">{activeCategory.title[lang]}</h2>
                <p className="mt-7 max-w-4xl text-[clamp(1.45rem,3vw,2.7rem)] font-semibold leading-[1.02] tracking-[-.045em] text-[#D10E63]">{activeCategory.statement[lang]}</p>
                <div className="mt-8 flex flex-col gap-5 border-t border-[#151311] pt-5 sm:flex-row sm:items-start sm:justify-between"><p className="max-w-xl text-[15px] leading-7 text-[#4E483F]">{activeCategory.description[lang]}</p><Link href={activeCategory.href} className="group inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-[#151311] text-xs font-black uppercase tracking-[.1em] hover:border-[#D10E63] hover:text-[#B00C54]">{t.understand}<ArrowUpRight className="size-4" /></Link></div>
                </div>
              {categoryItems.length > 0 && <label className="relative mt-6 block"><span className="sr-only">{t.search}</span><Search aria-hidden="true" className="absolute left-0 top-1/2 size-5 -translate-y-1/2 text-[#151311]" /><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-14 w-full border-b border-[#151311] bg-transparent pl-8 pr-12 font-mono text-xs font-bold uppercase tracking-[.08em] outline-none transition placeholder:text-[#766D61] focus:border-b-4 focus:border-[#D10E63]" />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'} className="absolute right-0 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center border border-[#151311] hover:bg-[#151311] hover:text-white"><X className="size-4" /></button>}</label>}
              {visibleItems.length > 0 ? <div className="mt-8 grid auto-rows-fr border-l border-t border-[#151311] md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} index={index} category={activeCategory} />)}</div> : categoryItems.length > 0 ? <div className="mt-8 border border-dashed border-[#151311] p-10 text-center"><Search className="mx-auto size-6" /><h3 className="mt-5 text-xl font-bold">{t.noResults}</h3><button type="button" onClick={() => setCatalogQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}</button></div> : <div className="mt-8 border border-[#151311] bg-[#FFF8ED] p-8"><UnitalkLogo size={32} activeSegment={0} inactiveColor="#C9BFB0" /><h3 className="mt-6 text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
              {filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#151311] bg-[#E6DED0] px-5 py-16 text-[#151311] sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{lang === 'fr' ? 'Catalogue ouvert' : 'Open catalog'}</p>
            <h2 className="mt-5 max-w-5xl text-[clamp(3rem,6vw,6rem)] font-semibold leading-[.84] tracking-[-.07em]">{t.contribute}</h2>
            <p className="mt-7 max-w-3xl text-[16px] font-medium leading-8">{t.contributeBody}</p>
          </div>
          <Link href="/co-createur-ia" className="inline-flex min-h-14 items-center justify-center border-2 border-[#151311] bg-[#151311] px-6 text-xs font-black uppercase tracking-[.12em] text-white shadow-[8px_8px_0_#D10E63] transition-transform hover:-translate-y-1">{t.contributeCta}<ArrowRight className="ml-3 size-4" /></Link>
        </div>
      </section>
    </main>
  )
}

function MarketplaceItemCard({ item, lang, index, category }: { item: MarketplaceItem; lang: Lang; index: number; category: Category }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {item.image ? <Image src={item.image} alt="" width={64} height={64} className="size-16 object-cover grayscale transition duration-300 group-hover:grayscale-0" /> : <span className="flex size-14 items-center justify-center border border-[#151311] bg-[#F0EBDD]"><UnitalkLogo size={28} activeSegment={index % 4} inactiveColor="#B8AE9D" /></span>}
        <span className="font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#766D61]">{String(index + 1).padStart(2, '0')} / {item.origin ?? 'Unitalk'}</span>
      </div>
      <p className="mt-8 line-clamp-2 font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#B00C54]">{category.short[lang]} · {item.meta}</p>
      <h3 className="mt-3 text-2xl font-semibold leading-[1.02] tracking-[-.045em]">{item.title}</h3>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#625B50]">{item.description}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        <span className="font-mono text-[8px] font-black uppercase tracking-[.1em] text-[#625B50]">{item.status?.[lang] ?? (item.pending ? (lang === 'fr' ? 'En préparation' : 'In preparation') : (lang === 'fr' ? 'Disponible' : 'Available'))}</span>
        {item.href && <span className="ml-auto inline-flex min-h-10 items-center gap-2 border border-[#151311] bg-[#151311] px-3 text-[10px] font-black uppercase tracking-[.08em] text-white transition group-hover:bg-[#D10E63]">{lang === 'fr' ? 'Voir' : 'View'}<ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>}
      </div>
    </>
  )

  const className = 'group relative flex min-h-[330px] flex-col border-b border-r border-[#151311] bg-[#FFF8ED] p-6 outline-none transition-colors hover:bg-white focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-[#D10E63]'
  return item.href ? <Link href={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>
}
