'use client'

import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * The Unitalk signature: a single vertical magenta thread that links the
 * steps of a mission (need → work → human decision → outcome). At a human
 * gate the thread breaks into a dashed segment, then resumes solid once the
 * decision is made — the visual promise that AI acts only within human calls.
 * Non-controlled: segments grow as the thread scrolls into view.
 */

export type ThreadStep = {
  id: string
  /** A human decision point — the thread breaks before it and resumes after. */
  gate?: boolean
  content: ReactNode
}

export function MissionThread({
  steps,
  dark = false,
}: {
  steps: ThreadStep[]
  dark?: boolean
}) {
  const reduce = useReducedMotion()
  const line = dark ? 'bg-[#F2BCD3]/25' : 'bg-[#D10E63]/20'
  const lineFill = 'bg-[#D10E63]'

  return (
    <ol className="flex flex-col">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1
        const nextGate = steps[i + 1]?.gate
        return (
          <li key={step.id} className="flex gap-4">
            {/* Thread rail */}
            <div className="relative flex w-5 shrink-0 flex-col items-center">
              {/* Node */}
              <span className="relative mt-1.5 flex h-5 w-5 items-center justify-center">
                {step.gate ? (
                  <>
                    <span aria-hidden className="absolute inline-flex h-5 w-5 animate-ping rounded-full bg-[#D10E63]/30" />
                    <span aria-hidden className="relative h-3.5 w-3.5 rounded-full border-2 border-[#D10E63] bg-[#FBF3F7]" />
                  </>
                ) : (
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${lineFill}`} />
                )}
              </span>
              {/* Connector to next step */}
              {!isLast && (
                <span className={`relative mt-1 w-px flex-1 overflow-hidden rounded ${line}`}>
                  <motion.span
                    aria-hidden
                    initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : 0.12 * i }}
                    className={`absolute inset-0 origin-top ${nextGate ? 'border-l-2 border-dashed border-[#D10E63]/50' : lineFill}`}
                  />
                </span>
              )}
            </div>

            {/* Step content */}
            <motion.div
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: reduce ? 0 : 0.12 * i }}
              className={`min-w-0 flex-1 ${isLast ? 'pb-0' : 'pb-6'}`}
            >
              {step.content}
            </motion.div>
          </li>
        )
      })}
    </ol>
  )
}

/**
 * A speech turn inside a thread (human or AI), used by the collaboration and
 * missions sections. Keeps the actor label + AI-nature explicit.
 */
export function ThreadTurn({
  name,
  role,
  ai = false,
  children,
  dark = false,
}: {
  name: string
  role: string
  ai?: boolean
  children: ReactNode
  dark?: boolean
}) {
  return (
    <div className={`rounded-2xl border p-4 ${dark ? 'border-white/10 bg-[#211E1B]' : 'border-[#E4DDCE] bg-[#FBF9F3]'}`}>
      <div className="flex items-center gap-2">
        <span className={`text-[14px] font-semibold ${dark ? 'text-[#F4F1EA]' : 'text-[#1C1A17]'}`}>{name}</span>
        {ai && (
          <span className="inline-flex items-center rounded-full border border-[#D10E63]/30 bg-[#D10E63]/[0.08] px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-[#B00C54]">
            IA
          </span>
        )}
        <span className={`text-[12px] ${dark ? 'text-[#8E877C]' : 'text-[#938A7C]'}`}>· {role}</span>
      </div>
      <p className={`mt-1.5 text-pretty text-[14px] leading-relaxed ${dark ? 'text-[#C7C0B5]' : 'text-[#5A5348]'}`}>{children}</p>
    </div>
  )
}
