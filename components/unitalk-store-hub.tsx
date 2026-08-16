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
  Mic,
  Search,
  Sparkles,
  Square,
  UserRound,
  X,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { UnitalkLogo } from '@/components/unitalk-logo'
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
    placeholder: 'Décrivez un résultat, un métier ou un outil…',
    ask: 'Demander à Alma',
    explore: 'Entrer dans la Marketplace',
    almaKicker: 'Recherche assistée',
    almaTitle: 'Ne cherchez pas par catégorie. Décrivez le résultat.',
    almaBody: 'Alma traduit votre besoin en une combinaison de métier, mission, compétences, connaissances et outils.',
    almaCta: 'Parler à Alma',
    almaRole: 'Curatrice de la Marketplace',
    ready: 'En ligne',
    composerTitle: 'Que voulez-vous accomplir ?',
    talk: 'Dicter',
    stop: 'Arrêter',
    continue: 'Composer ma solution',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    starters: ['Trouver des prospects', 'Structurer notre veille', 'Connecter notre CRM'],
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
    placeholder: 'Describe an outcome, profession or tool…',
    ask: 'Ask Alma',
    explore: 'Enter the Marketplace',
    almaKicker: 'Assisted search',
    almaTitle: 'Do not search by category. Describe the outcome.',
    almaBody: 'Alma translates your need into a combination of profession, mission, skills, knowledge and tools.',
    almaCta: 'Talk to Alma',
    almaRole: 'Marketplace curator',
    ready: 'Online',
    composerTitle: 'What do you want to accomplish?',
    talk: 'Dictate',
    stop: 'Stop',
    continue: 'Build my solution',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    starters: ['Find prospects', 'Structure our monitoring', 'Connect our CRM'],
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
    try { localStorage.setItem(`unitalk_marketplace_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
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
      <section className="relative border-b border-[#CFC5B5] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-36 top-20 size-[32rem] rounded-full bg-[#D10E63]/[.055] blur-3xl" />
        <div className="editorial-shell relative">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <header>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.kicker} / Collaborateurs IA</p>
              <h1 className="mt-6 max-w-[720px] font-sf text-[clamp(2.8rem,5.5vw,5.6rem)] font-semibold leading-[.93] tracking-[-.06em]">
                {lang === 'fr' ? <><span className="block">Tout pour</span><span className="block">faire grandir</span><span className="block text-[#D10E63]">votre équipe IA.</span></> : <><span className="block">Everything to</span><span className="block">grow your</span><span className="block text-[#D10E63]">AI team.</span></>}
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#4E483F]">{t.lead}</p>
              <a href="#categories" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/35 underline-offset-4 hover:text-[#B00C54]">{t.explore}<ArrowRight className="size-4 rotate-90" /></a>
            </header>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#181615] p-5 text-white shadow-[0_34px_90px_-40px_rgba(24,22,21,.75)] sm:p-6">
              <span aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#F2A4C5] to-transparent" />
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Image src="/alma-avatar.png" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-[#D10E63]/40" />
                  <div><p className="text-sm font-semibold">Alma</p><p className="mt-0.5 text-[11px] text-[#D5CCC1]">{t.almaRole}</p></div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F2A4C5]"><span className="size-1.5 rounded-full bg-[#45C578]" />{t.ready}</span>
              </div>
              <p className="mt-5 text-xl font-semibold tracking-[-.025em] sm:text-2xl">{t.composerTitle}</p>
              <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[.055] p-3 focus-within:border-[#D10E63]/70 focus-within:ring-4 focus-within:ring-[#D10E63]/10">
                <textarea ref={composerRef} value={need} onChange={(event) => setNeed(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); handNeedToAlma() } }} rows={3} placeholder={t.placeholder} aria-label={t.placeholder} aria-describedby="marketplace-composer-help" className="min-h-20 w-full resize-none bg-transparent px-1 py-1 text-[15px] leading-6 text-white outline-none placeholder:text-[#91887D]" />
                <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" aria-pressed={listening} onClick={toggleListening} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-[#D8D0C2] hover:border-[#F2A4C5]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">{listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-3.5" />}{listening ? t.stop : t.talk}</button>
                  <button type="button" onClick={handNeedToAlma} disabled={!need.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] disabled:cursor-not-allowed disabled:opacity-35">{t.continue}<ArrowRight className="size-4" /></button>
                </div>
              </div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{t.starters.map((starter) => <button key={starter} type="button" onClick={() => { setNeed(starter); composerRef.current?.focus() }} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-[#CFC6B8] hover:border-[#F2A4C5]/50 hover:text-white">{starter}</button>)}</div>
              <p id="marketplace-composer-help" role={voiceError ? 'alert' : undefined} className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#AFA397]">{voiceError || t.handoff}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
        <div className="editorial-shell">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
            <aside className="lg:sticky lg:top-24">
              <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.categoriesKicker}</p>
              <nav aria-label={lang === 'fr' ? 'Catégories de la Marketplace' : 'Marketplace categories'} className="mt-5 overflow-hidden rounded-2xl border border-[#D8D0C2] bg-[#FAF8F3]">
                {CATEGORIES.map((category) => (
                  <button key={category.id} type="button" aria-pressed={activeCategory.id === category.id} onClick={() => selectCategory(category.id)} className={`group/tip relative flex min-h-12 w-full items-center gap-3 border-b border-[#E4DDCE] px-4 text-left text-[13px] font-semibold last:border-0 ${activeCategory.id === category.id ? 'bg-[#FCEAF2] text-[#AD0C53]' : 'text-[#4E483F] hover:bg-[#EEE8DD] hover:text-[#B00C54]'}`}>
                    <UnitalkLogo size={19} activeSegment={0} inactiveColor="#C9BFB0" />
                    <span className="flex-1">{category.title[lang]}</span>
                    <Info aria-hidden="true" className="size-3.5 opacity-55" />
                    <span role="tooltip" className="pointer-events-none absolute left-full top-1/2 z-30 ml-3 hidden w-64 -translate-y-1/2 rounded-xl bg-[#241F1D] px-3 py-2 text-[11px] font-medium leading-5 text-[#F3EFE6] opacity-0 shadow-xl transition-opacity lg:block group-hover/tip:opacity-100 group-focus-visible/tip:opacity-100">{category.description[lang]}</span>
                  </button>
                ))}
              </nav>
            </aside>
            <div id="marketplace-results" className="scroll-mt-24">
              <div className="border-b border-[#CFC5B5] pb-7">
                <p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.categoriesTitle}</p>
                <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div><h2 className="text-[clamp(2.3rem,4.4vw,4.7rem)] font-semibold leading-[.94] tracking-[-.06em]">{activeCategory.title[lang]}</h2><p className="mt-4 text-sm font-semibold text-[#625B50]">{categoryItems.length} {t.items}</p></div>
                  <Link href={activeCategory.href} className="group inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-[#CFC5B5] bg-[#FAF8F3] px-5 text-sm font-bold text-[#4E483F] hover:border-[#D10E63]/50 hover:text-[#B00C54]">{t.understand}<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
                </div>
              </div>
              {visibleItems.length > 0 ? <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">{visibleItems.map((item) => <MarketplaceItemCard key={item.key} item={item} lang={lang} />)}</div> : <div className="mt-6 rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-8"><UnitalkLogo size={32} activeSegment={0} inactiveColor="#C9BFB0" /><h3 className="mt-6 text-2xl font-bold">{t.emptyTitle}</h3><p className="mt-3 max-w-xl text-sm leading-7 text-[#625B50]">{t.emptyBody}</p></div>}
              {categoryItems.length > PAGE_SIZE && <div className="mt-8 text-center"><button type="button" onClick={() => setVisibleCount((count) => count >= categoryItems.length ? PAGE_SIZE : categoryItems.length)} className="inline-flex min-h-11 items-center rounded-full border border-[#D10E63] px-6 text-sm font-bold text-[#B00C54] hover:bg-[#D10E63] hover:text-white">{visibleCount >= categoryItems.length ? t.showLess : t.showMore}</button></div>}
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

function MarketplaceItemCard({ item, lang }: { item: MarketplaceItem; lang: Lang }) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {item.image ? <Image src={item.image} alt="" width={48} height={48} className="size-12 rounded-2xl object-cover ring-1 ring-[#D8D0C2]" /> : <UnitalkLogo size={30} activeSegment={0} inactiveColor="#C9BFB0" />}
        <span className="font-mono text-[8px] font-black uppercase tracking-[.14em] text-[#857C6E]">{item.origin ?? 'Unitalk'}</span>
      </div>
      <p className="mt-7 font-mono text-[9px] font-black uppercase tracking-[.14em] text-[#B00C54]">{item.meta}</p>
      <h3 className="mt-3 text-xl font-bold tracking-[-.025em]">{item.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#625B50]">{item.description}</p>
      <div className="mt-auto flex items-center justify-between pt-6">
        {item.pending && <span className="rounded-full bg-[#EEE8DD] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.1em] text-[#6E665A]">{lang === 'fr' ? 'En préparation' : 'In preparation'}</span>}
        {item.href && <ArrowRight className="ml-auto size-5 text-[#D10E63] transition-transform group-hover:translate-x-1" />}
      </div>
    </>
  )

  const className = 'group flex min-h-[260px] flex-col rounded-3xl border border-[#D8D0C2] bg-[#FAF8F3] p-6 outline-none transition hover:-translate-y-1 hover:border-[#D10E63]/35 focus-visible:ring-2 focus-visible:ring-[#D10E63]'
  return item.href ? <Link href={item.href} className={className}>{content}</Link> : <article className={className}>{content}</article>
}
