'use client'

import type { Lang } from '@/lib/language-context'
import { STEP_ORDER, STEP_LABELS, type Entry, type Step } from './types'

// A deliberately light progress indicator: a compact status line plus a fine
// connected row of dots. No heavy pills, no equal-weight six-step ladder — the
// current step is named, the rest recede.
export function FlowStepper({
  current,
  lang,
  onStepClick,
}: {
  current: Step
  entry?: Entry
  lang: Lang
  onStepClick: (step: Step) => void
}) {
  const currentIndex = STEP_ORDER.indexOf(current)
  const label = (step: Step) => STEP_LABELS[step][lang]

  return (
    <nav aria-label={lang === 'fr' ? 'Progression' : 'Progress'} className="w-full">
      {/* Named status — always visible, tie the number to the step. */}
      <p className="text-center font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A8175] sm:hidden">
        {label(current)} · {currentIndex + 1}/{STEP_ORDER.length}
      </p>

      {/* Desktop: fine dotted line with a single named active node. */}
      <ol className="hidden items-center justify-center gap-0 sm:flex">
        {STEP_ORDER.map((step, i) => {
          const done = i < currentIndex
          const active = i === currentIndex
          const clickable = done
          return (
            <li key={step} className="flex items-center">
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(step)}
                aria-current={active ? 'step' : undefined}
                className={[
                  'group flex items-center gap-2 rounded-full py-1 pl-1 pr-1 transition-colors',
                  clickable ? 'cursor-pointer' : 'cursor-default',
                ].join(' ')}
              >
                <span
                  aria-hidden="true"
                  className={[
                    'h-2 w-2 rounded-full transition-colors',
                    active
                      ? 'bg-[#D10E63] ring-4 ring-[#D10E63]/15'
                      : done
                        ? 'bg-[#D10E63]/50 group-hover:bg-[#D10E63]'
                        : 'bg-[#D8D0C2]',
                  ].join(' ')}
                />
                <span
                  className={[
                    'text-xs transition-colors',
                    active
                      ? 'font-semibold text-[#1C1A17]'
                      : done
                        ? 'font-medium text-[#8A8175] group-hover:text-[#3B362F]'
                        : 'font-medium text-[#B4AC9E]',
                  ].join(' ')}
                >
                  {label(step)}
                </span>
              </button>
              {i < STEP_ORDER.length - 1 && (
                <span
                  aria-hidden="true"
                  className={[
                    'mx-1.5 h-px w-6 transition-colors',
                    i < currentIndex ? 'bg-[#D10E63]/40' : 'bg-[#E4DDCE]',
                  ].join(' ')}
                />
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
