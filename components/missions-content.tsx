'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, ArrowUp, ChevronDown, Mic, Square } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'
import Image from 'next/image'
import Link from 'next/link'

// 7 business categories — no sub-categories, no mixed levels
const CATEGORIES = ['ventes', 'marketing', 'relation-client', 'finance', 'rh', 'operations', 'direction'] as const
const CATEGORY_LABELS: Record<string, { fr: string; en: string }> = {
  ventes: { fr: 'Ventes', en: 'Sales' },
  marketing: { fr: 'Marketing', en: 'Marketing' },
  'relation-client': { fr: 'Service client', en: 'Customer service' },
  finance: { fr: 'Finance', en: 'Finance' },
  rh: { fr: 'RH', en: 'HR' },
  operations: { fr: 'Opérations', en: 'Operations' },
  direction: { fr: 'Direction', en: 'Leadership' },
}

// Agentic-first: missions where the AI WORKS, not just generates text
const FEATURED_SLUGS = [
  'trouver-de-nouveaux-clients',        // Ventes — agentic: recherche + qualif
  'preparer-les-elements-de-facturation', // Finance — agentic: rassemble + contrôle
  'controler-l-execution-d-un-processus', // Opérations — agentic: surveille
  'qualifier-les-demandes-entrantes',    // Service client — agentic: enrichit + route
  'construire-un-calendrier-editorial',  // Marketing — agentic: planifie
  'realiser-une-veille-concurrentielle',  // Direction — agentic: surveille
  'repondre-a-mes-clients',              // Service client — agentic: prépare réponses
  'preparer-une-feuille-de-route-produit', // Direction — agentic: structure
  'rediger-une-fiche-de-poste',          // RH — agentic: formalise
  'preparer-l-ordre-du-jour',            // Direction — agentic: structure
  'resumer-un-dossier',                  // Direction — agentic: synthétise
  'participer-a-vos-reunions',           // Réunions — agentic: assiste
] as const

export function MissionsContent() {
  const { lang } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnSlug = searchParams.get('return')
  const requestedCategory = searchParams.get('categorie')
  const validCategory = useMemo(() => requestedCategory && CATEGORIES.includes(requestedCategory as any) ? requestedCategory : 'all', [requestedCategory])
  const t = COPY[lang]
  const [need, setNeed] = useState('')
  const [category, setCategory] = useState(validCategory)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('unitalk_missions_state')
      if (!raw) return
      const saved = JSON.parse(raw) as { category?: string; need?: string; scrollY?: number }
      if (saved.category) setCategory(saved.category)
      if (typeof saved.need === 'string') setNeed(saved.need)
      if (!returnSlug) return
      requestAnimationFrame(() => {
        const card = document.querySelector<HTMLElement>(`[data-mission-card="${CSS.escape(returnSlug)}"]`)
        if (!card) return
        card.scrollIntoView({ block: 'center', behavior: 'auto' })
        window.history.replaceState(window.history.state, '', '/missions')
      })
    } catch {}
  }, [returnSlug])

  useEffect(() => { setCategory(validCategory); if (requestedCategory && validCategory === 'all') window.history.replaceState(window.history.state, '', '/missions') }, [requestedCategory, validCategory])

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' ? (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition : undefined
    if (!SpeechRecognition) return
    setVoiceSupported(true)
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event: any) => { let transcript = ''; for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript; setNeed(transcript) }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    return () => { try { recognition.abort() } catch {} }
  }, [lang])

  const missions = useMemo(() => {
    if (category === 'all') {
      const bySlug = new Map(MISSIONS.map(m => [m.slug, m]))
      return FEATURED_SLUGS.map(s => bySlug.get(s)).filter((m): m is Mission => !!m)
    }
    return MISSIONS.filter(m => m.category === category).slice(0, 12)
  }, [category])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) { recognition.stop(); return }
    setListening(true)
    try { recognition.start() } catch { setListening(false) }
  }

  function rememberCatalogState() {
    try { sessionStorage.setItem('unitalk_missions_state', JSON.stringify({ category, need, scrollY: window.scrollY })) } catch {}
  }

  function navigateToDiscover(href: string) {
    rememberCatalogState()
    const doc = document as Document & { startViewTransition?: (u: () => void) => void }
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && doc.startViewTransition) { doc.startViewTransition(() => router.push(href)); return }
    router.push(href)
  }

  function handDraftToAlma(value: string) {
    const clean = value.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    navigateToDiscover(`/decouvrir?draft=${encodeURIComponent(draftId)}`)
  }

  function selectCategory(next: string) {
    setCategory(next)
    const href = next === 'all' ? '/missions' : `/missions?categorie=${encodeURIComponent(next)}`
    router.push(href, { scroll: false })
    requestAnimationFrame(() => document.getElementById('mission-selection')?.scrollIntoView({ block: 'start', behavior: 'auto' }))
  }

  return (
    <main id="missions-top" className="relative min-h-screen overflow-hidden bg-[#F3EFE6] pb-20 pt-[5.25rem] text-[#1C1A17] sm:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[360px] opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="hero-heading scroll-mt-[calc(var(--header-height,64px)+24px)]">{t.title}</h1>
          <div className="relative mx-auto mt-5 max-w-2xl">
            <textarea value={need} onChange={e => setNeed(e.target.value)} onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); handDraftToAlma(need) } }} rows={1} placeholder={t.placeholder} aria-label={t.placeholder} className="min-h-14 w-full resize-none rounded-[18px] border border-[#D8D0C2] bg-[#FFFDF9] py-[17px] pl-5 pr-14 text-[15px] leading-5 shadow-[0_14px_38px_-30px_rgba(28,26,23,.55)] outline-none placeholder:text-[#857C6E] hover:border-[#C8BFB0] focus:border-[#D10E63]/70 focus:shadow-[0_16px_42px_-28px_rgba(209,14,99,.35)] focus:ring-4 focus:ring-[#D10E63]/10" />
            <button type="button" onClick={() => (need.trim() ? handDraftToAlma(need) : toggleListening())} disabled={!need.trim() && !voiceSupported} aria-label={need.trim() ? t.send : listening ? t.stop : t.talk} className="group absolute right-2 top-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#D10E63] text-white shadow-[0_8px_20px_-8px_rgba(209,14,99,.65)] hover:-translate-y-0.5 hover:bg-[#E51872] disabled:cursor-not-allowed disabled:bg-[#B9B1A5] disabled:text-[#F3EFE6] disabled:shadow-none">
              {need.trim() ? <ArrowUp className="h-4 w-4" strokeWidth={2.5} /> : listening ? <Square className="h-4 w-4" fill="currentColor" /> : <Mic className="h-4 w-4" />}
            </button>
          </div>
        </header>

        <section id="mission-selection" aria-labelledby="mission-selection-title" className="mt-7 scroll-mt-[calc(var(--header-height,64px)+24px)]">
          {/* Alma banner */}
          <div className="flex flex-col items-start gap-3 border-y border-[#D8D0C2] py-3 sm:flex-row sm:items-center sm:gap-4">
            <Link href="/unitalk/@alma" aria-label={t.almaLinkLabel} className="shrink-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2">
              <Image src="/alma-avatar.png" alt="" width={52} height={52} className="size-[52px] rounded-full object-cover ring-2 ring-[#D10E63]/15" />
            </Link>
            <div className="min-w-0 flex-1">
              <h2 id="mission-selection-title" className="font-sf text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{t.readyTitle}</h2>
              <p className="mt-1 text-[13px] font-semibold text-[#1C1A17]">Alma <span className="font-normal text-[#6E665A]">· {t.almaRole}</span></p>
              <p className="mt-1 max-w-xl text-[13px] leading-5 text-[#4E483F]">{t.readyNote}</p>
            </div>
            <Link href="/unitalk/@alma" className="shrink-0 rounded-full border border-[#D10E63]/25 bg-[#FFFDF9] px-4 py-2 text-[12px] font-semibold text-[#B00C54] outline-none hover:border-[#D10E63]/50 hover:bg-[#FCEBF2] focus-visible:ring-2 focus-visible:ring-[#D10E63]">{t.talkToAlma}</Link>
          </div>

          {/* Category pills — 7 primary + "Toutes" */}
          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <CategoryPill active={category === 'all'} onClick={() => selectCategory('all')}>{t.allCategories}</CategoryPill>
            {CATEGORIES.map(key => (
              <CategoryPill key={key} active={category === key} onClick={() => selectCategory(key)}>{CATEGORY_LABELS[key][lang]}</CategoryPill>
            ))}
          </div>

          <div className="mt-[18px] flex items-center gap-3">
            <p className="text-sm font-semibold text-[#4E483F]">{category === 'all' ? `${FEATURED_SLUGS.length} missions recommandées` : `${MISSIONS.filter(m => m.category === category).length} missions · ${CATEGORY_LABELS[category]?.[lang] ?? category}`}</p>
            <span aria-hidden className="h-px flex-1 bg-[#DED6C8]" />
          </div>

          <div className="mt-3 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {missions.map(mission => (
              <StoreCard key={mission.slug} mission={mission} lang={lang} onPersonalize={rememberCatalogState} />
            ))}
          </div>
        </section>

        {/* Post-mission: 3 steps inline */}
        <section className="mt-20 border-t border-[#D8D0C2] pt-20 text-center">
                  <h2 className="text-[34px] font-semibold leading-[1.05] tracking-[-0.045em] sm:text-[42px]">{t.postTitle}</h2>
                  <p className="mt-2 text-[26px] font-semibold leading-[1.1] tracking-[-0.035em] text-[#D10E63] sm:text-[34px]">{t.postSubtitle}</p>
                  <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-12">
                    {t.postSteps.map((step, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D10E63]/10 text-sm font-bold text-[#D10E63]">{i + 1}</span>
                        <span className="text-sm font-semibold text-[#1C1A17]">{step}</span>
                        {i < 2 && <span className="hidden text-[#D8D0C2] sm:inline">→</span>}
                      </div>
                    ))}
                  </div>
                </section>
      </div>
    </main>
  )
}

function CategoryPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold leading-none outline-none transition-[border-color,background-color,color,transform] focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 ${active ? 'border-[#D10E63] bg-[#D10E63] text-white shadow-[0_7px_18px_-10px_rgba(209,14,99,.8)]' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:-translate-y-0.5 hover:border-[#D10E63]/45 hover:text-[#D10E63]'}`}>{children}</button>
  )
}

const COPY = {
  fr: {
    title: 'Confiez une mission.',
    placeholder: 'Décrivez le travail à faire…',
    talk: 'Dicter le travail à faire', stop: 'Arrêter la dictée', send: 'Envoyer le travail à accomplir',
    voiceUnavailable: 'La dictée vocale n\'est pas disponible dans ce navigateur.',
    readyTitle: 'Besoin d\'inspiration ?',
    readyNote: 'Je vous aide à définir une première mission, puis à préparer le Collaborateur IA qui va l\'accomplir.',
    almaRole: 'Coordinatrice de missions',
    almaLinkLabel: 'Parler à Alma, Coordinatrice de missions',
    talkToAlma: 'Parler à Alma →',
    allCategories: 'Toutes les missions',
    postTitle: 'Vous confiez une mission.',
    postSubtitle: 'Votre Collaborateur apprend à travailler comme vous.',
    postSteps: ['Confiez une mission', 'Donnez vos règles', 'Résultat validé'],
  },
  en: {
    title: 'Assign a mission.',
    placeholder: 'Describe the work to be done…',
    talk: 'Dictate the work to be done', stop: 'Stop dictation', send: 'Send the work to be done',
    voiceUnavailable: 'Voice dictation is not available in this browser.',
    readyTitle: 'Need inspiration?',
    readyNote: 'I help you define a first mission, then prepare the AI Collaborator that will carry it out.',
    almaRole: 'Mission coordinator',
    almaLinkLabel: 'Talk to Alma, Mission coordinator',
    talkToAlma: 'Talk to Alma →',
    allCategories: 'All missions',
    postTitle: 'You assign a mission.',
    postSubtitle: 'Your Collaborator learns to work like you.',
    postSteps: ['Assign a mission', 'Set your rules', 'Validated result'],
  },
} as const
