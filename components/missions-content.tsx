'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUp, ChevronDown, Mic, Square } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'
import { UNITAlK_SUBCATEGORIES } from '@/lib/unitalk-commerce'
import Image from 'next/image'
import Link from 'next/link'

const PRIMARY_CATEGORIES = ['ventes', 'relation-client', 'marketing', 'finance', 'rh', 'unitalk'] as const
const SECONDARY_CATEGORIES = ['reunions', 'administration', 'direction', 'documents', 'analyse', 'operations', 'produit'] as const
const FEATURED_SLUGS = [
  'trouver-de-nouveaux-clients', 'repondre-a-mes-clients', 'preparer-les-elements-de-facturation',
  'construire-un-calendrier-editorial', 'rediger-une-fiche-de-poste', 'resumer-un-dossier',
  'preparer-l-ordre-du-jour', 'participer-a-vos-reunions', 'preparer-le-dossier-de-comite',
  'realiser-une-veille-concurrentielle', 'controler-l-execution-d-un-processus', 'preparer-une-feuille-de-route-produit',
] as const
const ALL_CATEGORY_ORDER = [
  'ventes',
  'relation-client',
  'finance',
  'marketing',
  'rh',
  'documents',
  'analyse',
  'reunions',
  'administration',
  'direction',
  'operations',
  'produit',
  'unitalk',
] as const

function interleaveMissionsByCategory(): Mission[] {
  const groups = new Map(
    ALL_CATEGORY_ORDER.map((key) => [key, MISSIONS.filter((mission) => mission.category === key)]),
  )
  const ordered: Mission[] = []
  const maxLength = Math.max(...Array.from(groups.values(), (missions) => missions.length))

  for (let index = 0; index < maxLength; index++) {
    for (const key of ALL_CATEGORY_ORDER) {
      const mission = groups.get(key)?.[index]
      if (mission) ordered.push(mission)
    }
  }
  return ordered
}

export function MissionsContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnSlug = searchParams.get('return')
  const requestedCategory = searchParams.get('categorie')
  const validCategory = useMemo(() => requestedCategory && ALL_CATEGORY_ORDER.includes(requestedCategory as (typeof ALL_CATEGORY_ORDER)[number]) ? requestedCategory : 'all', [requestedCategory])
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [category, setCategory] = useState(validCategory)
  const [showOthers, setShowOthers] = useState(false)
  const [listening, setListening] = useState(false)
  const [unitalkSubcategory, setUnitalkSubcategory] = useState('all')
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('unitalk_missions_state')
      if (!raw) return
      const saved = JSON.parse(raw) as { category?: string; showOthers?: boolean; need?: string; scrollY?: number }
      if (saved.category) setCategory(saved.category)
      if (typeof saved.showOthers === 'boolean') setShowOthers(saved.showOthers)
      if (typeof saved.need === 'string') setNeed(saved.need)
      if (!returnSlug) return
      requestAnimationFrame(() => {
        const card = document.querySelector<HTMLElement>(`[data-mission-card="${CSS.escape(returnSlug)}"]`)
        if (!card) return
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        card.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' })
        window.history.replaceState(window.history.state, '', '/missions')
      })
    } catch {}
  }, [returnSlug])

  useEffect(() => {
    setCategory(validCategory)
    if (requestedCategory && validCategory === 'all') window.history.replaceState(window.history.state, '', '/missions')
  }, [requestedCategory, validCategory])

  useEffect(() => {
    const SpeechRecognition =
      typeof window !== 'undefined'
        ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
        : undefined
    if (!SpeechRecognition) return

    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event: any) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition

    return () => {
      try {
        recognition.abort()
      } catch {}
    }
  }, [lang])

  const missions = useMemo(() => {
    if (category === 'all') {
      const bySlug = new Map(MISSIONS.map((mission) => [mission.slug, mission]))
      const selected = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter((mission): mission is Mission => !!mission)
      return selected.length === 12 ? selected : interleaveMissionsByCategory().slice(0, 12)
    }
    const categoryMissions = MISSIONS.filter((mission) => mission.category === category)
    const narrowed = category === 'unitalk' && unitalkSubcategory !== 'all' ? categoryMissions.filter((mission) => mission.unitalk?.subcategory === unitalkSubcategory) : categoryMissions
    return narrowed.slice(0, 12)
  }, [category, unitalkSubcategory])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      return
    }
    setListening(true)
    try {
      recognition.start()
    } catch {
      setListening(false)
    }
  }

  function rememberCatalogState() {
    try {
      sessionStorage.setItem('unitalk_missions_state', JSON.stringify({ category, showOthers, need, scrollY: window.scrollY }))
    } catch {}
  }

  function navigateToDiscover(href: string) {
    rememberCatalogState()
    const documentWithTransition = document as Document & {
      startViewTransition?: (update: () => void) => void
    }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && documentWithTransition.startViewTransition) {
      documentWithTransition.startViewTransition(() => router.push(href))
      return
    }
    router.push(href)
  }

  function handDraftToAlma(value: string) {
    const clean = value.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try {
      localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() }))
    } catch {}
    navigateToDiscover(`/decouvrir?draft=${encodeURIComponent(draftId)}`)
  }

  function selectOther() {
    setShowOthers((open) => !open)
    if (SECONDARY_CATEGORIES.includes(category as (typeof SECONDARY_CATEGORIES)[number])) setCategory('all')
  }

  function selectCategory(next: string) {
    setCategory(next)
    if (next !== 'unitalk') setUnitalkSubcategory('all')
    const href = next === 'all' ? '/missions' : `/missions?categorie=${encodeURIComponent(next)}`
    router.push(href, { scroll: false })
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    requestAnimationFrame(() => document.getElementById('mission-selection')?.scrollIntoView({ block: 'start', behavior: reducedMotion ? 'auto' : 'smooth' }))
  }

  return (
    <main id="missions-top" className="relative min-h-screen overflow-hidden bg-[#F3EFE6] pb-20 pt-[5.25rem] text-[#1C1A17] sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="hero-heading scroll-mt-[calc(var(--header-height,64px)+24px)]">
            {t.title}
          </h1>

          <div className="relative mx-auto mt-5 max-w-2xl">
            <textarea
              value={need}
              onChange={(event) => setNeed(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                  event.preventDefault()
                  handDraftToAlma(need)
                }
              }}
              rows={1}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="min-h-14 w-full resize-none rounded-[18px] border border-[#D8D0C2] bg-[#FFFDF9] py-[17px] pl-5 pr-14 text-left text-[15px] leading-5 shadow-[0_14px_38px_-30px_rgba(28,26,23,.55)] outline-none transition-[border-color,box-shadow] placeholder:text-[#857C6E] hover:border-[#C8BFB0] focus:border-[#D10E63]/70 focus:shadow-[0_16px_42px_-28px_rgba(209,14,99,.35)] focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <button
              type="button"
              onClick={() => (need.trim() ? handDraftToAlma(need) : toggleListening())}
              disabled={!need.trim() && !voiceSupported}
              title={!need.trim() && !voiceSupported ? t.voiceUnavailable : undefined}
              aria-label={need.trim() ? t.send : listening ? t.stop : t.talk}
              className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-white shadow-[0_8px_20px_-8px_rgba(209,14,99,.65)] transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#B9B1A5] disabled:text-[#F3EFE6] disabled:shadow-none"
            >
              <span aria-hidden className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100" />
              {need.trim() ? (
                <ArrowUp className="relative h-4 w-4" strokeWidth={2.5} />
              ) : listening ? (
                <Square className="relative h-4 w-4" fill="currentColor" />
              ) : (
                <Mic className="relative h-4 w-4" />
              )}
            </button>
          </div>
        </header>

        <section id="mission-selection" aria-labelledby="mission-selection-title" className="mt-7 scroll-mt-[calc(var(--header-height,64px)+24px)]">
          <div className="flex flex-col items-start gap-3 border-y border-[#D8D0C2] py-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/unitalk/@alma" aria-label={t.almaLinkLabel} className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              <Image src="/alma-avatar.png" alt="" width={52} height={52} className="size-[52px] rounded-full object-cover ring-2 ring-[#D10E63]/15" />
            </Link>
            <div className="min-w-0 flex-1">
              <h2 id="mission-selection-title" className="font-sf text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{t.readyTitle}</h2>
              <p className="mt-1 text-[13px] font-semibold text-[#1C1A17]">
                Alma <span className="font-normal text-[#6E665A]">· {t.almaRole}</span>
              </p>
              <p className="mt-1 max-w-xl text-[13px] leading-5 text-[#4E483F]">{t.readyNote}</p>
            </div>
            <Link href="/unitalk/@alma" className="shrink-0 rounded-full border border-[#D10E63]/25 bg-[#FFFDF9] px-4 py-2 text-[12px] font-semibold text-[#B00C54] outline-none transition-colors hover:border-[#D10E63]/50 hover:bg-[#FCEBF2] focus-visible:ring-2 focus-visible:ring-[#D10E63]">
              {t.discoverAlma}
            </Link>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryButton href="/missions" active={category === 'all'} onClick={(event) => { event.preventDefault(); selectCategory('all') }}>{t.selection}</CategoryButton>
            {PRIMARY_CATEGORIES.map((key) => (
              <CategoryButton key={key} href={`/missions?categorie=${key}`} active={category === key} onClick={(event) => { event.preventDefault(); selectCategory(key) }}>
                {CATEGORY_LABELS[key][lang]}
              </CategoryButton>
            ))}
            <button type="button" aria-expanded={showOthers} aria-controls="secondary-mission-categories" onClick={selectOther} className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#D10E63]/35 bg-[#FFFDF9] px-3.5 text-[12px] font-semibold leading-none text-[#B00C54] outline-none transition-colors hover:border-[#D10E63]/60 hover:bg-[#FCEBF2] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              {t.allCategories}<ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform ${showOthers ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showOthers && (
            <div id="secondary-mission-categories" className="mt-2 flex flex-wrap gap-2">
              {SECONDARY_CATEGORIES.map((key) => (
                <CategoryButton key={key} href={`/missions?categorie=${key}`} active={category === key} onClick={(event) => { event.preventDefault(); selectCategory(key) }}>
                  {CATEGORY_LABELS[key][lang]}
                </CategoryButton>
              ))}
            </div>
          )}

          {category === 'unitalk' && <div className="mt-3 flex gap-2 overflow-x-auto pb-2"><button onClick={() => setUnitalkSubcategory('all')} className={`shrink-0 border px-3 py-1.5 text-xs ${unitalkSubcategory === 'all' ? 'bg-[#151310] text-white' : 'border-[#DED6C8]'}`}>Toutes</button>{UNITAlK_SUBCATEGORIES.map(([key,label])=><button key={key} onClick={() => setUnitalkSubcategory(key)} className={`shrink-0 border px-3 py-1.5 text-xs ${unitalkSubcategory === key ? 'bg-[#151310] text-white' : 'border-[#DED6C8]'}`}>{label}</button>)}</div>}

          <div className="mt-[18px] flex items-center gap-3"><p className="text-sm font-semibold text-[#4E483F]">{category === 'all' ? t.selectedCount : `${MISSIONS.filter((mission) => mission.category === category).length} missions · ${CATEGORY_LABELS[category]?.[lang] ?? category}`}</p><span aria-hidden className="h-px flex-1 bg-[#DED6C8]" /></div>
          <div className="mt-3 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((mission) => (
              <StoreCard key={mission.slug} mission={mission} lang={lang} onPersonalize={rememberCatalogState} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function CategoryButton({ active, href, onClick, children }: { active: boolean; href: string; onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void; children: React.ReactNode }) {
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold leading-none outline-none transition-[border-color,background-color,color,transform] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${
        active ? 'border-[#D10E63] bg-[#D10E63] text-white shadow-[0_7px_18px_-10px_rgba(209,14,99,.8)]' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:-translate-y-0.5 hover:border-[#D10E63]/45 hover:text-[#D10E63]'
      }`}
    >
      {children}
    </a>
  )
}

const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  ventes: { fr: 'Ventes', en: 'Sales' },
  'relation-client': { fr: 'Service client', en: 'Customer service' },
  marketing: { fr: 'Marketing', en: 'Marketing' },
  finance: { fr: 'Finance', en: 'Finance' },
  rh: { fr: 'RH', en: 'HR' },
  reunions: { fr: 'Réunions', en: 'Meetings' },
  administration: { fr: 'Assistanat', en: 'Assistance' },
  direction: { fr: 'Direction', en: 'Leadership' },
  documents: { fr: 'Documents', en: 'Documents' },
  analyse: { fr: 'Analyse', en: 'Analysis' },
  operations: { fr: 'Opérations', en: 'Operations' },
  produit: { fr: 'Produit', en: 'Product' },
  unitalk: { fr: 'Unitalk', en: 'Unitalk' },
}

const COPY = {
  fr: {
    title: 'Que voulez-vous confier à votre Collaborateur IA ?',
    placeholder: 'Décrivez le travail à faire…',
    talk: 'Dicter le travail à faire',
    stop: 'Arrêter la dictée',
    send: 'Envoyer le travail à accomplir',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur.',
    readyTitle: 'Besoin d’inspiration ?',
    readyNote: 'Je vous aide à définir une première mission, puis à préparer le Collaborateur IA qui l’accomplira.',
    almaRole: 'Coordinatrice de missions',
    almaLinkLabel: 'Découvrir Alma, Coordinatrice de missions',
    discoverAlma: 'Découvrir Alma →',
    selection: 'Sélection',
    allCategories: 'Toutes les catégories',
    selectedCount: '12 missions recommandées',
  },
  en: {
    title: 'What would you like to assign to your AI Collaborator?',
    placeholder: 'Describe the work to be done…',
    talk: 'Dictate the work to be done',
    stop: 'Stop dictation',
    send: 'Send the work to be done',
    voiceUnavailable: 'Voice dictation is not available in this browser.',
    readyTitle: 'Need inspiration?',
    readyNote: 'Choose a mission. I help adapt it to your methods, tools and rules, and create your AI Collaborator for the mission.',
    almaRole: 'Mission coordinator',
    almaLinkLabel: 'Discover Alma, Mission coordinator',
    discoverAlma: 'Discover Alma →',
    selection: 'Selection',
    allCategories: 'All categories',
    selectedCount: '12 selected missions',
  },
} as const
