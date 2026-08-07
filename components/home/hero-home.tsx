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
    srSentence: 'Votre Collaborateur IA est prêt à accomplir vos missions.',
    lead: 'Votre Collaborateur IA est prêt à',
    sub: 'Parlez à Alma. Elle analyse votre entreprise, comprend votre besoin et prépare le Collaborateur IA capable d’accomplir vos missions.',
    cta: 'Parler à Alma',
    secondary: 'Découvrir les Collaborateurs IA',
    proofs: ['Essai 7 jours sans CB', 'Hébergé en France', 'Propulsé par Hermes'],
  },
  en: {
    eyebrow: 'Someone is missing',
    srSentence: 'Your AI Collaborator is ready to carry out your missions.',
    lead: 'Your AI Collaborator is ready to',
    sub: 'Talk to Alma. She analyzes your company, understands your need and prepares the AI Collaborator able to carry out your missions.',
    cta: 'Talk to Alma',
    secondary: 'Discover AI Collaborators',
    proofs: ['7-day trial, no card', 'Hosted in France', 'Powered by Hermes'],
  },
} as const

/** Rotating title actions, grouped by business area. Independent of the theatre. */
const HERO_ACTIONS = [
  { dept: { fr: 'Sales', en: 'Sales' }, action: { fr: 'cibler et qualifier vos prospects', en: 'target and qualify your prospects' } },
  { dept: { fr: 'Sales', en: 'Sales' }, action: { fr: 'décrocher plus de rendez-vous', en: 'book more meetings' } },
  { dept: { fr: 'Marketing', en: 'Marketing' }, action: { fr: 'créer et publier vos contenus', en: 'create and publish your content' } },
  { dept: { fr: 'Marketing', en: 'Marketing' }, action: { fr: 'analyser vos campagnes marketing', en: 'analyze your marketing campaigns' } },
  { dept: { fr: 'RH', en: 'HR' }, action: { fr: 'présélectionner vos candidats', en: 'shortlist your candidates' } },
  { dept: { fr: 'RH', en: 'HR' }, action: { fr: 'mener vos pré-entretiens par téléphone', en: 'run your phone pre-interviews' } },
  { dept: { fr: 'Support', en: 'Support' }, action: { fr: 'répondre à vos clients 24 h/24', en: 'answer your customers 24/7' } },
  { dept: { fr: 'Support', en: 'Support' }, action: { fr: 'résoudre les demandes courantes', en: 'resolve common requests' } },
  { dept: { fr: 'Téléphone · voix', en: 'Phone · voice' }, action: { fr: 'qualifier vos prospects par téléphone', en: 'qualify your prospects by phone' } },
  { dept: { fr: 'Téléphone · voix', en: 'Phone · voice' }, action: { fr: 'répondre à vos appels sans attente', en: 'answer your calls with no wait' } },
  { dept: { fr: 'Finance', en: 'Finance' }, action: { fr: 'relancer vos factures impayées', en: 'chase your unpaid invoices' } },
  { dept: { fr: 'Finance', en: 'Finance' }, action: { fr: 'anticiper vos besoins de trésorerie', en: 'anticipate your cash-flow needs' } },
] as const

const ease = [0.22, 1, 0.36, 1] as const
const SCENARIO_MS = 5200
const ACTION_MS = 2800
const RESUME_AFTER_MS = 9000

export function HeroHome({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const { openAlma } = useAlma()

  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Title actions rotate on their own clock, decoupled from the theatre.
  const [actionIndex, setActionIndex] = useState(0)

  useEffect(() => {
    if (reduce) setPlaying(false)
  }, [reduce])

  useEffect(() => {
    if (reduce) return
    const id = setInterval(() => setActionIndex((v) => (v + 1) % HERO_ACTIONS.length), ACTION_MS)
    return () => clearInterval(id)
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

  const current = HERO_ACTIONS[actionIndex]

  return (
    <section className="relative overflow-hidden bg-[#F3EFE6] pb-10 pt-24 sm:pt-28 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(#1C1A17_1px,transparent_1px),linear-gradient(90deg,#1C1A17_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="editorial-shell relative grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 xl:gap-20">
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
              <span className="relative mt-3 block min-h-[4.2em] lg:min-h-[3.1em]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.span
                    key={actionIndex}
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

          <p className="mx-auto mt-5 max-w-full text-balance text-center text-[17px] leading-relaxed text-[#4E483F] sm:mx-0 sm:text-left md:text-[18px]">
            {(() => {
              const i = t.sub.indexOf('Alma')
              if (i === -1) return t.sub
              return (
                <>
                  {t.sub.slice(0, i)}
                  <Image
                    src="/alma-avatar.png"
                    alt="Alma"
                    width={26}
                    height={26}
                    className="ml-1.5 mr-2.5 inline-block h-[26px] w-[26px] -translate-y-px rounded-full object-cover align-middle ring-1 ring-[#E4DCCE]"
                  />
                  {t.sub.slice(i)}
                </>
              )
            })()}
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:items-start">
            <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => openAlma()}
                className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#D10E63] px-7 text-[15px] font-bold text-[#FBF9F3] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D10E63] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F3EFE6] sm:w-auto"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <Link
                href="/collaborateurs-ia"
                className="inline-flex min-h-12 items-center justify-center gap-1.5 text-[15px] font-semibold text-[#4E483F] underline decoration-[#D8D0C2] underline-offset-4 transition-colors hover:text-[#1C1A17] hover:decoration-[#D10E63]"
              >
                {t.secondary}
                <ArrowRight className="h-4 w-4" />
              </Link>
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
