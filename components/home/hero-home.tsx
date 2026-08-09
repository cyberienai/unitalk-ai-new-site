'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Lang } from '@/lib/language-context'
import { Kicker } from '@/components/home/section-kicker'
import { HeroTheatre, SCENARIOS } from '@/components/home/hero-theatre'
import { useAlma } from '@/components/home/alma-panel-context'

/**
 * HERO — ONE state machine. A single scenario index drives both the rotating H1
 * action and the theatre panel, so the headline and the demonstration are
 * always the same mission (no two independent timers). The full sentence is
 * announced once via sr-only; the animated line is aria-hidden with a reserved,
 * stable height and a single active layer (no text overlap). Freezes on the
 * first scenario under prefers-reduced-motion.
 */

const T = {
  fr: {
    eyebrow: 'Il vous manque quelqu’un',
    srSentence: 'Un Collaborateur IA est prêt à accomplir vos missions.',
    lead: 'Un Collaborateur IA est prêt à',
    sub: 'Alma prépare la suite.',
    detail: 'Alma, Customer success IA, analyse votre entreprise, comprend votre besoin et prépare le Collaborateur IA capable d’accomplir vos missions.',
    detailLabel: 'En savoir plus sur ce qu’Alma prépare',
    cta: 'Parler à Alma',
    secondary: 'Confier une mission',
    proofs: ['Essai 7 jours sans CB', 'Hébergé en France', 'Propulsé par Hermes'],
  },
  en: {
    eyebrow: 'Someone is missing',
    srSentence: 'An AI Collaborator is ready to carry out your missions.',
    lead: 'An AI Collaborator is ready to',
    sub: 'Alma prepares the next steps.',
    detail: 'Alma, AI Customer success, analyzes your company, understands your need and prepares the AI Collaborator able to carry out your missions.',
    detailLabel: 'Learn more about what Alma prepares',
    cta: 'Talk to Alma',
    secondary: 'Hand over a mission',
    proofs: ['7-day trial, no card', 'Hosted in France', 'Powered by Hermes'],
  },
} as const

const ease = [0.22, 1, 0.36, 1] as const
const SCENARIO_MS = 5000
const RESUME_AFTER_MS = 12000

/** Small, accessible info tooltip (hover + keyboard focus). Reveals the longer
 *  explanation of what Alma prepares, kept out of the main headline. */
function InfoTooltip({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative inline-flex align-middle">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="ml-1.5 inline-flex h-[18px] w-[18px] -translate-y-px items-center justify-center rounded-full border border-[#D9CFBD] bg-[#FBF7EF] text-[11px] font-bold leading-none text-[#8A7F72] outline-none transition-colors duration-200 hover:border-[#D10E63] hover:bg-[#FBF3F7] hover:text-[#B00C54] focus-visible:ring-2 focus-visible:ring-[#D10E63]/40"
      >
        i
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease }}
            className="absolute bottom-full left-1/2 z-20 mb-2 w-[264px] -translate-x-1/2 rounded-xl border border-[#E4DDCE] bg-white px-3.5 py-2.5 text-left text-[13px] font-normal leading-relaxed text-[#4E483F] shadow-[0_16px_40px_-12px_rgba(28,26,23,0.28)]"
          >
            {children}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-[5px] rotate-45 border-b border-r border-[#E4DDCE] bg-white"
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export function HeroHome({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const { openAlma } = useAlma()

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (reduce) setPlaying(false)
  }, [reduce])

  // The single autoplay timer: advances the shared scenario index.
  useEffect(() => {
    if (!playing || reduce) return
    const id = setTimeout(() => setIndex((v) => (v + 1) % SCENARIOS.length), SCENARIO_MS)
    return () => clearTimeout(id)
  }, [playing, index, reduce])

  useEffect(() => {
    return () => {
      if (resumeRef.current) clearTimeout(resumeRef.current)
    }
  }, [])

  // Manual selection: jump, pause autoplay, then resume the cycle after a delay
  // so a manual pick never races a concurrent autoplay tick.
  const select = useCallback(
    (i: number) => {
      setIndex(i)
      setPlaying(false)
      if (resumeRef.current) clearTimeout(resumeRef.current)
      if (!reduce) resumeRef.current = setTimeout(() => setPlaying(true), RESUME_AFTER_MS)
    },
    [reduce],
  )

  const togglePlay = useCallback(() => {
    if (resumeRef.current) clearTimeout(resumeRef.current)
    setPlaying((v) => !v)
  }, [])

  const current = SCENARIOS[index]

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-10 pt-24 sm:pt-28 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="editorial-shell relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
        {/* Copy */}
        <div className="min-w-0 max-w-xl">
          <div className="mb-5 flex justify-center sm:justify-start">
            <Kicker>{t.eyebrow}</Kicker>
          </div>

          <h1 className="font-sf text-[clamp(2rem,4vw,3.15rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#1C1A17]">
            {/* One stable accessible sentence, announced once (does not rotate). */}
            <span className="sr-only">{t.srSentence}</span>
            {/* Visual, decorative only. */}
            <span aria-hidden="true" className="block text-center sm:text-left">
              <span className="block text-balance">{t.lead}</span>
              <span className="relative mt-3 block min-h-[3.1em] lg:min-h-[2.4em]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={index}
                    initial={reduce ? false : { opacity: 0, y: '0.35em' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: '-0.35em' }}
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease }}
                    className="absolute inset-x-0 top-0 block"
                  >
                    <span className="mb-2 flex items-center justify-center gap-2 sm:justify-start">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                      <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8A7F72]">
                        {current.dept[lang]}
                      </span>
                    </span>
                    <span className="block text-balance text-[#D10E63]">{current.action[lang]}</span>
                  </motion.span>
                </AnimatePresence>
              </span>
            </span>
          </h1>

          <p className="mx-auto mt-5 flex max-w-full items-center justify-center gap-1.5 text-center text-[17px] sm:mx-0 sm:justify-start sm:text-left md:text-[18px]">
            <Link
              href="/missions"
              className="inline-flex items-center gap-1.5 font-semibold text-[#4E483F] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:text-[#1C1A17] hover:decoration-[#D10E63]"
            >
              {t.secondary}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:items-start">
            <div className="flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => openAlma()}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <span className="inline-flex items-center text-[15px] leading-relaxed text-[#4E483F] md:text-[16px]">
                <Image
                  src="/alma-avatar.png"
                  alt="Alma"
                  width={24}
                  height={24}
                  className="mr-2 inline-block h-6 w-6 -translate-y-px rounded-full object-cover align-middle ring-1 ring-[#E4DCCE]"
                />
                {t.sub}
                <InfoTooltip label={t.detailLabel}>{t.detail}</InfoTooltip>
              </span>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs font-medium text-[#6B6560] sm:justify-start">
              {t.proofs.map((proof) => (
                <span key={proof} className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D10E63]" />
                  {proof}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Theatre — driven by the same index */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: reduce ? 0 : 0.2 }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <HeroTheatre lang={lang} index={index} playing={playing} onTogglePlay={togglePlay} onSelect={select} />
        </motion.div>
      </div>
    </section>
  )
}
