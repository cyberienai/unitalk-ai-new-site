'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, Mic, Search, Square } from 'lucide-react'
import Image from 'next/image'
import { MISSIONS, type Mission } from '@/lib/missions-catalog'
import { useLanguage } from '@/lib/language-context'
import { StoreCard } from '@/components/missions/store-card'
import { AlmaFace } from '@/components/alma-face'

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

type NeedFamily = 'all' | 'growth' | 'customers' | 'company' | 'teams' | 'produce'

const FAMILY_CATEGORIES: Record<Exclude<NeedFamily, 'all'>, string[]> = {
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
  composerRequested = false,
}: {
  returnSlug?: string
  requestedCategory?: string
  composerRequested?: boolean
}) {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const initialFamily = useMemo<NeedFamily>(() => {
    if (!requestedCategory) return 'all'
    return (Object.entries(FAMILY_CATEGORIES).find(([, categories]) => categories.includes(requestedCategory))?.[0] as NeedFamily | undefined) ?? 'all'
  }, [requestedCategory])
  const [need, setNeed] = useState('')
  const [family, setFamily] = useState<NeedFamily>(initialFamily)
  const [query, setQuery] = useState('')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [listening, setListening] = useState(false)
  const [voiceError, setVoiceError] = useState('')
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const composerRef = useRef<HTMLTextAreaElement>(null)

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
    const allowedCategories = family === 'all' ? null : FAMILY_CATEGORIES[family]
    let pool = MISSIONS.filter((mission) => !allowedCategories || allowedCategories.includes(mission.category))

    if (search) {
      pool = pool.filter((mission) => normalize([
        mission.title[lang],
        mission.description[lang],
        mission.result[lang],
        mission.category,
        ...mission.keywords,
      ].join(' ')).includes(search))
    } else if (family === 'all') {
      const bySlug = new Map(pool.map((mission) => [mission.slug, mission]))
      pool = FEATURED_SLUGS.map((slug) => bySlug.get(slug)).filter((mission): mission is Mission => Boolean(mission))
    }

    return pool
  }, [family, lang, query])

  const visibleMissions = filteredMissions.slice(0, visibleCount)

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
    const href = next === 'all' ? '/missions' : `/missions?categorie=${encodeURIComponent(FAMILY_CATEGORIES[next][0])}`
    router.replace(href, { scroll: false })
  }

  function focusComposer() {
    composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    composerRef.current?.focus({ preventScroll: true })
  }

  return (
    <main id="missions-top" className="min-h-screen overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
      <section className="relative border-b border-[#CFC5B5] px-5 pb-7 pt-24 sm:px-8 sm:pt-28 lg:flex lg:min-h-[calc(100svh-76px)] lg:items-center lg:pb-8 lg:pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-36 top-20 size-[32rem] rounded-full bg-[#D10E63]/[.055] blur-3xl" />
        <div className="editorial-shell relative w-full">
          <div className="grid gap-9 lg:grid-cols-[1.08fr_.92fr] lg:items-center lg:gap-14">
            <header>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.eyebrow}</p>
              <h1 aria-label={t.title} className="mt-6 max-w-[760px] font-sf text-[clamp(3.2rem,6.4vw,6.7rem)] font-semibold leading-[.88] tracking-[-.07em]">
                <span className="block">{t.heroA}</span>
                <span className="block">{t.heroB}</span>
                <span className="block text-[#D10E63]">{t.heroC}</span>
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#4E483F]">{withAlmaAvatar(t.lead)}</p>
            </header>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#181615] p-5 text-white shadow-[0_34px_90px_-40px_rgba(24,22,21,.75)] sm:p-6">
              <span aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#F2A4C5] to-transparent" />
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Image src="/alma-avatar.png" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-[#D10E63]/40" />
                  <div><p className="font-sf text-sm font-semibold">Alma</p><p className="mt-0.5 text-[11px] text-[#D5CCC1]">{t.almaRole}</p></div>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F2A4C5]"><span className="size-1.5 rounded-full bg-[#45C578]" />{t.available}</span>
              </div>

              <p className="mt-5 font-sf text-xl font-semibold tracking-[-.025em] sm:text-2xl">{t.composerTitle}</p>
              <div className="mt-4 rounded-[18px] border border-white/10 bg-white/[.055] p-3 focus-within:border-[#D10E63]/70 focus-within:ring-4 focus-within:ring-[#D10E63]/10">
                <textarea
                  ref={composerRef}
                  value={need}
                  onChange={(event) => setNeed(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                      event.preventDefault()
                      handDraftToAlma(need)
                    }
                  }}
                  rows={3}
                  placeholder={t.placeholder}
                  aria-label={t.placeholder}
                  className="min-h-20 w-full resize-none bg-transparent px-1 py-1 text-[15px] leading-6 text-white outline-none placeholder:text-[#91887D]"
                />
                <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="button" onClick={toggleListening} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-[#D8D0C2] hover:border-[#F2A4C5]/60 hover:text-white">
                    {listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-3.5" />}{listening ? t.stop : t.talk}
                  </button>
                  <button type="button" onClick={() => handDraftToAlma(need)} disabled={!need.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white hover:bg-[#E51872] disabled:cursor-not-allowed disabled:opacity-35">
                    {t.continue}<ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {t.starters.map((starter) => <button key={starter} type="button" onClick={() => { setNeed(starter); composerRef.current?.focus() }} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-[#CFC6B8] hover:border-[#F2A4C5]/50 hover:text-white">{starter}</button>)}
              </div>
              <p className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#AFA397]">{voiceError || t.handoff}</p>
            </div>
          </div>

          <div className="mt-8 grid border-y border-[#CFC5B5] sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
            {t.ribbon.map((item, index) => <p key={item} className="flex min-h-14 items-center gap-3 border-b border-[#CFC5B5] py-3 text-xs font-bold last:border-b-0 sm:border-r sm:px-4 sm:[&:nth-child(2)]:border-r-0 lg:min-h-16 lg:border-b-0 lg:[&:nth-child(2)]:border-r lg:first:pl-0 lg:last:border-r-0"><span className="font-mono text-[9px] text-[#B00C54]">0{index + 1}</span>{item}</p>)}
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
        <section id="mission-selection" aria-labelledby="mission-selection-title" className="scroll-mt-24 pt-16 sm:pt-20">
          <div className="grid gap-5 border-b border-[#CFC5B5] pb-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div><p className="font-mono text-[10px] font-black uppercase tracking-[.2em] text-[#B00C54]">{t.catalogKicker}</p><h2 id="mission-selection-title" className="mt-4 max-w-2xl font-sf text-[clamp(2.3rem,4.4vw,4.7rem)] font-semibold leading-[.94] tracking-[-.06em]">{t.catalogTitle}</h2></div>
            <p className="max-w-2xl text-[15px] leading-7 text-[#625B50] lg:justify-self-end">{t.catalogLead}</p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
            <label className="relative block">
              <span className="sr-only">{t.search}</span>
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#6E665A]" />
              <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-4 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {(Object.keys(t.families) as NeedFamily[]).map((key) => <CategoryPill key={key} active={family === key} onClick={() => selectFamily(key)}>{t.families[key]}</CategoryPill>)}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <p className="text-sm font-semibold text-[#4E483F]">{query || family !== 'all' ? t.count(visibleMissions.length, filteredMissions.length) : t.recommended}</p>
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
    <article className="flex min-h-[250px] flex-col rounded-[18px] bg-[#211E1A] p-6 text-[#FAF8F3] shadow-[0_18px_42px_-28px_rgba(28,26,23,.65)]">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#F2A4C5]">{withAlmaAvatar('Alma')}</p>
      <h3 className="mt-4 font-sf text-xl font-semibold leading-snug">{fr ? 'Vous ne trouvez pas exactement votre mission ?' : 'Can’t find exactly the mission you need?'}</h3>
      <p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{withAlmaAvatar(fr ? 'Décrivez le résultat attendu. Alma conserve votre demande et la reprend après votre connexion.' : 'Describe the expected result. Alma saves your request and picks it up after you sign in.')}</p>
      <button type="button" onClick={onClick} className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-bold text-[#F2A4C5]">{fr ? 'Décrire mon besoin' : 'Describe my need'}<ArrowRight className="size-4" /></button>
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
  return <button type="button" onClick={onClick} className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:border-[#D10E63]/45 hover:text-[#D10E63]'}`}>{children}</button>
}

const COPY = {
  fr: {
    eyebrow: 'Missions / Collaborateurs IA',
    title: 'Quel travail voulez-vous confier ?',
    heroA: 'Quel travail', heroB: 'voulez-vous', heroC: 'confier ?',
    lead: 'Décrivez votre besoin à Alma ou choisissez une mission à personnaliser pour votre entreprise.',
    almaRole: 'Coordinatrice IA de missions', available: 'Disponible', composerTitle: 'Décrivez le travail à accomplir.',
    placeholder: 'Décrivez le travail à accomplir…',
    talk: 'Dicter', stop: 'Arrêter', continue: 'Continuer avec cette mission',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    starters: ['Relancer mes factures impayées', 'Traiter mes e-mails entrants', 'Trouver de nouveaux prospects'],
    handoff: 'Votre demande est conservée. Après votre connexion, vous confirmez votre entreprise puis choisissez le prénom de votre Collaborateur IA.',
    ribbon: ['Besoin conservé', 'Entreprise confirmée', 'Prénom choisi', 'Mission personnalisée'],
    catalogTitle: 'Ou choisissez une mission prête à personnaliser',
    catalogKicker: 'Catalogue de missions',
    catalogLead: 'Parcourez des missions concrètes, filtrez-les par besoin et adaptez celle qui correspond à votre entreprise.',
    search: 'Rechercher dans les missions',
    families: { all: 'Recommandées', growth: 'Développer les ventes', customers: 'Servir les clients', company: 'Gérer l’entreprise', teams: 'Organiser les équipes', produce: 'Produire et analyser' },
    recommended: '12 missions recommandées',
    count: (shown: number, total: number) => `${shown} mission${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''} sur ${total}`,
    showMore: 'Afficher 12 missions supplémentaires',
    finalTitle: 'Votre mission n’est pas dans le catalogue ?',
    finalBody: 'Décrivez simplement le travail à accomplir. Alma conserve votre demande et vous accompagne après votre connexion.',
    finalCta: 'Décrire ma mission à Alma',
  },
  en: {
    eyebrow: 'Missions / AI Collaborators',
    title: 'What work would you like to hand over?',
    heroA: 'What work', heroB: 'would you like', heroC: 'to hand over?',
    lead: 'Describe your need to Alma or choose a mission to personalize for your company.',
    almaRole: 'AI mission coordinator', available: 'Available', composerTitle: 'Describe the work to be done.',
    placeholder: 'Describe the work to be done…',
    talk: 'Dictate', stop: 'Stop', continue: 'Continue with this mission',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    starters: ['Chase my unpaid invoices', 'Handle my incoming emails', 'Find new prospects'],
    handoff: 'Your request is saved. After signing in, confirm your company and choose your AI Collaborator’s first name.',
    ribbon: ['Request saved', 'Company confirmed', 'First name chosen', 'Mission personalized'],
    catalogTitle: 'Or choose a mission ready to personalize',
    catalogKicker: 'Mission catalog',
    catalogLead: 'Browse concrete missions, filter them by need and adapt the one that fits your company.',
    search: 'Search missions',
    families: { all: 'Recommended', growth: 'Grow sales', customers: 'Serve customers', company: 'Run the company', teams: 'Organize teams', produce: 'Produce and analyze' },
    recommended: '12 recommended missions',
    count: (shown: number, total: number) => `${shown} of ${total} mission${total > 1 ? 's' : ''} shown`,
    showMore: 'Show 12 more missions',
    finalTitle: 'Is your mission missing from the catalog?',
    finalBody: 'Simply describe the work to be done. Alma saves your request and supports you after sign-in.',
    finalCta: 'Describe my mission to Alma',
  },
} as const
