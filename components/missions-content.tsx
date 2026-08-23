'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ArrowRight, Check, Search } from 'lucide-react'
import { MISSIONS, getMissionCategory, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'
import { AlmaFace } from '@/components/alma-face'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { Kicker } from '@/components/home/section-kicker'
import { getPreparedMissionPreview } from '@/lib/mission-preview'
import { searchMissions } from '@/lib/missions-store'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { MISSIONS_PAGE_FAQ } from '@/lib/missions-page-faq'

import { localizedHref } from '@/lib/i18n-routing'

type SpeechResultEvent = { results: ArrayLike<{ 0: { transcript: string } }> }
type SpeechErrorEvent = { error?: string }
type SpeechRecognitionInstance = {
  lang: string
  continuous: boolean
  interimResults: boolean
  onresult: ((event: SpeechResultEvent) => void) | null
  onend: (() => void) | null
  onerror: ((event: SpeechErrorEvent) => void) | null
  start: () => void
  stop: () => void
  abort: () => void
}

type NeedFamily = 'all' | 'sales' | 'customers' | 'marketing' | 'operations' | 'administration' | 'finance' | 'hr' | 'direction' | 'documents' | 'analysis' | 'product' | 'tech'

const FAMILY_CATEGORIES: Record<Exclude<NeedFamily, 'all' | 'tech'>, string[]> = {
  sales: ['ventes'],
  customers: ['relation-client'],
  marketing: ['marketing'],
  operations: ['reunions', 'operations'],
  administration: ['administration'],
  finance: ['finance'],
  hr: ['rh'],
  direction: ['direction'],
  documents: ['documents'],
  analysis: ['analyse'],
  product: ['produit'],
}
const NEED_FAMILIES: NeedFamily[] = ['all', 'sales', 'customers', 'marketing', 'operations', 'administration', 'finance', 'hr', 'direction', 'documents', 'analysis', 'product', 'tech']
const PRIMARY_FAMILIES: NeedFamily[] = ['all', 'sales', 'customers', 'marketing', 'operations', 'finance']

const POPULAR_MISSIONS_BY_FAMILY: Record<NeedFamily, readonly string[]> = {
  all: [
    'trouver-de-nouveaux-clients',
    'repondre-aux-appels-clients',
    'construire-un-calendrier-editorial',
    'automatiser-mes-operations',
    'preparer-les-elements-de-facturation',
    'chloe-sourcer-des-candidats',
    'realiser-une-veille-concurrentielle',
    'participer-a-vos-reunions',
    'mettre-a-jour-le-crm',
    'suivre-les-reclamations',
    'preparer-mon-reporting-financier',
    'preparer-une-feuille-de-route-produit',
  ],
  sales: ['trouver-de-nouveaux-clients', 'qualifier-les-demandes-entrantes', 'mettre-a-jour-le-crm', 'relancer-les-opportunites', 'analyser-le-pipeline-commercial', 'preparer-les-rendez-vous-commerciaux'],
  customers: ['repondre-aux-appels-clients', 'trier-et-orienter-les-demandes', 'suivre-les-reclamations', 'informer-les-clients-de-l-avancement', 'suivre-la-satisfaction-client', 'detecter-les-clients-a-risque'],
  marketing: ['construire-un-calendrier-editorial', 'preparer-une-campagne-emailing', 'surveiller-l-image-de-marque', 'creer-mes-contenus', 'produire-des-fiches-produits', 'decliner-un-contenu-multicanal'],
  operations: ['automatiser-mes-operations', 'participer-a-vos-reunions', 'controler-l-execution-d-un-processus', 'synchroniser-les-donnees', 'coordonner-les-agendas', 'suivre-les-actions-decidees'],
  administration: ['organiser-les-rendez-vous', 'trier-la-boite-de-reception', 'suivre-les-dossiers-administratifs', 'controler-la-completude-des-dossiers', 'classer-les-documents', 'preparer-les-deplacements'],
  finance: ['preparer-les-elements-de-facturation', 'relancer-les-factures-impayees', 'suivre-la-tresorerie', 'preparer-mon-reporting-financier', 'controler-les-notes-de-frais', 'consolider-les-indicateurs-de-gestion'],
  hr: ['chloe-sourcer-des-candidats', 'preselectionner-les-candidatures', 'organiser-les-entretiens', 'preparer-l-arrivee-d-un-collaborateur', 'suivre-les-formations', 'analyser-les-retours-des-collaborateurs'],
  direction: ['preparer-le-dossier-de-comite', 'preparer-une-revue-strategique', 'preparer-une-note-de-decision', 'produire-une-synthese-executive', 'suivre-les-objectifs', 'consolider-les-indicateurs-cles'],
  documents: ['resumer-un-dossier', 'comparer-plusieurs-documents', 'extraire-les-informations-cles', 'construire-une-base-de-connaissances', 'rediger-une-procedure', 'preparer-une-presentation'],
  analysis: ['realiser-une-veille-concurrentielle', 'surveiller-un-marche', 'comparer-les-offres-concurrentes', 'analyser-les-ventes', 'rechercher-des-informations-publiques', 'preparer-un-benchmark'],
  product: ['realiser-une-veille-concurrentielle', 'synthetiser-les-retours-utilisateurs', 'preparer-une-feuille-de-route-produit', 'analyser-une-interface', 'analyser-une-anomalie-technique', 'preparer-les-tests-d-une-fonctionnalite'],
  tech: ['automatiser-mes-operations', 'synchroniser-les-donnees', 'mettre-a-jour-le-crm-automatiquement', 'controler-l-execution-d-un-processus', 'analyser-une-anomalie-technique', 'preparer-les-tests-d-une-fonctionnalite'],
}

function popularityRank(mission: Mission, family: NeedFamily): number {
  const editorialRank = POPULAR_MISSIONS_BY_FAMILY[family].indexOf(mission.slug)
  if (editorialRank >= 0) return editorialRank
  const operationalBoost = mission.modalities.some(modality => ['automatisation', 'telephone', 'reunion', 'audio', 'code', 'donnees'].includes(modality)) ? 0 : 100
  return 1_000 + operationalBoost + mission.order
}

const EMMA_LEADERSHIP_MISSION_SLUGS = [
  'preparer-le-dossier-de-comite',
  'preparer-une-revue-strategique',
  'preparer-une-note-de-decision',
  'produire-une-synthese-executive',
  'suivre-les-objectifs',
  'consolider-les-indicateurs-cles',
  'suivre-les-decisions-de-direction',
  'preparer-un-comite-de-direction',
  'produire-une-synthese-hebdomadaire',
  'suivre-les-actions-decidees',
  'organiser-les-rendez-vous',
  'trier-la-boite-de-reception',
  'preparer-les-deplacements',
] as const

const INITIAL_VISIBLE_COUNT = 6
const PAGE_SIZE = 12

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  if (typeof window === 'undefined') return null
  const speechWindow = window as typeof window & {
    SpeechRecognition?: new () => SpeechRecognitionInstance
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance
  }
  return speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition ?? null
}

function normalize(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function MissionsContent({
  returnSlug,
  requestedCategory,
  requestedFamily,
  requestedView,
  requestedQuery,
  requestedCollaborator,
  composerRequested = false,
}: {
  returnSlug?: string
  requestedCategory?: string
  requestedFamily?: string
  requestedView?: string
  requestedQuery?: string
  requestedCollaborator?: string
  composerRequested?: boolean
}) {
  const { lang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const t = COPY[lang]
  const initialFamily = useMemo<NeedFamily>(() => {
    if (requestedCategory) return 'all'
    if (requestedFamily && NEED_FAMILIES.includes(requestedFamily as NeedFamily)) return requestedFamily as NeedFamily
    if (requestedView === 'toutes') return 'all'
    return 'all'
  }, [requestedCategory, requestedFamily, requestedView])
  const [need, setNeed] = useState(composerRequested ? requestedQuery ?? '' : '')
  const [family, setFamily] = useState<NeedFamily>(initialFamily)
  const [query, setQuery] = useState(composerRequested ? '' : requestedQuery ?? '')
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT)
  const [showAllFamilies, setShowAllFamilies] = useState(false)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const [handoffError, setHandoffError] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const dictationPrefixRef = useRef('')
  const composerRef = useRef<HTMLTextAreaElement>(null)
  const requestedCollaboratorDetail = requestedCollaborator ? ROLE_DETAILS[requestedCollaborator] : undefined
  const requestedCategoryDetail = requestedCategory ? getMissionCategory(requestedCategory) : undefined

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    const supportFrame = requestAnimationFrame(() => setVoiceSupported(true))
    const recognition = new SpeechRecognition()
    recognition.lang = lang === 'fr' ? 'fr-FR' : 'en-US'
    recognition.continuous = false
    recognition.interimResults = true
    recognition.onresult = (event) => {
      let transcript = ''
      for (let index = 0; index < event.results.length; index++) transcript += event.results[index][0].transcript
      setNeed([dictationPrefixRef.current, transcript.trim()].filter(Boolean).join(' '))
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = (event) => {
      setListening(false)
      setVoiceError(event.error === 'not-allowed' || event.error === 'service-not-allowed' ? t.voiceDenied : t.voiceFailed)
    }
    recognitionRef.current = recognition
    return () => {
      cancelAnimationFrame(supportFrame)
      recognition.abort()
    }
  }, [lang, t.voiceDenied, t.voiceFailed])

  useEffect(() => {
    if (requestedCollaboratorDetail && !composerRequested) return
    const frame = requestAnimationFrame(() => {
      if (composerRequested) composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
      if (window.matchMedia('(min-width: 1024px)').matches) composerRef.current?.focus({ preventScroll: true })
    })
    return () => cancelAnimationFrame(frame)
  }, [composerRequested, requestedCollaboratorDetail])

  useEffect(() => {
    if (!returnSlug) return
    const frame = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem('unitalk_missions_state')
        if (raw) {
          const saved = JSON.parse(raw) as { family?: NeedFamily; query?: string; need?: string }
          if (saved.family && NEED_FAMILIES.includes(saved.family)) setFamily(saved.family)
          if (typeof saved.query === 'string') setQuery(saved.query)
          if (typeof saved.need === 'string') setNeed(saved.need)
        }
      } catch {}
    })
    return () => cancelAnimationFrame(frame)
  }, [returnSlug])

  useEffect(() => {
    if (returnSlug) return
    const frame = requestAnimationFrame(() => {
      setFamily(initialFamily)
      setQuery(composerRequested ? '' : requestedQuery ?? '')
      if (composerRequested && requestedQuery) setNeed(requestedQuery)
      setVisibleCount(INITIAL_VISIBLE_COUNT)
    })
    return () => cancelAnimationFrame(frame)
  }, [composerRequested, initialFamily, requestedQuery, returnSlug])

  const filteredMissions = useMemo(() => {
    const search = normalize(query.trim())
    const allowedCategories = family === 'all' || family === 'tech' ? null : FAMILY_CATEGORIES[family]
    let pool = MISSIONS.filter((mission) => {
      if (requestedCollaboratorDetail && mission.collaboratorSlug !== requestedCollaborator) return false
      if (requestedCollaboratorDetail?.slug === 'emma' && !EMMA_LEADERSHIP_MISSION_SLUGS.includes(mission.slug as typeof EMMA_LEADERSHIP_MISSION_SLUGS[number])) return false
      if (requestedCategoryDetail && mission.category !== requestedCategoryDetail.key) return false
      if (family === 'tech') return mission.modalities.includes('code') || mission.modalities.includes('automatisation') || mission.keywords.some(keyword => /automatis|workflow|prototype|fonctionnalit|connect/.test(normalize(keyword)))
      return !allowedCategories || allowedCategories.includes(mission.category)
    })

    if (search) {
      const scores = new Map(searchMissions(search, lang).map(({ mission, score }) => [mission.slug, score]))
      pool = pool.filter(mission => scores.has(mission.slug)).sort((a, b) => (scores.get(b.slug) ?? 0) - (scores.get(a.slug) ?? 0) || a.order - b.order)
    } else if (requestedCollaboratorDetail?.slug === 'emma') {
      const bySlug = new Map(pool.map((mission) => [mission.slug, mission]))
      pool = EMMA_LEADERSHIP_MISSION_SLUGS.map((slug) => bySlug.get(slug)).filter((mission): mission is Mission => Boolean(mission))
    } else {
      pool.sort((a, b) => popularityRank(a, family) - popularityRank(b, family))
    }

    return pool
  }, [family, lang, query, requestedCategoryDetail, requestedCollaborator, requestedCollaboratorDetail])

  const visibleMissions = filteredMissions.slice(0, visibleCount)
  const inputPreview = need.trim().length >= 20 ? getPreparedMissionPreview(need.trim(), lang) : null

  useEffect(() => {
    if (!returnSlug) return
    const index = filteredMissions.findIndex(mission => mission.slug === returnSlug)
    if (index >= visibleCount) {
      const frame = requestAnimationFrame(() => setVisibleCount(Math.ceil((index + 1) / PAGE_SIZE) * PAGE_SIZE))
      return () => cancelAnimationFrame(frame)
    }
    const frame = requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-mission-card="${CSS.escape(returnSlug)}"]`)?.scrollIntoView({ block: 'center' }))
    return () => cancelAnimationFrame(frame)
  }, [filteredMissions, returnSlug, visibleCount])

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
    dictationPrefixRef.current = need.trim()
    setListening(true)
    try { recognition.start() } catch { setListening(false); setVoiceError(t.voiceFailed) }
  }

  function rememberCatalogState() {
    try { sessionStorage.setItem('unitalk_missions_state', JSON.stringify({ family, query, need })) } catch {}
  }

  function handDraftToAlma(value: string) {
    const clean = value.trim()
    if (!clean) return
    setHandoffError('')
    const draftId = `draft_${typeof crypto.randomUUID === 'function' ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`}`
    let stored = false
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })); stored = true } catch {}
    if (!stored) {
      setHandoffError(t.handoffFailed)
      return
    }
    const params = new URLSearchParams({ source: 'mission-store', draft: draftId })
    if (requestedCollaboratorDetail) params.set('collaborateur', requestedCollaboratorDetail.slug)
    try { router.push(`${localizedHref('discover', lang)}?${params}`) } catch { setHandoffError(t.handoffFailed) }
  }

  function selectFamily(next: NeedFamily) {
    setFamily(next)
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('categorie')
    params.delete('famille')
    params.delete('vue')
    if (next === 'all') params.set('vue', 'toutes')
    else params.set('famille', next)
    const href = params.size ? `${pathname}?${params}` : pathname
    router.replace(href, { scroll: false })
  }

  function clearAllFilters() {
    setFamily('all')
    setQuery('')
    setVisibleCount(INITIAL_VISIBLE_COUNT)
    const params = new URLSearchParams(searchParams.toString())
    for (const key of ['categorie', 'famille', 'vue', 'q', 'collaborateur', 'composer']) params.delete(key)
    router.replace(params.size ? `${pathname}?${params}` : pathname, { scroll: false })
  }

  function focusComposer() {
    if (!composerRef.current) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('composer', '1')
      router.replace(`${pathname}?${params}`, { scroll: false })
      return
    }
    composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    composerRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    if (composerRequested) return
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (query.trim()) params.set('q', query.trim())
      else params.delete('q')
      const next = params.toString()
      if (next !== searchParams.toString()) router.replace(next ? `${pathname}?${next}` : pathname, { scroll: false })
    }, 300)
    return () => window.clearTimeout(id)
  }, [composerRequested, pathname, query, router, searchParams])

  return (
    <main id="main-content" className="min-h-screen overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
      {(!requestedCollaboratorDetail || composerRequested) && <section className="relative overflow-hidden bg-[#F3EFE6] pb-8 pt-20 sm:pb-12 sm:pt-28 lg:pb-12 lg:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[40rem] w-[40rem] rounded-full bg-[#D10E63]/[0.08] blur-3xl" />
        <div className="editorial-shell relative w-full">
          <div className="grid grid-cols-1 items-center gap-6 sm:gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            <header className="max-w-[720px] text-left">
              <div className="mb-4 flex"><Kicker>{t.eyebrow}</Kicker></div>
              <h1 className="max-w-[720px] text-balance text-[clamp(2.35rem,11vw,4.75rem)] font-semibold leading-[.9] tracking-[-.065em] text-[#1C1A17] sm:text-[clamp(2.75rem,8vw,4.75rem)] lg:text-[clamp(3.35rem,5.2vw,4.85rem)]">{t.titleStart}<span className="mt-1 block text-[#D10E63]">{t.titleAccent}</span></h1>
              <p className="mt-4 max-w-[580px] text-[15px] leading-6 text-[#4E483F] sm:mt-5 sm:text-[18px] sm:leading-8">{withAlmaAvatar(t.lead)}</p>
            </header>

            <AlmaMissionComposer value={need} onChange={setNeed} onSubmit={() => handDraftToAlma(need)} title={t.composerTitle} body={t.composerBody} role={t.almaRole} placeholder={t.placeholder} submitLabel={t.continue} starters={t.starters} onStarterSelect={setNeed} listening={listening} onToggleListening={toggleListening} voiceSupported={voiceSupported} voiceStartLabel={t.talk} voiceStopLabel={t.stop} listeningLabel={t.listening} help={t.handoff} error={voiceError || handoffError} textareaRef={composerRef} previewVisible={Boolean(inputPreview)} compactMobile compactDesktop denseMobile titleInField source="mission-store" fieldName="" preview={inputPreview && <div role="status" aria-live="polite" className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2"><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewMission}</p><p className="mt-1.5 line-clamp-2 font-sf text-[15px] font-semibold leading-5 text-white">{inputPreview.title}</p></div><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewCollaborator}</p><p className="mt-1.5 text-[13px] font-semibold text-white">{inputPreview.name}</p><p className="mt-0.5 text-[10px] text-[#AFA397]">{inputPreview.role}</p></div><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewDeliverable}</p><p className="mt-1.5 text-[12px] font-semibold leading-5 text-white">{t.previewDeliverableBody}</p></div><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewApproval}</p><p className="mt-1.5 flex items-center gap-2 text-[12px] font-semibold leading-5 text-white"><Check className="size-4 shrink-0 text-[#F3B4CF]"/>{t.previewReady}</p></div></div>} />
           </div>
            <p className="mt-5 border-b border-[#CFC5B5] pb-3 text-[11px] font-semibold leading-5 text-[#6E665A] sm:mt-7 sm:pb-4 sm:text-[12px]">{t.heroProof} {t.trialLimit}{' '}<a href={localizedHref('pricing', lang)} className="font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4">{t.pricingCta}</a></p>

         </div>
      </section>}

      <div className={`mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 ${requestedCollaboratorDetail && !composerRequested ? 'pt-28 sm:pt-32' : ''}`}>
        <section aria-labelledby="mission-selection-title" className={requestedCollaboratorDetail && !composerRequested ? 'pt-8 sm:pt-10' : 'pt-14 sm:pt-16'}>
           <div id="mission-selection" className="scroll-mt-24">
               <h2 id="mission-selection-title" className="max-w-5xl text-balance font-sf text-[clamp(2.15rem,4.2vw,4.25rem)] font-semibold leading-[.94] tracking-[-.06em]">{requestedCollaboratorDetail ? (lang === 'fr' ? `Missions prêtes à l’emploi avec ${requestedCollaboratorDetail.name}` : `Ready-to-use missions with ${requestedCollaboratorDetail.name}`) : <>{t.catalogTitleStart}<span className="block text-[#D10E63]">{t.catalogTitleEnd}</span></>}</h2>
                {!requestedCollaboratorDetail && <p className="mt-4 max-w-3xl text-pretty text-[15px] leading-7 text-[#625B50] lg:max-w-none xl:whitespace-nowrap">{withAlmaAvatar(t.catalogLead)}</p>}
              {requestedCategoryDetail && <div className="mt-4 flex flex-wrap items-center gap-3"><span className="rounded-full bg-[#E8DCE2] px-3 py-1.5 text-xs font-bold text-[#8F0B48]">{t.categoryFilter}: {requestedCategoryDetail.label[lang]}</span><button type="button" onClick={() => selectFamily('all')} className="min-h-11 text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.clearFilter}</button></div>}
              {requestedCategory && !requestedCategoryDetail && <div role="alert" className="mt-4 rounded-xl border border-[#D8D0C2] bg-[#FAF8F3] p-4 text-sm text-[#625B50]">{t.invalidCategory}</div>}
              {requestedCollaborator && !requestedCollaboratorDetail && <div role="alert" className="mt-4 rounded-xl border border-[#D8D0C2] bg-[#FAF8F3] p-4 text-sm text-[#625B50]">{t.invalidCollaborator} <button type="button" onClick={clearAllFilters} className="ml-2 min-h-11 font-bold text-[#B00C54] underline underline-offset-4">{t.clearFilter}</button></div>}
          </div>

          {!requestedCollaboratorDetail && <div className="mt-7 grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-start">
            <label className="relative block w-full sm:max-w-[360px] lg:max-w-[260px]">
              <span className="sr-only">{t.search}</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-[#6E665A]" />
               <input type="search" name="q" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(INITIAL_VISIBLE_COUNT) }} placeholder={t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-4 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" />
            </label>
             <label className="relative block md:hidden">
               <span className="sr-only">{t.filterByArea}</span>
               <select value={requestedCategoryDetail ? '' : family} onChange={(event) => selectFamily(event.target.value as NeedFamily)} className="h-12 w-full appearance-none rounded-full border border-[#D8D0C2] bg-[#FFFDF9] px-4 pr-10 text-sm font-semibold text-[#4E483F] outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15">
                 {requestedCategoryDetail && <option value="">{requestedCategoryDetail.label[lang]}</option>}
                 {NEED_FAMILIES.map((key) => <option key={key} value={key}>{t.families[key]}</option>)}
               </select>
               <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#B00C54]">▼</span>
             </label>
             <div role="group" className="hidden flex-wrap gap-2 pt-1 md:flex lg:justify-end" aria-label={t.filterByArea}>
               {NEED_FAMILIES.filter((key) => showAllFamilies || PRIMARY_FAMILIES.includes(key) || key === family).map((key) => <CategoryPill key={key} active={!requestedCategory && family === key} onClick={() => selectFamily(key)}>{t.families[key]}</CategoryPill>)}
               <button type="button" onClick={() => setShowAllFamilies((visible) => !visible)} aria-expanded={showAllFamilies} className="inline-flex min-h-9 items-center justify-center rounded-full border border-[#BFB4A4] bg-transparent px-3 text-[11px] font-bold text-[#625B50] outline-none transition-colors hover:border-[#D10E63] hover:text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63]">{showAllFamilies ? t.fewerAreas : t.moreAreas}</button>
             </div>
          </div>}

           <p role="status" aria-live="polite" className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-[#6E665A]">{t.count(visibleMissions.length, filteredMissions.length)}</p>

           {filteredMissions.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-[#CFC5B5] bg-[#FAF8F3] p-6"><h3 className="text-xl font-semibold">{t.emptyTitle}</h3><p className="mt-2 text-sm text-[#625B50]">{t.emptyBody}</p><button type="button" onClick={clearAllFilters} className="mt-4 min-h-11 rounded-full border border-[#D10E63] px-5 text-sm font-bold text-[#B00C54]">{t.clearFilters}</button></div>}
           <div className="mt-6 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleMissions.map((mission) => (
              <div key={mission.slug} className="contents">
                <StoreCard mission={mission} lang={lang} onPersonalize={rememberCatalogState} />
              </div>
            ))}
              {filteredMissions.length > 0 && visibleCount >= filteredMissions.length && <AlmaCatalogCard lang={lang} onClick={focusComposer} />}
           </div>

          {visibleCount < filteredMissions.length && <div className="mt-8 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="inline-flex min-h-12 items-center rounded-full border border-[#D10E63] px-6 text-sm font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white">{t.showMore}<span aria-hidden className="ml-2">↓</span></button></div>}

        </section>

        <section aria-labelledby="missions-faq-title" className="mt-20 border-t border-[#CFC5B5] pt-12 sm:pt-16">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:gap-16">
            <div><Kicker>{t.faqKicker}</Kicker><h2 id="missions-faq-title" className="mt-5 max-w-lg text-balance font-sf text-[clamp(2.4rem,4.5vw,4.5rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.faqTitle}</h2></div>
            <div className="border-t border-[#CFC5B5]">{MISSIONS_PAGE_FAQ[lang].map(([question, answer]) => <details key={question} className="group border-b border-[#CFC5B5]"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[15px] font-bold marker:content-none"><span>{question}</span><span aria-hidden className="text-xl font-normal text-[#D10E63] transition-transform group-open:rotate-45">+</span></summary><p className="max-w-2xl pb-5 pr-10 text-sm leading-7 text-[#625B50]">{answer}</p></details>)}</div>
          </div>
        </section>

      </div>
    </main>
  )
}

function AlmaCatalogCard({ lang, onClick }: { lang: 'fr' | 'en'; onClick: () => void }) {
  const fr = lang === 'fr'
  return (
    <article className="relative flex min-h-[250px] flex-col overflow-hidden rounded-[22px] border border-[#F2A4C5]/40 bg-[#211E1A] p-6 text-[#FAF8F3] shadow-[0_24px_55px_-28px_rgba(209,14,99,.55)] before:absolute before:inset-y-0 before:left-0 before:w-1 before:bg-[#D10E63]">
      <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-[#D10E63]/20 blur-3xl"/>
      <p className="relative font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2A4C5]">{withAlmaAvatar('Alma')}</p>
      <h3 className="mt-4 font-sf text-xl font-semibold leading-snug">{fr ? 'Vous ne trouvez pas exactement votre mission ?' : 'Can’t find exactly the mission you need?'}</h3>
       <p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{withAlmaAvatar(fr ? 'Décrivez le résultat attendu. Alma personnalise votre Collaborateur IA pour l’obtenir.' : 'Describe the expected outcome. Alma customizes your AI Collaborator to deliver it.')}</p>
      <button type="button" onClick={onClick} className="relative mt-auto inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white hover:bg-[#E51872]">{fr ? 'Décrire ma mission' : 'Describe my mission'}<ArrowRight className="size-4" /></button>
    </article>
  )
}

function withAlmaAvatar(value: string) {
  return value.split('Alma').map((part, index) => (
    <span key={`${part}-${index}`}>
      {index > 0 && <><AlmaFace em={1.15} />Alma</>}
      {part}
    </span>
  ))
}

function CategoryPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`inline-flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:border-[#D10E63]/45 hover:text-[#D10E63]'}`}>{children}</button>
}

const COPY = {
  fr: {
    eyebrow: 'Plus de 200 modèles de missions prêts à personnaliser',
    titleStart: 'Ne demandez plus à l’IA.', titleAccent: 'Confiez-lui le travail.',
    lead: 'Votre Collaborateur IA comprend l’objectif, mobilise les bons outils et mène la mission jusqu’au résultat.', heroCta: 'Décrire le résultat attendu', heroProof: 'Première mission offerte, jusqu’à 7 jours · Sans carte bancaire ·', trialLimit: '', pricingCta: 'Voir les tarifs',
    almaRole: 'Coordinatrice de missions IA', composerTitle: 'Quel travail voulez-vous confier ?', composerBody: '',
    placeholder: 'Décrivez simplement le résultat attendu…',
    talk: 'Commencer à parler', stop: 'Terminer', listening: 'Alma vous écoute…', continue: 'Préparer ma mission avec Alma',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    voiceFailed: 'La dictée vocale a été interrompue. Vous pouvez poursuivre par écrit.',
    handoffFailed: 'La reprise de votre demande a échoué. Réessayez ou poursuivez avec le formulaire.',
    starters: ['Trouver de nouveaux clients', 'Participer à une visio', 'Relancer des factures'],
    previewMission: 'Mission proposée', previewCollaborator: 'Collaborateur recommandé', previewDeliverable: 'Livrable attendu', previewDeliverableBody: 'Un résultat vérifiable, préparé selon votre contexte', previewApproval: 'Votre contrôle', previewReady: 'Actions sensibles à confirmer',
    handoff: '',
    catalogTitleStart: 'Vendre plus. Mieux servir vos clients.', catalogTitleEnd: 'Produire. Innover.',
    catalogLead: 'Choisissez un résultat à atteindre. Alma adapte la mission et prépare le Collaborateur IA pour votre entreprise.',
    search: 'Rechercher une mission',
    filterByArea: 'Filtrer les missions par domaine',
    moreAreas: 'Plus de catégories', fewerAreas: 'Réduire',
    families: { all: 'Toutes', sales: 'Ventes', customers: 'Clients', marketing: 'Marketing', operations: 'Opérations', administration: 'Administration', finance: 'Finance', hr: 'RH', direction: 'Direction', documents: 'Documents', analysis: 'Analyse', product: 'Produit', tech: 'Tech' },
    count: (shown: number, total: number) => `${shown} mission${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''} sur ${total}`,
    showMore: 'Afficher 12 missions supplémentaires',
    emptyTitle: 'Aucune mission ne correspond à ces critères.',
    emptyBody: 'Modifiez votre recherche ou réinitialisez les filtres pour retrouver tout le catalogue.',
    clearFilters: 'Voir toutes les missions',
    categoryFilter: 'Catégorie active', clearFilter: 'Effacer', invalidCategory: 'Cette catégorie est inconnue. Le catalogue complet est affiché.', invalidCollaborator: 'Ce Collaborateur IA est inconnu. Le catalogue complet est affiché.',
    faqKicker: 'Questions fréquentes', faqTitle: 'Avant de confier votre première mission.',
  },
  en: {
    eyebrow: 'More than 200 mission templates ready to customize',
    titleStart: 'Stop asking AI.', titleAccent: 'Give it the work.',
    lead: 'Your AI Collaborator understands the objective, brings in the right tools and carries the mission through to the result.', heroCta: 'Describe the expected outcome', heroProof: 'First mission included, for up to 7 days · No credit card ·', trialLimit: '', pricingCta: 'See pricing',
    almaRole: 'AI mission coordinator', composerTitle: 'What work would you like to assign?', composerBody: '',
    placeholder: 'Simply describe the expected outcome…',
    talk: 'Start talking', stop: 'Finish', listening: 'Alma is listening…', continue: 'Prepare my mission with Alma',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    voiceFailed: 'Voice dictation was interrupted. You can continue in writing.',
    handoffFailed: 'We could not resume your request. Try again or continue with the form.',
    starters: ['Find new customers', 'Join a video call', 'Follow up invoices'],
    previewMission: 'Proposed mission', previewCollaborator: 'Recommended collaborator', previewDeliverable: 'Expected deliverable', previewDeliverableBody: 'A verifiable outcome prepared for your context', previewApproval: 'Your control', previewReady: 'Sensitive actions require approval',
    handoff: '',
    catalogTitleStart: 'Sell more. Serve customers better.', catalogTitleEnd: 'Produce. Innovate.',
    catalogLead: 'Choose an outcome to achieve. Alma adapts the mission and prepares the AI Collaborator for your organization.',
    search: 'Search missions',
    filterByArea: 'Filter missions by area',
    moreAreas: 'More categories', fewerAreas: 'Show less',
    families: { all: 'All', sales: 'Sales', customers: 'Customers', marketing: 'Marketing', operations: 'Operations', administration: 'Administration', finance: 'Finance', hr: 'HR', direction: 'Leadership', documents: 'Documents', analysis: 'Analysis', product: 'Product', tech: 'Tech' },
    count: (shown: number, total: number) => `${shown} of ${total} mission${total > 1 ? 's' : ''} shown`,
    showMore: 'Show 12 more missions',
    emptyTitle: 'No mission matches these criteria.',
    emptyBody: 'Change your search or reset the filters to browse the full catalog.',
    clearFilters: 'View all missions',
    categoryFilter: 'Active category', clearFilter: 'Clear', invalidCategory: 'This category is unknown. The full catalog is shown.', invalidCollaborator: 'This AI Collaborator is unknown. The full catalog is shown.',
    faqKicker: 'Frequently asked questions', faqTitle: 'Before assigning your first mission.',
  },
} as const
