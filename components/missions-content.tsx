'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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

type NeedFamily = 'recommended' | 'all' | 'available' | 'growth' | 'customers' | 'company' | 'teams' | 'produce'

const FAMILY_CATEGORIES: Record<Exclude<NeedFamily, 'recommended' | 'all' | 'available'>, string[]> = {
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
  composerRequested = false,
}: {
  returnSlug?: string
  requestedCategory?: string
  requestedFamily?: string
  requestedView?: string
  requestedQuery?: string
  composerRequested?: boolean
}) {
  const { lang } = useLanguage()
  const router = useRouter()
  const t = COPY[lang]
  const initialFamily = useMemo<NeedFamily>(() => {
    if (requestedCategory) return 'all'
    if (requestedFamily && requestedFamily in FAMILY_CATEGORIES) return requestedFamily as NeedFamily
    if (requestedView === 'toutes') return 'all'
    if (requestedView === 'disponibles') return 'available'
    return 'recommended'
  }, [requestedCategory, requestedFamily, requestedView])
  const [need, setNeed] = useState('')
  const [family, setFamily] = useState<NeedFamily>(initialFamily)
  const [query, setQuery] = useState(requestedQuery ?? '')
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
    const allowedCategories = family === 'recommended' || family === 'all' || family === 'available' ? null : FAMILY_CATEGORIES[family]
    let pool = MISSIONS.filter((mission) => {
      if (requestedCategory && mission.category !== requestedCategory) return false
      if (family === 'available' && mission.status !== 'available') return false
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
  }, [family, lang, query, requestedCategory])

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
    const href = next === 'recommended' ? '/missions' : next === 'all' ? '/missions?vue=toutes' : next === 'available' ? '/missions?vue=disponibles' : `/missions?famille=${encodeURIComponent(next)}`
    router.replace(href, { scroll: false })
  }

  function focusComposer() {
    composerRef.current?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    composerRef.current?.focus({ preventScroll: true })
  }

  return (
    <main id="missions-top" className="min-h-screen overflow-hidden bg-[#F3EFE6] text-[#1C1A17]">
      <section className="relative border-b border-[#CFC5B5] px-5 pb-10 pt-28 sm:px-8 sm:pb-12 sm:pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.045] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />
        <div aria-hidden className="pointer-events-none absolute -right-36 top-20 size-[32rem] rounded-full bg-[#D10E63]/[.055] blur-3xl" />
        <div className="editorial-shell relative w-full">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <header>
              <p className="font-mono text-[10px] font-black uppercase tracking-[.22em] text-[#B00C54]">{t.eyebrow}</p>
              <h1 className="mt-6 max-w-[720px] font-sf text-[clamp(2.8rem,5.5vw,5.6rem)] font-semibold leading-[.93] tracking-[-.06em]">
                <span className="block">{t.heroA}</span>
                <span className="block">{t.heroB}</span>
                <span className="block text-[#D10E63]">{t.heroC}</span>
              </h1>
              <p className="mt-7 max-w-xl text-[17px] leading-8 text-[#4E483F]">{withAlmaAvatar(t.lead)}</p>
              <a href="#mission-selection" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#4E483F] underline decoration-[#D10E63]/35 underline-offset-4 hover:text-[#B00C54]">{t.explore}<ArrowRight className="size-4 rotate-90" /></a>
            </header>

            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#181615] p-5 text-white shadow-[0_34px_90px_-40px_rgba(24,22,21,.75)] sm:p-6">
              <span aria-hidden className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#F2A4C5] to-transparent" />
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <Image src="/alma-avatar.png" alt="" width={40} height={40} className="size-10 rounded-full object-cover ring-2 ring-[#D10E63]/40" />
                  <div><p className="font-sf text-sm font-semibold">Alma</p><p className="mt-0.5 text-[11px] text-[#D5CCC1]">{t.almaRole}</p></div>
                </div>
                 <span className="inline-flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-[.14em] text-[#F2A4C5]"><span className="size-1.5 rounded-full bg-[#45C578]" />{t.ready}</span>
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
                  aria-describedby="mission-composer-help"
                  className="min-h-20 w-full resize-none bg-transparent px-1 py-1 text-[15px] leading-6 text-white outline-none placeholder:text-[#91887D]"
                />
                <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
                   <button type="button" aria-pressed={listening} onClick={toggleListening} className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-white/15 px-4 text-xs font-bold text-[#D8D0C2] hover:border-[#F2A4C5]/60 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5]">
                    {listening ? <Square className="size-3.5" fill="currentColor" /> : <Mic className="size-3.5" />}{listening ? t.stop : t.talk}
                  </button>
                   <button type="button" onClick={() => handDraftToAlma(need)} disabled={!need.trim()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-5 text-sm font-bold text-white hover:bg-[#E51872] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F2A4C5] disabled:cursor-not-allowed disabled:opacity-35">
                    {t.continue}<ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {t.starters.map((starter) => <button key={starter} type="button" onClick={() => { setNeed(starter); composerRef.current?.focus() }} className="shrink-0 rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-[#CFC6B8] hover:border-[#F2A4C5]/50 hover:text-white">{starter}</button>)}
              </div>
               <p id="mission-composer-help" role={voiceError ? 'alert' : undefined} className="mt-4 border-t border-white/10 pt-3 text-[11px] leading-5 text-[#AFA397]">{voiceError || t.handoff}</p>
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

          <div className="mt-7 space-y-4">
            <label className="relative block max-w-2xl">
              <span className="sr-only">{t.search}</span>
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-[#6E665A]" />
              <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleCount(PAGE_SIZE) }} placeholder={t.search} className="h-12 w-full rounded-full border border-[#D8D0C2] bg-[#FFFDF9] pl-11 pr-4 text-sm outline-none focus:border-[#D10E63] focus:ring-2 focus:ring-[#D10E63]/15" />
            </label>
            <div className="flex gap-2 overflow-x-auto pb-1 pt-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
               {(Object.keys(t.families) as NeedFamily[]).map((key) => <CategoryPill key={key} active={!requestedCategory && family === key} onClick={() => selectFamily(key)}>{t.families[key]}</CategoryPill>)}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
             <p role="status" aria-live="polite" className="text-sm font-semibold text-[#4E483F]">{family === 'recommended' && !query && !requestedCategory ? t.recommended : t.count(visibleMissions.length, filteredMissions.length)}</p>
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

        <section className="mt-5 grid gap-8 rounded-[32px] border border-[#CFC5B5] bg-[#FAF8F3] p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div><p className="font-mono text-[10px] font-black uppercase tracking-[.18em] text-[#B00C54]">{t.creatorKicker}</p><h2 className="mt-5 max-w-3xl text-[clamp(2rem,4vw,3.8rem)] font-semibold leading-[.98] tracking-[-.05em]">{t.creatorTitle}</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-[#625B50]">{t.creatorBody}</p><ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-[#4E483F]">{t.creatorProofs.map((proof) => <li key={proof} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#D10E63]" />{proof}</li>)}</ul></div>
          <div className="flex flex-col gap-3"><Link href="/co-createur-ia" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#181615] px-6 text-sm font-bold text-white">{t.creatorCta}<ArrowRight className="ml-2 size-4" /></Link><Link href="/academy/formations/co-createur-ia?source=missions-catalog" className="text-center text-sm font-bold text-[#B00C54] underline underline-offset-4">{t.creatorAcademy}</Link></div>
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
       <p className="mt-3 text-sm leading-6 text-[#CFC6B8]">{withAlmaAvatar(fr ? 'Vous avez trouvé une mission proche ? Alma l’adapte à votre contexte, vos outils et vos validations.' : 'Found a close match? Alma adapts it to your context, tools and approvals.')}</p>
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
  return <button type="button" aria-pressed={active} onClick={onClick} className={`inline-flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3.5 text-[12px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] ${active ? 'border-[#D10E63] bg-[#D10E63] text-white' : 'border-[#D8D0C2] bg-[#FFFDF9] text-[#4E483F] hover:border-[#D10E63]/45 hover:text-[#D10E63]'}`}>{children}</button>
}

const COPY = {
  fr: {
    eyebrow: 'Missions / Collaborateurs IA',
    title: 'Quel travail voulez-vous confier ?',
    heroA: 'Quel travail', heroB: 'voulez-vous', heroC: 'confier ?',
    lead: 'Décrivez le résultat attendu à Alma, ou partez d’une mission déjà cadrée. Vous gardez la validation des décisions qui engagent votre entreprise.', explore: 'Explorer les missions',
    almaRole: 'Coordinatrice de missions IA', ready: 'Prête à cadrer', composerTitle: 'Quel résultat attendez-vous ?',
    placeholder: 'Ex. Relancer chaque semaine les factures impayées et me demander validation avant la dernière relance…',
    talk: 'Dicter', stop: 'Arrêter', continue: 'Préparer cette mission',
    voiceUnavailable: 'La dictée vocale n’est pas disponible dans ce navigateur. Poursuivez par écrit.',
    voiceDenied: 'L’accès au microphone a été refusé. Poursuivez par écrit ou modifiez l’autorisation du navigateur.',
    starters: ['Relancer mes factures impayées', 'Traiter mes e-mails entrants', 'Trouver de nouveaux prospects'],
    handoff: 'Entrée pour continuer · Maj + Entrée pour une nouvelle ligne. Votre description reste dans ce navigateur pendant la reprise.',
    ribbon: ['Résultat attendu', 'Sources et outils', 'Validations humaines', 'Collaborateur adapté'],
    catalogTitle: 'Partez d’une mission déjà cadrée',
    catalogKicker: 'Catalogue de missions',
    catalogLead: 'Comparez le résultat attendu, le niveau de préparation et les validations nécessaires. Chaque mission peut ensuite être adaptée à votre entreprise.',
    search: 'Rechercher dans les missions',
    families: { recommended: 'Recommandées', all: 'Toutes', available: 'Disponibles', growth: 'Développer les ventes', customers: 'Servir les clients', company: 'Gérer l’entreprise', teams: 'Organiser les équipes', produce: 'Produire et analyser' },
    recommended: '12 missions recommandées',
    count: (shown: number, total: number) => `${shown} mission${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''} sur ${total}`,
    showMore: 'Afficher 12 missions supplémentaires',
    finalTitle: 'Votre mission n’est pas dans le catalogue ?',
    finalBody: 'Décrivez simplement le travail à accomplir. Alma conserve votre demande et vous accompagne après votre connexion.',
    finalCta: 'Décrire ma mission à Alma',
    creatorKicker: 'Experts et Co-créateurs', creatorTitle: 'Transformez votre savoir-faire en Collaborateur IA capable d’accomplir des missions sous votre contrôle.', creatorBody: 'Formalisez une méthode, testez-la sur des cas réels et publiez-la selon les droits que vous définissez.', creatorProofs: ['Méthode testée sur des cas contrôlés', 'Actions autorisées, validées ou interdites', 'Versionnage et publication selon vos droits'], creatorCta: 'Devenir Co-créateur IA', creatorAcademy: 'Découvrir la formation',
  },
  en: {
    eyebrow: 'Missions / AI Collaborators',
    title: 'What work should an AI Collaborator take on?',
    heroA: 'What work', heroB: 'should an AI Collaborator', heroC: 'take on?',
    lead: 'Describe the outcome to Alma, or start from an already scoped mission. You retain approval over decisions that commit your company.', explore: 'Explore missions',
    almaRole: 'Mission coordinator', ready: 'Ready to scope', composerTitle: 'What outcome do you expect?',
    placeholder: 'E.g. Follow up unpaid invoices every week and ask for approval before the final reminder…',
    talk: 'Dictate', stop: 'Stop', continue: 'Prepare this mission',
    voiceUnavailable: 'Voice dictation is not available in this browser. Continue in writing.',
    voiceDenied: 'Microphone access was denied. Continue in writing or update your browser permission.',
    starters: ['Chase my unpaid invoices', 'Handle my incoming emails', 'Find new prospects'],
    handoff: 'Enter to continue · Shift + Enter for a new line. Your description remains in this browser while you resume.',
    ribbon: ['Expected outcome', 'Sources and tools', 'Human approvals', 'Right Collaborator'],
    catalogTitle: 'Start from an already scoped mission',
    catalogKicker: 'Mission catalog',
    catalogLead: 'Compare the expected outcome, preparation level and required approvals. Every mission can then be adapted to your company.',
    search: 'Search missions',
    families: { recommended: 'Recommended', all: 'All', available: 'Available', growth: 'Grow sales', customers: 'Serve customers', company: 'Run the company', teams: 'Organize teams', produce: 'Produce and analyze' },
    recommended: '12 recommended missions',
    count: (shown: number, total: number) => `${shown} of ${total} mission${total > 1 ? 's' : ''} shown`,
    showMore: 'Show 12 more missions',
    finalTitle: 'Is your mission missing from the catalog?',
    finalBody: 'Simply describe the work to be done. Alma saves your request and supports you after sign-in.',
    finalCta: 'Describe my mission to Alma',
    creatorKicker: 'Experts and Co-creators', creatorTitle: 'Turn your know-how into an AI Collaborator that performs missions under your control.', creatorBody: 'Formalize a method, test it on real cases and publish it under the rights you define.', creatorProofs: ['Method tested on controlled cases', 'Actions allowed, approved or forbidden', 'Versioning and publishing under your rights'], creatorCta: 'Become an AI Co-creator', creatorAcademy: 'Explore the course',
  },
} as const
