'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { LanguageToggle } from '@/components/language-toggle'
import { FlowStepper } from './flow-stepper'
import { ScreenAccount, type DiscoverContext, type SelectedMission } from './screen-account'
import { ScreenContext } from './screen-context'
import { ScreenMission } from './screen-mission'
import { ScreenCollaborateur } from './screen-collaborateur'
import { initialOnboardingState, STEP_ORDER, type OnboardingState, type OnboardingStep } from './types'
import { MISSIONS } from '@/lib/missions-catalog'
import { actionDescription, shortCategoryLabel } from '@/components/missions/store-card'
import type { MockSession } from '@/lib/mock-auth'

// The /decouvrir onboarding. A single shared state carries the account, the
  // company context, the mission and the chosen first name across every screen.
  // The final action persists this state and opens the Workspace directly.
export function DiscoverFlow({ initialSession }: { initialSession?: MockSession | null }) {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()
  const router = useRouter()
  const searchParams = useSearchParams()
  const missionSlug = searchParams.get('mission')
  const draftId = searchParams.get('draft')
  const catalogMission = useMemo(() => MISSIONS.find((mission) => mission.slug === missionSlug), [missionSlug])
  const [draftText, setDraftText] = useState('')

  const [state, setState] = useState<OnboardingState>(() => {
    const initial = initialOnboardingState()
    if (!initialSession) return initial
    const domain = initialSession.email.split('@').at(-1)?.trim().toLowerCase()
    return {
      ...initial,
      authenticated: true,
      firstName: initialSession.firstName?.trim() ?? '',
      lastName: initialSession.lastName?.trim() ?? '',
      company: domain && initialSession.provider === 'email'
        ? initial.company.map((fact) => {
            if (fact.key === 'domain') return { ...fact, value: domain, uncertain: false }
            if (fact.key === 'name') {
              const name = domain.split('.')[0]
              return { ...fact, value: name.charAt(0).toUpperCase() + name.slice(1), uncertain: false }
            }
            return fact
          })
        : initial.company,
    }
  })
  const [step, setStep] = useState<OnboardingStep>('entreprise')

  useEffect(() => {
    if (!draftId) return
    try {
      const raw = localStorage.getItem(`unitalk_mission_${draftId}`)
      if (raw) setDraftText((JSON.parse(raw) as { text?: string }).text?.trim() ?? '')
    } catch {}
  }, [draftId])

  const context: DiscoverContext = catalogMission
    ? {
        kind: 'mission',
        mission: {
          slug: catalogMission.slug,
          title: catalogMission.title[lang],
          description: actionDescription(catalogMission, lang),
          category: shortCategoryLabel(catalogMission.category, lang),
        },
      }
    : draftText
      ? { kind: 'draft', draft: { title: draftText, description: lang === 'fr' ? 'Alma va structurer votre demande et l’adapter au contexte de votre entreprise.' : 'Alma will structure your request and adapt it to your company context.', category: lang === 'fr' ? 'Mission sur mesure' : 'Custom mission' } }
      : { kind: 'empty' }

  const selectedMission: SelectedMission | null = context.kind === 'mission' ? context.mission : context.kind === 'draft' ? context.draft : null

  useEffect(() => {
    if (!selectedMission?.title) return
    setState((current) => {
      if (current.mission.title === selectedMission.title && current.missionDefined) return current
      return {
        ...current,
        mission: { ...current.mission, title: selectedMission.title },
        missionDefined: true,
      }
    })
  }, [selectedMission?.title])

  function goTo(next: OnboardingStep) {
    setStep(next)
  }

  const stepIndex = STEP_ORDER.indexOf(step)
  const back = stepIndex > 0 ? STEP_ORDER[stepIndex - 1] : null

  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.3 },
      }

  if (!state.authenticated) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
        <header className="flex items-center justify-between gap-4 border-b border-[#D8D0C2] bg-[#F3EFE6] px-5 py-4 sm:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Unitalk">
            <UnitalkLogo size={22} />
            <span className="font-inter text-sm font-semibold">Unitalk</span>
          </a>
          <div className="flex items-center gap-4">
            {selectedMission && <p className="hidden text-[12px] font-semibold text-[#6E665A] sm:block">{lang === 'fr' ? 'Mission choisie ✓' : 'Mission selected ✓'}</p>}
            <LanguageToggle />
          </div>
        </header>
        <div className="w-full flex-1">
          <ScreenAccount
            lang={lang}
            context={context}
            onAuthenticated={({ provider, email, firstName, lastName }) => {
              const domain = provider === 'email' ? email?.split('@').at(-1)?.trim().toLowerCase() : undefined
              setState((s) => ({
                ...s,
                authenticated: true,
                mission: selectedMission?.title ? { ...s.mission, title: selectedMission.title } : s.mission,
                missionDefined: Boolean(selectedMission?.title),
                firstName: firstName?.trim() ?? '',
                lastName: lastName?.trim() ?? '',
                company: domain
                  ? s.company.map((fact) => {
                      if (fact.key === 'domain') return { ...fact, value: domain, uncertain: false }
                      if (fact.key === 'name') {
                        const name = domain.split('.')[0]
                        return { ...fact, value: name.charAt(0).toUpperCase() + name.slice(1), uncertain: false }
                      }
                      return fact
                    })
                  : s.company,
              }))
              setStep('entreprise')
              if (missionSlug) router.replace(`/decouvrir?mission=${encodeURIComponent(missionSlug)}`)
              else if (draftId) router.replace(`/decouvrir?draft=${encodeURIComponent(draftId)}`)
            }}
          />
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header with stepper */}
      <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Unitalk">
          <UnitalkLogo size={22} />
          <span className="font-inter text-sm font-semibold">Unitalk</span>
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <FlowStepper current={step} lang={lang} onStepClick={goTo} />
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LanguageToggle />
        </div>
      </header>

      {/* Mobile stepper */}
      <div className="px-5 py-3 md:hidden">
        <FlowStepper current={step} lang={lang} onStepClick={goTo} />
      </div>

      {/* Stage */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-4 sm:px-8">
        {/* Back link — mobile only. On desktop the clickable stepper already
            provides backward navigation, so a separate "Précédent" is redundant. */}
        {back && (
          <button
            type="button"
            onClick={() => goTo(back)}
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6E665A] transition-colors hover:text-[#1C1A17] md:hidden"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {lang === 'fr' ? 'Précédent' : 'Back'}
          </button>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={step} {...anim}>
            {step === 'entreprise' && (
              <ScreenContext
                lang={lang}
                firstName={state.firstName}
                lastName={state.lastName}
                company={state.company}
                onChange={(company) => setState((s) => ({ ...s, company }))}
                onIdentityChange={(identity) => setState((s) => ({ ...s, ...identity }))}
                onContinue={() => goTo('mission')}
              />
            )}

            {step === 'mission' && (
              <ScreenMission
                lang={lang}
                company={state.company}
                mission={state.mission}
                onDefine={(mission) => setState((s) => ({ ...s, mission, missionDefined: true }))}
                onContinue={() => goTo('collaborateur')}
              />
            )}

            {step === 'collaborateur' && (
              <ScreenCollaborateur
                lang={lang}
                mission={state.mission}
                profile={state.profile}
                name={state.collaboratorName}
                onName={(collaboratorName) => setState((s) => ({ ...s, collaboratorName }))}
                onCreated={(collaboratorName) => setState((s) => ({ ...s, collaboratorName }))}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  )
}
