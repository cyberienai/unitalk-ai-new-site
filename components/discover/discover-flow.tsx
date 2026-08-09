'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { UnitalkLogo } from '@/components/unitalk-logo'
import { FlowStepper } from './flow-stepper'
import { ContextColumn } from './context-column'
import { ScreenMission } from './screen-mission'
import { ScreenContext } from './screen-context'
import { ScreenAffectation } from './screen-affectation'
import { ScreenConnect } from './screen-connect'
import { ScreenWorkspace } from './screen-workspace'
import { INITIAL_STATE, STEP_ORDER, type Assignment, type FlowState, type Step } from './types'

export function DiscoverFlow({ initial = INITIAL_STATE }: { initial?: FlowState }) {
  const { lang, setLang } = useLanguage()
  const reduce = useReducedMotion()
  const [state, setState] = useState<FlowState>(initial)

  function goTo(step: Step) {
    setState((s) => ({ ...s, step }))
  }

  const anim = reduce
    ? {}
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 }, transition: { duration: 0.3 } }

  return (
    <main className="flex min-h-screen flex-col bg-[#F3EFE6] text-[#1C1A17]">
      {/* Header */}
      <header className="flex items-center justify-between gap-4 border-b border-[#E4DDCE] px-5 py-4 sm:px-8">
        <a href="/" className="flex shrink-0 items-center gap-2.5" aria-label="Unitalk">
          <UnitalkLogo size={22} />
          <span className="font-inter text-sm font-semibold">Unitalk</span>
        </a>

        <div className="hidden flex-1 justify-center md:flex">
          <FlowStepper current={state.step} entry={state.entry ?? 'company'} lang={lang} onStepClick={goTo} />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="flex items-center rounded-full border border-[#D8D0C2] p-0.5 text-xs font-semibold">
            {(['fr', 'en'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === l ? 'bg-[#1C1A17] text-[#FBF9F3]' : 'text-[#6E665A] hover:text-[#1C1A17]'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6E665A] transition-colors hover:text-[#1C1A17]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {lang === 'fr' ? 'Retour au site' : 'Back to site'}
          </a>
        </div>
      </header>

      {/* Mobile stepper */}
      <div className="border-b border-[#E4DDCE] px-5 py-3 md:hidden">
        <FlowStepper current={state.step} entry={state.entry ?? 'company'} lang={lang} onStepClick={goTo} />
      </div>

      {/* Stage */}
      <div className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 sm:px-8 sm:py-14">
        <AnimatePresence mode="wait">
          {state.step === 'mission' ? (
            // State 1 owns its own centered → two-zone layout (no context column).
            <motion.div key="mission" {...anim}>
              <ScreenMission
                lang={lang}
                entry={state.entry ?? 'company'}
                missionSlug={state.missionSlug}
                hasDraft={state.draftId !== ''}
                onActivate={() => goTo('entreprise')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="rest"
              {...anim}
              className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_22rem]"
            >
              {/* Left — evolving step */}
              <div className="min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div key={state.step} {...anim}>
                    {state.step === 'entreprise' && (
                      <ScreenContext
                        lang={lang}
                        domain={state.domain}
                        missionSlug={state.missionSlug}
                        onProgress={(n) => setState((s) => ({ ...s, contextProgress: Math.max(s.contextProgress, n) }))}
                        onContinue={() => goTo('affectation')}
                      />
                    )}
                    {state.step === 'affectation' && (
                      <ScreenAffectation
                        lang={lang}
                        missionSlug={state.missionSlug}
                        assignedSlug={state.assignedSlug}
                        assignment={state.assignment}
                        domain={state.domain}
                        onChoose={(a: Assignment) => setState((s) => ({ ...s, assignment: a }))}
                        onContinue={() => goTo('acces')}
                      />
                    )}
                    {state.step === 'acces' && (
                      <ScreenConnect lang={lang} missionSlug={state.missionSlug} onContinue={() => goTo('workspace')} />
                    )}
                    {state.step === 'workspace' && (
                      <ScreenWorkspace
                        lang={lang}
                        missionSlug={state.missionSlug}
                        draftId={state.draftId}
                        domain={state.domain}
                        assignment={state.assignment}
                        assignedSlug={state.assignedSlug}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right — persistent mission context */}
              <aside className="lg:pt-1">
                <ContextColumn state={state} lang={lang} />
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

// Keep STEP_ORDER referenced for potential future keyboard nav.
export const FLOW_STEPS = STEP_ORDER
