'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Building2,
  Users,
  Target,
  ClipboardCheck,
  CalendarClock,
  MessagesSquare,
  FileText,
  Check,
  Loader2,
  ShieldCheck,
} from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'

const easing = [0.22, 1, 0.36, 1] as const

type Phase = 'exploration' | 'understanding' | 'missions' | 'profile'
type MissionId = 'qualify' | 'prepare' | 'faq'

const CONTENT = {
  fr: {
    eyebrow: 'Commencez par votre site web',
    title: 'Entrez le nom de domaine de votre entreprise.',
    subtitle: 'À partir de vos informations publiques et de quelques minutes d’échange, Alma construit la mémoire de votre entreprise — partagée par tous vos Collaborateurs IA — puis vous propose les premières missions à confier.',
    fieldLabel: 'Nom de domaine de votre entreprise',
    placeholder: 'votre-entreprise.com',
    cta: 'Analyser mon site',
    analyzing: 'Analyse en cours…',
    invalid: 'Indiquez un nom de domaine valide.',
    trust: 'Alma cite ses sources. Vous choisissez ce qu’elle conserve.',
    altPrompt: 'Vous préférez lui présenter votre activité ?',
    altLink: 'Parlez à Alma',
    replay: 'Revoir la démonstration',
    demoBadge: 'Démonstration',
    almaName: 'Alma',
    almaRole: 'Analyse de votre entreprise',
    exampleTag: 'Exemple',
    exampleDomain: 'www.solvea.fr',
    live: 'Analyse en direct',
    phase: {
      exploration: 'Alma consulte les informations publiques',
      understanding: 'Ce qu’Alma a compris',
      missions: 'Premières missions proposées',
    },
    sourceConsulted: 'Source consultée',
    pages: ['Page d’accueil', 'Solutions', 'Tarifs', 'Contact'],
    infos: [
      { label: 'Activité', value: 'Logiciel de gestion pour les PME', source: 'Page d’accueil' },
      { label: 'Clients', value: 'Entreprises françaises de 10 à 250 personnes', source: 'Page Solutions' },
      { label: 'Acquisition', value: 'Demandes de démonstration', source: 'Pages Tarifs et Contact' },
    ],
    infoValidation: 'Ces informations seront soumises à votre validation.',
    missionPrompt: 'Par quoi souhaitez-vous commencer ?',
    missions: [
      {
        id: 'qualify' as MissionId,
        title: 'Qualifier les demandes de démonstration',
        desc: 'Analyser chaque demande et préparer les informations utiles pour l’équipe commerciale.',
      },
      {
        id: 'prepare' as MissionId,
        title: 'Préparer les rendez-vous commerciaux',
        desc: 'Rassembler le contexte du prospect et produire une fiche de préparation.',
      },
      {
        id: 'faq' as MissionId,
        title: 'Répondre aux questions fréquentes',
        desc: 'Préparer des réponses à partir des informations validées de l’entreprise.',
      },
    ],
    almaPreparing: 'Je prépare le profil métier nécessaire pour cette mission.',
    profileLabel: 'Profil métier',
    skillsLabel: 'Compétences',
    toolsLabel: 'Outils à connecter',
    accessNote: 'Vous validerez les accès avant l’activation.',
    continue: 'Continuer avec Alma',
    profiles: {
      qualify: {
        profil: 'Développement commercial',
        skills: ['Qualification', 'Recherche', 'Synthèse', 'Préparation commerciale'],
        tools: ['Formulaire du site', 'CRM', 'Messagerie'],
      },
      prepare: {
        profil: 'Avant-vente',
        skills: ['Recherche', 'Synthèse', 'Préparation commerciale', 'Organisation'],
        tools: ['CRM', 'Agenda', 'Messagerie'],
      },
      faq: {
        profil: 'Support et connaissance produit',
        skills: ['Rédaction', 'Synthèse', 'Recherche', 'Relation client'],
        tools: ['Base de connaissances', 'Messagerie', 'Formulaire du site'],
      },
    } as Record<MissionId, { profil: string; skills: string[]; tools: string[] }>,
  },
  en: {
    eyebrow: 'Start with your website',
    title: 'Enter your company’s domain name.',
    subtitle: 'From your public information and a few minutes of conversation, Alma builds your company memory — shared by all your AI Collaborators — then suggests the first missions to hand off.',
    fieldLabel: 'Your company’s domain name',
    placeholder: 'your-company.com',
    cta: 'Analyze my site',
    analyzing: 'Analyzing…',
    invalid: 'Enter a valid domain name.',
    trust: 'Alma cites its sources. You choose what it keeps.',
    altPrompt: 'Prefer to walk her through your business?',
    altLink: 'Talk to Alma',
    replay: 'Replay the demo',
    demoBadge: 'Demo',
    almaName: 'Alma',
    almaRole: 'Analyzing your company',
    exampleTag: 'Example',
    exampleDomain: 'www.solvea.fr',
    live: 'Live analysis',
    phase: {
      exploration: 'Alma reviews public information',
      understanding: 'What Alma understood',
      missions: 'First suggested missions',
    },
    sourceConsulted: 'Source reviewed',
    pages: ['Home page', 'Solutions', 'Pricing', 'Contact'],
    infos: [
      { label: 'Business', value: 'Management software for SMBs', source: 'Home page' },
      { label: 'Customers', value: 'French companies of 10 to 250 people', source: 'Solutions page' },
      { label: 'Acquisition', value: 'Demo requests', source: 'Pricing and Contact pages' },
    ],
    infoValidation: 'This information will be submitted for your validation.',
    missionPrompt: 'Where would you like to begin?',
    missions: [
      {
        id: 'qualify' as MissionId,
        title: 'Qualify demo requests',
        desc: 'Review each request and prepare the useful details for the sales team.',
      },
      {
        id: 'prepare' as MissionId,
        title: 'Prepare sales meetings',
        desc: 'Gather the prospect’s context and produce a preparation brief.',
      },
      {
        id: 'faq' as MissionId,
        title: 'Answer frequent questions',
        desc: 'Prepare answers from the company’s validated information.',
      },
    ],
    almaPreparing: 'I’m preparing the business profile this mission needs.',
    profileLabel: 'Business profile',
    skillsLabel: 'Skills',
    toolsLabel: 'Tools to connect',
    accessNote: 'You’ll approve access before activation.',
    continue: 'Continue with Alma',
    profiles: {
      qualify: {
        profil: 'Sales development',
        skills: ['Qualification', 'Research', 'Synthesis', 'Sales preparation'],
        tools: ['Website form', 'CRM', 'Email'],
      },
      prepare: {
        profil: 'Pre-sales',
        skills: ['Research', 'Synthesis', 'Sales preparation', 'Organization'],
        tools: ['CRM', 'Calendar', 'Email'],
      },
      faq: {
        profil: 'Support and product knowledge',
        skills: ['Writing', 'Synthesis', 'Research', 'Customer relations'],
        tools: ['Knowledge base', 'Email', 'Website form'],
      },
    } as Record<MissionId, { profil: string; skills: string[]; tools: string[] }>,
  },
} as const

function normalizeDomain(raw: string) {
  return raw
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/.*$/, '')
    .replace(/\s+/g, '')
}

function isValidDomain(domain: string) {
  return /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(domain)
}

const MISSION_ICONS: Record<MissionId, typeof ClipboardCheck> = {
  qualify: ClipboardCheck,
  prepare: CalendarClock,
  faq: MessagesSquare,
}

const INFO_ICONS = [Building2, Users, Target] as const

export function SectionStartWebsite({ lang = 'fr' }: { lang?: Lang }) {
  const t = CONTENT[lang]
  const router = useRouter()
  const reduceMotion = useReducedMotion()

  const [domain, setDomain] = useState('')
  const [status, setStatus] = useState<'idle' | 'invalid' | 'analyzing'>('idle')

  const [phase, setPhase] = useState<Phase>('exploration')
  const [pageStep, setPageStep] = useState(0)
  const [infoCount, setInfoCount] = useState(0)
  const [missionCount, setMissionCount] = useState(0)
  const [selected, setSelected] = useState<MissionId | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const timers = useRef<number[]>([])
  const started = useRef(false)

  const clearTimers = useCallback(() => {
    timers.current.forEach((id) => clearTimeout(id))
    timers.current = []
  }, [])

  const schedule = useCallback((fn: () => void, delay: number) => {
    timers.current.push(window.setTimeout(fn, delay))
  }, [])

  const showStatic = useCallback(() => {
    clearTimers()
    setPhase('missions')
    setPageStep(4)
    setInfoCount(3)
    setMissionCount(3)
    setSelected(null)
  }, [clearTimers])

  const runSequence = useCallback(() => {
    clearTimers()
    setSelected(null)
    setPhase('exploration')
    setPageStep(0)
    setInfoCount(0)
    setMissionCount(0)

    let time = 500
    for (let i = 0; i < 4; i++) {
      schedule(() => setPageStep(i + 1), time)
      time += 850
    }
    time += 500
    schedule(() => setPhase('understanding'), time)
    time += 350
    for (let i = 0; i < 3; i++) {
      schedule(() => setInfoCount(i + 1), time)
      time += 500
    }
    time += 650
    schedule(() => setPhase('missions'), time)
    time += 350
    for (let i = 0; i < 3; i++) {
      schedule(() => setMissionCount(i + 1), time)
      time += 450
    }
  }, [clearTimers, schedule])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    if (reduceMotion) {
      showStatic()
      started.current = true
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4 && !started.current) {
            started.current = true
            runSequence()
          }
        })
      },
      { threshold: [0.4] },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      clearTimers()
    }
  }, [reduceMotion, runSequence, showStatic, clearTimers])

  const selectMission = useCallback(
    (id: MissionId) => {
      clearTimers()
      setSelected(id)
      setPhase('profile')
    },
    [clearTimers],
  )

  const replay = useCallback(() => {
    if (reduceMotion) {
      showStatic()
    } else {
      runSequence()
    }
  }, [reduceMotion, runSequence, showStatic])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = normalizeDomain(domain)
    if (!isValidDomain(normalized)) {
      setStatus('invalid')
      return
    }
    setStatus('analyzing')
    schedule(() => {
      router.push(`/decouvrir?site=${encodeURIComponent(normalized)}`)
    }, 900)
  }

  const selectedProfile = selected ? t.profiles[selected] : null
  const selectedMission = selected ? t.missions.find((m) => m.id === selected) : undefined

  return (
    <section
      ref={sectionRef}
      id="commencer"
      className="scroll-mt-20 border-t border-[#E3DED5] bg-[#F5F2EB] py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[42fr_58fr] lg:items-center lg:gap-16">
        {/* LEFT ��� message + form */}
        <div className="max-w-xl">
          <Kicker>{t.eyebrow}</Kicker>
          <h2 className="mt-4 text-balance font-sf text-3xl font-bold leading-[1.08] tracking-[-0.035em] text-[#1A1A1A] sm:text-4xl lg:text-[2.6rem]">
            {t.title}
          </h2>
          <p className="mt-4 max-w-md text-pretty text-base leading-relaxed text-[#5F5B57]">{t.subtitle}</p>

          <form onSubmit={onSubmit} noValidate className="mt-8">
            <label htmlFor="company-domain" className="sr-only">
              {t.fieldLabel}
            </label>
            <div className="flex flex-col gap-3">
              <div className="relative flex-1">
                <Globe
                  className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#8A857D]"
                  aria-hidden="true"
                />
                <input
                  id="company-domain"
                  type="text"
                  inputMode="url"
                  autoComplete="url"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value)
                    if (status === 'invalid') setStatus('idle')
                  }}
                  placeholder={t.placeholder}
                  aria-invalid={status === 'invalid'}
                  aria-describedby={status === 'invalid' ? 'domain-error' : undefined}
                  className="h-14 w-full rounded-full border border-[#E3DED5] bg-[#FFFEFC] pl-12 pr-5 text-base text-[#1A1A1A] shadow-sm placeholder:text-[#A8A29A] focus:border-[#D10E63] focus:outline-none focus:ring-2 focus:ring-[#D10E63]/30"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'analyzing'}
                className="group inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-base font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5F2EB] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {status === 'analyzing' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    {t.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
            {status === 'invalid' && (
              <p id="domain-error" role="alert" className="mt-2 pl-1 text-sm font-medium text-[#D10E63]">
                {t.invalid}
              </p>
            )}
          </form>

          <p className="mt-5 flex items-start gap-2 text-sm leading-relaxed text-[#5F5B57]">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#D10E63]" aria-hidden="true" />
            <span>{t.trust}</span>
          </p>

          <p className="mt-8 text-sm text-[#5F5B57]">
            {t.altPrompt}{' '}
            <Link
              href="/decouvrir"
              className="inline-flex items-center gap-1 font-semibold text-[#D10E63] underline-offset-4 hover:underline"
            >
              {t.altLink}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </div>

        {/* RIGHT — demo window */}
        <div className="lg:pl-4">
          <DemoWindow
            t={t}
            reduceMotion={!!reduceMotion}
            phase={phase}
            pageStep={pageStep}
            infoCount={infoCount}
            missionCount={missionCount}
            selected={selected}
            selectedMission={selectedMission}
            selectedProfile={selectedProfile}
            onSelect={selectMission}
            onReplay={replay}
          />
        </div>
      </div>
    </section>
  )
}

type DemoProps = {
  t: (typeof CONTENT)['fr']
  reduceMotion: boolean
  phase: Phase
  pageStep: number
  infoCount: number
  missionCount: number
  selected: MissionId | null
  selectedMission: (typeof CONTENT)['fr']['missions'][number] | undefined
  selectedProfile: { profil: string; skills: string[]; tools: string[] } | null
  onSelect: (id: MissionId) => void
  onReplay: () => void
}

function DemoWindow({
  t,
  reduceMotion,
  phase,
  pageStep,
  infoCount,
  missionCount,
  selected,
  selectedMission,
  selectedProfile,
  onSelect,
  onReplay,
}: DemoProps) {
  const fade = () =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.35, ease: easing },
        }

  const activePhaseTitle =
    phase === 'profile' ? t.phase.missions : t.phase[phase as 'exploration' | 'understanding' | 'missions']

  return (
    <div className="overflow-hidden rounded-[24px] border border-[#E3DED5] bg-[#FFFEFC] shadow-[0_20px_60px_-24px_rgba(26,26,26,0.18)]">
      {/* top bar */}
      <div className="flex items-center gap-3 border-b border-[#EDE8DE] px-5 py-4">
        <span className="relative flex h-9 w-9 shrink-0 items-center justify-center">
          <Image
            src="/alma-avatar.png"
            alt={t.almaName}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
          />
          <span aria-hidden="true" className="absolute inset-0 rounded-full ring-2 ring-inset ring-[#D10E63]/35" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#1A1A1A]">{t.almaName}</p>
          <p className="truncate text-xs text-[#8A857D]">{t.almaRole}</p>
        </div>
        <span className="ml-auto rounded-full border border-[#E3DED5] bg-[#F5F2EB] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[#8A857D]">
          {t.demoBadge}
        </span>
      </div>

      {/* live status line */}
      <div className="flex items-center justify-between gap-3 px-5 pt-4">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#F5F2EB] px-3 py-1 font-mono text-[11px] text-[#5F5B57]">
          <Globe className="h-3.5 w-3.5 text-[#8A857D]" aria-hidden="true" />
          <span className="rounded bg-[#E7E1D6] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] text-[#8A857D]">
            {t.exampleTag}
          </span>
          {t.exampleDomain}
        </span>
        {phase !== 'profile' && (
          <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#8A857D]">
            <span className="relative flex h-2 w-2">
              {!reduceMotion && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63]/50" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#D10E63]" />
            </span>
            {t.live}
          </span>
        )}
      </div>

      {/* aria-live region */}
      <p className="sr-only" aria-live="polite">
        {phase === 'profile' && selectedMission ? `${t.profileLabel}: ${selectedMission.title}` : activePhaseTitle}
      </p>

      <div className="min-h-[420px] px-5 py-5">
        <p className="mb-4 font-sf text-sm font-semibold text-[#1A1A1A]">
          {phase === 'profile' ? t.almaPreparing : activePhaseTitle}
        </p>

        {/* STATE 1 — exploration */}
        {phase === 'exploration' && (
          <ul className="space-y-2.5">
            {t.pages.map((page, i) => {
              const state = i < pageStep ? 'done' : i === pageStep ? 'analyzing' : 'pending'
              if (state === 'pending') return null
              return (
                <motion.li
                  key={page}
                  {...fade()}
                  className={`flex items-center gap-3 rounded-xl border px-3.5 py-3 text-sm transition-colors ${
                    state === 'analyzing' ? 'border-[#D10E63]/30 bg-[#D10E63]/[0.05]' : 'border-[#EDE8DE] bg-[#FFFEFC]'
                  }`}
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {state === 'done' ? (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D10E63]/10">
                        <Check className="h-3 w-3 text-[#D10E63]" aria-hidden="true" />
                      </span>
                    ) : (
                      <Loader2
                        className={`h-4 w-4 text-[#D10E63] ${reduceMotion ? '' : 'animate-spin'}`}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="font-medium text-[#1A1A1A]">{page}</span>
                  {state === 'done' && (
                    <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A857D]">
                      <FileText className="h-3 w-3" aria-hidden="true" />
                      {t.sourceConsulted}
                    </span>
                  )}
                </motion.li>
              )
            })}
          </ul>
        )}

        {/* STATE 2 — understanding */}
        {phase === 'understanding' && (
          <div>
            <ul className="space-y-2.5">
              {t.infos.slice(0, infoCount).map((info, i) => {
                const Icon = INFO_ICONS[i]
                return (
                  <motion.li
                    key={info.label}
                    {...fade()}
                    className="rounded-xl border border-[#EDE8DE] bg-[#FFFEFC] px-3.5 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F5F2EB]">
                        <Icon className="h-3.5 w-3.5 text-[#D10E63]" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A857D]">{info.label}</p>
                        <p className="mt-0.5 text-sm font-medium text-[#1A1A1A]">{info.value}</p>
                        <button
                          type="button"
                          className="mt-1.5 inline-flex items-center gap-1 rounded text-xs text-[#D10E63] underline underline-offset-2 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"
                        >
                          <FileText className="h-3 w-3" aria-hidden="true" />
                          {info.source}
                        </button>
                      </div>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
            {infoCount >= 3 && (
              <motion.p {...fade()} className="mt-4 text-xs text-[#8A857D]">
                {t.infoValidation}
              </motion.p>
            )}
          </div>
        )}

        {/* STATE 3 & 4 — missions / profile */}
        {(phase === 'missions' || phase === 'profile') && (
          <div>
            <div role="radiogroup" aria-label={t.missionPrompt} className="space-y-2.5">
              {t.missions.map((mission, i) => {
                const Icon = MISSION_ICONS[mission.id]
                const isSelected = selected === mission.id
                const dimmed = phase === 'profile' && !isSelected
                const visible = phase === 'profile' || i < missionCount
                if (!visible) return null
                return (
                  <motion.button
                    key={mission.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => onSelect(mission.id)}
                    {...fade()}
                    animate={{ opacity: dimmed ? 0.5 : 1, y: 0 }}
                    className={`flex w-full items-start gap-3 rounded-xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-1 focus-visible:ring-offset-[#FFFEFC] ${
                      isSelected
                        ? 'border-[#D10E63] bg-[#D10E63]/[0.05]'
                        : 'border-[#EDE8DE] bg-[#FFFEFC] hover:border-[#D10E63]/40'
                    }`}
                  >
                    <span
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                        isSelected ? 'bg-[#D10E63]/[0.12]' : 'bg-[#F5F2EB]'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5 text-[#D10E63]" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-[#1A1A1A]">{mission.title}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-[#5F5B57]">{mission.desc}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        isSelected ? 'border-[#D10E63] bg-[#D10E63]' : 'border-[#D2CCC0]'
                      }`}
                    >
                      {isSelected && <Check className="h-2.5 w-2.5 text-white" />}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {phase === 'missions' && missionCount >= 3 && (
              <motion.p {...fade()} className="mt-4 text-sm font-medium text-[#1A1A1A]">
                {t.missionPrompt}
              </motion.p>
            )}

            {/* STATE 4 — profile card */}
            <AnimatePresence>
              {phase === 'profile' && selectedProfile && (
                <motion.div
                  key="profile"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: easing }}
                  className="mt-4 rounded-2xl border border-[#E3DED5] bg-[#F9F6EF] p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A857D]">{t.profileLabel}</p>
                  <p className="mt-1 font-sf text-lg font-bold text-[#1A1A1A]">{selectedProfile.profil}</p>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A857D]">{t.skillsLabel}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProfile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-[#E3DED5] bg-[#FFFEFC] px-2.5 py-1 text-xs font-medium text-[#3F3A33]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[#8A857D]">{t.toolsLabel}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selectedProfile.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center gap-1 rounded-full border border-[#E3DED5] bg-[#FFFEFC] px-2.5 py-1 text-xs font-medium text-[#3F3A33]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <p className="mt-4 text-xs text-[#8A857D]">{t.accessNote}</p>

                  <Link
                    href="/decouvrir"
                    className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F6EF]"
                  >
                    {t.continue}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* footer — replay */}
      <div className="flex justify-end border-t border-[#EDE8DE] px-5 py-3">
        <button
          type="button"
          onClick={onReplay}
          className="rounded text-xs font-medium text-[#8A857D] underline-offset-4 hover:text-[#1A1A1A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63]"
        >
          {t.replay}
        </button>
      </div>
    </div>
  )
}
