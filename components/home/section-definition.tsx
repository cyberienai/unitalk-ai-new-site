'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Lang } from '@/lib/language-context'
import { MissionSeal } from '@/components/home/signs'
import { Kicker } from '@/components/home/section-kicker'

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
      { n: '01', head: 'Alma', big: 'Vous parlez à Alma.', proof: 'Elle crée le contexte de votre entreprise et définit avec vous la mission à accomplir.', chip: 'Mission définie' },
      { n: '02', head: 'Le collaborateur', big: 'Alma personnalise votre Collaborateur IA.', proof: 'Profil métier, instructions, compétences, modèle IA, connexion à vos applications.', chip: 'Collaborateur prêt' },
      { n: '03', head: 'La mission', big: 'Le Collaborateur IA l’accomplit.', proof: 'Vous gardez le contrôle et approuvez si nécessaire. Il ne fait jamais rien sans votre accord.', chip: 'Sous votre contrôle' },
      { n: '04', head: 'Ce qui reste', big: 'Le savoir-faire vous appartient.', proof: 'Chaque mission accomplie enrichit votre savoir-faire et fait progresser votre entreprise. Vous ne louez pas une intelligence, vous la possédez.', chip: 'Savoir-faire possédé' },
    ],
  },
  en: {
    eyebrow: 'How it works',
    cols: [
      { n: '01', head: 'Alma', big: 'You talk to Alma.', proof: 'She creates your company context and defines the mission with you.', chip: 'Mission defined' },
      { n: '02', head: 'The collaborator', big: 'Alma tailors your AI Collaborator.', proof: 'Business profile, instructions, skills, AI model, connection to your apps.', chip: 'Collaborator ready' },
      { n: '03', head: 'The mission', big: 'The AI Collaborator carries it out.', proof: 'You stay in control and approve when needed. It never does anything without your consent.', chip: 'Under your control' },
      { n: '04', head: 'What stays', big: 'The know-how belongs to you.', proof: 'Every completed mission enriches your know-how and moves your company forward. You don’t rent intelligence, you own it.', chip: 'Know-how owned' },
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
        <Kicker>{t.eyebrow}</Kicker>

        {/* Horizontal thread band (desktop) — 4 nodes, gate before the last */}
        <div aria-hidden className="relative mt-8 hidden h-6 md:block">
          {/* base hairline */}
          <span className="absolute inset-x-0 top-[11px] h-px bg-[#DcD4C4]" />
          {/* magenta draw: steps 1→3, up to the decision gate (~84%) */}
          <motion.span
            className="absolute left-0 top-[11px] h-[1.5px] origin-left"
            style={{ right: '16%', backgroundColor: MAGENTA }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: drawn ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 1.1, ease }}
          />
          {/* green draw: from the gate to node 4, only after validation */}
          <motion.span
            className="absolute top-[11px] h-[1.5px] origin-left"
            style={{ left: '84%', right: 0, backgroundColor: GREEN }}
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: validated ? 1 : 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease }}
          />
          {/* nodes at each column start: 0% / 25% / 50% / 75% */}
          {[0, 25, 50, 75].map((left, i) => {
            const isLast = i === 3
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
          {/* the decision gate: a pulsing stop between node 3 and node 4 */}
          <span className="absolute top-0 -translate-x-1/2" style={{ left: '84%' }}>
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

        {/* Columns — one continuous surface split by hairlines */}
        <div className="mt-6 grid gap-y-10 md:grid-cols-4 md:gap-y-0 md:divide-x md:divide-[#DcD4C4]">
          {t.cols.map((c, i) => {
            const done = i < 3 ? drawn : validated
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
                  style={{ backgroundColor: i === 3 && validated ? GREEN : done ? MAGENTA : '#DcD4C4' }}
                />
                <span
                  aria-hidden
                  className="absolute left-[-3px] top-1 h-[8px] w-[8px] rounded-full md:hidden"
                  style={{ backgroundColor: i === 3 ? (validated ? GREEN : 'transparent') : done ? MAGENTA : 'transparent', border: `1.5px solid ${i === 3 && !validated ? MAGENTA : done ? MAGENTA : '#DcD4C4'}` }}
                />

                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[13px] font-bold text-[#D10E63]">{c.n}</span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[#8A8073]">{c.head}</span>
                </div>
                <p className="mt-3 text-balance font-sf text-[clamp(1.2rem,1.9vw,1.55rem)] font-semibold leading-[1.14] tracking-[-0.02em] text-[#1C1A17]">
                  {c.big}
                </p>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-[#5A5348]">{c.proof}</p>
                <motion.p
                  initial={false}
                  animate={{ opacity: (i === 3 ? validated : done) ? 1 : 0.35 }}
                  transition={{ duration: 0.4 }}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.12em]"
                  style={{ color: i === 3 ? (validated ? GREEN : '#8A8073') : MAGENTA }}
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: i === 3 ? (validated ? GREEN : '#8A8073') : MAGENTA }}
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
