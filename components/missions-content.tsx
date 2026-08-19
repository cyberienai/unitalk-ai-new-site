'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Check, Search } from 'lucide-react'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'
import { AlmaFace } from '@/components/alma-face'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { Kicker } from '@/components/home/section-kicker'
import { getPreparedDemo } from '@/components/home/hero-hybrid'

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

type NeedFamily = 'recommended' | 'all' | 'growth' | 'customers' | 'company' | 'teams' | 'produce'

const FAMILY_CATEGORIES: Record<Exclude<NeedFamily, 'recommended' | 'all'>, string[]> = {
  growth: ['ventes', 'marketing'],
  customers: ['relation-client'],
  company: ['finance', 'direction', 'administration', 'operations'],
  teams: ['rh', 'reunions'],
  produce: ['documents', 'analyse', 'produit'],
}

const FEATURED_SLUGS = [
  'trouver-de-nouveaux-clients',
  'preparer-les-elements-de-facturation',
  'controler-l-execution-d-un-processus',
  'qualifier-les-demandes-entrantes',
  'construire-un-calendrier-editorial',
  'participer-a-vos-reunions',
  'repondre-a-mes-clients',
  'preparer-une-feuille-de-route-produit',
  'rediger-une-fiche-de-poste',
  'preparer-l-ordre-du-jour',
  'resumer-un-dossier',
  'organiser-les-rendez-vous',
] as const

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
  const t = COPY[lang]
  const initialFamily = useMemo<NeedFamily>(() => {
    if (requestedCategory) return 'all'
    if (requestedFamily && requestedFamily in FAMILY_CATEGORIES) return requestedFamily as NeedFamily
    if (requestedView === 'toutes') return 'all'
    return 'recommended'
  }, [requestedCategory, requestedFamily, requestedView])
  const [need, setNeed] = useState('')
  const [family, setFamily] = useState<NeedFamily>(initialFamily)
  const [query, setQuery] = useState(requestedQuery ?? '')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [listening, setListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const SpeechRecognition = getSpeechRecognition()
    if (!SpeechRecognition) return
    setVoiceSupported(true)
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
    if (!composerRequested) return
    requestAnimationFrame(() => {
      composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
      composerRef.current?.focus({ preventScroll: true })
    })
  }, [composerRequested])

  useEffect(() => {
    if (!returnSlug) return
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-mission-card="${CSS.escape(returnSlug)}"]`)?.scrollIntoView({ block: 'center' }))
  }, [returnSlug])

  const filteredMissions = useMemo(() => {
    const search = normalize(query.trim())
    const allowedCategories = family === 'recommended' || family === 'all' ? null : FAMILY_CATEGORIES[family]
    let pool = MISSIONS.filter((mission) => {
      if (requestedCollaborator && mission.collaboratorSlug !== requestedCollaborator) return false
      if (requestedCategory && mission.category !== requestedCategory) return false
      return !allowedCategories || allowedCategories.includes(mission.category)
    })

    if (search) {
      pool = pool.filter((mission) => normalize([
        mission.title[lang],
        mission.description[lang],
        mission.result[lang],
        mission.category,
        ...mission.keywords,
      ].join(' ')).includes(search))
    } else if (family === 'recommended' && !requestedCategory) {
      const bySlug = new Map(pool.map((mission) => [mission.slug, mission]))
      pool = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter((mission): mission is Mission => Boolean(mission))
    }

    return pool
  }, [family, lang, query, requestedCategory, requestedCollaborator])

  const visibleMissions = filteredMissions.slice(0, visibleCount)
  const inputPreview = need.trim().length >= 20 ? getPreparedDemo(need.trim(), lang) : null

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

  function rememberCatalogState() {
    try { sessionStorage.setItem('unitalk_missions_state', JSON.stringify({ family, query, need })) } catch {}
  }

  function handDraftToAlma(value: string) {
    const clean = value.trim()
    if (!clean) return
    const draftId = `draft_${crypto.randomUUID()}`
    try { localStorage.setItem(`unitalk_mission_${draftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
    router.push(`/decouvrir?draft=${encodeURIComponent(draftId)}&source=mission-store`)
  }

  function selectFamily(next: NeedFamily) {
    setFamily(next)
    setVisibleCount(PAGE_SIZE)
    const href = next === 'recommended' ? '/missions' : next === 'all' ? '/missions?vue=toutes' : `/missions?famille=${encodeURIComponent(next)}`
    router.replace(href, { scroll: false })
  }

  function focusComposer() {
    composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    composerRef.current?.focus({ preventScroll: true })
  }

  useLayoutEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    const field = composerRef.current
    if (!field) return
    field.focus({ preventScroll: true })
    field.setSelectionRange(field.value.length, field.value.length)
  }, [])

  return (
    <main id="missions-top" className="min-h-screen overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
      <section className="relative overflow-hidden bg-[#F3EFE6] px-5 pb-14 pt-24 sm:px-8 sm:pb-16 sm:pt-28 lg:flex lg:min-h-[760px] lg:items-center lg:py-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-36 top-20 size-[32rem] rounded-full bg-[#D10E63]/[.055] blur-3xl" />
        <div className="editorial-shell relative w-full">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1.14fr_0.86fr] lg:items-center lg:gap-10">
            <header>
              <Kicker>{t.eyebrow}</Kicker>
              <h1 className="mt-4 max-w-[720px] text-[clamp(2.65rem,12vw,4.5rem)] font-semibold leading-[.9] tracking-[-.065em] lg:text-[clamp(3.1rem,4.8vw,5rem)]">
                <span className="block whitespace-nowrap">{t.heroA}</span>
                <span className="block whitespace-nowrap">{t.heroB}</span>
                <span className="block whitespace-nowrap text-[#D10E63]">{t.heroC}</span>
              </h1>
              <p className="mt-5 max-w-xl text-[17px] leading-8 text-[#4E483F]">{withAlmaAvatar(t.lead)}</p>
              <a href="#mission-selection" className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#D10E63] px-5 text-sm font-bold text-[#B00C54] transition-colors hover:bg-[#D10E63] hover:text-white">{t.explore}<ArrowRight className="size-4 rotate-90 transition-transform group-hover:translate-y-0.5" /></a>
            </header>

            <AlmaMissionComposer value={need} onChange={setNeed} onSubmit={() => handDraftToAlma(need)} title={t.composerTitle} body={t.composerBody} role={t.almaRole} placeholder={t.placeholder} submitLabel={t.continue} starters={t.starters} onStarterSelect={handDraftToAlma} listening={listening} onToggleListening={toggleListening} voiceSupported={voiceSupported} voiceStartLabel={t.talk} voiceStopLabel={t.stop} listeningLabel={t.listening} error={voiceError} textareaRef={composerRef} previewVisible={Boolean(inputPreview)} compactMobile compactDesktop titleInField preview={inputPreview && <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-[1.2fr_1fr_auto]"><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewMission}</p><p className="mt-1.5 line-clamp-2 font-sf text-[15px] font-semibold leading-5 text-white">{inputPreview.title}</p></div><div className="bg-[#211E1A] p-3.5"><p className="font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F3B4CF]">{t.previewCollaborator}</p><p className="mt-1.5 text-[13px] font-semibold text-white">{inputPreview.name}</p><p className="mt-0.5 text-[10px] text-[#AFA397]">{inputPreview.role}</p></div><div className="flex min-w-[144px] items-center justify-center gap-2 bg-[#D10E63] px-3 py-3 text-center text-[11px] font-bold leading-4 text-white"><Check className="size-4 shrink-0" />{t.previewReady}</div></div>} />
          </div>

        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <section aria-labelledby="mission-selection-title" className="pt-16 sm:pt-20">
          <div id="mission-selection" className="scroll-mt-24">
            <h2 id="mission-selection-title" className="font-sf text-[clamp(2rem,3.45vw,3.65rem)] font-semibold leading-[.98] tracking-[-.05em] lg:whitespace-nowrap">{t.catalogTitle}</h2>
          </div>

          <div className="mt-7 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative block w-full max-w-[160px]">
              <span className="sr-only">{t.search}</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-[#6E665A]" />
              <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-4 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" />
            </label>
            <div className="flex max-w-full gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
               {(Object.keys(t.families) as NeedFamily[]).map((key) => <CategoryPill key={key} active={!requestedCategory && family === key} onClick={() => selectFamily(key)}>{t.families[key]}</CategoryPill>)}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
             <p role="status" aria-live="polite" className="text-sm font-semibold text-[#4E483F]">{family === 'recommended' && !query && !requestedCategory ? t.recommended(filteredMissions.length) : t.count(visibleMissions.length, filteredMissions.length)}</p>
            <span aria-hidden className="h-px flex-1 bg-[#DED6C8]" />
          </div>

          <div className="mt-4 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleMissions.map((mission, index) => (
              <div key={mission.slug} className="contents">
                <StoreCard mission={mission} lang={lang} onPersonalize={rememberCatalogState} />
                {index === 5 && <AlmaCatalogCard lang={lang} onClick={focusComposer} />}
              </div>
            ))}
          </div>

          {visibleCount < filteredMissions.length && (
            <div className="mt-8 text-center"><button type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)} className="inline-flex min-h-11 items-center rounded-full border border-[#D10E63] px-6 text-sm font-bold text-[#B00C54] hover:bg-[#D10E63] hover:text-white">{t.showMore}</button></div>
          )}
          {filteredMissions.length === 0 && <div className="mt-8"><AlmaCatalogCard lang={lang} onClick={focusComposer} /></div>}
        </section>

        <section className="relative mt-20 overflow-hidden rounded-[32px] bg-[#D10E63] px-6 py-12 text-white sm:px-10 sm:py-16">
          <div aria-hidden className="absolute -right-20 -top-28 size-80 rounded-full border border-white/15" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><h2 className="max-w-4xl text-balance font-sf text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[.92] tracking-[-.065em]">{t.finalTitle}</h2><p className="mt-6 max-w-xl text-[16px] leading-8 text-white/80">{withAlmaAvatar(t.finalBody)}</p></div><button type="button" onClick={focusComposer} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#181615] px-7 text-sm font-bold text-white hover:bg-[#2A2622]">{withAlmaAvatar(t.finalCta)}<ArrowRight className="size-4" /></button></div>
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
  return <button type="button" aria-pressed={active} onClick={onClick} className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:border-[#D10E63]/45 hover:text-[#D10E63]'}`}>{children}</button>
}

const COPY = {
  fr: {
    eyebrow: 'Missions pour collaborateur IA',
    title: 'Quelle mission voulez-vous faire avancer ?',
    heroA: 'Quelle mission', heroB: 'voulez-vous', heroC: 'faire avancer ?',
    lead: 'Décrivez le résultat attendu. Alma prépare la mission et personnalise votre Collaborateur IA pour votre entreprise.', explore: 'Voir des missions prêtes à démarrer',
    almaRole: 'Collaboratrice IA · Coordinatrice de missions chez Unitalk', composerTitle: 'Quel travail voulez-vous confier à votre Collaborateur IA ?', composerBody: '',
    placeholder: 'Décrivez simplement le résultat attendu…',
    talk: 'Commencer à parler', stop: 'Terminer', listening: 'Alma vous écoute…', continue: 'Personnaliser mon Collaborateur IA',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    starters: ['Qualifier mes prospects', 'Répondre à mes clients', 'Préparer mes factures', 'Construire mon calendrier éditorial', 'Organiser l’intégration d’un nouveau salarié'],
    previewMission: 'Aperçu de mission', previewCollaborator: 'Exemple de profil adapté', previewReady: 'À confirmer avec vous',
    handoff: 'Entrée pour continuer · Maj + Entrée pour une nouvelle ligne. Votre description reste dans ce navigateur pendant la reprise.',
    catalogTitle: 'Ou partez d’une mission prête à démarrer',
    search: 'Rechercher',
    families: { recommended: 'Recommandées', all: 'Toutes', growth: 'Développer les ventes', customers: 'Servir les clients', company: 'Gérer l’entreprise', teams: 'Organiser les équipes', produce: 'Produire et analyser' },
    recommended: (total: number) => `${total} mission${total > 1 ? 's' : ''} pour commencer`,
    count: (shown: number, total: number) => `${shown} mission${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''} sur ${total}`,
    showMore: 'Afficher 12 missions supplémentaires',
    finalTitle: 'Vous savez ce qui doit être fait.',
    finalBody: 'Décrivez le résultat attendu. Alma personnalise votre Collaborateur IA pour votre mission.',
    finalCta: 'Décrire ma mission',
  },
  en: {
    eyebrow: 'Missions / AI Collaborators',
    title: 'What work needs to move forward?',
    heroA: 'What work', heroB: 'needs to', heroC: 'move forward?',
    lead: 'Describe the expected outcome. Alma prepares the mission and customizes your AI Collaborator for your organization.', explore: 'View already scoped missions',
    almaRole: 'Unitalk AI mission coordinator', composerTitle: 'What work would you like to assign to your AI Collaborator?', composerBody: '',
    placeholder: 'Simply describe the expected outcome…',
    talk: 'Start talking', stop: 'Finish', listening: 'Alma is listening…', continue: 'Customize my AI Collaborator',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    starters: ['Qualify my prospects', 'Reply to my customers', 'Prepare my invoices', 'Build my editorial calendar', 'Organize a new employee’s onboarding'],
    previewMission: 'Mission preview', previewCollaborator: 'Example suitable profile', previewReady: 'To be confirmed with you',
    handoff: 'Enter to continue · Shift + Enter for a new line. Your description remains in this browser while you resume.',
    catalogTitle: 'Or start from an already scoped mission',
    search: 'Search',
    families: { recommended: 'Recommended', all: 'All', growth: 'Grow sales', customers: 'Serve customers', company: 'Run the company', teams: 'Organize teams', produce: 'Produce and analyze' },
    recommended: (total: number) => `${total} mission${total > 1 ? 's' : ''} to get started`,
    count: (shown: number, total: number) => `${shown} of ${total} mission${total > 1 ? 's' : ''} shown`,
    showMore: 'Show 12 more missions',
    finalTitle: 'You know what needs to be done.',
    finalBody: 'Describe the expected outcome. Alma customizes your AI Collaborator for your mission.',
    finalCta: 'Describe my mission',
  },
} as const
