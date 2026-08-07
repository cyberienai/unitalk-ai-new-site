'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, UserCheck } from 'lucide-react'

/**
 * THE MISSION THREAD — the recurring visual signature of the homepage.
 *
 * A single hairline runs through the steps of a mission. It is magenta while
 * the work is pending, STOPS in front of a human-validation gate (it never
 * crosses a decision on its own), and turns green once a person has validated.
 *
 * Used across scenes (product theatre, Workspace proof, know-how reveal) so the
 * same idea — "an AI carries the work up to your decision, then you validate" —
 * is recognisable everywhere. Fully static under prefers-reduced-motion.
 */

export type ThreadStep = {
  label: string
  sub?: string
  /** This step is the human-validation gate the thread stops in front of. */
  gate?: boolean
  /** Caption under a gate while it is waiting for a human decision. */
  gatePending?: string
  /** Caption under a gate once a human has validated. */
  gateDone?: string
}

const ease = [0.22, 1, 0.36, 1] as const

const MAGENTA = '#D10E63'
const GREEN = '#2E7D4F'
const RULE = '#DcD4C4'

export function MissionThread({
  steps,
  active,
  validated,
  className = '',
}: {
  steps: ThreadStep[]
  /** How many steps are complete (drives the draw of the thread). */
  active: number
  /** Whether the human validation gate has been cleared (thread turns green). */
  validated: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const gateIndex = steps.findIndex((s) => s.gate)

  return (
    <ol className={`relative flex flex-col ${className}`} role="list">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const reached = i < active
        const isGate = !!step.gate
        // A segment before a cleared gate (or after it) is green once validated.
        const beyondGate = gateIndex >= 0 && i >= gateIndex
        const segmentColor = validated && beyondGate ? GREEN : MAGENTA
        const nodeDone = reached || (isGate && validated)
        const nodeColor = isGate ? (validated ? GREEN : MAGENTA) : reached ? MAGENTA : RULE

        return (
          <li key={step.label} className="relative flex gap-4 pb-7 last:pb-0">
            {/* Rail: base hairline + animated coloured draw */}
            {!isLast && (
              <span aria-hidden className="absolute left-[11px] top-6 h-[calc(100%-1.5rem)] w-px -translate-x-1/2">
                <span className="absolute inset-0 bg-[#DcD4C4]" />
                <motion.span
                  className="absolute inset-x-0 top-0 origin-top"
                  style={{ backgroundColor: segmentColor, bottom: 0 }}
                  initial={reduce ? false : { scaleY: 0 }}
                  animate={{ scaleY: reached ? 1 : 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease }}
                />
              </span>
            )}

            {/* Node */}
            <span className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center">
              {isGate && !validated && !reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: MAGENTA }}
                  animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
              <span
                className="relative flex h-[22px] w-[22px] items-center justify-center rounded-full transition-colors duration-300"
                style={{
                  backgroundColor: nodeDone ? nodeColor : 'transparent',
                  border: nodeDone ? 'none' : `1.5px solid ${nodeColor}`,
                }}
              >
                {isGate ? (
                  validated ? (
                    <Check className="h-3 w-3 text-[#FBF9F3]" strokeWidth={3} />
                  ) : (
                    <UserCheck className="h-3 w-3" style={{ color: MAGENTA }} strokeWidth={2.5} />
                  )
                ) : nodeDone ? (
                  <Check className="h-3 w-3 text-[#FBF9F3]" strokeWidth={3} />
                ) : null}
              </span>
            </span>

            {/* Label */}
            <div className="-mt-0.5 min-w-0">
              <p
                className="text-sm font-semibold leading-snug transition-colors duration-300"
                style={{ color: nodeDone ? '#1C1A17' : '#857C6E' }}
              >
                {step.label}
              </p>
              {step.sub && <p className="mt-0.5 text-[13px] leading-snug text-[#857C6E]">{step.sub}</p>}
              {isGate && (step.gatePending || step.gateDone) && (
                <p
                  className="mt-1 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-300"
                  style={{ color: validated ? GREEN : MAGENTA }}
                >
                  {validated ? <Check className="h-3 w-3" strokeWidth={3} /> : <UserCheck className="h-3 w-3" strokeWidth={2.5} />}
                  {validated ? step.gateDone : step.gatePending}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
