'use client'

import { Check } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { STEP_ORDER, STEP_LABELS, ENTRY_STEP_LABELS, type Entry, type Step } from './types'

export function FlowStepper({
  current,
  entry,
  lang,
  onStepClick,
}: {
  current: Step
  entry: Entry
  lang: Lang
  onStepClick: (step: Step) => void
}) {
  const currentIndex = STEP_ORDER.indexOf(current)
  // The first node names the user's starting point (Need / Mission / Job profile).
  const labelFor = (step: Step) => (step === 'mission' ? ENTRY_STEP_LABELS[entry][lang] : STEP_LABELS[step][lang])

  return (
    <nav aria-label={lang === 'fr' ? 'Progression' : 'Progress'} className="w-full">
      {/* Mobile: textual status */}
      <p className="text-center font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-[#8A8175] sm:hidden">
        {lang === 'fr'
          ? `Étape ${currentIndex + 1} sur ${STEP_ORDER.length} · ${labelFor(current)}`
          : `Step ${currentIndex + 1} of ${STEP_ORDER.length} · ${labelFor(current)}`}
      </p>

      {/* Desktop: compact numbered stepper */}
      <ol className="hidden items-center justify-center gap-1.5 sm:flex">
        {STEP_ORDER.map((step, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          const clickable = done
          return (
            <li key={step} className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(step)}
                aria-current={active ? 'step' : undefined}
                className={[
                  'flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs font-semibold transition-colors',
                  active
                    ? 'bg-[#1C1A17] text-[#FBF9F3]'
                    : done
                      ? 'text-[#3B362F] hover:bg-[#EBE4D6]'
                      : 'text-[#B4AC9E]',
                  clickable ? 'cursor-pointer' : 'cursor-default',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold',
                    active
                      ? 'bg-[#D10E63] text-[#FBF9F3]'
                      : done
                        ? 'bg-[#D10E63]/15 text-[#A80B50]'
                        : 'bg-[#E4DDCE] text-[#8A8175]',
                  ].join(' ')}
                >
                  {done ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                </span>
                {labelFor(step)}
              </button>
              {i < STEP_ORDER.length - 1 && (
                <span aria-hidden="true" className="h-px w-4 bg-[#D8D0C2]" />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
