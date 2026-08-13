'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUp, ChevronDown, Mic, Square } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'

const PRIMARY_CATEGORIES = ['ventes', 'relation-client', 'marketing', 'finance', 'rh'] as const
const SECONDARY_CATEGORIES = ['reunions', 'administration', 'direction', 'documents', 'analyse', 'operations', 'produit'] as const
const FEATURED_SLUGS = [
  'trouver-de-nouveaux-clients', 'repondre-a-mes-clients', 'preparer-les-elements-de-facturation',
  'construire-un-calendrier-editorial', 'rediger-une-fiche-de-poste', 'resumer-un-dossier',
  'preparer-l-ordre-du-jour', 'organiser-les-rendez-vous', 'preparer-le-dossier-de-comite',
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
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [category, setCategory] = useState('all')
  const [showOthers, setShowOthers] = useState(false)
  const [listening, setListening] = useState(false)
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
    return MISSIONS.filter((mission) => mission.category === category).slice(0, 12)
  }, [category])

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

  return (
    <main id="missions-top" className="min-h-screen bg-[#F3EFE6] pb-20 pt-[6.5rem] text-[#1C1A17] sm:pt-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="hero-heading scroll-mt-[calc(var(--header-height,64px)+24px)]">
            {t.title}
          </h1>

          <div className="relative mx-auto mt-7 max-w-2xl">
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
              className="min-h-14 w-full resize-none rounded-2xl border border-[#D8D0C2] bg-white py-[17px] pl-5 pr-14 text-left text-[15px] leading-5 shadow-sm outline-none placeholder:text-[#6E665A] focus:border-[#D10E63]/70 focus:ring-4 focus:ring-[#D10E63]/10"
            />
            <button
              type="button"
              onClick={() => (need.trim() ? handDraftToAlma(need) : toggleListening())}
              disabled={!need.trim() && !voiceSupported}
              title={!need.trim() && !voiceSupported ? t.voiceUnavailable : undefined}
              aria-label={need.trim() ? t.send : listening ? t.stop : t.talk}
              className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[#D10E63] text-white transition-colors hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-[#B9B1A5] disabled:text-[#F3EFE6]"
            >
              <span aria-hidden className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:animate-pulse group-hover:opacity-100" />
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

        <section className="mt-10">
          <h2 className="font-sf text-xl font-bold tracking-[-0.02em] sm:text-2xl">{t.readyTitle}</h2>
          <p className="mt-1 text-[13px] text-[#6E665A]">{t.readyNote}</p>

          <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryButton active={category === 'all'} onClick={() => setCategory('all')}>{t.selection}</CategoryButton>
            {PRIMARY_CATEGORIES.map((key) => (
              <CategoryButton key={key} active={category === key} onClick={() => setCategory(key)}>
                {CATEGORY_LABELS[key][lang]}
              </CategoryButton>
            ))}
            <button type="button" aria-expanded={showOthers} aria-controls="secondary-mission-categories" onClick={selectOther} className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-[#D10E63]/35 bg-white px-3.5 text-[12px] font-semibold text-[#B00C54] transition-colors hover:bg-[#FBF3F7]">
              {t.allCategories}<ChevronDown aria-hidden className={`h-3.5 w-3.5 transition-transform ${showOthers ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {showOthers && (
            <div id="secondary-mission-categories" className="mt-2 flex flex-wrap gap-2">
              {SECONDARY_CATEGORIES.map((key) => (
                <CategoryButton key={key} active={category === key} onClick={() => setCategory(key)}>
                  {CATEGORY_LABELS[key][lang]}
                </CategoryButton>
              ))}
            </div>
          )}

          <p className="mt-3 text-sm font-semibold text-[#6E665A]">{category === 'all' ? t.selectedCount : `${CATEGORY_LABELS[category]?.[lang] ?? category} · ${missions.length} missions`}</p>
          <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {missions.map((mission) => (
              <StoreCard key={mission.slug} mission={mission} lang={lang} onPersonalize={rememberCatalogState} />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

function CategoryButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold transition-colors ${
        active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-white text-[#4E483F] hover:border-[#D10E63]/45'
      }`}
    >
      {children}
    </button>
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
    readyNote: 'Choisissez une mission. Alma vous aide à la personnaliser pour votre entreprise.',
    selection: 'Sélection',
    allCategories: 'Toutes les catégories',
    selectedCount: '12 missions sélectionnées',
  },
  en: {
    title: 'What would you like to assign to your AI Collaborator?',
    placeholder: 'Describe the work to be done…',
    talk: 'Dictate the work to be done',
    stop: 'Stop dictation',
    send: 'Send the work to be done',
    voiceUnavailable: 'Voice dictation is not available in this browser.',
    readyTitle: 'Need inspiration?',
    readyNote: 'Choose a mission. Alma will adapt it to your company.',
    selection: 'Selection',
    allCategories: 'All categories',
    selectedCount: '12 selected missions',
  },
} as const
