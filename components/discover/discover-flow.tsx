'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { LanguageToggle } from '@/components/language-toggle'
import { FlowStepper } from './flow-stepper'
import { ScreenAccount, type DiscoverContext, type SelectedMission } from './screen-account'
import { ScreenContext } from './screen-context'
import { ScreenCollaborateur } from './screen-collaborateur'
import type { OnboardingState, OnboardingStep } from './types'
import { MISSIONS } from '@/lib/missions-catalog'
import { actionDescription, shortCategoryLabel } from '@/components/missions/store-card'
import type { MockSession } from '@/lib/mock-auth'
import { parseDiscoverSource } from '@/lib/discover-entry'
import { emailDomain, isProfessionalEmail } from '@/lib/professional-email'
import type { PurchaseDraft } from '@/lib/purchase-draft'
import { ROLE_DETAILS } from '@/lib/collaborators-catalog'
import { buildInitialOnboardingState, collaboratorFromDraft, missionFromDraft } from '@/lib/discover-onboarding-state'
import { AlmaMissionComposer } from '@/components/alma-mission-composer'
import { AlmaHead } from './context-column'
import { getStoreItemBySlug } from '@/lib/store-catalog'
import { getAiModelByKey } from '@/lib/ai-models-catalog'

function normalizeDomain(v: string | null) { return v?.trim().replace(/^https?:\/\//i, '').replace(/\/.*$/, '').toLowerCase() ?? '' }

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

export function DiscoverFlow({ initialSession, initialPurchaseDraft }: { initialSession?: MockSession | null; initialPurchaseDraft?: PurchaseDraft | null }) {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const missionSlug = searchParams.get('mission')
  const draftId = searchParams.get('draft')
  const requestedCollaborator = searchParams.get('collaborateur')
  const requestedCollaboratorDetail = requestedCollaborator ? ROLE_DETAILS[requestedCollaborator] : undefined
  const requestedStoreItem = useMemo(() => {
    const slug = searchParams.get('store')
    return slug ? getStoreItemBySlug(slug) : undefined
  }, [searchParams])
  const requestedModel = useMemo(() => {
    const key = searchParams.get('model')
    return key ? getAiModelByKey(key) : undefined
  }, [searchParams])
  const legacyQuery = searchParams.get('q')?.trim() ?? ''
  const source = parseDiscoverSource(searchParams.get('source'))
  const chooseMissionAfterAuth = searchParams.get('next') === 'missions'
  const requestedDomain = normalizeDomain(searchParams.get('domain'))
  const catalogMission = useMemo(() => MISSIONS.find(m => m.slug === missionSlug), [missionSlug])
  const selectedCollaboratorDetail = requestedCollaboratorDetail ?? (catalogMission ? ROLE_DETAILS[catalogMission.collaboratorSlug] : undefined)
  const [draftText, setDraftText] = useState('')
  const draftCollaborator = useMemo(() => collaboratorFromDraft(draftText || legacyQuery), [draftText, legacyQuery])

  const [state, setState] = useState<OnboardingState>(() => {
    return buildInitialOnboardingState({
      lang,
      initialSession,
      initialPurchaseDraft,
      requestedDomain,
      requestedCollaborator: selectedCollaboratorDetail,
      requestedStoreItem,
      requestedModel,
      catalogMission,
      hasExplicitDraft: Boolean(draftId || legacyQuery || requestedStoreItem || requestedModel),
    })
  })
  const [step, setStep] = useState<OnboardingStep>('entreprise')
  const [visualStep, setVisualStep] = useState<OnboardingStep>('entreprise')
  const [workspaceConfirmation, setWorkspaceConfirmation] = useState(false)

  useEffect(() => { if (!draftId) return; try { const raw = localStorage.getItem(`unitalk_mission_${draftId}`); if (raw) { const text = (JSON.parse(raw) as { text?: string }).text?.trim() ?? ''; window.setTimeout(() => setDraftText(text), 0) } } catch {} }, [draftId])

  const context: DiscoverContext = requestedStoreItem
    ? { kind: 'store-item', item: requestedStoreItem, source }
    : requestedModel
    ? { kind: 'model', model: requestedModel, source }
    : source === 'paul-graham'
    ? { kind: 'draft', draftId: draftId ?? undefined, draft: { title: draftText || legacyQuery, description: '', category: lang === 'fr' ? 'Mission sur mesure' : 'Custom mission' }, source }
    : missionSlug && !catalogMission ? { kind: 'invalid', requestedSlug: missionSlug, source }
    : catalogMission ? { kind: 'mission', mission: { slug: catalogMission.slug, title: catalogMission.title[lang], description: actionDescription(catalogMission, lang), category: shortCategoryLabel(catalogMission.category, lang) }, source }
    : draftText || legacyQuery ? { kind: 'draft', draftId: draftId ?? undefined, draft: { title: draftText || legacyQuery, description: '', category: lang === 'fr' ? 'Mission sur mesure' : 'Custom mission' }, source }
    : { kind: 'empty', source }

  const selectedMission: SelectedMission | null = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : null
  const flowSteps: OnboardingStep[] = ['mission', 'entreprise', 'collaborateur', 'workspace']
  const screenSteps: OnboardingStep[] = ['entreprise', 'collaborateur']

  useEffect(() => {
    if (context.kind !== 'draft' || !selectedMission?.title) return
    const preparedMission = missionFromDraft(selectedMission.title, lang)
    const id = window.setTimeout(() => setState(current => current.mission.title === preparedMission.title
      ? current
      : {
          ...current,
          mission: preparedMission,
          missionDefined: false,
          profile: requestedCollaboratorDetail?.role ?? draftCollaborator?.role ?? current.profile,
          collaboratorName: requestedCollaboratorDetail?.name ?? draftCollaborator?.name ?? current.collaboratorName,
          collaboratorTemplateSlug: requestedCollaboratorDetail?.slug ?? draftCollaborator?.slug ?? current.collaboratorTemplateSlug,
        }), 0)
    return () => window.clearTimeout(id)
  }, [context.kind, draftCollaborator, lang, requestedCollaboratorDetail, selectedMission?.title])

  function goTo(next: OnboardingStep) {
    if (next === 'workspace') return
    if (next === 'collaborateur') setWorkspaceConfirmation(false)
    setStep(next)
    setVisualStep(next)
  }
  const stepIndex = screenSteps.indexOf(step)
  const back = stepIndex > 0 ? screenSteps[stepIndex - 1] : null

  const anim = reduce ? {} : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.25 } }

  if (!state.authenticated && chooseMissionAfterAuth && context.kind === 'empty') return (
    <MissionChoice lang={lang} onChoose={(value) => {
      const clean = value.trim()
      if (!clean) return
      const nextDraftId = `draft_${crypto.randomUUID()}`
      try { localStorage.setItem(`unitalk_mission_${nextDraftId}`, JSON.stringify({ text: clean, createdAt: Date.now() })) } catch {}
      router.replace(`/decouvrir?draft=${encodeURIComponent(nextDraftId)}&source=nav`)
    }} />
  )

  // — Invalid mission —
  if (context.kind === 'invalid') return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <header className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] px-5 py-4 sm:px-8">
        <a href="/" className="flex items-center gap-2.5"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a><LanguageToggle />
      </header>
      <section className="mx-auto flex flex-1 flex-col items-center justify-center px-5 text-center">
        <h1 className="text-[36px] font-bold tracking-[-0.04em] sm:text-[48px]">{lang === 'fr' ? 'Cette mission n\'est plus disponible.' : 'This mission is no longer available.'}</h1>
        <p className="mt-4 text-[#4E483F]">{lang === 'fr' ? 'Vous pouvez en choisir une autre ou poursuivre avec Alma.' : 'Choose another mission or continue with Alma.'}</p>
        <div className="mt-7 flex gap-4"><a href="/missions" className="text-sm font-bold text-[#B00C54] underline">← {lang === 'fr' ? 'Explorer les missions' : 'Explore missions'}</a></div>
      </section>
    </main>
  )

  // — Not authenticated —
  if (!state.authenticated) return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <ScreenAccount lang={lang} context={context} collaborator={selectedCollaboratorDetail} languageToggle={<LanguageToggle />}
        onAuthenticated={({ provider, email, firstName, lastName }) => {
          const domain = email && isProfessionalEmail(email) ? emailDomain(email) : undefined
          setState(s => ({ ...s, authenticated: true, missionDefined: context.kind === 'mission', firstName: firstName?.trim() ?? '', lastName: lastName?.trim() ?? '', company: domain ? s.company.map(f => f.key === 'domain' ? { ...f, value: domain, uncertain: false } : f.key === 'name' ? { ...f, value: domain.split('.')[0].charAt(0).toUpperCase() + domain.split('.')[0].slice(1), uncertain: false } : f) : s.company }))
          const collaboratorQuery = requestedCollaborator ? `&collaborateur=${encodeURIComponent(requestedCollaborator)}` : ''
          const sourceQuery = `&source=${encodeURIComponent(source)}`
           if (requestedStoreItem) router.replace(`/decouvrir?store=${encodeURIComponent(requestedStoreItem.slug)}${sourceQuery}`)
           else if (requestedModel) router.replace(`/decouvrir?model=${encodeURIComponent(requestedModel.key)}${sourceQuery}`)
           else if (missionSlug) router.replace(`/decouvrir?mission=${encodeURIComponent(missionSlug)}${collaboratorQuery}${sourceQuery}`)
          else if (draftId) router.replace(`/decouvrir?draft=${encodeURIComponent(draftId)}${collaboratorQuery}${sourceQuery}`)
        }}
      />
    </main>
  )

  // — Fast flow: company → collaborator. Detailed mission scoping happens in the Workspace. —
  return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5"><UnitalkLogo size={22} /><span className="text-sm font-semibold">Unitalk</span></a>
         <div className="hidden flex-1 justify-center md:flex"><FlowStepper current={visualStep} lang={lang} steps={flowSteps} lockedSteps={['mission']} onStepClick={goTo} /></div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-4"><LanguageToggle /></div>
      </header>
       <div className="px-5 py-3 md:hidden"><FlowStepper current={visualStep} lang={lang} steps={flowSteps} lockedSteps={['mission']} onStepClick={goTo} /></div>
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-4 sm:px-8">
        {back && <button type="button" onClick={() => goTo(back)} className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6E665A] hover:text-[#1C1A17] md:hidden"><ArrowLeft className="h-3.5 w-3.5" />{lang === 'fr' ? 'Précédent' : 'Back'}</button>}
        <AnimatePresence mode="wait">
          <motion.div key={step} {...anim}>
            {step === 'entreprise' && <ScreenContext lang={lang} firstName={state.firstName} lastName={state.lastName} company={state.company} onChange={c => setState(s => ({ ...s, company: c }))} onIdentityChange={i => setState(s => ({ ...s, ...i }))} onContinue={() => goTo('collaborateur')} />}
            {step === 'collaborateur' && <ScreenCollaborateur lang={lang} company={state.company} mission={state.mission} profile={state.profile} collaboratorTemplateSlug={state.collaboratorTemplateSlug} name={state.collaboratorName} placement={state.organizationalPlacement} confirming={workspaceConfirmation} onName={n => setState(s => ({ ...s, collaboratorName: n }))} onCreated={n => setState(s => ({ ...s, collaboratorName: n }))} onConfirmationChange={confirming => { setWorkspaceConfirmation(confirming); setVisualStep(confirming ? 'workspace' : 'collaborateur') }} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}

function MissionChoice({ lang, onChoose }: { lang: 'fr' | 'en'; onChoose: (value: string) => void }) {
  const [value, setValue] = useState('')
  const [voiceSupported, setVoiceSupported] = useState(false)
  const [listening, setListening] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null)
  const copy = lang === 'fr' ? {
    kicker: 'Première étape · Mission',
    title: 'Quel travail voulez-vous faire avancer ?',
    body: 'Choisissez un exemple ou décrivez simplement le résultat attendu. Vous préciserez les détails dans votre Workspace.',
    role: 'Collaboratrice IA · Coordinatrice de missions chez Unitalk',
    prompt: 'Quel travail voulez-vous confier à votre Collaborateur IA ?',
    placeholder: 'Décrivez simplement le résultat attendu…',
    submit: 'Choisir cette mission',
    voiceStart: 'Commencer à parler', voiceStop: 'Terminer', listening: 'Alma vous écoute…', explore: 'Explorer les missions',
    examples: ['Qualifier mes prospects', 'Répondre à mes clients', 'Préparer mes factures', 'Construire mon calendrier éditorial', 'Organiser l’intégration d’un nouveau salarié'],
  } : {
    kicker: 'First step · Mission',
    title: 'What work do you want to move forward?',
    body: 'Choose an example or simply describe the expected outcome. You will refine the details in your Workspace.',
    role: 'AI Collaborator · Mission coordinator at Unitalk',
    prompt: 'What work would you like to assign to your AI Collaborator?',
    placeholder: 'Simply describe the expected outcome…',
    submit: 'Choose this mission',
    voiceStart: 'Start talking', voiceStop: 'Finish', listening: 'Alma is listening…', explore: 'Explore missions',
    examples: ['Qualify my prospects', 'Reply to my customers', 'Prepare my invoices', 'Build my editorial calendar', 'Organize a new employee’s onboarding'],
  }

  useLayoutEffect(() => {
    if (!window.matchMedia('(min-width: 1024px)').matches) return
    textareaRef.current?.focus({ preventScroll: true })
  }, [])

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
      setValue(transcript.trim())
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    const id = window.setTimeout(() => setVoiceSupported(true), 0)
    return () => { window.clearTimeout(id); recognition.abort(); recognitionRef.current = null }
  }, [lang])

  function toggleListening() {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) { recognition.stop(); return }
    setValue('')
    setListening(true)
    try { recognition.start() } catch { setListening(false) }
  }

  return <main className="grid min-h-screen bg-[#F3EFE6] text-[#1C1A17] lg:grid-cols-[42fr_58fr]">
    <aside className="relative order-2 overflow-hidden bg-[#151310] px-6 py-10 text-white sm:px-10 lg:order-1 lg:flex lg:min-h-screen lg:flex-col lg:px-[clamp(3rem,5vw,5rem)] lg:py-6">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[.04] [background-image:linear-gradient(#FAF8F3_1px,transparent_1px),linear-gradient(90deg,#FAF8F3_1px,transparent_1px)] [background-size:64px_64px]" />
      <a href="/" className="relative flex w-fit items-center gap-2.5 text-white"><UnitalkLogo size={22} color="#F15B9B" inactiveColor="#F15B9B" /><span className="text-sm font-semibold">Unitalk</span></a>
      <div className="relative my-auto max-w-md py-12">
        <div className="flex items-center gap-3"><AlmaHead className="size-12 ring-1 ring-white/15" /><div><p className="text-lg font-bold">Alma</p><p className="text-xs text-[#F2A4C5]">{copy.role}</p></div></div>
        <p className="mt-10 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-[#E05A93]">{copy.kicker}</p>
        <h1 className="mt-4 text-balance font-sf text-[clamp(2.3rem,4vw,4rem)] font-bold leading-[.98] tracking-[-.05em]">{copy.title}</h1>
        <p className="mt-5 max-w-md text-[15px] font-medium leading-7 text-[#C9C1B8]">{copy.body}</p>
      </div>
    </aside>
    <section className="order-1 flex min-w-0 items-center px-5 py-16 sm:px-10 lg:order-2 lg:min-h-screen lg:px-[clamp(3rem,7vw,7rem)]">
      <div className="mx-auto w-full max-w-2xl">
        <AlmaMissionComposer value={value} onChange={setValue} onSubmit={() => onChoose(value)} title={copy.prompt} role={copy.role} placeholder={copy.placeholder} submitLabel={copy.submit} starters={copy.examples} onStarterSelect={onChoose} listening={listening} onToggleListening={toggleListening} voiceSupported={voiceSupported} voiceStartLabel={copy.voiceStart} voiceStopLabel={copy.voiceStop} listeningLabel={copy.listening} textareaRef={textareaRef} compactMobile compactDesktop titleInField />
        <div className="mt-5 text-center"><Link href="/missions" className="inline-flex items-center gap-2 text-sm font-bold text-[#B00C54] underline decoration-[#D10E63]/30 underline-offset-4 hover:decoration-[#D10E63]">{copy.explore}<ArrowLeft className="size-4 rotate-180" /></Link></div>
      </div>
    </section>
  </main>
}
