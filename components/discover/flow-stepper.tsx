'use client'

import { Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { STEP_LABELS, STEP_ORDER, type OnboardingStep } from './types'

// A quiet horizontal stepper: Entreprise → Mission → Collaborateur IA → Workspace.
// Completed steps are clickable and marked with a check; the active step uses
// magenta; future steps stay discreet and non-interactive.
export function FlowStepper({
  current,
  lang,
  onStepClick,
  variant = 'horizontal',
}: {
  current: OnboardingStep
  lang: Lang
  onStepClick: (step: OnboardingStep) => void
  variant?: 'horizontal' | 'panel'
}) {
  const currentIndex = STEP_ORDER.indexOf(current)

  if (variant === 'panel') {
    return (
      <nav aria-label={lang === 'fr' ? 'Étapes' : 'Steps'}>
        <ol className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
          {STEP_ORDER.map((step, i) => {
            const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'todo'
            const isDone = state === 'done'

            return (
              <li key={step}>
                <button
                  type="button"
                  onClick={() => isDone && onStepClick(step)}
                  disabled={!isDone}
                  aria-current={state === 'active' ? 'step' : undefined}
                  className={[
                    'flex items-center gap-2.5 text-left text-[12px] transition-colors',
                    state === 'active' ? 'font-bold text-white' : '',
                    state === 'done' ? 'cursor-pointer font-semibold text-[#C8BFC4] hover:text-white' : '',
                    state === 'todo' ? 'text-[#77716B]' : '',
                  ].join(' ')}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold',
                      state === 'active' ? 'border-[#D10E63] bg-[#D10E63] text-white' : '',
                      state === 'done' ? 'border-[#D10E63]/50 bg-[#D10E63]/15 text-[#F09CC3]' : '',
                      state === 'todo' ? 'border-white/15 text-[#77716B]' : '',
                    ].join(' ')}
                  >
                    {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                  </span>
                  <span>{STEP_LABELS[step][lang]}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
    )
  }

  return (
    <nav aria-label={lang === 'fr' ? 'Étapes' : 'Steps'}>
      <ol className="flex items-center justify-center gap-1 sm:gap-2">
        {STEP_ORDER.map((step, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'active' : 'todo'
          const isDone = state === 'done'
          const label = STEP_LABELS[step][lang]

          return (
            <li key={step} className="flex items-center gap-1 sm:gap-2">
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className={`h-px w-3 sm:w-7 ${i <= currentIndex ? 'bg-[#D10E63]/40' : 'bg-[#E4DDCE]'}`}
                />
              )}
              <button
                type="button"
                onClick={() => isDone && onStepClick(step)}
                disabled={!isDone}
                aria-current={state === 'active' ? 'step' : undefined}
                className={[
                  'inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] font-semibold transition-colors sm:px-3 sm:py-1.5 sm:text-[13px]',
                  state === 'active' ? 'bg-[#D10E63]/10 text-[#B00C54]' : '',
                  state === 'done' ? 'cursor-pointer text-[#6E665A] hover:bg-[#EFE8DA]/70 hover:text-[#1C1A17]' : '',
                  state === 'todo' ? 'text-[#B4AC9E]' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <span
                  aria-hidden="true"
                  className={[
                    'inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                    state === 'active' ? 'bg-[#D10E63] text-[#FBF9F3]' : '',
                    state === 'done' ? 'bg-[#D10E63]/15 text-[#B00C54]' : '',
                    state === 'todo' ? 'border border-[#D8D0C2] text-[#B4AC9E]' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  {isDone ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
