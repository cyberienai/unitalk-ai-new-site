'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'

/**
 * THE MISSION THREAD, HORIZONTAL — the three steps as ONE editorial triptych,
 * not three SaaS cards. A single surface split into three columns by two
 * hairlines, with the mission thread running across them: it draws magenta
 * (Alma → the work), STOPS before the human decision, then turns green and
 * inscribes the skill (the know-how that stays). No icons; the moving thread
 * carries the whole idea. Vertical and static under reduced motion / on mobile.
 */

const MAGENTA = '#D10E63'
const GREEN = '#2E7D4F'
const ease = [0.22, 1, 0.36, 1] as const

const T = {
  fr: {
    eyebrow: 'Comment ça marche',
    cols: [
      { n: '01', head: 'Alma', big: 'Vous parlez à Alma.', proof: 'Elle transforme votre besoin en mission, avec ses règles et ses validations.', chip: 'Mission prête' },
      { n: '02', head: 'Le travail', big: 'Votre Collaborateur IA s’en charge.', proof: 'Il travaille dans les applications autorisées et s’arrête lorsque votre décision est nécessaire.', chip: 'Travail en cours' },
      { n: '03', head: 'Ce qui reste', big: 'Le savoir-faire reste chez vous.', proof: 'Une méthode validée peut devenir une compétence versionnée et réutilisable.', chip: 'Compétence conservée' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    cols: [
      { n: '01', head: 'Alma', big: 'You talk to Alma.', proof: 'She turns your need into a mission, with its rules and its validations.', chip: 'Mission ready' },
      { n: '02', head: 'The work', big: 'Your AI Collaborator handles it.', proof: 'It works inside the authorized apps and stops when your decision is required.', chip: 'Work in progress' },
      { n: '03', head: 'What stays', big: 'The know-how stays with you.', proof: 'A validated method can become a versioned, reusable skill.', chip: 'Skill kept' },
    ],
  },
} as const

export function SectionDefinition({ lang = 'fr' }: { lang?: Lang }) {
  const t = T[lang]
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-120px' })

  // phase: 0 idle · 1 magenta drawn to the gate · 2 validated (green + skill)
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (reduce) {
      setPhase(2)
      return
    }
    if (!inView) return
    const a = window.setTimeout(() => setPhase(1), 300)
    const b = window.setTimeout(() => setPhase(2), 1500)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [inView, reduce])

  const drawn = phase >= 1
  const validated = phase >= 2

  return (
    <section className="bg-[#F3EFE6] py-14 sm:py-20">
      <div className="editorial-shell" ref={ref}>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#A80B50]">{t.eyebrow}</p>

        {/* Horizontal thread band (desktop) */}
        <div aria-hidden className="relative mt-8 hidden h-6 md:block">
          {/* base hairline */}
          <span className="absolute inset-x-0 top-[11px] h-px bg-[#DcD4C4]" />
          {/* magenta draw: from node 1 up to the decision gate (~62%) */}
          <motion.span
            className="absolute left-0 top-[11px] h-[1.5px] origin-left"
            style={{ right: '38%', backgroundColor: MAGENTA }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: drawn ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.9, ease }}
          />
          {/* green draw: from the gate to node 3, only after validation */}
          <motion.span
            className="absolute top-[11px] h-[1.5px] origin-left"
            style={{ left: '62%', right: 0, backgroundColor: GREEN }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: validated ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease }}
          />
          {/* nodes at each column start: 0% / 33.3% / 66.6% */}
          {[0, 33.333, 66.666].map((left, i) => {
            const isLast = i === 2
            return (
              <span key={left} className="absolute top-0 -translate-x-1/2" style={{ left: `${left}%` }}>
                {isLast ? (
                  validated ? (
                    <MissionSeal size={22} color={GREEN} />
                  ) : (
                    <span className="block h-[14px] w-[14px] translate-x-1 translate-y-1 rounded-full border-[1.5px] border-[#DcD4C4]" />
                  )
                ) : (
                  <span
                    className="block h-[14px] w-[14px] translate-x-1 translate-y-1 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: drawn ? MAGENTA : 'transparent', border: drawn ? 'none' : '1.5px solid #DcD4C4' }}
                  />
                )}
              </span>
            )
          })}
          {/* the decision gate: a pulsing stop between node 2 and node 3 */}
          <span className="absolute top-0 -translate-x-1/2" style={{ left: '62%' }}>
            {!validated && !reduce && drawn && (
              <motion.span
                className="absolute left-1 top-1 h-[14px] w-[14px] rounded-full"
                style={{ backgroundColor: MAGENTA }}
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <span
              className="relative block h-[14px] w-[14px] translate-x-1 translate-y-1 rounded-full transition-colors duration-500"
              style={{ backgroundColor: validated ? GREEN : 'transparent', border: `1.5px solid ${validated ? GREEN : MAGENTA}` }}
            />
          </span>
        </div>

        {/* Columns — one continuous surface split by two hairlines */}
        <div className="mt-6 grid gap-y-10 md:grid-cols-3 md:gap-y-0 md:divide-x md:divide-[#DcD4C4]">
          {t.cols.map((c, i) => {
            const done = i < 2 ? drawn : validated
            return (
              <motion.div
                key={c.n}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={inView || reduce ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease, delay: reduce ? 0 : 0.15 * i }}
                className="relative pl-6 md:px-7 md:first:pl-0 lg:md:px-8"
              >
                {/* Mobile: a short vertical thread accent on the left of each block */}
                <span
                  aria-hidden
                  className="absolute left-0 top-1 h-full w-px md:hidden"
                  style={{ backgroundColor: i === 2 && validated ? GREEN : done ? MAGENTA : '#DcD4C4' }}
                />
                <span
                  aria-hidden
                  className="absolute left-[-3px] top-1 h-[8px] w-[8px] rounded-full md:hidden"
                  style={{ backgroundColor: i === 2 ? (validated ? GREEN : 'transparent') : done ? MAGENTA : 'transparent', border: `1.5px solid ${i === 2 && !validated ? MAGENTA : done ? MAGENTA : '#DcD4C4'}` }}
                />

                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[13px] font-bold text-[#D10E63]">{c.n}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8073]">{c.head}</span>
                </div>
                <p className="mt-3 text-balance font-sf text-[clamp(1.35rem,2.4vw,1.85rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-[#1C1A17]">
                  {c.big}
                </p>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#5A5348]">{c.proof}</p>
                <motion.p
                  initial={false}
                  animate={{ opacity: (i === 2 ? validated : done) ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: i === 2 ? (validated ? GREEN : '#8A8073') : MAGENTA }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: i === 2 ? (validated ? GREEN : '#8A8073') : MAGENTA }}
                  />
                  {c.chip}
                </motion.p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
