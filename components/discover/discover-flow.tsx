'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { LanguageToggle } from '@/components/language-toggle'
import { FlowStepper } from './flow-stepper'
import { ScreenAccount } from './screen-account'
import { ScreenContext } from './screen-context'
import { ScreenMission } from './screen-mission'
import { ScreenCollaborateur } from './screen-collaborateur'
import { initialOnboardingState, STEP_ORDER, type OnboardingState, type OnboardingStep } from './types'

// The /decouvrir onboarding. A single shared state carries the account, the
  // company context, the mission and the chosen first name across every screen.
  // The final action persists this state and opens the Workspace directly.
export function DiscoverFlow() {
  const { lang } = useLanguage()
  const reduce = useReducedMotion()

  const [state, setState] = useState<OnboardingState>(initialOnboardingState)
  const [step, setStep] = useState<OnboardingStep>('entreprise')

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

  // Account screen — no stepper, its own quiet full-height surface.
  if (!state.authenticated) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
        <header className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Unitalk">
            <UnitalkLogo size={22} />
            <span className="font-inter text-sm font-semibold">Unitalk</span>
          </a>
          <LanguageToggle />
        </header>
        <div className="mx-auto w-full max-w-6xl flex-1 px-5 sm:px-8">
          <ScreenAccount
            lang={lang}
            onAuthenticated={({ provider, email, firstName, lastName }) => {
              const domain = provider === 'email' ? email?.split('@').at(-1)?.trim().toLowerCase() : undefined
              setState((s) => ({
                ...s,
                authenticated: true,
                firstName: firstName?.trim() ?? '',
                lastName: lastName?.trim() ?? '',
                firstNameKnown: !!firstName?.trim(),
                lastNameKnown: !!lastName?.trim(),
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
                requireFirstName={!state.firstNameKnown}
                requireLastName={!state.lastNameKnown}
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
