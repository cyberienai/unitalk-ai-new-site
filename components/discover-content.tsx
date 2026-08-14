'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, ArrowLeft, Globe, Check, Plus, Sparkles, RefreshCw, Mic } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useMyTeam } from '@/lib/my-team-context'
import { useAlma } from '@/lib/alma-context'
import { UnitalkLogo } from './unitalk-logo'
import { normalizeDomain, guessProfileKey, getProfile, type CompanyProfile } from '@/lib/discover-profiles'
import { ROLE_DETAILS, type RoleDetail } from '@/lib/collaborators-catalog'

type StepId = 1 | 2 | 3 | 4

// Clean, standalone role label (some catalog roles use an inline label like
// "Assistante de <nom>" that reads awkwardly on its own).
const ROLE_LABEL_OVERRIDE: Record<string, { fr: string; en: string }> = {
  emma: { fr: 'Assistante de direction', en: 'Executive Assistant' },
}

function displayRole(role: RoleDetail, lang: 'fr' | 'en'): string {
  return ROLE_LABEL_OVERRIDE[role.slug]?.[lang] ?? role.role[lang]
}

const STEPS: { id: StepId; label: { fr: string; en: string } }[] = [
  { id: 1, label: { fr: 'Entreprise', en: 'Company' } },
  { id: 2, label: { fr: 'Analyse', en: 'Analysis' } },
  { id: 3, label: { fr: 'Organisation', en: 'Organization' } },
  { id: 4, label: { fr: 'Collaborateurs IA', en: 'AI Collaborators' } },
]

const T = {
  fr: {
    back: 'Retour au site',
    kicker: 'Découvrir mon organisation',
    title: 'Quel est le site de votre entreprise ?',
    subtitle:
      'À partir de vos informations publiques et de votre échange, Alma construit la mémoire de votre entreprise, puis vous propose une organisation de Collaborateurs IA adaptée.',
    placeholder: 'votre-entreprise.com',
    cta: 'Lancer l’analyse',
    // Voice panel
    voiceRole: 'Agent vocal',
    voiceOnline: 'En ligne',
    voiceTitle: 'Vous préférez en parler ?',
    voiceBody:
      'De vive voix, Alma découvre votre entreprise et construit le contexte dont vos Collaborateurs IA ont besoin pour travailler.',
    voiceCta: 'Parler à Alma',
    invalid: 'Entrez un domaine valide, par exemple unitalk.ai',
    recognized: 'Domaine reconnu',
    disclaimer:
      'Aperçu de démonstration. Unitalk ne consulte pas encore votre site : nous partons de votre secteur pour proposer une organisation type, à confirmer.',
    // step 2
    analyzing: 'Analyse en cours',
    skip: 'Passer',
    steps2: [
      'Lecture du domaine',
      'Identification du secteur d’activité',
      'Cartographie des fonctions clés',
      'Sélection des Collaborateurs IA',
      'Construction de votre organisation',
    ],
    // step 3
    proposalFor: 'Proposition d’organisation pour',
    toConfirm: 'Proposition à confirmer',
    company: 'Votre entreprise',
    orgIntro:
      'Voici une structure type pour votre activité. Chaque fonction peut être portée par un Collaborateur IA.',
    seeCollaborators: 'Voir les Collaborateurs IA',
    // step 4
    recoTitle: 'Vos Collaborateurs IA recommandés',
    recoIntro:
      'Sélectionnez ceux que vous voulez ajouter. Vous pourrez tout ajuster ensuite.',
    add: 'Ajouter à mon équipe',
    added: 'Ajouté',
    createOrg: 'Créer cette organisation',
    restart: 'Recommencer',
    reco: 'Recommandé',
    finalNote:
      'Proposition de démonstration. Rien n’est créé tant que vous ne lancez pas votre essai — vous gardez la main sur chaque choix.',
  },
  en: {
    back: 'Back to site',
    kicker: 'Discover my organization',
    title: 'What is your company’s website?',
    subtitle:
      'From your public information and your conversation, Alma builds your company context, then proposes a tailored organization of AI Collaborators.',
    placeholder: 'your-company.com',
    cta: 'Start the analysis',
    // Voice panel
    voiceRole: 'Voice agent',
    voiceOnline: 'Online',
    voiceTitle: 'Prefer to talk it through?',
    voiceBody:
      'Out loud, Alma gets to know your company and builds the context your AI Collaborators need to work.',
    voiceCta: 'Talk to Alma',
    invalid: 'Enter a valid domain, for example unitalk.ai',
    recognized: 'Domain recognized',
    disclaimer:
      'Demo preview. Unitalk does not browse your site yet: we start from your sector to propose a typical organization, to confirm.',
    analyzing: 'Analyzing',
    skip: 'Skip',
    steps2: [
      'Reading the domain',
      'Identifying the industry',
      'Mapping key functions',
      'Selecting AI Collaborators',
      'Building your organization',
    ],
    proposalFor: 'Proposed organization for',
    toConfirm: 'Proposal to confirm',
    company: 'Your company',
    orgIntro:
      'Here is a typical structure for your activity. Each function can be carried by an AI Collaborator.',
    seeCollaborators: 'See the AI Collaborators',
    recoTitle: 'Your recommended AI Collaborators',
    recoIntro: 'Select the ones you want to add. You can adjust everything afterwards.',
    add: 'Add to my team',
    added: 'Added',
    createOrg: 'Create this organization',
    restart: 'Start over',
    reco: 'Recommended',
    finalNote:
      'Demo proposal. Nothing is created until you start your trial — you stay in control of every choice.',
  },
}

export function DiscoverContent() {
  const { lang } = useLanguage()
  const t = T[lang]
  const team = useMyTeam()
  const { openAlma } = useAlma()
  const reduceMotion = useReducedMotion()

  const [step, setStep] = useState<StepId>(1)
  const [domainInput, setDomainInput] = useState('')
  const [domain, setDomain] = useState('')
  const [profile, setProfile] = useState<CompanyProfile>(getProfile('default'))
  const [error, setError] = useState(false)

  const livePreview = normalizeDomain(domainInput)

  // Prefill + auto-start when arriving from the homepage with ?domain=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('domain')
    if (!raw) return
    const normalized = normalizeDomain(raw)
    if (!normalized) return
    setDomainInput(normalized)
    setDomain(normalized)
    setProfile(getProfile(guessProfileKey(normalized)))
    setStep(2)
  }, [])

  const submitDomain = (e: React.FormEvent) => {
    e.preventDefault()
    const normalized = normalizeDomain(domainInput)
    if (!normalized) {
      setError(true)
      return
    }
    setError(false)
    setDomain(normalized)
    setProfile(getProfile(guessProfileKey(normalized)))
    setStep(2)
  }

  const restart = () => {
    setStep(1)
    setDomainInput('')
    setDomain('')
    setError(false)
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      {/* Minimal header */}
      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5" aria-label="Unitalk">
          <UnitalkLogo size={22} />
          <span className="font-inter text-sm font-semibold">Unitalk</span>
        </a>
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E665A] transition-colors hover:text-[#1C1A17]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          {t.back}
        </a>
      </header>

      {/* Progress */}
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <ol className="flex items-center gap-2 sm:gap-3">
          {STEPS.map((s, i) => {
            const active = s.id === step
            const done = s.id < step
            return (
              <li key={s.id} className="flex flex-1 items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold transition-colors ${
                      active
                        ? 'bg-[#D10E63] text-[#FBF9F3]'
                        : done
                          ? 'bg-[#1C1A17] text-[#FBF9F3]'
                          : 'bg-[#E7E0D2] text-[#6E665A]'
                    }`}
                  >
                    {done ? <Check className="h-3.5 w-3.5" /> : s.id}
                  </span>
                  <span
                    className={`hidden text-xs font-medium sm:inline ${active ? 'text-[#1C1A17]' : 'text-[#6E665A]'}`}
                  >
                    {s.label[lang]}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <span className={`h-px flex-1 ${done ? 'bg-[#1C1A17]' : 'bg-[#D8D0C2]'}`} />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      {/* Stage */}
      <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8 sm:py-14">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid w-full max-w-5xl items-stretch gap-6 lg:grid-cols-2"
            >
              {/* Left — action */}
              <div className="flex flex-col justify-center text-left">
                <p className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D10E63]">
                  {t.kicker}
                </p>
                <h1 className="text-balance font-sf text-[clamp(1.8rem,3.4vw,2.7rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                  {t.title}
                </h1>
                <p className="mt-4 max-w-md text-pretty text-sm leading-6 text-[#5F594F] sm:text-base">
                  {t.subtitle}
                </p>

                <form onSubmit={submitDomain} className="mt-8 flex max-w-md flex-col gap-3">
                  <div className="flex items-center overflow-hidden rounded-full border border-[#D8D0C2] bg-[#FBF9F3] focus-within:border-[#D10E63] focus-within:ring-2 focus-within:ring-[#D10E63]/20">
                    <span className="pl-5 pr-1 text-sm text-[#9A9284]">https://</span>
                    <input
                      value={domainInput}
                      onChange={(e) => {
                        setDomainInput(e.target.value)
                        if (error) setError(false)
                      }}
                      placeholder={t.placeholder}
                      className="min-w-0 flex-1 bg-transparent py-3.5 text-sm text-[#1C1A17] outline-none placeholder:text-[#9A9284]"
                      autoFocus
                      aria-label={t.placeholder}
                    />
                  </div>

                  {/* Live mini-preview */}
                  <AnimatePresence>
                    {livePreview && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-3 text-left">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EFE7D8] text-[#6E665A]">
                            <Globe className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-[#1C1A17]">{livePreview}</p>
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#0E8A5F]">
                              <Check className="h-3 w-3" />
                              {t.recognized}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {error && <p className="text-xs font-medium text-[#D10E63]">{t.invalid}</p>}
                  <button
                    type="submit"
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2"
                  >
                    {t.cta}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>

                <p className="mt-6 max-w-md text-[11px] leading-5 text-[#9A9284]">{t.disclaimer}</p>
              </div>

              {/* Right — Alma as a voice agent */}
              <div className="relative flex min-h-[22rem] flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#17130F] px-6 py-10 text-center">
                {/* magenta ambient glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-80"
                  style={{ background: 'radial-gradient(120% 90% at 50% 0%, rgba(209,14,99,0.22), transparent 60%)' }}
                />

                {/* Avatar with pulsing voice rings */}
                <div className="relative flex h-36 w-36 items-center justify-center">
                  {!reduceMotion &&
                    [0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-[#F0658F]/40"
                        initial={{ scale: 0.7, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut', delay: i * 0.8 }}
                      />
                    ))}
                  <span className="absolute inset-3 rounded-full bg-[#D10E63]/25 blur-md" />
                  <img
                    src="/alma-avatar.png"
                    alt="Alma"
                    className="relative h-24 w-24 rounded-full object-cover ring-2 ring-[#F0658F]/50"
                  />
                </div>

                {/* Voice equalizer */}
                <div className="mt-6 flex h-6 items-end gap-1" aria-hidden="true">
                  {[0.5, 0.9, 0.35, 0.7, 1, 0.5, 0.8, 0.4].map((h, i) => (
                    <motion.span
                      key={i}
                      className="w-1 rounded-full bg-[#F0658F]"
                      style={{ height: `${h * 100}%` }}
                      animate={reduceMotion ? undefined : { scaleY: [0.4, 1, 0.55, 0.9, 0.4] }}
                      transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                    />
                  ))}
                </div>

                <div className="mt-5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#E7C9D4]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#5FE38F] opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5FE38F]" />
                  </span>
                  {t.voiceRole} · {t.voiceOnline}
                </div>

                <h2 className="mt-4 font-sf text-xl font-semibold tracking-tight text-[#FBF9F3]">
                  {t.voiceTitle}
                </h2>
                <p className="mt-2 max-w-xs text-pretty text-sm leading-6 text-[#C9C0B4]">
                  {t.voiceBody}
                </p>

                <button
                  type="button"
                  onClick={openAlma}
                  className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#FBF9F3] px-6 text-sm font-bold text-[#17130F] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0658F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17130F]"
                >
                  <Mic className="h-4 w-4" />
                  {t.voiceCta}
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <AnalysisSequence
              key="step2"
              lang={lang}
              domain={domain}
              labels={t.steps2}
              analyzingLabel={t.analyzing}
              skipLabel={t.skip}
              onDone={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D10E63]/25 bg-[#D10E63]/[0.06] px-3 py-1 text-[11px] font-semibold text-[#D10E63]">
                  <Sparkles className="h-3 w-3" />
                  {t.toConfirm}
                </span>
                <h2 className="mt-4 text-balance font-sf text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em]">
                  {t.proposalFor} <span className="text-[#D10E63]">{domain}</span>
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-6 text-[#5F594F]">{t.orgIntro}</p>
              </div>

              <OrgChart profile={profile} domain={domain} lang={lang} companyLabel={t.company} />

              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setStep(4)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-6 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                >
                  {t.seeCollaborators}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-4xl"
            >
              <div className="text-center">
                <h2 className="text-balance font-sf text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-0.02em]">
                  {t.recoTitle}
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-pretty text-sm leading-6 text-[#5F594F]">{t.recoIntro}</p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {profile.functions.map((fn, i) => {
                  const role = ROLE_DETAILS[fn.recommended]
                  if (!role) return null
                  const inTeam = team.has(role.slug)
                  return (
                    <motion.div
                      key={fn.key}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      className="flex flex-col rounded-2xl border border-[#D8D0C2] bg-[#FBF9F3] p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={role.avatar || '/placeholder.svg'}
                            alt=""
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#FBF9F3] bg-[#D10E63]" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-[#1C1A17]">{role.name}</p>
                          <p className="truncate text-xs text-[#D10E63]">{displayRole(role, lang)}</p>
                        </div>
                      </div>
                      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9A9284]">
                        {fn.label[lang]}
                      </p>
                      <button
                        onClick={() => team.toggle({ slug: role.slug, name: role.name, role: displayRole(role, lang), avatar: role.avatar })}
                        className={`mt-3 inline-flex min-h-10 items-center justify-center gap-1.5 rounded-full px-4 text-xs font-bold transition-colors ${
                          inTeam
                            ? 'bg-[#1C1A17] text-[#FBF9F3]'
                            : 'border border-[#D10E63] text-[#D10E63] hover:bg-[#D10E63] hover:text-[#FBF9F3]'
                        }`}
                      >
                        {inTeam ? (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            {t.added}
                          </>
                        ) : (
                          <>
                            <Plus className="h-3.5 w-3.5" />
                            {t.add}
                          </>
                        )}
                      </button>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mt-10 flex flex-col items-center gap-3">
                <a
                  href={`/decouvrir?domain=${encodeURIComponent(domain)}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#D10E63] px-8 text-sm font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5"
                >
                  {t.createOrg}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <button
                  onClick={restart}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E665A] transition-colors hover:text-[#1C1A17]"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  {t.restart}
                </button>
                <p className="mx-auto mt-2 max-w-md text-center text-[11px] leading-5 text-[#9A9284]">{t.finalNote}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

/* ---------- Step 2: choreographed analysis ---------- */

function AnalysisSequence({
  lang,
  domain,
  labels,
  analyzingLabel,
  skipLabel,
  onDone,
}: {
  lang: 'fr' | 'en'
  domain: string
  labels: string[]
  analyzingLabel: string
  skipLabel: string
  onDone: () => void
}) {
  const [current, setCurrent] = useState(0)
  const doneRef = useRef(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    labels.forEach((_, i) => {
      timers.push(setTimeout(() => setCurrent(i + 1), (i + 1) * 1100))
    })
    timers.push(
      setTimeout(() => {
        if (!doneRef.current) {
          doneRef.current = true
          onDone()
        }
      }, labels.length * 1100 + 700),
    )
    return () => timers.forEach(clearTimeout)
  }, [labels, onDone])

  const pct = Math.round((current / labels.length) * 100)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md"
    >
      <div className="mb-6 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1C1A17]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#D10E63]" />
          {analyzingLabel} · <span className="text-[#D10E63]">{domain}</span>
        </span>
        <span className="font-mono text-xs text-[#9A9284]">{pct}%</span>
      </div>

      {/* progress bar */}
      <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-[#E7E0D2]">
        <motion.div
          className="h-full rounded-full bg-[#D10E63]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      <ul className="space-y-3">
        {labels.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li
              key={label}
              className={`flex items-center gap-3 text-sm transition-colors ${
                done ? 'text-[#1C1A17]' : active ? 'text-[#1C1A17]' : 'text-[#B8B0A2]'
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                  done ? 'bg-[#0E8A5F] text-[#FBF9F3]' : active ? 'bg-[#D10E63]/15' : 'bg-[#E7E0D2]'
                }`}
              >
                {done ? (
                  <Check className="h-3 w-3" />
                ) : active ? (
                  <span className="h-2 w-2 animate-ping rounded-full bg-[#D10E63]" />
                ) : null}
              </span>
              {label}
              {i === 0 && <span className="text-[#9A9284]">{domain}</span>}
            </li>
          )
        })}
      </ul>

      <div className="mt-8 text-center">
        <button
          onClick={() => {
            if (!doneRef.current) {
              doneRef.current = true
              onDone()
            }
          }}
          className="text-xs font-medium text-[#6E665A] underline underline-offset-2 transition-colors hover:text-[#1C1A17]"
        >
          {skipLabel}
        </button>
      </div>
    </motion.div>
  )
}

/* ---------- Step 3: org chart ---------- */

function OrgChart({
  profile,
  domain,
  lang,
  companyLabel,
}: {
  profile: CompanyProfile
  domain: string
  lang: 'fr' | 'en'
  companyLabel: string
}) {
  return (
    <div className="mt-10">
      {/* Company node */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="premium-shadow flex items-center gap-3 rounded-2xl border border-[#D8D0C2] bg-[#1C1A17] px-5 py-3 text-[#FBF9F3]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FBF9F3]/10">
            <Globe className="h-4 w-4" />
          </span>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#FBF9F3]/60">{companyLabel}</p>
            <p className="text-sm font-semibold">{domain}</p>
          </div>
        </motion.div>
      </div>

      {/* Vertical connector */}
      <div className="mx-auto h-8 w-px bg-[#D8D0C2]" />

      {/* Function → AI pairs */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {profile.functions.map((fn, i) => {
          const role = ROLE_DETAILS[fn.recommended]
          return (
            <motion.div
              key={fn.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              <div className="rounded-full border border-[#D8D0C2] bg-[#FBF9F3] px-4 py-1.5 text-xs font-semibold text-[#1C1A17]">
                {fn.label[lang]}
              </div>
              <div className="h-5 w-px bg-[#D8D0C2]" />
              {role && (
                <div className="premium-shadow flex w-full items-center gap-3 rounded-2xl border border-[#F0C9DC] bg-[#FBF3F7] px-4 py-3">
                  <div className="relative shrink-0">
                    <img src={role.avatar || '/placeholder.svg'} alt="" className="h-10 w-10 rounded-full object-cover" />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#D10E63] opacity-60 motion-reduce:hidden" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full border-2 border-[#FBF3F7] bg-[#D10E63]" />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#1C1A17]">{role.name}</p>
                    <p className="truncate text-xs text-[#D10E63]">{displayRole(role, lang)}</p>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
