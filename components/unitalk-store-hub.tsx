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
  Info,
  LibraryBig,
  Search,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
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
  description: Bi
  href: string
  icon: LucideIcon
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
        description: {
          fr: 'Des identités professionnelles complètes, prêtes à rejoindre votre organisation.',
          en: 'Complete professional identities ready to join your organization.',
        },
        href: '/collaborateurs-ia',
        icon: UserRound,
      },
      {
        id: 'missions',
        title: { fr: 'Missions', en: 'Missions' },
        description: {
          fr: 'Le travail concret à confier, avec son résultat attendu et ses validations.',
          en: 'Concrete work to delegate, with its expected result and approvals.',
        },
        href: '/missions',
        icon: BookOpenCheck,
      },
      {
        id: 'metiers',
        title: { fr: 'Métiers', en: 'Professions' },
        description: {
          fr: 'Un profil métier de référence pour chaque métier de la connaissance.',
          en: 'One reference job profile for every knowledge-work profession.',
        },
        href: '/collaborateurs-ia/profils-metier',
        icon: BriefcaseBusiness,
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
        description: {
          fr: 'Des savoir-faire précis, testés, versionnés et réutilisables.',
          en: 'Precise, tested, versioned and reusable know-how.',
        },
        href: '/collaborateurs-ia/competences',
        icon: Sparkles,
      },
      {
        id: 'connaissances',
        title: { fr: 'Connaissances', en: 'Knowledge' },
        description: {
          fr: 'Corpus, référentiels et procédures qu’un Collaborateur IA peut consulter.',
          en: 'Corpora, reference materials and procedures an AI Collaborator can consult.',
        },
        href: '/architecture#connaissance-entreprise',
        icon: LibraryBig,
      },
      {
        id: 'memoire-contexte',
        title: { fr: 'Mémoire et contexte', en: 'Memory and context' },
        description: {
          fr: 'Structures de mémoire, règles de conservation et contexte gouverné.',
          en: 'Memory structures, retention rules and governed context.',
        },
        href: '/architecture#memoire-et-contexte',
        icon: BrainCircuit,
      },
      {
        id: 'applications',
        title: { fr: 'Applications', en: 'Applications' },
        description: {
          fr: 'Les outils, connecteurs et applications métier autorisés.',
          en: 'Approved tools, connectors and business applications.',
        },
        href: '/collaborateurs-ia/applications',
        icon: Blocks,
      },
      {
        id: 'modeles-ia',
        title: { fr: 'Modèles IA', en: 'AI models' },
        description: {
          fr: 'Les moteurs autorisés pour raisonner, analyser, produire et agir.',
          en: 'Approved engines for reasoning, analysis, creation and action.',
        },
        href: '/modeles-ia',
        icon: BrainCircuit,
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
        description: {
          fr: 'Des parcours pour utiliser, créer et gouverner les Collaborateurs IA.',
          en: 'Learning paths to use, create and govern AI Collaborators.',
        },
        href: '/academy',
        icon: GraduationCap,
      },
      {
        id: 'services',
        title: { fr: 'Services', en: 'Services' },
        description: {
          fr: 'Cadrage, intégration, création, migration et expertise spécialisée.',
          en: 'Scoping, integration, creation, migration and specialist expertise.',
        },
        href: '/experts',
        icon: Handshake,
      },
    ],
  },
]

const CATEGORIES = GROUPS.flatMap((group) => group.categories)

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

  const storeType = categoryId === 'metiers' ? 'profil' : categoryId === 'competences' ? 'competence' : null
  if (storeType) {
    return STORE_ITEMS.filter((item) => item.type === storeType).map((item) => ({
      key: `${item.type}-${item.slug}`,
      title: item.name[lang],
      description: item.description[lang],
      href: storeItemHref(item),
      meta: item.roleInOrg?.[lang] ?? item.facet,
      origin: item.creator === 'unitalk' ? 'Unitalk' : lang === 'fr' ? 'Communauté' : 'Community',
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
    }))
  }

  if (categoryId === 'modeles-ia') {
    return MODEL_ITEMS.map((item) => ({
      key: item.key,
      title: item.title,
      description: lang === 'fr' ? `Famille de modèles ${item.maker}, disponible selon les droits, les clés et la configuration AI Gateway.` : `${item.maker} model family, available according to permissions, keys and AI Gateway configuration.`,
      meta: item.meta,
      origin: item.maker,
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
    kicker: 'Marketplace IA',
    title: 'Composez l’équipe IA dont votre entreprise a besoin.',
    lead: 'Recrutez un Collaborateur IA ou équipez-le, capacité par capacité. Métiers, missions, méthodes et outils sont réunis ici, créés par Unitalk et la communauté.',
    placeholder: 'Décrivez votre besoin…',
    ask: 'Demander à Alma',
    explore: 'Entrer dans la Marketplace',
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
    categoriesKicker: 'Catalogue vivant',
    categoriesTitle: 'Explorez par composant.',
    categoriesLead: 'Un Collaborateur IA est une composition. Commencez par l’identité, le travail ou une capacité, puis ouvrez chaque fiche sans quitter l’écosystème.',
    unitalkOrigin: 'Univers Unitalk',
    understand: 'Guide de la catégorie',
    search: 'Rechercher dans cette catégorie',
    noResults: 'Aucune création ne correspond à cette recherche.',
    showMore: 'Voir tout le catalogue',
    showLess: 'Revenir à la sélection',
    emptyTitle: 'Catalogue en préparation',
    emptyBody: 'Cette catégorie est définie dans l’architecture Unitalk. Ses premières créations publiables seront ajoutées ici.',
    items: 'disponibles',
    contribute: 'Votre savoir-faire peut devenir une capacité IA.',
    contributeBody: 'Publiez un métier, une méthode, une connaissance, une application, une formation ou un service. Unitalk vous aide à le structurer, le tester et le distribuer.',
    contributeCta: 'Publier dans la Marketplace',
  },
  en: {
    kicker: 'AI Marketplace',
    title: 'Build the AI team your company needs.',
    lead: 'Recruit an AI Collaborator or equip it, capability by capability. Professions, missions, methods and tools are gathered here, created by Unitalk and the community.',
    placeholder: 'Describe your need…',
    ask: 'Ask Alma',
    explore: 'Enter the Marketplace',
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
    categoriesKicker: 'Living catalog',
    categoriesTitle: 'Explore by component.',
    categoriesLead: 'An AI Collaborator is a composition. Start with the identity, work or a capability, then open each item without leaving the ecosystem.',
    unitalkOrigin: 'Unitalk universe',
    understand: 'Category guide',
    search: 'Search this category',
    noResults: 'No item matches this search.',
    showMore: 'View the full catalog',
    showLess: 'Back to the selection',
    emptyTitle: 'Catalog in preparation',
    emptyBody: 'This category is defined in the Unitalk architecture. Its first publishable creations will be added here.',
    items: 'available',
    contribute: 'Your expertise can become an AI capability.',
    contributeBody: 'Publish a profession, method, knowledge base, application, course or service. Unitalk helps you structure, test and distribute it.',
    contributeCta: 'Publish in the Marketplace',
  },
} as const

export function UnitalkStoreHub() {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [listening, setListening] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const [activeCategoryId, setActiveCategoryId] = useState(CATEGORIES[0].id)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [catalogQuery, setCatalogQuery] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const activeCategory = CATEGORIES.find((category) => category.id === activeCategoryId) ?? CATEGORIES[0]
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
      if (CATEGORIES.some((category) => category.id === categoryId)) {
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
    <main className="min-h-screen overflow-hidden bg-[#F3EFE6] font-sf text-[#1C1A17]">
      <section className="relative overflow-hidden border-b border-[#CFC5B5] bg-[#F3EFE6] px-5 pb-10 pt-24 sm:px-8 sm:pb-12 sm:pt-28 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-8 lg:pt-[88px]">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-36 top-20 size-[32rem] rounded-full bg-[#D10E63]/[.055] blur-3xl" />
        <div className="editorial-shell relative">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
            <header>
              <Kicker>{t.kicker}</Kicker>
              <h1 className="mt-4 max-w-[760px] text-[clamp(2.65rem,12vw,4.5rem)] font-semibold leading-[.9] tracking-[-.065em] lg:text-[clamp(3.1rem,4.8vw,5rem)]">{t.title}</h1>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#4E483F] sm:mt-5 sm:text-[17px] sm:leading-8 lg:text-[16px] lg:leading-7">{t.lead}</p>
              <a href="#categories" className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D10E63] px-5 text-sm font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white">{t.explore}<ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" /></a>
            </header>

            <AlmaMissionComposer value={need} onChange={setNeed} onSubmit={handNeedToAlma} title={t.composerTitle} body={t.almaBody} role={t.almaRole} placeholder={t.placeholder} submitLabel={t.continue} starters={t.starters} listening={listening} onToggleListening={toggleListening} voiceStartLabel={t.talk} voiceStopLabel={t.stop} error={voiceError} textareaRef={composerRef} />
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-24">
        <div className="editorial-shell">
          <div className="grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start xl:gap-12">
            <aside className="min-w-0 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[26px] bg-[#181615] p-3 text-[#FAF8F3] shadow-[0_28px_70px_-45px_rgba(28,26,23,.7)]">
                <div className="px-3 pb-4 pt-3"><p className="font-mono text-[9px] font-black uppercase tracking-[.2em] text-[#F2A4C5]">{t.categoriesKicker}</p><p className="mt-2 text-sm leading-5 text-[#AFA397]">{lang === 'fr' ? 'Choisissez un composant.' : 'Choose a component.'}</p></div>
                <nav aria-label={lang === 'fr' ? 'Catégories de la Marketplace' : 'Marketplace categories'} className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1 lg:overflow-visible">
                  {CATEGORIES.map((category, index) => {
                    const Icon = category.icon
                    return <button key={category.id} type="button" aria-pressed={activeCategory.id === category.id} onClick={() => selectCategory(category.id)} className={`group/tip relative flex min-h-12 shrink-0 items-center gap-3 rounded-xl px-3 text-left text-[13px] font-semibold transition-colors lg:w-full ${activeCategory.id === category.id ? 'bg-[#D10E63] text-white' : 'bg-white/[.045] text-[#D8D0C4] hover:bg-white/[.09] hover:text-white'}`}>
                      <Icon aria-hidden="true" className="size-4 shrink-0" strokeWidth={1.7} />
                      <span className="whitespace-nowrap lg:flex-1">{category.title[lang]}</span>
                      <span className={`hidden font-mono text-[8px] lg:block ${activeCategory.id === category.id ? 'text-white/65' : 'text-[#766E65]'}`}>{String(index + 1).padStart(2, '0')}</span>
                      <Info aria-hidden="true" className="hidden size-3.5 opacity-55 lg:block" />
                      <span role="tooltip" className="pointer-events-none absolute left-full top-1/2 z-30 ml-3 hidden w-64 -translate-y-1/2 rounded-xl bg-[#FAF8F3] px-3 py-2 text-[11px] font-medium leading-5 text-[#292620] opacity-0 shadow-xl ring-1 ring-[#D8D0C2] transition-opacity xl:block group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100">{category.description[lang]}</span>
                    </button>
                  })}
                </nav>
              </div>
            </aside>
            <div id="marketplace-results" className="min-w-0 scroll-mt-24">
              <div className="border-b border-[#CFC5B5] pb-8">
                <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.categoriesTitle}</p>
                <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                  <div className="max-w-2xl"><h2 className="text-[clamp(2.5rem,5vw,5.2rem)] font-semibold leading-[.9] tracking-[-.065em]">{activeCategory.title[lang]}</h2><p className="mt-5 text-[15px] leading-7 text-[#625B50]">{activeCategory.description[lang]}</p><p className="mt-3 font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#857C6E]">{filteredItems.length} {t.items}</p></div>
                  <Link href={activeCategory.href} className="group inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/30 underline-offset-4 hover:text-[#B00C54]">{t.understand}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                </div>
              </div>
              {categoryItems.length > 0 && <label className="relative mt-6 block"><span className="sr-only">{t.search}</span><Search aria-hidden="true" className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#857C6E]" /><input type="search" value={catalogQuery} onChange={(event) => { setCatalogQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FAF8F3] pl-11 pr-12 text-sm outline-none transition focus:border-[#D10E63] focus:ring-4 focus:ring-[#D10E63]/10" />{catalogQuery && <button type="button" onClick={() => setCatalogQuery('')} aria-label={lang === 'fr' ? 'Effacer la recherche' : 'Clear search'} className="absolute right-3 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-[#857C6E] hover:bg-[#EEE8DD] hover:text-[#1C1A17]"><X className="size-4" /></button>}</label>}
              {visibleItems.length > 0 ? <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item, index) => <MarketplaceItemCard key={item.key} item={item} lang={lang} featured={index === 0 && !catalogQuery} />)}</div> : categoryItems.length > 0 ? <div className="mt-6 rounded-3xl border border-dashed border-[#CFC5B5] p-10 text-center"><Search className="mx-auto size-6 text-[#857C6E]" /><h3 className="mt-5 text-xl font-bold">{t.noResults}</h3><button type="button" onClick={() => setCatalogQuery('')} className="mt-4 text-sm font-bold text-[#B00C54] underline underline-offset-4">{lang === 'fr' ? 'Effacer la recherche' : 'Clear search'}</button></div> : <div className="mt-6 rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><UnitalkLogo size={32} activeSegment={0} inactiveColor="#C9BFB0" /><h3 className="mt-6 text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
              {filteredItems.length > PAGE_SIZE && <div className="mt-9 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= filteredItems.length ? PAGE_SIZE : filteredItems.length)} className="inline-flex min-h-12 items-center rounded-full bg-[#181615] px-7 text-sm font-bold text-white hover:bg-[#332F29]">{visibleCount >= filteredItems.length ? t.showLess : t.showMore}</button></div>}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#181615] px-5 py-16 text-[#FAF8F3] sm:px-8 sm:py-20">
        <div className="editorial-shell grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Kicker dark>{lang === 'fr' ? 'Communauté' : 'Community'}</Kicker>
            <h2 className="mt-5 max-w-4xl text-[34px] font-semibold leading-[1.06] tracking-[-.04em] sm:text-[44px]">{t.contribute}</h2>
            <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#CFC6B8]">{t.contributeBody}</p>
          </div>
          <Link href="/co-createur-ia" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D10E63] px-6 text-sm font-bold">{t.contributeCta}<ArrowRight className="ml-2 size-4" /></Link>
        </div>
      </section>
    </main>
  )
}

function MarketplaceItemCard({ item, lang, featured = false }: { item: MarketplaceItem; lang: Lang; featured?: boolean }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {item.image ? <Image src={item.image} alt="" width={56} height={56} className="size-14 rounded-2xl object-cover ring-1 ring-[#D8D0C2]" /> : <span className={`flex size-12 items-center justify-center rounded-2xl ${featured ? 'bg-[#D10E63]/15' : 'bg-[#EEE8DD]'}`}><UnitalkLogo size={28} activeSegment={0} inactiveColor={featured ? '#6B394E' : '#C9BFB0'} /></span>}
        <span className={`rounded-full px-2.5 py-1 font-mono text-[8px] font-black uppercase tracking-[.14em] ${featured ? 'bg-white/10 text-[#F2A4C5]' : 'bg-[#EEE8DD] text-[#6E665A]'}`}>{item.origin ?? 'Unitalk'}</span>
      </div>
      <p className={`mt-7 line-clamp-2 font-mono text-[9px] font-black uppercase tracking-[.14em] ${featured ? 'text-[#F2A4C5]' : 'text-[#B00C54]'}`}>{item.meta}</p>
      <h3 className={`mt-3 font-bold tracking-[-.035em] ${featured ? 'text-2xl text-white' : 'text-xl'}`}>{item.title}</h3>
      <p className={`mt-3 line-clamp-3 text-sm leading-6 ${featured ? 'text-[#CFC6B8]' : 'text-[#625B50]'}`}>{item.description}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        {item.pending && <span className={`rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] ${featured ? 'bg-white/10 text-[#D8D0C4]' : 'bg-[#EEE8DD] text-[#6E665A]'}`}>{lang === 'fr' ? 'En préparation' : 'In preparation'}</span>}
        {item.href && <span className={`ml-auto flex size-9 items-center justify-center rounded-full transition-transform group-hover:translate-x-1 ${featured ? 'bg-[#D10E63] text-white' : 'bg-[#EEE8DD] text-[#D10E63]'}`}><ArrowRight className="size-4" /></span>}
      </div>
    </>
  )

  const className = `group relative flex min-h-[285px] flex-col overflow-hidden rounded-[26px] border p-6 outline-none transition hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-[#D10E63] ${featured ? 'border-[#292521] bg-[#181615] shadow-[0_24px_60px_-42px_rgba(28,26,23,.8)]' : 'border-[#D8D0C2] bg-[#FAF8F3] hover:border-[#D10E63]/35 hover:shadow-[0_22px_55px_-45px_rgba(28,26,23,.6)]'}`
  return item.href ? <Link href={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>
}
